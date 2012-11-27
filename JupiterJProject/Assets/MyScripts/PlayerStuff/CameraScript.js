#pragma strict

var target:Transform;
var alienPortal:Transform;
var alienPortalScript:AlienPortal;
var buttonWidth=150.0;
var buttonHeight=50.0;
static var volSliderValue = AudioListener.volume * 100;
var volSliderStyle:GUIStyle;
var volTextStyle:GUIStyle;
var controlRightTex:Texture;
var controlLeftTex:Texture;
var controlMouseTex:Texture;
var controlRightButton:GUIStyle;
var controlLeftButton:GUIStyle;
var controlMouseButton:GUIStyle;

var gameInfoButton:GUIStyle;
var startNormalTex:Texture;
var startPracticeTex:Texture;
var startDarkTex:Texture;
var itemInfoWeaponTex:Texture;
var itemInfoPowerTex:Texture;
var itemInfoScreen = "weapon";
var itemLeftButton:GUIStyle;
var itemRightButton:GUIStyle;

var restartButton:GUIStyle;
var leftArrowButton:GUIStyle;
var rightArrowButton:GUIStyle;
var startRoundLabelStyle:GUIStyle;
var startRoundDimStyle:GUIStyle;
var startRoundStyle:GUIStyle;
var yellowBoxTex:Texture;

var returnToGameButton:GUIStyle;
var returnToMenuButton:GUIStyle;
var controlButton:GUIStyle;
var itemInfoButton:GUIStyle;
var continueButton:GUIStyle;

var backButtonStyle:GUIStyle;
var cameraBoxTex:Texture;

var restartStyle:GUIStyle;
var gameOverTex:Texture;
var roundClearStyle:GUIStyle;

var initialStyle:GUIStyle;
var initials:String = "---";

var player:GameObject;
var asterPlayer:AsteroidsPlayer;
var asteroidSpawn:AsteroidSpawn;

var pause = false;
static var pauseSound = false;
var currentScreen = "main";
var currentInfoScreen = "main";
var orthoDefault:float;
var orthoZoomOut:float;
var orthoZoomSpd:float;
var zoomOut = false;

var starfield:Transform;


// the height we want the camera to be above the target
var height = 5.0;

static var roundNum = 1;
var continueButtonPressChk = false;

static var asteroidsClear = false;

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
var healthShieldOff:Texture;
var fieldCharge:Texture;
var fieldChargeOff:Texture;

function Start(){

	if (Application.loadedLevelName == "MainLevel")
		roundNum = Menu.startRoundNormal;
	else if (Application.loadedLevelName == "DarkLevel")
		roundNum = Menu.startRoundDark;
	player = GameObject.Find("PlayerShip");
	asterPlayer = player.GetComponent(AsteroidsPlayer);
	alienPortalScript = alienPortal.GetComponent(AlienPortal);
	asteroidSpawn = GameObject.Find("AsteroidSpawn").GetComponent(AsteroidSpawn);
	pauseSound = false;
	
}

function Update(){

	AudioListener.volume = volSliderValue / 100.0;
	
	if (Application.loadedLevelName == "MainLevel" && roundNum > Menu.startRoundNormalMax && roundNum < 5)
		Menu.startRoundNormalMax = roundNum;
	if (Application.loadedLevelName == "DarkLevel" && roundNum > Menu.startRoundDarkMax && roundNum < 5)
		Menu.startRoundDarkMax = roundNum;
	
}

