#pragma strict

var beyondX:float;
var beyondZ:float;

function Update(){

	if (transform.position.x > beyondX ||
		transform.position.x < -beyondX ||
		transform.position.z > beyondZ ||
		transform.position.z < -beyondZ)
			Destroy(gameObject);
}