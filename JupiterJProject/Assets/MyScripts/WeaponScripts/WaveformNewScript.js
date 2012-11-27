#pragma strict

var pointerObject:Transform;
private var cosPointerAngle:float;

var scaleStart:float;
var scaleRate:float;

var dmg:float;
//var dmgBase:float;
var repell:float;

var hits = 0;
var maxHits = 3;

var asteroidBehave:AsteroidBehaviour;
var waveParentObject:WaveformScript;
var alreadyHit:GameObject;

function Awake(){



}


function Update () {
	
		scaleStart += scaleRate * Time.deltaTime;
		transform.localScale = Vector3(scaleStart, 1, scaleStart);
		if (hits >= maxHits)
			Destroy(gameObject);	
	///////    Damage increase with weapon upgrades    /////////
	//dmg = dmgBase + (Resource2Script.resource2Num - 4);
}

function OnTriggerEnter(hostile:Collider){

	var hostileTag = hostile.tag;
   	if (hostileTag.Length > 8 && hostileTag.Substring(0,8) == "Asteroid" && hostileTag != "AsteroidG" && hostileTag != "AsteroidH" && hostile.gameObject != alreadyHit) {
    	
    	alreadyHit = hostile.gameObject;
		asteroidBehave = hostile.GetComponent(AsteroidBehaviour);
		pointerObject.transform.LookAt(hostile.transform);
		cosPointerAngle = Mathf.Abs(Mathf.Pow(Mathf.Cos(pointerObject.transform.localEulerAngles.y), 4));
		asteroidBehave.curHP -= dmg * cosPointerAngle;
		asteroidBehave.HPCheck();
		hits++;
		Debug.Log(dmg * cosPointerAngle);
	}
}