#pragma strict

var tractorBeam:Transform;
var tractorSpd:float;

function Start() {

}

function Update () {

	transform.Translate((transform.localPosition.x * tractorSpd * Time.deltaTime * -1),0,(transform.localPosition.z * tractorSpd * Time.deltaTime * -1), tractorBeam.transform);
	
}