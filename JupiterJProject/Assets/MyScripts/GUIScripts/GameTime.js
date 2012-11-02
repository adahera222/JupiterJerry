#pragma strict

static var guiTime:float;
var startTime:float;
var inbetweenRoundTime:float;

function Start () {

	startTime = Time.time;
	inbetweenRoundTime = 0;

}

function FixedUpdate(){
	//Debug.Log(inbetweenRoundTime);
	if (RestartCheck.enableRestart == true)
		inbetweenRoundTime += Time.deltaTime;
}

function OnGUI(){

	if (RestartCheck.enableRestart == false){
		guiTime = Time.time - startTime - inbetweenRoundTime;
	}

	var minutes:int = guiTime / 60;
	var seconds:int = guiTime % 60;
	var fraction:int = (guiTime * 100) % 100;
	
	guiText.text = "Elapsed Time: " + String.Format("{0:00}:{1:00}:{2:00}", minutes, seconds, fraction);
}