function FixedUpdate(){
	

	
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
	
	if (pause == true){
		
		
															// Pause Screen: Main
															
		if (currentScreen == "main"){
			GUI.Label(Rect(Screen.width / 2 - 163, Screen.height * 0.07, 326, 68), "Game Paused", restartStyle);
			
			GUI.Label(Rect(830, 220, 70, 40), "Volume", volTextStyle);
			GUI.Box(Rect(855, 260, 20, 120), GUIContent.none, volSliderStyle);
			volSliderValue = GUI.VerticalSlider(Rect(860, 270, 20, 100), volSliderValue, 100.0, 0.0);
		
			if (GUI.Button(Rect(Screen.width / 2 - buttonWidth / 2, Screen.height * 0.2, buttonWidth, buttonHeight), "", returnToGameButton)){
				audio.Play();
				pause = false;
				EnableDisablePlayer();
			}
			if (GUI.Button(Rect(Screen.width / 2 - buttonWidth / 2, Screen.height * 0.2 + 130, buttonWidth, buttonHeight), "", restartButton)){
				GetComponent(ReturnOrRestart).returnOrRestart = "restart";
				GetComponent(ReturnOrRestart).enabled = true;
			}
			if (GUI.Button(Rect(Screen.width / 2 - buttonWidth / 2, Screen.height * 0.2 + 220, buttonWidth, buttonHeight), "", gameInfoButton)){
				audio.Play();
				currentScreen = "gameInfo";
			}
			if (GUI.Button(Rect(Screen.width / 2 - buttonWidth / 2, Screen.height * 0.2 + 310, buttonWidth, buttonHeight), "", returnToMenuButton)){
				GetComponent(ReturnOrRestart).returnOrRestart = "return";
				GetComponent(ReturnOrRestart).enabled = true;
			}
		}
		
															// Pause Screen: GameInfo
		if (currentScreen == "gameInfo"){
			
			if (currentInfoScreen == "main"){
				if (Application.loadedLevelName == "MainLevel")
					GUI.DrawTexture(Rect(274, 71, 478, 468), startNormalTex, ScaleMode.ScaleToFit, true, 0);
				if (Application.loadedLevelName == "PracticeLevel")
					GUI.DrawTexture(Rect(274, 71, 478, 468), startPracticeTex, ScaleMode.ScaleToFit, true, 0);
				if (Application.loadedLevelName == "DarkLevel")
					GUI.DrawTexture(Rect(274, 71, 478, 468), startDarkTex, ScaleMode.ScaleToFit, true, 0);
				
				if (GUI.Button(Rect(60, 75, buttonWidth, buttonHeight), "", controlButton)){
					audio.Play();
					currentInfoScreen = "controls";
				}
				if (GUI.Button(Rect(60, 175, buttonWidth, buttonHeight), "", itemInfoButton)){
					audio.Play();
					currentInfoScreen = "itemInfo";
				}
				if (GUI.Button(Rect(70, 390, buttonWidth, buttonHeight), "", backButtonStyle)){
					audio.Play();
					currentScreen = "main";
				}
			}
															// Pause Screen: Controls
			if (currentInfoScreen == "controls"){
	
		//Draw control screen textures
				if (Menu.currentControls == "keyRight")
					GUI.DrawTexture(Rect(84, 62, 425, 462), controlRightTex, ScaleMode.ScaleToFit, true, 0);
				if (Menu.currentControls == "keyLeft")
					GUI.DrawTexture(Rect(84, 62, 425, 462), controlLeftTex, ScaleMode.ScaleToFit, true, 0);
				if (Menu.currentControls == "mouse")
					GUI.DrawTexture(Rect(84, 62, 425, 462), controlMouseTex, ScaleMode.ScaleToFit, true, 0);
			
		//Control selection buttons	
				if (GUI.Button(Rect(580, 115, buttonWidth, buttonHeight), "", controlMouseButton)){
					audio.Play();
					Menu.currentControls = "mouse";
				}
			
				if (GUI.Button(Rect(580, 215, buttonWidth, buttonHeight), "", controlRightButton)){
					audio.Play();
					Menu.currentControls = "keyRight";
				}
				
				if (GUI.Button(Rect(580, 315, buttonWidth, buttonHeight), "", controlLeftButton)){
					audio.Play();
					Menu.currentControls = "keyLeft";
				}
		
		
			
				if (GUI.Button(Rect(600, 425, buttonWidth, buttonHeight), "", backButtonStyle)){
					audio.Play();
					currentInfoScreen = "main";
				}
		
			}
															// Pause Screen: Item Info
			if (currentInfoScreen == "itemInfo"){
				if (itemInfoScreen == "weapon"){
					GUI.DrawTexture(Rect(0,0,800,600), itemInfoWeaponTex, ScaleMode.ScaleToFit, true, 0);
					if (GUI.Button(Rect(516, 43, 49, 49), "", itemRightButton)){
						audio.Play();
						itemInfoScreen = "powerups";
					}
				}
				if (itemInfoScreen == "powerups"){
					GUI.DrawTexture(Rect(0,0,800,600), itemInfoPowerTex, ScaleMode.ScaleToFit, true, 0);
					if (GUI.Button(Rect(248, 43, 49, 49), "", itemLeftButton)){
						audio.Play();
						itemInfoScreen = "weapon";
					}
				}
				if (GUI.Button(Rect(330, 475, buttonWidth, buttonHeight), "", backButtonStyle)){
					audio.Play();
					currentInfoScreen = "main";
				}
			}
		}
		Time.timeScale = 0;
	} else {
		Time.timeScale = 1;
	}

	if (RestartCheck.enableRestart == true){
	
		if (RestartCheck.crash == false){
			EnableDisablePlayer();
			
			GUI.Label(Rect(Screen.width / 2 - 163, Screen.height * 0.2 - 30, 326, 68), "Round " + roundNum + " clear!", roundClearStyle);
			GUI.Label(Rect(Screen.width / 2 - 350, Screen.height * 0.2, 700, 210), "Ready for another round?", restartStyle);
			
			if (asteroidsClear == true){
				if ((GUI.Button(Rect(Screen.width / 2 - buttonWidth / 2, Screen.height * 0.57, buttonWidth, buttonHeight), "", continueButton) || Input.GetKeyUp(KeyCode.Return))){
					
					audio.Play();
					player.rigidbody.velocity = Vector3.zero;
					player.rigidbody.angularVelocity = Vector3.zero;
					continueButtonPressChk = true;
				
					RestartCheck.enableRestart = false;
				}
				if (GUI.Button(Rect(Screen.width / 2 - buttonWidth / 2, Screen.height * 0.57 + 90, buttonWidth, buttonHeight), "", returnToMenuButton)){
					GetComponent(ReturnOrRestart).returnOrRestart = "return";
					GetComponent(ReturnOrRestart).enabled = true;
				}
			}
		}
		
		
///////////////////////////////////// 	Input Initials	//////////////////////////////////////////////
		
		if ((RestartCheck.crash == true && Menu.aScoresN[9] < ScoreKeeper.score) && Application.loadedLevelName == "MainLevel"){
		
			GUI.DrawTexture(Rect(237, 100, 326, 67), gameOverTex, ScaleMode.ScaleToFit);
			GUI.Label(Rect(Screen.width / 2 - 350, Screen.height * 0.2, 700, 210), "You earned a new high score!", restartStyle);
			GUI.Label(Rect(Screen.width / 2 - 250, 270, 300, 60), "Input Initials:", restartStyle);
			GUI.SetNextControlName("InputInitials");
			initials = GUI.TextField(Rect(Screen.width / 2 + 20, 270, 120,60), initials.ToUpper(), 3, initialStyle);
			GUI.FocusControl("InputInitials");
			
		} else if ((RestartCheck.crash == true && Menu.aDScoresN[9] < ScoreKeeper.score) && Application.loadedLevelName == "DarkLevel"){
		
			GUI.DrawTexture(Rect(237, 100, 326, 67), gameOverTex, ScaleMode.ScaleToFit);
			GUI.Label(Rect(Screen.width / 2 - 350, Screen.height * 0.2, 700, 210), "You earned a new high score!", restartStyle);
			GUI.Label(Rect(Screen.width / 2 - 250, 270, 300, 60), "Input Initials:", restartStyle);
			initials = GUI.TextField(Rect(Screen.width / 2 + 20, 270, 120,60), initials.ToUpper(), 3, initialStyle);
			GUI.FocusControl("InputInitials");
			
		} else if (RestartCheck.crash == true)
			GUI.DrawTexture(Rect(237, 170, 326, 67), gameOverTex, ScaleMode.ScaleToFit);
		
	
////////////////////////////////////	End-game menu buttons	/////////////////////////////////////
	
		
		if (RestartCheck.crash == true){
			if (Application.loadedLevelName == "MainLevel"){
				GUI.DrawTexture(Rect(443 + (49 * Menu.startRoundNormal), 31, 49, 49), yellowBoxTex, ScaleMode.ScaleToFit);
				GUI.Label(Rect(295, 31, 148, 49), "Starting Round:", startRoundLabelStyle);
				if (GUI.Button(Rect(443, 31, 49, 49), "", leftArrowButton)){
					audio.Play();
					if (Menu.startRoundNormal > 1)
						Menu.startRoundNormal--;
				}
				GUI.Label(Rect(492, 31, 49, 49), "1", startRoundStyle);
				
				if (Menu.startRoundNormalMax > 1)
					GUI.Label(Rect(541, 31, 49, 49), "2", startRoundStyle);
				else
					GUI.Label(Rect(541, 31, 49, 49), "2", startRoundDimStyle);
				if (Menu.startRoundNormalMax > 2)
					GUI.Label(Rect(590, 31, 49, 49), "3", startRoundStyle);
				else
					GUI.Label(Rect(590, 31, 49, 49), "3", startRoundDimStyle);
				if (Menu.startRoundNormalMax > 3)
					GUI.Label(Rect(639, 31, 49, 49), "4", startRoundStyle);
				else
					GUI.Label(Rect(639, 31, 49, 49), "4", startRoundDimStyle);
				
				if (GUI.Button(Rect(688, 31, 49, 49), "", rightArrowButton)){
					audio.Play();
					if (Menu.startRoundNormal < Menu.startRoundNormalMax)
						Menu.startRoundNormal++;
				}
			}
			if (Application.loadedLevelName == "DarkLevel"){
				GUI.DrawTexture(Rect(443 + (49 * Menu.startRoundDark), 31, 49, 49), yellowBoxTex, ScaleMode.ScaleToFit);
				GUI.Label(Rect(295, 31, 148, 49), "Starting Round:", startRoundLabelStyle);
				if (GUI.Button(Rect(443, 31, 49, 49), "", leftArrowButton)){
					audio.Play();
					if (Menu.startRoundDark > 1)
						Menu.startRoundDark--;
				}
				GUI.Label(Rect(492, 31, 49, 49), "1", startRoundStyle);
			
			
			
				if (Menu.startRoundDarkMax > 1)
					GUI.Label(Rect(541, 31, 49, 49), "2", startRoundStyle);
				else
					GUI.Label(Rect(541, 31, 49, 49), "2", startRoundDimStyle);
				
				if (Menu.startRoundDarkMax > 2)
					GUI.Label(Rect(590, 31, 49, 49), "3", startRoundStyle);
				else
					GUI.Label(Rect(590, 31, 49, 49), "3", startRoundDimStyle);
					
				if (Menu.startRoundDarkMax > 3)
					GUI.Label(Rect(639, 31, 49, 49), "4", startRoundStyle);
				else
					GUI.Label(Rect(639, 31, 49, 49), "4", startRoundDimStyle);
			
			
			
				if (GUI.Button(Rect(688, 31, 49, 49), "", rightArrowButton)){
					audio.Play();
					if (Menu.startRoundDark < Menu.startRoundDarkMax)
						Menu.startRoundDark++;
				}
			}
			if (GUI.Button(Rect(Screen.width / 2 - buttonWidth / 2, Screen.height * 0.57, buttonWidth, buttonHeight), "", restartButton)){
				SaveScores();
				GetComponent(ReturnOrRestart).returnOrRestart = "restart";
				GetComponent(ReturnOrRestart).enabled = true;
			}
			if (GUI.Button(Rect(Screen.width / 2 - buttonWidth / 2, Screen.height * 0.57 + 90, buttonWidth, buttonHeight), "", returnToMenuButton)){
				SaveScores();
				GetComponent(ReturnOrRestart).returnOrRestart = "return";
				GetComponent(ReturnOrRestart).enabled = true;
			}
		}
	}
	
	if (continueButtonPressChk == true){

		alienPortalScript.enabled = true;
		
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
	
	if (!(pause == true && currentScreen == "gameInfo" && currentInfoScreen == "itemInfo")){
		GUI.BeginGroup(Rect(40, 536, healthWidth, 31));
			GUI.DrawTexture(Rect(0, 0, 150, 31), healthCurrent);
				GUI.EndGroup();
		if (shieldUp.shieldUpChk == true){
			GUI.BeginGroup(Rect(213, 538, shieldWidth, 29));
				GUI.DrawTexture(Rect(0, 0, 151, 29), healthShield);
					GUI.EndGroup();
		} else
			GUI.DrawTexture(Rect(213, 538, 151, 29), healthShieldOff);
		
		if (AsteroidsPlayer.currentWeapon == "Aura"){
			GUI.BeginGroup(Rect(681, 541, fieldWidth, 26));
				GUI.DrawTexture(Rect(0, 0, 76, 26), fieldCharge);
					GUI.EndGroup();
		} else
			GUI.DrawTexture(Rect(681, 541, 76, 26), fieldChargeOff);
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
	fireBeam.enabled = !fireBeam.enabled;
	fireAura.enabled = !fireAura.enabled;
	fireWave.enabled = !fireWave.enabled;
	if (Application.loadedLevelName == "DarkLevel")
		giveRadar.enabled = !giveRadar.enabled;
	
}