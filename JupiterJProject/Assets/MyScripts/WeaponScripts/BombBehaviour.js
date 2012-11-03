#pragma strict

var lifeTime=3.0;
var fuse=0.0;
var explodePrefabH:Transform;
var shockWaveRegPrefab:Transform;
var shockWaveCrackPrefab:Transform;

var bombExplodeSound:AudioClip;
var bombExplodeVolume:float;

var miniBomb = false;

function Start(){

}


function Explode(type:String){
	
	Destroy(gameObject);
	if (type == "cracker")
		Instantiate(shockWaveCrackPrefab, transform.position, Quaternion.identity);
	else if (type == "regular")
		Instantiate(shockWaveRegPrefab, transform.position, Quaternion.identity);
	AudioSource.PlayClipAtPoint(bombExplodeSound, transform.position, bombExplodeVolume);
	Instantiate(explodePrefabH, transform.position, Quaternion.identity);

}

function FixedUpdate(){
	
	fuse += Time.deltaTime;
	if (fuse >= lifeTime) {
		Explode("regular");
	}
}

function OnTriggerEnter(hostile:Collider){
	var hostileTag = hostile.tag;
	if (hostileTag.Length > 8 && hostileTag.Substring(0,8) == "Asteroid") {
		if (hostileTag == "AsteroidH" || hostileTag == "AsteroidG")
			Explode("cracker");
		else
			Explode("regular");
	}
}
