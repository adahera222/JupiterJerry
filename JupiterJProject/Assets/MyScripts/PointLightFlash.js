#pragma strict

var lifeTime:float;
var dimSpeed:float;

function Start () {

	Destroy(gameObject, lifeTime);

}

function Update () {

	light.intensity -= dimSpeed * Time.deltaTime;

}