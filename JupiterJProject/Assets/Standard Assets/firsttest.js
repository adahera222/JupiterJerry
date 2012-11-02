#pragma strict

function Start () {

}
var speed = 10;
function Update () {
	transform.Rotate(0,speed*Time.deltaTime, 0);

}