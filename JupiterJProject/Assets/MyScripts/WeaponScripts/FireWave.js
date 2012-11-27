#pragma strict

var asterPlayer:AsteroidsPlayer;
var firePulse:FirePulseLaser;
var wavePrefab:Transform; 
var waveSound = new AudioClip[3];
var alreadyPlayed:AudioClip;
var waveSoundVolume = new float[3];
var waveSpd:float;
var canFire = true;
var ammoRecharge:float;
var rechargeDelay:float;
//var minDelay:float;

var bulletSpawnM:Transform;

function Start(){

	asterPlayer = gameObject.GetComponent(AsteroidsPlayer);
}


function Update () {

	if (Input.GetButton("Fire1") && canFire == true && asterPlayer.currentWeapon == "Waveform"){
		var audioSelection = Random.Range(1, 3);
		AudioSource.PlayClipAtPoint(waveSound[audioSelection], transform.position, waveSoundVolume[audioSelection]);
		
		var bullet = Instantiate(wavePrefab, bulletSpawnM.transform.position, transform.rotation);
		bullet.transform.Translate(0,0,0.2);
		
		bullet.rigidbody.velocity = rigidbody.velocity;
		//bullet.rigidbody.angularVelocity = rigidbody.angularVelocity;
		
		bullet.rigidbody.AddForce(transform.forward * waveSpd);
		
		canFire = false;
	}
	
}

function FixedUpdate () {
	
	//Resource 2 dependant recharge decrease
	rechargeDelay = 1 / (Resource2Script.resource2Num * 0.85);
	
	if (canFire == false){
		ammoRecharge += Time.deltaTime;
	}
	if (ammoRecharge >= rechargeDelay && canFire == false){
		canFire = true;
		ammoRecharge = 0;
	}
}

