#pragma strict

var lifeTime:float;
var moveInterval:float;
var alphaInterval:float;

function Start () {

	Destroy(gameObject, lifeTime);

}

function Update () {

	transform.position.y += moveInterval * Time.deltaTime;
	guiText.material.color.a -= alphaInterval * Time.deltaTime;

}