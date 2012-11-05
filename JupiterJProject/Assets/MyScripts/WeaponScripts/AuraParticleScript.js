#pragma strict

var player:Transform;
var fireAura:FireAura;

function Start () {
	player = GameObject.Find("PlayerShip").transform;
	fireAura = player.GetComponent(FireAura);
}

function Update () {
	if (player)
		transform.position = player.position;
	if (!Input.GetButton("Fire1") || fireAura.charge == 0)
		particleSystem.enableEmission = false;
}