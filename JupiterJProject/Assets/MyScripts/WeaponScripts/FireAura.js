#pragma strict

var auraPrefab:Transform;
var auraParticlePrefab:Transform;
var charge:float;
var chargeMax:float;
var guiCharge:GUIText;

function Start () {
	charge = chargeMax;
}

function Update () {
	if (AsteroidsPlayer.currentWeapon == "Aura"){
		if (Input.GetButtonDown("Fire1")){
			var aura = Instantiate(auraPrefab, transform.position, Quaternion.identity);
			var auraPart = Instantiate(auraParticlePrefab, transform.position, Quaternion.identity);
		}
		guiCharge.enabled = true;
		guiCharge.guiText.text = "Field charge: " + ((Mathf.Round(charge * 100)) / 100) + " sec";
	} else
		guiCharge.enabled = false;
		
	if (!Input.GetButton("Fire1") && charge < chargeMax){
		charge += 2 * Time.deltaTime;
	} else if (charge > chargeMax){
		charge = chargeMax;
	} else if (charge < 0)
		charge = 0.0;
}