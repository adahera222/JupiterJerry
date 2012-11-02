#pragma strict

var player:GameObject;
var target:Transform;
var pause = false;
var restartLoad = "GravityConceptTest";
var restartStyle:GUIStyle;
var buttonWidth = 100;
var buttonHeight = 50;
var camHeight:float;
var defaultZoom:float;
var zoomOut:float;

function Start () {


}

function Update () {

}

function OnGUI(){

	if (pause == true){
		GUI.Label(Rect(Screen.width / 2 - 350, Screen.height * 0.2 - 25, 700, 200), "Game Paused", restartStyle);
		
		if (GUI.Button(Rect(Screen.width / 2 - buttonWidth / 2, Screen.height * 0.75 - buttonHeight, buttonWidth, buttonHeight), "Restart")){
			pause = false;
			Application.LoadLevel(restartLoad);
		}
		Time.timeScale = 0;
	} else {
		Time.timeScale = 1;
	}
	
	var restartMessage:String = "Congratulations! You've crashed!!!! Unfortunately that means you lose. :' (";
		
	if (RestartCheck.enableRestart == true){
	
		GUI.Label(Rect(Screen.width / 2 - 350, Screen.height * 0.2 - 25, 700, 200), restartMessage, restartStyle);

		
		if (GUI.Button(Rect(Screen.width / 2 - buttonWidth / 2, Screen.height * 0.75 - buttonHeight, buttonWidth, buttonHeight), "Restart")){
			
				Application.LoadLevel(restartLoad);
		}
	
	}
}

function LateUpdate () {
	
	if (target){
		transform.position = Vector3(target.transform.position.x, camHeight, target.transform.position.z);
	}	
	
	if (Input.GetKey("f")){
	
		camera.orthographicSize = zoomOut;
	}
	if (Input.GetKeyUp("f")){
	
		camera.orthographicSize = defaultZoom;
	
	}
	if (Input.GetKeyDown("escape") && RestartCheck.enableRestart == false){
		pause = !pause;
		EnableDisablePlayer();
	}
	
}

function EnableDisablePlayer(){
	
	player.GetComponent(AsteroidsPlayer).enabled = !player.GetComponent(AsteroidsPlayer).enabled;
	player.GetComponent(FirePulseLaser).enabled = !player.GetComponent(FirePulseLaser).enabled;
	
	
}