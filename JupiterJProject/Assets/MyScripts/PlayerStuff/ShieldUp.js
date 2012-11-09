#pragma strict

var playerShield:Transform;
var playerCol:GameObject;
var shieldUp = false;
var shieldUpChk = false;
var guiShield:GameObject;

var playerShieldScript:PlayerShieldScript;

function Start () {

	
}

function Update () {
	if (shieldUpChk == false && shieldUp == true){
		
		var shield = Instantiate(playerShield, transform.position, Quaternion.identity);
		playerCol.collider.enabled = false;
		shieldUpChk = true;
		playerShieldScript = shield.GetComponent(PlayerShieldScript);
		shieldUp = false;
		
	}
		
		
	if (shieldUpChk == false){
		guiShield.guiText.text = "<< Shield Inactive >>";
		guiShield.transform.position.x = 0.65;
	} else if (shieldUpChk == true){
		guiShield.guiText.text = "Shield Strength: " + Mathf.Round((playerShieldScript.shieldHealth / playerShieldScript.shieldHealthMax) * 100) + " / 100%";
	}
}