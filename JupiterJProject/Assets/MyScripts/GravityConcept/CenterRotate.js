#pragma strict

var rotateSpd:float;
var followTarget:GameObject;

function Start () {

}

function Update () {

	if (followTarget)
		transform.position = followTarget.transform.position;

	transform.Rotate(Vector3.up * rotateSpd * Time.deltaTime);

}