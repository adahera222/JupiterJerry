#pragma strict

var scaleSpd:float;
var addScale:float;
var maxScale:float;

function Update () {

	addScale = (maxScale - transform.localScale.x) * scaleSpd * Time.deltaTime;
	transform.localScale += Vector3(addScale, 0, addScale);

}