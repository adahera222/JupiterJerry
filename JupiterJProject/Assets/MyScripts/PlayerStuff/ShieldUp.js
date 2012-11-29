#pragma strict

var playerShield:Transform;
var playerCol:GameObject;
var shieldUp = false;
var shieldUpChk = false;
var guiShield:GameObject;
var shieldHealth:float;
var shieldHealthMax:float;

var shieldSpawn:AudioClip;
var shieldSpawnVolume:float;

var playerShieldScript:PlayerShieldScript;

function Start () {

	
}

function Update () {
	if (shieldUpChk == false && shieldUp == true){
		
		var shield = Instantiate(playerShield, transform.position, Quaternion.identity);
		AudioSource.PlayClipAtPoint(shieldSpawn, transform.position, shieldSpawnVolume);
		playerCol.collider.enabled = false;
		shieldUpChk = true;
		playerShieldScript = shield.GetComponent(PlayerShieldScript);
		shieldUp = false;
		
	}
		
		
	if (shieldUpChk == false){
		shieldHealth = 0;
		shieldHealthMax = 0;
	} else if (shieldUpChk == true){
		shieldHealth = playerShieldScript.shieldHealth;
		shieldHealthMax = playerShieldScript.shieldHealthMax;
	}
}