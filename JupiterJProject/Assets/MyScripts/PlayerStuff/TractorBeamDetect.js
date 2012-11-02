#pragma strict

var playerShip:Transform;
var tractorEffect:Transform;
var tractorScript:TractorBeamEffect;

function Update () {

	if (playerShip){
		transform.position = playerShip.transform.position;
	}
}

function OnTriggerEnter (pickup : Collider){

	if (pickup.tag.Length > 6 && pickup.tag.Substring(0,6) == "Pickup"){
	
		var pickupParent = pickup.transform.parent;
		pickupParent.parent = transform;
		var tractorBeam = Instantiate(tractorEffect, transform.position, Quaternion.identity);
		tractorScript = tractorBeam.GetComponent(TractorBeamEffect);
		tractorScript.pickup = pickupParent.transform;
		
	}

}