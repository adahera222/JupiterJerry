#pragma strict

var asterPlayer:AsteroidsPlayer;
var bulletPrefab:Transform; 
var bulletSound = new AudioClip[3];
var alreadyPlayed:AudioClip;
var bulletSoundVolume = new float[3];
var bulletSpd:float;
var canFire = true;
var bulletNum = 1;
var ammoRecharge:float;
var rechargeDelay:float;
var triplePulseBoost:float;
var doublePulseBoost:float;
//var rechargeDelayDefault = 0.2500;
var delayDivider = 1000.0;
var minDelay:float;

var bulletSpawnM:Transform;
var bulletSpawnL:Transform;
var bulletSpawnR:Transform;
var bulletSpawnL2:Transform;
var bulletSpawnR2:Transform;

var maxMineral2:float;
var startMin2:float;

//var weaponUpgrade1:int;
//var weaponUpgrade2:int;

//var weaponLev3Angle:float;

//var weaponUpgradeRezOffset:float;

//var rechargeDelay1:float;
//var rechargeDelay2:float;
//var upgradeThreshold1:float;
//var upgradeThreshold2:float;
//var upgradeThreshold3:float;

//var guiRateOfFire:GUIText;

function Start(){

	asterPlayer = gameObject.GetComponent(AsteroidsPlayer);
	Resource2Script.resource2Num = startMin2;
	//rechargeDelay = rechargeDelayDefault;
	//guiRateOfFire = GameObject.Find("GUIRateOfFire").GetComponent(GUIText);
}


function Update () {

//	if (Resource2Script.resource2Num >= weaponUpgrade2){
	
//		bulletSpawnL.transform.localEulerAngles.y = -weaponLev3Angle;
//		bulletSpawnR.transform.localEulerAngles.y = weaponLev3Angle;
//	}
	if (Resource2Script.resource2Num > maxMineral2)
		Resource2Script.resource2Num = maxMineral2;
	if (bulletNum > 3)
		bulletNum = 1;

	if (Input.GetButton("Fire1") && canFire == true && asterPlayer.currentWeapon == "SinglePulse"){
		var audioSelection = Random.Range(1, 3);
		AudioSource.PlayClipAtPoint(bulletSound[audioSelection], transform.position, bulletSoundVolume[audioSelection]);
		
		var bullet = Instantiate(bulletPrefab, bulletSpawnM.transform.position, transform.rotation);
		bullet.transform.Translate(0,0,0.2);
		bullet.transform.eulerAngles.x = 90;
		
		bullet.rigidbody.velocity = rigidbody.velocity;
		bullet.rigidbody.angularVelocity = rigidbody.angularVelocity;
		
		bullet.rigidbody.AddForce(transform.forward * bulletSpd);
		
		canFire = false;
	}
	if (Input.GetButton("Fire1") && canFire == true && asterPlayer.currentWeapon == "DoublePulse"){
		
		audioSelection = Random.Range(1, 3);
		AudioSource.PlayClipAtPoint(bulletSound[audioSelection], transform.position, bulletSoundVolume[audioSelection]);
		alreadyPlayed = bulletSound[audioSelection];
		while (alreadyPlayed == bulletSound[audioSelection])
			audioSelection = Random.Range(1, 3);
		AudioSource.PlayClipAtPoint(bulletSound[audioSelection], transform.position, bulletSoundVolume[audioSelection]);
		
		var bulletL = Instantiate(bulletPrefab, bulletSpawnL.transform.position, bulletSpawnL.transform.rotation);
		var bulletR = Instantiate(bulletPrefab, bulletSpawnR.transform.position, bulletSpawnR.transform.rotation);
		bulletL.transform.Translate(0,0,0.2);
		bulletL.transform.eulerAngles.x = 90;
		bulletR.transform.Translate(0,0,0.2);
		bulletR.transform.eulerAngles.x = 90;
		
		bulletL.rigidbody.velocity = rigidbody.velocity;
		bulletL.rigidbody.angularVelocity = rigidbody.angularVelocity;
		bulletR.rigidbody.velocity = rigidbody.velocity;
		bulletR.rigidbody.angularVelocity = rigidbody.angularVelocity;
		
		bulletL.rigidbody.AddForce(transform.forward * bulletSpd);
		bulletR.rigidbody.AddForce(transform.forward * bulletSpd);
		
		canFire = false;
	}
	if (Input.GetButton("Fire1") && canFire == true && asterPlayer.currentWeapon == "TriplePulse"){
		
		audioSelection = Random.Range(1, 3);
		AudioSource.PlayClipAtPoint(bulletSound[audioSelection], transform.position, bulletSoundVolume[audioSelection]);
		
		if (bulletNum == 2){
			bullet = Instantiate(bulletPrefab, bulletSpawnM.transform.position, transform.rotation);
			bullet.transform.Translate(0,0,0.2);
			bullet.transform.eulerAngles.x = 90;
		
			bullet.rigidbody.velocity = rigidbody.velocity;
			bullet.rigidbody.angularVelocity = rigidbody.angularVelocity;
		
			bullet.rigidbody.AddForce(transform.forward * bulletSpd);
		}
		if (bulletNum == 1){
			bulletL = Instantiate(bulletPrefab, bulletSpawnL.transform.position, bulletSpawnL.transform.rotation);
			bulletL.transform.Translate(0,0,0.2);
			bulletL.transform.eulerAngles.x = 90;
		
			bulletL.rigidbody.velocity = rigidbody.velocity;
			bulletL.rigidbody.angularVelocity = rigidbody.angularVelocity;
		
			bulletL.rigidbody.AddForce(bulletSpawnL.transform.forward * bulletSpd);
		}
		if (bulletNum == 3){
			bulletR = Instantiate(bulletPrefab, bulletSpawnR.transform.position, bulletSpawnR.transform.rotation);
			bulletR.transform.Translate(0,0,0.2);
			bulletR.transform.eulerAngles.x = 90;
			
			bulletR.rigidbody.velocity = rigidbody.velocity;
			bulletR.rigidbody.angularVelocity = rigidbody.angularVelocity;
		
			bulletR.rigidbody.AddForce(bulletSpawnR.transform.forward * bulletSpd);
		}
		bulletNum++;
		canFire = false;
	}
}

