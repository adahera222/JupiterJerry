#pragma strict

var displayColon = true;
var displayColonSwitch = 0;

function OnGUI(){

	var minutes:int = Time.time / 60;
	var seconds:int = Time.time % 60;
	
	if (seconds == displayColonSwitch){
		displayColon = !displayColon;
		displayColonSwitch += 2;
	}
		
	if (displayColon == false)
		guiText.text = String.Format("{0:00} {1:00}", minutes, seconds);
	else
		guiText.text = String.Format("{0:00}:{1:00}", minutes, seconds);
}