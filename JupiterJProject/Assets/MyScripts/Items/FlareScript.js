#pragma strict

var startY = 0.05;
var endY = 20.0;
var speed:float;
var dimRate:float;
var cameraScript:CameraScript;
function Start () {
	transform.position.y = startY;
	cameraScript = GameObject.Find("Camera").GetComponent(CameraScript);
	AsteroidBehaviour.pickupFlareNum++;
}

function Update () {

	if (transform.position.y != endY)
		transform.Translate(0, (endY - transform.position.y) * speed * Time.deltaTime, 0);
	if (transform.position.y / endY > 0.99)
		transform.position.y = endY;
	if (cameraScript.continueButtonPressChk == true)
		light.intensity -= light.intensity * dimRate * Time.deltaTime;
	if (light.intensity < 0.1)
		Destroy(gameObject);
}