function FixedUpdate () {
	
	//Leveled recharge decrease
	//if (Resource1Script.resourceNum < upgradeThreshold1){
	//	rechargeDelay = rechargeDelayDefault;
	//} else if (Resource1Script.resourceNum >= upgradeThreshold1 && Resource1Script.resourceNum < upgradeThreshold2){
	//	rechargeDelay = rechargeDelayDefault - (upgradeThreshold1 / delayDivider);
	//} else if (Resource1Script.resourceNum >= upgradeThreshold2 && Resource1Script.resourceNum < upgradeThreshold3){
	//	rechargeDelay = rechargeDelayDefault - (upgradeThreshold2 / delayDivider);
	//} else if (Resource1Script.resourceNum >= upgradeThreshold3){
	//	rechargeDelay = 0.1;
	//}
	
	//Gradual recharge decrease
	
	//if ((rechargeDelayDefault - (Resource1Script.resourceNum / delayDivider)) > minDelay){
	//	rechargeDelay = rechargeDelayDefault - (Resource1Script.resourceNum / delayDivider);
	//} else if ((rechargeDelayDefault - (Resource1Script.resourceNum / delayDivider)) < minDelay) {
	//	rechargeDelay = minDelay;
	//}
	

///////////////////    Old Rez offset for Mineral 2 upgrade system   //////////////////////

//	if (Resource2Script.resource2Num < weaponUpgrade1)
//		weaponUpgradeRezOffset = 0;
//	if (Resource2Script.resource2Num >= weaponUpgrade1 && Resource2Script.resource2Num < weaponUpgrade2)
//		weaponUpgradeRezOffset = weaponUpgrade1 - startMin2;
//	if (Resource2Script.resource2Num >= weaponUpgrade2)
//		weaponUpgradeRezOffset = weaponUpgrade1 - (startMin2 * 2);
//	if (Resource2Script.resource2Num > maxMineral2)
//		Resource2Script.resource2Num = maxMineral2;
	
	
	//Resource 2 dependant recharge decrease
	if (asterPlayer.currentWeapon == "TriplePulse")
		rechargeDelay = 1 / (Resource2Script.resource2Num + triplePulseBoost);
	else if (asterPlayer.currentWeapon == "DoublePulse")
		rechargeDelay = 1 / (Resource2Script.resource2Num + doublePulseBoost);
	else
		rechargeDelay = 1 / Resource2Script.resource2Num;
	
	
	
	if (canFire == false){
		ammoRecharge += Time.deltaTime;
	}
	if (ammoRecharge >= rechargeDelay && canFire == false){
		canFire = true;
		ammoRecharge = 0;
	}
	
	//var fireRate = Mathf.Round((1 / rechargeDelay) * 100) / 100;
	
	//guiRateOfFire.guiText.text = "Firing Rate: " + fireRate + " shots/sec";
}

