#pragma strict

var followPickup:Transform;

function Start () {

}

function Update () {
	
	if (followPickup){
	var followTransPos = followPickup.transform.position;
		transform.position = Vector3(followTransPos.x + 0.25, followTransPos.y + 1.5, followTransPos.z);
	} else
		Destroy(gameObject);
}