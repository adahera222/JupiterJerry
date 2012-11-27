#pragma strict

var auraPrefab:Transform;
var charge:float;
var chargeMax:float;

function Start () {
	charge = chargeMax;
}

function Update () {
	if (AsteroidsPlayer.currentWeapon == "Aura"){
		if (Input.GetButtonDown("Fire1")){
			var aura = Instantiate(auraPrefab, transform.position, Quaternion.identity);
		}
	}
		
	if (!Input.GetButton("Fire1") && charge < chargeMax){
		charge += 2 * Time.deltaTime;
	} else if (charge > chargeMax){
		charge = chargeMax;
	} else if (charge < 0)
		charge = 0.0;
}