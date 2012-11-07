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

var bombReady:GUIText;

function Start(){

	bombReady = GameObject.Find("GUIBomb").GetComponent(GUIText);

}



function Update () {

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
		bomb.rigidbody.angularVelocity = rigidbody.angularVelocity;
		
		bomb.rigidbody.AddForce(transform.forward * bombSpd);
		
		bombAmmo--;
		//AudioSource.PlayClipAtPoint(bombLaunchSound, transform.position, bombLaunchVolume);
		canFire = false;
	}

}

function FixedUpdate () {

	if (canFire == false){
		if (bombAmmo > 0) {
			bombReady.guiText.text = "Bombs: (" + bombAmmo + ")    Bomb Reloading";
			ammoRecharge += Time.deltaTime;
			playBombReadySound = true;
		} else {
			bombReady.guiText.text = "Bombs: (" + bombAmmo + ")    <<Bombs Depleted>>";
		}
	}
	if (bombAmmo > 0 && ammoRecharge >= rechargeDelay && canFire == false) {
		canFire = true;
		ammoRecharge = 0;
		//if (playBombReadySound == true){
		//	AudioSource.PlayClipAtPoint(bombReadySound, transform.position, bombReadyVolume);
		//	playBombReadySound = false;
		//}
	}
	if (canFire == true)
		bombReady.guiText.text = "Bombs: (" + bombAmmo + ")    Bomb Ready";
	
	if (bombAmmo == 0){
		canFire = false;
		ammoRecharge = 0;
	}
}
