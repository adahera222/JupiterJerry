#pragma strict

var scaleRate:float;
var defaultScale:float;
var clock = 0.0;
var delay = 0.3;

function Start () {

	transform.localScale = Vector3(0.01,0.01,0.01);

}

function FixedUpdate () {

	if (CameraScript.roundNum == 1)
		delay = 0.3;
	else
		delay = 0;
	
	if (clock < delay)
		clock += Time.deltaTime;
		

	if (clock >= delay && transform.localScale.x < (defaultScale - 0.01)){
		transform.localScale.x += (defaultScale - transform.localScale.x) * scaleRate * Time.deltaTime;
		transform.localScale.y += (defaultScale - transform.localScale.y) * scaleRate * Time.deltaTime;
		transform.localScale.z += (defaultScale - transform.localScale.z) * scaleRate * Time.deltaTime;
	}
	if (transform.localScale.x >= (defaultScale - 0.01)){
		transform.localScale = Vector3(defaultScale, defaultScale, defaultScale);
		enabled = false;
	}

}