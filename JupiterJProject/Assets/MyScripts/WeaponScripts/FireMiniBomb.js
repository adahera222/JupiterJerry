#pragma strict

var asterPlayer:AsteroidsPlayer;
var firePulse:FirePulseLaser;
var miniBombPrefab:Transform; 
var miniBombSound = new AudioClip[3];
var miniBombSoundVolume = new float[3];
var miniBombSpd:float;
var canFire = true;
var ammoRecharge:float;
var rechargeDelay:float;
var rez2Divider:float;
var minDelay:float;

var miniBombSpawn:Transform;

function Start(){

	asterPlayer = gameObject.GetComponent(AsteroidsPlayer);
	firePulse = GetComponent(FirePulseLaser);
}


function Update () {


	if (Input.GetButton("Fire1") && canFire == true && asterPlayer.currentWeapon == "MiniBomb"){
		var audioSelection = Random.Range(1, 3);
		AudioSource.PlayClipAtPoint(miniBombSound[audioSelection], transform.position, miniBombSoundVolume[audioSelection]);
		
		var miniBomb = Instantiate(miniBombPrefab, miniBombSpawn.transform.position, transform.rotation);
		miniBomb.transform.Translate(0,0,0.2);
		miniBomb.transform.eulerAngles.x = 90;
		
		miniBomb.rigidbody.velocity = rigidbody.velocity;
		miniBomb.rigidbody.angularVelocity = rigidbody.angularVelocity;
		
		miniBomb.rigidbody.AddForce(transform.forward * miniBombSpd);
		
		canFire = false;
	}
}

function FixedUpdate () {
	
	if (1 / (Resource2Script.resource2Num / rez2Divider) < minDelay)
		rechargeDelay = minDelay;
	else
		rechargeDelay = 1 / (Resource2Script.resource2Num / rez2Divider);
	
	
	
	if (canFire == false){
		ammoRecharge += Time.deltaTime;
	}
	if (ammoRecharge >= rechargeDelay && canFire == false){
		canFire = true;
		ammoRecharge = 0;
	}
}

