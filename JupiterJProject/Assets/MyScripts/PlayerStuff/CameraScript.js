#pragma strict

var target:Transform;
var alienPortal:Transform;
var alienPortalScript:AlienPortal;
var buttonWidth=150.0;
var buttonHeight=50.0;
static var volSliderValue = AudioListener.volume * 100;
var volSliderStyle:GUIStyle;
var volTextStyle:GUIStyle;
var controlBRTex:Texture;
var controlBLTex:Texture;
var controlATex:Texture;
var controlStyle1:GUIStyle;
var cameraBoxTex:Texture;

var restartLoad = "MainLevel";
var restartStyle:GUIStyle;

var guiLevelStyle:GUIStyle;
var initialStyle:GUIStyle;
var initials:String = "---";

var player:GameObject;
var asterPlayer:AsteroidsPlayer;
//var clearLevel:ClearLevel;
var asteroidSpawn:AsteroidSpawn;

var pause = false;
var pauseMenuEnabled = true;
static var pauseSound = false;
var controlScreenEnabled = false;
var orthoDefault:float;
var orthoZoomOut:float;
var orthoZoomSpd:float;
var zoomOut = false;

var starfield:Transform;


// the height we want the camera to be above the target
var height = 5.0;

static var countdown = 5.0;
var clearCountdown = 5.0;
var clearCountdownLabel:String;
var clearCountdownSound:AudioClip;
var clearCountdownVolume:float;
var clearPlayAt = 5.0;

static var roundNum = 1;
var roundTimeGoal:int;
var roundMineralGoalBoost:float;
var nukeCheck = false;
var continueButtonPressChk = false;

static var asteroidsClear = false;

var startMessageEnable = true;
var startMessageTimerStart:float;
var startMessageTimer:float;

var firePulse:FirePulseLaser;
var fireBomb:FireBomb;
var shieldUp:ShieldUp;
var fireMini:FireMiniBomb;
var fireBeam:FireBeamLaser;
var fireAura:FireAura;
var fireWave:FireWave;
var giveRadar:GiveRadar;

var healthCurrent:Texture;
var healthGreen:Texture;
var healthOrange:Texture;
var healthRed:Texture;
var healthShield:Texture;
var fieldCharge:Texture;

function Start(){

	roundNum = 1;
	startMessageTimer = startMessageTimerStart;
	player = GameObject.Find("PlayerShip");
	asterPlayer = player.GetComponent(AsteroidsPlayer);
	alienPortalScript = alienPortal.GetComponent(AlienPortal);
//	clearLevel = player.GetComponent(ClearLevel);
	asteroidSpawn = GameObject.Find("AsteroidSpawn").GetComponent(AsteroidSpawn);
	pauseSound = false;
	
}

function Update(){
	
	
//	if (Resource1Script.resourceNum >= clearLevel.mineralGoal && AsteroidSpawn.asteroidNumber != 0){
//		
//		clearCountdown -= Time.deltaTime;
//		if (clearCountdown < 0)
//			clearCountdown = 0;
//		
//		var clearCountdownSeconds:int = clearCountdown % 60;
//		var clearCountdownFraction:int = (clearCountdown * 100) % 100;
//		
//		clearCountdownLabel = String.Format("{0:0}:{1:00}", clearCountdownSeconds, clearCountdownFraction);
//	}
//	
	AudioListener.volume = volSliderValue / 100.0;


}

function FixedUpdate(){
	
//	if (startMessageTimer > 0)
//		startMessageTimer -= Time.deltaTime;
//	if (startMessageTimer <= 0)
//		startMessageEnable = false;
	
//	if (Resource1Script.resourceNum >= clearLevel.mineralGoal && AsteroidSpawn.asteroidNumber != 0){
//		
//		if (clearCountdown <= clearPlayAt && clearCountdown != 0){
//			AudioSource.PlayClipAtPoint(clearCountdownSound, transform.position, clearCountdownVolume);
//			clearPlayAt--;
//		}
//	} else if (Resource1Script.resourceNum < clearLevel.mineralGoal){
//		clearPlayAt = 5.0;
//		clearCountdown = 5.0;
//	}
	
//	if (clearCountdown <= 0)
//		clearLevel.clearNow = true;
	
	if (AsteroidSpawn.asteroidNumber == 0 && asteroidSpawn.firstRoundStart == true){
	
		asteroidsClear = true;
		
		if (asterPlayer.enabled == true)
			EnableDisablePlayer();
		
		if (continueButtonPressChk == true){
			
				zoomOut = false;
				player.rigidbody.velocity = Vector3.zero;
				player.rigidbody.angularVelocity = Vector3.zero;
				asterPlayer.thrust = 0;
				asterPlayer.latThrust = 0;
				asterPlayer.thrustersPrefabF.particleSystem.enableEmission = false;
				asterPlayer.thrustersPrefabB.particleSystem.enableEmission = false;
				asterPlayer.thrustersPrefabL.particleSystem.enableEmission = false;
				asterPlayer.thrustersPrefabR.particleSystem.enableEmission = false;
				
			if (alienPortalScript.ready == true){
				
				
				alienPortalScript.ready = false;
				alienPortalScript.enabled = false;
				alienPortalScript.beam = true;
				alienPortalScript.clockGo = false;
				alienPortalScript.clock = 0;
				alienPortalScript.message1 = false;
				alienPortalScript.message2 = false;
				roundNum++;
				asteroidSpawn.GenerateAsteroids();
				EnableDisablePlayer();
				asteroidsClear = false;
				//clearLevel.mineralGoal += roundMineralGoalBoost;
				startMessageEnable = true;
				startMessageTimer = startMessageTimerStart;
				//clearLevel.nukeEnabled = true;
				continueButtonPressChk = false;
				asteroidSpawn.destroyAsteroids = false;
				
			}
		}
	}
}



