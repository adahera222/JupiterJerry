#pragma strict

private var expand=0.4;
private var expandStart:float;
var expandRate = 2.5;
var expandLimit = 14;
var shockForce:float;

var asteroidBehave:AsteroidBehaviour;
var asterSpawn:AsteroidSpawn;
var explosionS:Transform;
var explosionM:Transform;
var explosionB:Transform;
var shockDmg:float;
var shockDmgMin:float;
var shockDmgDealt:float;
var hurtPlayer = true;
var asterPlayer:AsteroidsPlayer;

var exSizeCheck:Transform;
var pickupMessagePrefab:Transform;
//var mineralFizzle:Transform;
var transPos:Vector3;

var scoreKeeper:ScoreKeeper;

function Awake () {
	
	scoreKeeper = GameObject.Find("GUIScoreKeeper").GetComponent(ScoreKeeper);
	exSizeCheck = transform;
	expandStart = expand;
	transPos = transform.position;
	asterPlayer = GameObject.Find("PlayerShip").GetComponent(AsteroidsPlayer);
	shockDmg *= asterPlayer.playerHealthMax;
	shockDmgMin *= asterPlayer.playerHealthMax;
	asterSpawn = GameObject.Find("AsteroidSpawn").GetComponent(AsteroidSpawn);
	transform.localRotation.eulerAngles.y = Random.Range(0, 359);

}

function FixedUpdate () {

	expand += expandRate * Time.deltaTime;
	exSizeCheck.localScale = Vector3(expand, expand / 2, expand);
	if (exSizeCheck.localScale.x >= expandLimit){
		Destroy(transform.parent.gameObject);
	}

}

function OnTriggerEnter (hostile:Collider){
	
	var hostileTag = hostile.tag;
	var hostileTransPos = hostile.transform.position;
	
	if (hostileTag.Substring(0,6) == "Pickup"){
	
		//Instantiate(mineralFizzle, hostileTransPos, Quaternion.identity);
		Destroy(hostile.transform.parent.gameObject);
	
	}
	//if (hostileTag == "AsteroidB" && gameObject.tag != "AsteroidShock_g") {
	//	Instantiate(explosionB, hostileTransPos, Quaternion.identity);
	//	Destroy(hostile.gameObject);
	//}
	//if (asterSpawn.asteroidThreatLev < 15){
	//	if (hostileTag == "AsteroidM" && gameObject.tag != "AsteroidShock_g") {
	//		Instantiate(explosionM, hostileTransPos, Quaternion.identity);
	//		Destroy(hostile.gameObject);
	//	}
	//	if (hostileTag == "AsteroidS" && gameObject.tag != "AsteroidShock_g") {
	//		Instantiate(explosionS, hostileTransPos, Quaternion.identity);
	//		Destroy(hostile.gameObject);
	//	}
	//}
		
		var augCurScale = exSizeCheck.localScale.x - expandStart;
		var augMaxScale = expandLimit - expandStart;
		var impact = shockForce * Mathf.Pow(((augMaxScale - augCurScale) / augMaxScale), 2);
		var forceDir = hostileTransPos - transPos;
		
		if (hostile.name != "TractorBeam"){
			if (hostile.name == "PlayerCollider")
				GameObject.Find("PlayerShip").rigidbody.AddForce(forceDir * impact);
			else
				hostile.rigidbody.AddForce(forceDir * impact);	
		}
		
		if (hostileTag == "Player" && hurtPlayer == true){
			if (hostile.GetComponent(ShieldUp).shieldUpChk == false){
				var shockDmgNow = (shockDmg * Mathf.Pow(((augMaxScale - augCurScale) / augMaxScale), 2));
				if (shockDmgNow < shockDmgMin)
					shockDmgDealt = shockDmgMin;
				else
					shockDmgDealt = shockDmg;
				asterPlayer.playerHealth -= shockDmgDealt;
				hurtPlayer = false;
				
				var dmgMessage = Instantiate(pickupMessagePrefab, Vector3(0.5,0.52,0), Quaternion.identity);
					dmgMessage.guiText.material.color = asterPlayer.dmgMessageColor;
				var playerDmgDealtText = Mathf.Round((shockDmgDealt / asterPlayer.playerHealthMax) * 100);
					dmgMessage.guiText.text = playerDmgDealtText.ToString();
					dmgMessage.guiText.fontSize = 18;
			}
		}
		if (hostileTag == "PlayerShield" && hurtPlayer == true){
			
			var shieldScript = hostile.GetComponent(PlayerShieldScript);
			
			shockDmgNow = (shockDmg * Mathf.Pow(((augMaxScale - augCurScale) / augMaxScale), 2));
			if (shockDmgNow < shockDmgMin)
				shockDmgDealt = shockDmgMin * shieldScript.dmgMultiplier;
			else
				shockDmgDealt = shockDmg * shieldScript.dmgMultiplier;
			
			shieldScript.shieldHealth -= shockDmgDealt;
			hurtPlayer = false;
			
			
					dmgMessage = Instantiate(pickupMessagePrefab, Vector3(0.5,0.52,0), Quaternion.identity);
					dmgMessage.guiText.material.color = asterPlayer.dmgMessageColor;
					playerDmgDealtText = Mathf.Round((shockDmgDealt / asterPlayer.playerHealthMax) * 100);
					dmgMessage.guiText.text = playerDmgDealtText.ToString();
					dmgMessage.guiText.fontSize = 18;
		}
}