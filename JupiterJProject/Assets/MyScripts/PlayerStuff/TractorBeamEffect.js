#pragma strict

var pickup:Transform;
var player:Transform;
var lineEffect:LineRenderer;

function Start () {

	player = GameObject.Find("PlayerShip").transform;
	lineEffect = GetComponent(LineRenderer);

}

function Update () {

	if (pickup && player){
		lineEffect.SetPosition(0, player.transform.position);
		lineEffect.SetPosition(1, pickup.transform.position);
	} else {
		Destroy(gameObject);
	}

}