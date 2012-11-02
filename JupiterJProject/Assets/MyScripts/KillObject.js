#pragma strict

var lifeTime = 5.0;

function Awake(){

	Destroy(gameObject, lifeTime);

}