function LateUpdate () {
	
	if (target){
		transform.position = Vector3(target.transform.position.x, (target.transform.position.y + height), target.transform.position.z);
	}	
	
	if (Input.GetButtonDown("Zoom"))
		zoomOut = !zoomOut; 
	
	if (zoomOut == true){
	
		if (camera.orthographicSize != orthoZoomOut){
			camera.orthographicSize += (orthoZoomOut - camera.orthographicSize) * orthoZoomSpd * Time.deltaTime;
			var starScale = camera.orthographicSize / orthoDefault;
			starfield.localScale = Vector3(starScale, starScale, starScale);
			if (orthoZoomOut - camera.orthographicSize < 0.05)
				camera.orthographicSize = orthoZoomOut;
		}
	}
	if (zoomOut == false){
		
		if (camera.orthographicSize != orthoDefault){
			camera.orthographicSize += (orthoDefault - camera.orthographicSize) * orthoZoomSpd * Time.deltaTime;
			starScale = camera.orthographicSize / orthoDefault;
			starfield.localScale = Vector3(starScale, starScale, starScale);
			if (orthoDefault - camera.orthographicSize > -0.05)
				camera.orthographicSize = orthoDefault;
		}
		//starfield.localScale = Vector3.one;
		//camera.orthographicSize = orthoDefault;
	
	}
	if (Input.GetKeyDown("escape") && RestartCheck.enableRestart == false){
		audio.Play();
		pause = !pause;
		EnableDisablePlayer();
	}
	if (pause == true)
		pauseSound = true;
	else
		pauseSound = false;
	
}

