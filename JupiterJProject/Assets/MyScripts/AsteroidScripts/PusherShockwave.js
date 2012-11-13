#pragma strict

private var expand=0.4;
private var expandStart:float;
var expandRate = 2.5;
var expandLimit = 14;
var shockForce:float;

var shockDmg = 100;
var hurtPlayer = false;

var exSizeCheck:Transform;
var transPos:Vector3;

function Awake () {
	
	exSizeCheck = transform;
	expandStart = expand;
	transPos = transform.position;

}

function FixedUpdate () {

	expand += expandRate * Time.deltaTime;
	exSizeCheck.localScale = Vector3(expand, expand / 2, expand);
	if (exSizeCheck.localScale.x >= expandLimit){
		Destroy(gameObject);
	}

}

function OnTriggerEnter (hostile:Collider){
	
	var hostileTag = hostile.tag;
	
	if ((hostileTag.Length == 9 && hostileTag.Substring(0,8) == "Asteroid") || hostileTag == "Player"){
	
		var augCurScale = exSizeCheck.localScale.x - expandStart;
		var augMaxScale = expandLimit - expandStart;
		var impact = shockForce * Mathf.Pow(((augMaxScale - augCurScale) / augMaxScale), 2);
		var forceDir = hostile.transform.position - transPos;
		hostile.rigidbody.AddForce(forceDir * impact);
	
	}

}