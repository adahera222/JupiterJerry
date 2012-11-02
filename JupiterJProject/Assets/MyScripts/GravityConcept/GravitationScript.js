#pragma strict

var playerMass:float;
var player:GameObject;

function OnTriggerStay (body:Collider){

	var bodyPhysics:PhysicsProperties;
	bodyPhysics = body.GetComponent(PhysicsProperties);
	var bodyTag = body.tag;
	var heading = body.transform.position - player.transform.position;
	player.rigidbody.AddForce (heading * ((playerMass * bodyPhysics.mass)/heading.sqrMagnitude));
	

}