#pragma strict

private var expand=0.4;
private var expandStart:float;
var expandRate = 2.5;
var expandLimit = 14.0;
var damageLimit:float;
var crackLimit:float;
var rez2Booster:float;
var expandBoost:float;
var shockForce:float;
var bigBomb = true;

var asteroidBehave:AsteroidBehaviour;
var bombDmg = 100;
var pickupChanceBoost:float;

var exSizeCheck:Transform;
var transPos:Vector3;

var pushPlayer = true;
var glowMaterial:Material;
var megaBombShock = false;
var crackerBombShock = false;
var miniBombShock = false;

function Awake () {

	expandStart = expand;
	exSizeCheck = transform;
	transPos = transform.position;
	transform.localRotation.eulerAngles.y = Random.Range(0, 359);

}

function FixedUpdate () {

	if (bigBomb == false)
		expandBoost = (rez2Booster * (Resource2Script.resource2Num - 4)) + 1;
	else
		expandBoost = 1;
	expand += expandRate * Time.deltaTime;
	exSizeCheck.localScale = Vector3(expand * expandBoost, expand / 2, expand * expandBoost);
	if (exSizeCheck.localScale.x >= expandLimit){
		if (miniBombShock == false)
			Destroy(transform.parent.gameObject);
		else
			Destroy(gameObject);
	}

}

function OnTriggerEnter (hostile:Collider){
	
	var hostileTag = hostile.tag;
	if (hostileTag.Length == 9 && hostileTag.Substring(0,8) == "Asteroid" && exSizeCheck.localScale.x < damageLimit) {
		asteroidBehave = hostile.GetComponent(AsteroidBehaviour);
		if (hostile.tag != "AsteroidG" && hostile.tag != "AsteroidH" && bigBomb == true)
			asteroidBehave.bombed = true;
		if (hostileTag == "AsteroidS")
			asteroidBehave.pickupChanceHeal += pickupChanceBoost;
			asteroidBehave.pickupChanceROF += pickupChanceBoost;
			asteroidBehave.pickupChanceBomb += pickupChanceBoost;
			asteroidBehave.pickupChanceWeapons += pickupChanceBoost;
		if ((crackerBombShock == true && exSizeCheck.localScale.x <= crackLimit) || (hostile.tag != "AsteroidG" && hostile.tag != "AsteroidH"))
			asteroidBehave.curHP -= bombDmg;
	}

	var hostileTransPos = hostile.transform.position;
	
	if (((hostileTag.Length == 9 && hostileTag.Substring(0,8) == "Asteroid") || (hostileTag == "Player" && pushPlayer == true)) &&
		 (exSizeCheck.localScale.x >= damageLimit || (exSizeCheck.localScale.x < damageLimit && (hostile.tag == "AsteroidG" || hostile.tag == "AsteroidH")))
		){
	
		if (hostileTag == "Player")
			shockForce = 400;
		else {
			if (Application.loadedLevelName == "DarkLevel" && megaBombShock == true){
				hostile.light.enabled = true;
				hostile.renderer.material = glowMaterial;
			}
		}
		if (miniBombShock == true && (hostile.tag == "AsteroidG" || hostile.tag == "AsteroidH"))
			shockForce /= 3;
		var augCurScale = exSizeCheck.localScale.x - expandStart;
		var augMaxScale = expandLimit - expandStart;
		var impact = shockForce * Mathf.Pow(((augMaxScale - augCurScale) / augMaxScale), 2);
		var forceDir = hostileTransPos - transPos;
		hostile.rigidbody.AddForce(forceDir * impact);
	
	}
}