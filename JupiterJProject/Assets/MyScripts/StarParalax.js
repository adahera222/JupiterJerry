#pragma strict

var playerPos:Transform;
var posX:float;
var posZ:float;
var depth:float;
var paralaxMult:float;

function LateUpdate () {
	
	if (playerPos){
		posX = playerPos.transform.position.x;
		posZ = playerPos.transform.position.z;
		transform.position = Vector3(posX * paralaxMult, depth, posZ * paralaxMult);
	}
}