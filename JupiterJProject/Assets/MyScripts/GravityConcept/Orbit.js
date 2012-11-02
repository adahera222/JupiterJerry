#pragma strict

var rotateSpd:float;
var orbitAround:GameObject;

function Start () {

}

function Update () {

	transform.RotateAround(orbitAround.transform.position, Vector3.up, rotateSpd * Time.deltaTime);

}