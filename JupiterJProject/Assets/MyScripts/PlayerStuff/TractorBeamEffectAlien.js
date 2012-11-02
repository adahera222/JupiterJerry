#pragma strict

var player:Transform;
var alienTractor:Transform;
var lineEffect:LineRenderer;
var alienPortal:AlienPortal;

function Start () {
	
	player = GameObject.Find("PlayerShip").transform;
	lineEffect = GetComponent(LineRenderer);
	alienPortal = GameObject.Find("PaperClipPortal").GetComponent(AlienPortal);

}

function Update () {

	if (player){
		lineEffect.SetPosition(0, alienTractor.transform.position);
		lineEffect.SetPosition(1, Vector3(player.transform.position.x, 2, player.transform.position.z));
		if (alienPortal.enabled == false)
			Destroy(gameObject);
	} else {
		Destroy(gameObject);
	}

}