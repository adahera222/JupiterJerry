#pragma strict

var waveParent = false;
var waveDmg = false;

var scaleStart:float;
var scaleRate:float;

var dmg:float;
var dmgBase:float;
var repell:float;

var hits = 0;
var maxHits = 3;

var asteroidBehave:AsteroidBehaviour;
var waveParentObject:WaveformScript;
var alreadyHit:GameObject;

function Awake(){

	waveParentObject = transform.parent.GetComponent(WaveformScript);

}


function Update () {
	
	if (waveParent == true){
		scaleStart += scaleRate * Time.deltaTime;
		transform.localScale = Vector3(scaleStart, 1, scaleStart);
		if (hits >= maxHits)
			Destroy(gameObject);	
	}
	dmg = dmgBase + (Resource2Script.resource2Num - 4);
}

function OnTriggerEnter(hostile:Collider){

	if (waveParent == false){
		var hostileTag = hostile.tag;
    	if (hostileTag.Length > 8 && hostileTag.Substring(0,8) == "Asteroid" && hostileTag != "AsteroidG" && hostileTag != "AsteroidH" && hostile.gameObject != waveParentObject.alreadyHit) {
    		
    		asteroidBehave = hostile.GetComponent(AsteroidBehaviour);
    		asteroidBehave.curHP -= dmg;
    		var heading = hostile.transform.position - transform.position;
    		Debug.Log(heading);
    		hostile.rigidbody.AddForce(heading * repell);
    		
    		waveParentObject.hits++;
    		waveParentObject.alreadyHit = hostile.gameObject;
    	}
		if (hostileTag == "AsteroidG" || hostileTag == "AsteroidH") {
    		heading = hostile.transform.position - transform.position;
    		hostile.rigidbody.AddForce(heading * repell);
    		Destroy(gameObject);
    	}
	}
}