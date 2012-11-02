#pragma strict

var rotateSpd:float;


function Start () {

}

function Update () {

	transform.Rotate(Vector3.forward, rotateSpd * Time.deltaTime);

}