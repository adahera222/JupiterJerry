#pragma strict

var minPitch:float;
var maxPitch:float;
var n:float;

function Start () {

	n = Random.Range(minPitch, maxPitch);

}

function Update () {

	audio.pitch = n;

}