#pragma strict

var lifeTime=3.0;
var fuse=0.0;
var explodePrefabH:Transform;
var shockWavePrefab:Transform;
private var obTrans:Transform;

var bombExplodeSound:AudioClip;
var bombExplodeVolume:float;

function Start(){

	obTrans = transform;

}


function Explode(Transform){
	
	Destroy(gameObject);
	AudioSource.PlayClipAtPoint(bombExplodeSound, transform.position, bombExplodeVolume);
	Instantiate(explodePrefabH, transform.position, Quaternion.identity);
	Instantiate(shockWavePrefab, transform.position, Quaternion.identity);

}

function FixedUpdate(){
	
	fuse += Time.deltaTime;
	if (fuse >= lifeTime) {
		Explode(obTrans);
	}
}

function OnTriggerEnter(hostile:Collider){
	var hostileTag = hostile.tag;
	if (hostileTag.Length > 8 && hostileTag.Substring(0,8) == "Asteroid") {
		Explode(obTrans);
	}
}
