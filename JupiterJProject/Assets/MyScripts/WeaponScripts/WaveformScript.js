#pragma strict

var waveParent = false;
var waveDmg = false;
var waveInner = false;
var waveOuter = false;

var scaleStart:float;
var scaleRate:float;

var dmg:float;
var dmgDivide:float;
var repell:float;

var hits = 0;
var maxHits = 3;

var asteroidBehave:AsteroidBehaviour;
var waveParentObject:WaveformScript;

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
}

function OnTriggerEnter(hostile:Collider){

	if (waveParent == false){
		var hostileTag = hostile.tag;
    	if (hostileTag.Length > 8 && hostileTag.Substring(0,8) == "Asteroid" && hostileTag != "AsteroidG" && hostileTag != "AsteroidH") {
    		
    		asteroidBehave = hostile.GetComponent(AsteroidBehaviour);
    		if (waveDmg == true)
    			asteroidBehave.curHP -= dmg;
    		else {
    			asteroidBehave.curHP -= dmg / dmgDivide;
    			var heading = hostile.transform.position - transform.position;
    			hostile.rigidbody.AddForce(heading * repell);
    		}
    		waveParentObject.hits++;
    	}
		if (hostileTag == "AsteroidG" || hostileTag == "AsteroidH") {
    		heading = hostile.transform.position - transform.position;
    		hostile.rigidbody.AddForce(heading * repell);
    		Destroy(gameObject);
    	}
	}
}