function OnGUI(){

//	if (startMessageEnable == true && RestartCheck.enableRestart == false)
//		GUI.Label(Rect(Screen.width / 2 - 400, Screen.height / 2 - 175, 800, 50), "Gather " + GameObject.Find("PlayerShip").GetComponent(ClearLevel).mineralGoal + " minerals to arm Super Rock-Smasher 9000", restartStyle);

//	GUI.Label(Rect(Screen.width / 2 - 200, 0, 400, 50), "Round: " + roundNum + "        Asteroid Threat Level: " + asteroidSpawn.asteroidThreatLev, guiLevelStyle);
	
//	if (Resource1Script.resourceNum >= clearLevel.mineralGoal && AsteroidSpawn.asteroidNumber != 0 && RestartCheck.enableRestart == false)
//		GUI.Label(Rect(Screen.width / 2 - 200, Screen.height / 2 - 250, 400, 100), "Super Rock-Smasher 9000 Armed!\n\nActivating in: " + clearCountdownLabel, restartStyle);
	
	if (pause == true){
		
		if (pauseMenuEnabled == true){
			GUI.Label(Rect(Screen.width / 2 - 350, Screen.height * 0.2 - 25, 700, 200), "Game Paused", restartStyle);
			
			GUI.Label(Rect(830, 220, 70, 40), "Volume", volTextStyle);
			GUI.Box(Rect(855, 260, 20, 120), GUIContent.none, volSliderStyle);
			volSliderValue = GUI.VerticalSlider(Rect(860, 270, 20, 100), volSliderValue, 100.0, 0.0);
		
			if (GUI.Button(Rect(Screen.width / 2 - buttonWidth / 2, Screen.height * 0.68 - 10 - (buttonHeight * 0.75), buttonWidth, buttonHeight * 0.75), "Return to Game")){
				audio.Play();
				pause = false;
				EnableDisablePlayer();
			}
			if (GUI.Button(Rect(Screen.width / 2 - buttonWidth / 2, Screen.height * 0.68 + (buttonHeight * 0.75), buttonWidth, buttonHeight * 0.75), "Restart")){
				audio.Play();
				pause = false;
				Application.LoadLevel(restartLoad);
			}
			if (GUI.Button(Rect(Screen.width / 2 - buttonWidth / 2, Screen.height * 0.68 + 10 + 2 * (buttonHeight * 0.75), buttonWidth, buttonHeight * 0.75), "Control Setup")){
				audio.Play();
				controlScreenEnabled = true;
				pauseMenuEnabled = false;
			}
			if (GUI.Button(Rect(Screen.width / 2 - buttonWidth / 2, Screen.height * 0.68 + 20 + 3 * (buttonHeight * 0.75), buttonWidth, buttonHeight * 0.75), "Return to Menu")){
				audio.Play();
				pause = false;
				Application.LoadLevel("MainMenu");
			}
		}
			
		if (controlScreenEnabled == true){
		
		//Draw control screen textures
			if (Menu.basicControlsR == true)
				GUI.DrawTexture(Rect(0, 0, 960, 600), controlBRTex, ScaleMode.ScaleToFit, true, 0);
			if (Menu.basicControlsL == true)
				GUI.DrawTexture(Rect(0, 0, 960, 600), controlBLTex, ScaleMode.ScaleToFit, true, 0);
			if (Menu.advancedControls == true)
				GUI.DrawTexture(Rect(0, 0, 960, 600), controlATex, ScaleMode.ScaleToFit, true, 0);
	
			if (Menu.basicControlsR == true){
				GUI.Label(Rect(720, 306, buttonWidth + 40, buttonHeight), "Right Handed Controls\nActive", controlStyle1);	
			} else {
				if (GUI.Button(Rect(740, 306, buttonWidth, buttonHeight), "Classic Controls:\nRight Handed")){
					audio.Play();
					Menu.basicControlsR = true;
					Menu.basicControlsL = false;
					Menu.advancedControls = false;
				}
			}
		
			if (Menu.basicControlsL == true){
				GUI.Label(Rect(720, 376, buttonWidth + 40, buttonHeight), "Left Handed Controls\nActive", controlStyle1);	
			} else {
				if (GUI.Button(Rect(740, 376, buttonWidth, buttonHeight), "Classic Controls:\nLeft Handed")){
					audio.Play();
					Menu.basicControlsR = false;
					Menu.basicControlsL = true;
					Menu.advancedControls = false;
				}
			}
			
			if (Menu.advancedControls == true){
				GUI.Label(Rect(720, 446, buttonWidth + 40, buttonHeight), "Mouse Controls\nActive", controlStyle1);	
			} else {
				if (GUI.Button(Rect(740, 446, buttonWidth, buttonHeight), "Mouse Controls")){
					audio.Play();
					Menu.basicControlsR = false;
					Menu.basicControlsL = false;
					Menu.advancedControls = true;
				}
			}
		
		
		
			if (GUI.Button(Rect(740, 516, buttonWidth, buttonHeight), "Back")){
				audio.Play();
				pauseMenuEnabled = true;
				controlScreenEnabled = false;
			}
		}
		Time.timeScale = 0;
	} else {
		Time.timeScale = 1;
	}

	if (RestartCheck.enableRestart == true){
	
		if (RestartCheck.crash == true)
			var restartMessage:String = "Game Over";
	
		if (RestartCheck.crash == false){
			EnableDisablePlayer();
			
			
			
			restartMessage = "Round " + roundNum + " clear!\n\n\nReady for another round?";
			
			if (asteroidsClear == true){
				if ((GUI.Button(Rect(Screen.width / 2 - buttonWidth / 2, Screen.height * 0.75 - buttonHeight, buttonWidth, buttonHeight), "Continue") || Input.GetKeyUp(KeyCode.Return))){
					
					audio.Play();
					player.rigidbody.velocity = Vector3.zero;
					player.rigidbody.angularVelocity = Vector3.zero;
					if (roundNum == roundTimeGoal)
						SaveScores();
					//Old restart starter:   AsteroidSpawn.asteroidNumber = 0;
					continueButtonPressChk = true;
				
					RestartCheck.enableRestart = false;
				}
			}
		}
	
/////////////////////////////////////	Restart Label	//////////////////////////////////////////////
	
		GUI.Label(Rect(Screen.width / 2 - 350, Screen.height * 0.2 - 30, 700, 210), restartMessage, restartStyle);
		
///////////////////////////////////// 	Input Initials	//////////////////////////////////////////////
		
		if ((RestartCheck.crash == true && Menu.aScoresN[9] < ScoreKeeper.score) && Application.loadedLevelName == "MainLevel"){
			GUI.SetNextControlName("InputInitials");
			initials = GUI.TextField(Rect(Screen.width / 2 - 100, Screen.height / 2 - 70, 200,40), initials.ToUpper(), 3, initialStyle);
			GUI.FocusControl("InputInitials");
		} else if ((RestartCheck.crash == true && Menu.aDScoresN[9] < ScoreKeeper.score) && Application.loadedLevelName == "DarkLevel"){
			GUI.SetNextControlName("InputInitials");
			initials = GUI.TextField(Rect(Screen.width / 2 - 100, Screen.height / 2 - 70, 200,40), initials.ToUpper(), 3, initialStyle);
			GUI.FocusControl("InputInitials");
		}
		
	
////////////////////////////////////	End-game menu buttons	/////////////////////////////////////
	
		if (GUI.Button(Rect(Screen.width / 2 - buttonWidth / 2, Screen.height * 0.75 + buttonHeight / 2, buttonWidth, buttonHeight), "Return to Menu")){
			audio.Play();
			SaveScores();
			Application.LoadLevel("MainMenu");
		}
		if (RestartCheck.crash == true){
			if (GUI.Button(Rect(Screen.width / 2 - buttonWidth / 2, Screen.height * 0.75 - buttonHeight, buttonWidth, buttonHeight), "Restart")){
				audio.Play();
				SaveScores();
				Application.LoadLevel(restartLoad);
			}
		}
	}
	
	if (continueButtonPressChk == true){

		alienPortalScript.enabled = true;
//////////////////    Old between round countdown     ////////////////	
//		countdown -= Time.deltaTime;
//		if (countdown < 0)
//			countdown = 0;
		
//		var countdownSeconds:int = countdown % 60;
//		var countdownFraction:int = (countdown * 100) % 100;
		
//		var nextLevelCountdownLabel = "Respawning Asteroids in: " + String.Format("{0:0}:{1:00}", countdownSeconds, countdownFraction);
		
//		GUI.Label(Rect(Screen.width /2 - 200, Screen.height / 2, 400, 200), nextLevelCountdownLabel, restartStyle);
	}
	var healthWidth = (asterPlayer.playerHealth / asterPlayer.playerHealthMax) * 150;
	var shieldWidth = (shieldUp.shieldHealth / shieldUp.shieldHealthMax) * 151;
	var fieldWidth = (fireAura.charge / fireAura.chargeMax) * 76;
	if (asterPlayer.playerHealth / asterPlayer.playerHealthMax >= 0.66)
		healthCurrent = healthGreen;
	else if (asterPlayer.playerHealth / asterPlayer.playerHealthMax >= 0.33)
		healthCurrent = healthOrange;
	else
		healthCurrent = healthRed;
	
	GUI.BeginGroup(Rect(40, 538, healthWidth, 31));
		GUI.DrawTexture(Rect(0, 0, 150, 31), healthCurrent);
			GUI.EndGroup();
	
	GUI.BeginGroup(Rect(213, 538, shieldWidth, 29));
		GUI.DrawTexture(Rect(0, 0, 151, 29), healthShield);
			GUI.EndGroup();
	
	if (AsteroidsPlayer.currentWeapon == "Aura"){
		GUI.BeginGroup(Rect(681, 541, fieldWidth, 26));
			GUI.DrawTexture(Rect(0, 0, 76, 26), fieldCharge);
				GUI.EndGroup();
	}
	
	GUI.DrawTexture(Rect(Screen.width / 2 - 50, Screen.height / 2 - 36, 100, 72), cameraBoxTex, ScaleMode.ScaleToFit, true, 0);
}

function SaveScores(){

	if (Application.loadedLevelName == "MainLevel"){
		if (RestartCheck.crash == true)
			Menu.RankKillScore(initials, ScoreKeeper.score, "original");
	} else if (Application.loadedLevelName == "DarkLevel"){
		if (RestartCheck.crash == true)
			Menu.RankKillScore(initials, ScoreKeeper.score, "dark");
	}

}

function EnableDisablePlayer(){
	
	asterPlayer.enabled = !asterPlayer.enabled;
	firePulse.enabled = !firePulse.enabled;
	fireBomb.enabled = !fireBomb.enabled;
	fireMini.enabled = !fireMini.enabled;
	shieldUp.enabled = !shieldUp.enabled;
	//player.GetComponent(ClearLevel).enabled = !player.GetComponent(ClearLevel).enabled;
	fireBeam.enabled = !fireBeam.enabled;
	fireAura.enabled = !fireAura.enabled;
	fireWave.enabled = !fireWave.enabled;
	if (Application.loadedLevelName == "DarkLevel")
		giveRadar.enabled = !giveRadar.enabled;
	
}