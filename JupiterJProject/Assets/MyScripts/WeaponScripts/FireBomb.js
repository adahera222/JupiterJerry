#pragma strict

var bombPrefab:Transform; 
var bombSpd:float;
var canFire = false;
var ammoRecharge:float;
var rechargeDelay=3.0;
var bombAmmo = 0;
var zeroBombChanceBoost:float;
var bombLaunchSound:AudioClip;
var bombLaunchVolume:float;
//var bombReadySound:AudioClip;
//var bombReadyVolume:float;
var notEnoughMineralsSound:Transform;
var playBombReadySound = false;

var clock = 0.0;
var clockGo = false;
var bombPUPrefab:Transform;

function Start(){


}



function Update () {

	if (bombAmmo == 0)
		clockGo = true;
	else {
		clockGo = false;
		clock = 0.0;
	}
	
	if (clockGo == true)
		clock += Time.deltaTime;
	
	if (clock >= 30){
		clock = 0.0;
		var angle = Random.Range(0.0, 359.0);
		Instantiate(bombPUPrefab, Vector3(0,3,0), Quaternion.Euler(0,angle,0));
	}
	
	if (bombAmmo == 0 && CameraScript.roundNum > 1)
		AsteroidBehaviour.pickupChanceBombBoost = zeroBombChanceBoost;
	else
		AsteroidBehaviour.pickupChanceBombBoost = 0;

	if (Input.GetButtonDown("Fire2") && canFire == false)
		notEnoughMineralsSound.audio.Play();
		
	if (Input.GetButtonDown("Fire2") && canFire == true){
		var bomb = Instantiate(bombPrefab, GameObject.Find("bulletSpawn").transform.position, transform.rotation);
		bomb.transform.eulerAngles.x = 90;
		
		bomb.rigidbody.velocity = rigidbody.velocity;
		//bomb.rigidbody.angularVelocity = rigidbody.angularVelocity;
		
		bomb.rigidbody.AddForce(transform.forward * bombSpd);
		
		bombAmmo--;
		AudioSource.PlayClipAtPoint(bombLaunchSound, transform.position, bombLaunchVolume);
		canFire = false;
	}

}

function FixedUpdate () {

	if (canFire == false){
		if (bombAmmo > 0) {
			ammoRecharge += Time.deltaTime;
		}
	}
	if (bombAmmo > 0 && ammoRecharge >= rechargeDelay && canFire == false) {
		canFire = true;
		ammoRecharge = 0;
		
	}
	
	if (bombAmmo == 0){
		canFire = false;
		ammoRecharge = 0;
	}
}
