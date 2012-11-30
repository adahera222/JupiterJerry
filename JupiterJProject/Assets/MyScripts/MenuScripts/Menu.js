#pragma strict

var buttonWidth=150.0;
var buttonHeight=50.0;

var titleLabel:String;
var titleStyle:GUIStyle;

var scoreN1Label:String;
var scoreN2Label:String;
var scoreD1Label:String;
var scoreD2Label:String;
var scoreStyle:GUIStyle;
var scoreNStyle:GUIStyle;
var scoreHeadStyle:GUIStyle;
var controlStyle:GUIStyle;
var startButtonStyle:GUIStyle;
var controlButtonStyle:GUIStyle;
var highScoreButtonStyle:GUIStyle;
var creditsButtonStyle:GUIStyle;
var gameInfoButtonStyle:GUIStyle;

var backButtonStyle:GUIStyle;
var moreCreditsButtonStyle:GUIStyle;
var showMoreCredits = false;
var moreCreditsTexture:Texture;

static var currentControls = "mouse";

var currentScreen = "main";
var scoreRankNumbers = " 1.\n 2.\n 3.\n 4.\n 5.\n 6.\n 7.\n 8.\n 9.\n10.";

static var aScoresN = PlayerPrefsX.GetIntArray ("ScoreBoardN");
static var aScoresI = PlayerPrefsX.GetStringArray ("ScoreBoardI");

static var aDScoresN = PlayerPrefsX.GetIntArray ("DScoreBoardN");
static var aDScoresI = PlayerPrefsX.GetStringArray ("DScoreBoardI");

var controlRightTex:Texture;
var controlLeftTex:Texture;
var controlMouseTex:Texture;
var controlRightButton:GUIStyle;
var controlLeftButton:GUIStyle;
var controlMouseButton:GUIStyle;

var startNormalButton:GUIStyle;
var startPracticeButton:GUIStyle;
var startDarkButton:GUIStyle;
var startLeftButton:GUIStyle;
var startRightButton:GUIStyle;
var startBeginButton:GUIStyle;
var gameModeText:GUIStyle;

	var startTexture:Texture;
	var currentStartTexture = "comic";

	var startComicCurrentFrame = 1;
	var startComic1:Texture;
	var startComic2:Texture;
	var startComic3:Texture;
	var startComic4:Texture;
	var startComic5:Texture;
	
	var startNormalTex:Texture;
	var startPracticeTex:Texture;
	var startDarkTex:Texture;
	
	static var startRoundNormal = 1;
	static var startRoundDark = 1;
	
	static var startRoundNormalMax = 1;
	static var startRoundDarkMax = 1;
	
	var startRoundLabelStyle:GUIStyle;
	var startRoundStyle:GUIStyle;
	var startRoundDimStyle:GUIStyle;
	var yellowBoxTex:Texture;

var genericGUIBackTex:Texture;
var cameraBoxTex:Texture;

var volTextStyle:GUIStyle;
var volSliderStyle:GUIStyle;

var scoreButton:GUIStyle;

function Start () {
	
	if (aScoresN.length != 10){
		aScoresN = Array (0,0,0,0,0,0,0,0,0,0);
	}
	if (aScoresI.length != 10){
		aScoresI = Array ("---", "---", "---", "---", "---", "---", "---", "---", "---", "---");
	
		if (aDScoresN.length != 10)
			aDScoresN = [0,0,0,0,0,0,0,0,0,0];
		
		if (aDScoresI.length != 10)
			aDScoresI = ["---", "---", "---", "---", "---", "---", "---", "---", "---", "---"];
	}
	titleLabel = "Jupiter Jerry's Tour of the Kuiper Belt";
}

function Update(){

	if (Input.GetKey("q") && Input.GetKey("l")){
		aScoresN = Array (0,0,0,0,0,0,0,0,0,0);
		aScoresI = Array ("---", "---", "---", "---", "---", "---", "---", "---", "---", "---");
		PlayerPrefsX.SetIntArray ("ScoreBoardN", aScoresN);
		PlayerPrefsX.SetStringArray ("ScoreBoardI", aScoresI);
		aDScoresN = Array (0,0,0,0,0,0,0,0,0,0);
		aDScoresI = Array ("---", "---", "---", "---", "---", "---", "---", "---", "---", "---");
		PlayerPrefsX.SetIntArray ("DScoreBoardN", aDScoresN);
		PlayerPrefsX.SetStringArray ("DScoreBoardI", aDScoresI);
	}
	if (Time.timeScale != 1)
		Time.timeScale = 1;
	
	AudioListener.volume = CameraScript.volSliderValue / 100.0;


}

function OnGUI () {
	scoreN1Label = aScoresI[0] +
			"  -\n" + aScoresI[1] +
			"  -\n" + aScoresI[2] +
			"  -\n" + aScoresI[3] +
			"  -\n" + aScoresI[4] +
			"  -\n" + aScoresI[5] +
			"  -\n" + aScoresI[6] +
			"  -\n" + aScoresI[7] +
			"  -\n" + aScoresI[8] +
			"  -\n" + aScoresI[9] + "  -";
	
	scoreN2Label = aScoresN[0] +
			"\n" + aScoresN[1] + 
			"\n" + aScoresN[2] +
			"\n" + aScoresN[3] +
			"\n" + aScoresN[4] +
			"\n" + aScoresN[5] +
			"\n" + aScoresN[6] +
			"\n" + aScoresN[7] +
			"\n" + aScoresN[8] +
			"\n" + aScoresN[9];
	
	scoreD1Label =      aDScoresI[0] +
				 "  -\n" + aDScoresI[1] +
				 "  - \n" + aDScoresI[2] +
				 "  - \n" + aDScoresI[3] +
				 "  - \n" + aDScoresI[4] +
				 "  - \n" + aDScoresI[5] +
				 "  - \n" + aDScoresI[6] +
				 "  - \n" + aDScoresI[7] +
				 "  - \n" + aDScoresI[8] +
				 "  - \n" + aDScoresI[9] + "  - ";
	
	scoreD2Label =      aDScoresN[0] + 
				 "\n" + aDScoresN[1] + 
				 "\n" + aDScoresN[2] + 
				 "\n" + aDScoresN[3] + 
				 "\n" + aDScoresN[4] + 
				 "\n" + aDScoresN[5] + 
				 "\n" + aDScoresN[6] + 
				 "\n" + aDScoresN[7] + 
				 "\n" + aDScoresN[8] + 
				 "\n" + aDScoresN[9];

	
	if (currentScreen == "main"){

		//GUI.Label(Rect(720, 370, 70, 40), "Volume", volTextStyle);
		//GUI.Box(Rect(705, 410, 20, 120), GUIContent.none, volSliderStyle);
		//CameraScript.volSliderValue = GUI.VerticalSlider(Rect(750, 420, 20, 100), CameraScript.volSliderValue, 100.0, 0.0);

		if (GUI.Button(Rect(456, 349, buttonWidth, buttonHeight), "", startButtonStyle)){
			audio.Play();
			currentScreen = "start";
			currentStartTexture = "comic";
			startComicCurrentFrame = 1;		
		}
		if (GUI.Button(Rect(609, 349, buttonWidth, buttonHeight), "", controlButtonStyle)){
			audio.Play();
			currentScreen = "controls";
		}
		if (GUI.Button(Rect(456, 431, buttonWidth, buttonHeight), "", highScoreButtonStyle)){
			audio.Play();
			currentScreen = "scores";
		}
		if (GUI.Button(Rect(609, 431, buttonWidth, buttonHeight), "", creditsButtonStyle)){
			audio.Play();
			currentScreen = "credits";
		}
	}
	if (currentScreen == "start"){
		
		if (currentStartTexture == "comic"){			
			
			if (startComicCurrentFrame == 1)
				GUI.DrawTexture(Rect(274, 91, 478, 468), startComic1, ScaleMode.ScaleToFit, true, 0);
			if (startComicCurrentFrame == 2)
				GUI.DrawTexture(Rect(274, 91, 478, 468), startComic2, ScaleMode.ScaleToFit, true, 0);
			if (startComicCurrentFrame == 3)
				GUI.DrawTexture(Rect(274, 91, 478, 468), startComic3, ScaleMode.ScaleToFit, true, 0);
			if (startComicCurrentFrame == 4)
				GUI.DrawTexture(Rect(274, 91, 478, 468), startComic4, ScaleMode.ScaleToFit, true, 0);
			if (startComicCurrentFrame == 5)
				GUI.DrawTexture(Rect(274, 91, 478, 468), startComic5, ScaleMode.ScaleToFit, true, 0);
			
			if (startComicCurrentFrame > 1){
				if (GUI.Button(Rect(287, 310, 49, 49), "", startLeftButton)){
					audio.Play();
					startComicCurrentFrame--;
				}
			}
			if  (startComicCurrentFrame < 5){
				if (GUI.Button(Rect(690, 310, 49, 49), "", startRightButton)){
					audio.Play();
					startComicCurrentFrame++;
				}
			}
		}
		
		if (currentStartTexture == "normal"){
			GUI.DrawTexture(Rect(443 + (49 * startRoundNormal), 31, 49, 49), yellowBoxTex, ScaleMode.ScaleToFit);
			GUI.Label(Rect(295, 31, 148, 49), "Starting Round:", startRoundLabelStyle);
			if (GUI.Button(Rect(443, 31, 49, 49), "", startLeftButton)){
				audio.Play();
				if (startRoundNormal > 1)
					startRoundNormal--;
			}
			GUI.Label(Rect(492, 31, 49, 49), "1", startRoundStyle);
			
			if (startRoundNormalMax > 1)
				GUI.Label(Rect(541, 31, 49, 49), "2", startRoundStyle);
			else
				GUI.Label(Rect(541, 31, 49, 49), "2", startRoundDimStyle);
			if (startRoundNormalMax > 2)
				GUI.Label(Rect(590, 31, 49, 49), "3", startRoundStyle);
			else
				GUI.Label(Rect(590, 31, 49, 49), "3", startRoundDimStyle);
			if (startRoundNormalMax > 3)
				GUI.Label(Rect(639, 31, 49, 49), "4", startRoundStyle);
			else
				GUI.Label(Rect(639, 31, 49, 49), "4", startRoundDimStyle);
			
			if (GUI.Button(Rect(688, 31, 49, 49), "", startRightButton)){
				audio.Play();
				if (startRoundNormal < startRoundNormalMax)
					startRoundNormal++;
			}
				
			GUI.DrawTexture(Rect(274, 91, 478, 468), startNormalTex, ScaleMode.ScaleToFit, true, 0);
			if (GUI.Button(Rect(600, 480, buttonWidth, buttonHeight), "", startBeginButton)){
				audio.Play();
				Application.LoadLevel("MainLevel");
			}
		}
		if (currentStartTexture == "practice"){
			GUI.DrawTexture(Rect(274, 91, 478, 468), startPracticeTex, ScaleMode.ScaleToFit, true, 0);
			if (GUI.Button(Rect(600, 480, buttonWidth, buttonHeight), "", startBeginButton)){
				audio.Play();
				Application.LoadLevel("PracticeLevel");
			}
		}
		if (currentStartTexture == "dark"){
			GUI.DrawTexture(Rect(443 + (49 * startRoundDark), 31, 49, 49), yellowBoxTex, ScaleMode.ScaleToFit);
			GUI.Label(Rect(295, 31, 148, 49), "Starting Round:", startRoundLabelStyle);
			if (GUI.Button(Rect(443, 31, 49, 49), "", startLeftButton)){
				audio.Play();
				if (startRoundDark > 1)
					startRoundDark--;
			}
			GUI.Label(Rect(492, 31, 49, 49), "1", startRoundStyle);
			
			
			
			if (startRoundDarkMax > 1)
				GUI.Label(Rect(541, 31, 49, 49), "2", startRoundStyle);
			else
				GUI.Label(Rect(541, 31, 49, 49), "2", startRoundDimStyle);
				
			if (startRoundDarkMax > 2)
				GUI.Label(Rect(590, 31, 49, 49), "3", startRoundStyle);
			else
				GUI.Label(Rect(590, 31, 49, 49), "3", startRoundDimStyle);
				
			if (startRoundDarkMax > 3)
				GUI.Label(Rect(639, 31, 49, 49), "4", startRoundStyle);
			else
				GUI.Label(Rect(639, 31, 49, 49), "4", startRoundDimStyle);
			
			
			
			if (GUI.Button(Rect(688, 31, 49, 49), "", startRightButton)){
				audio.Play();
				if (startRoundDark < startRoundDarkMax)
					startRoundDark++;
			}
			
			GUI.DrawTexture(Rect(274, 91, 478, 468), startDarkTex, ScaleMode.ScaleToFit, true, 0);
			if (GUI.Button(Rect(600, 480, buttonWidth, buttonHeight), "", startBeginButton)){
				audio.Play();
				Application.LoadLevel("DarkLevel");
			}
		}
			
			
		
		GUI.Label(Rect(60, 30, 140, 100), "Select\nGame Mode", gameModeText);
		
		if (GUI.Button(Rect(60, 75, buttonWidth, buttonHeight), "", startNormalButton)){
			audio.Play();
			currentStartTexture = "normal";
		}
		if (GUI.Button(Rect(60, 175, buttonWidth, buttonHeight), "", startPracticeButton)){
			audio.Play();
			currentStartTexture = "practice";
		}
		if (GUI.Button(Rect(60, 275, buttonWidth, buttonHeight), "", startDarkButton)){
			audio.Play();
			currentStartTexture = "dark";
		}
		if (GUI.Button(Rect(70, 460, buttonWidth, buttonHeight), "", backButtonStyle)){
			audio.Play();
			currentScreen = "main";
		}
	
	}
	if (currentScreen == "scores"){
	
		GUI.Label(Rect (Screen.width*0.25 - 100, Screen.height / 5 - 20, 30, 500), scoreRankNumbers, scoreStyle);
		GUI.Label(Rect (Screen.width*0.25 - 65, Screen.height / 5 - 20, 80, 500), scoreN1Label, scoreStyle);
		GUI.Label(Rect (Screen.width*0.25 + 30, Screen.height / 5 - 20, 50, 500), scoreN2Label, scoreNStyle);
		
		GUI.Label(Rect (Screen.width*0.75 - 95, Screen.height / 9 - 35 + 250, 30, 500), scoreRankNumbers, scoreStyle);
		GUI.Label(Rect (Screen.width*0.75 - 55, Screen.height / 9 - 35 + 250, 80, 500), scoreD1Label, scoreStyle);
		GUI.Label(Rect (Screen.width*0.75 + 40, Screen.height / 9 - 35 + 250, 50, 500), scoreD2Label, scoreNStyle);
		
		if (GUI.Button(Rect(100, 450, buttonWidth, buttonHeight), "", backButtonStyle)){
			audio.Play();
			currentScreen = "main";
		}
	}
	if (currentScreen == "controls"){
	
	//Draw control screen textures
		if (currentControls == "keyRight")
			GUI.DrawTexture(Rect(84, 62, 425, 462), controlRightTex, ScaleMode.ScaleToFit, true, 0);
		if (currentControls == "keyLeft")
			GUI.DrawTexture(Rect(84, 62, 425, 462), controlLeftTex, ScaleMode.ScaleToFit, true, 0);
		if (currentControls == "mouse")
			GUI.DrawTexture(Rect(84, 62, 425, 462), controlMouseTex, ScaleMode.ScaleToFit, true, 0);
			
	//Control selection buttons	
		if (GUI.Button(Rect(580, 115, buttonWidth, buttonHeight), "", controlMouseButton)){
			audio.Play();
			currentControls = "mouse";
		}
		
		if (GUI.Button(Rect(580, 215, buttonWidth, buttonHeight), "", controlRightButton)){
			audio.Play();
			currentControls = "keyRight";
		}
		
		if (GUI.Button(Rect(580, 315, buttonWidth, buttonHeight), "", controlLeftButton)){
			audio.Play();
			currentControls = "keyLeft";
		}
		
		
		
		if (GUI.Button(Rect(600, 425, buttonWidth, buttonHeight), "", backButtonStyle)){
			audio.Play();
			currentScreen = "main";
		}
		
	}
	
	if (currentScreen == "credits"){

		if (GUI.Button(Rect(100, 380, buttonWidth, buttonHeight), "", backButtonStyle)){
			audio.Play();
			currentScreen = "main";
		}
		if (GUI.Button(Rect(600, 50, buttonWidth, buttonHeight), "", moreCreditsButtonStyle)){
			audio.Play();
			showMoreCredits = !showMoreCredits;
		}
		if (showMoreCredits == true)
			GUI.DrawTexture(Rect(288, 112, 387, 230), moreCreditsTexture, ScaleMode.ScaleToFit, true, 0);
	}
	GUI.DrawTexture(Rect(Screen.width / 2 - 50, Screen.height / 2 - 36, 100, 72), cameraBoxTex, ScaleMode.ScaleToFit, true, 0);
}

static function RankKillScore(initialString: String, curScore:float, level:String){
	 
	if (level == "original"){
		if (curScore != 0){
	
				for (var i = 0; i < 10; i++){
			
					var tempScore:float = aScoresN[i];
					var tempInitials:String = aScoresI[i];
					if (curScore > tempScore){
			
						aScoresN[i] = curScore;
						aScoresI[i] = initialString;
						curScore = tempScore;
						initialString = tempInitials;
			
					}
		
				}
		}
		
		PlayerPrefsX.SetIntArray ("ScoreBoardN", aScoresN);
		PlayerPrefsX.SetStringArray ("ScoreBoardI", aScoresI);
		if (KongregateAPI.isKongregate == true)
			Application.ExternalCall("kongregate.stats.submit","HighScoreNormal",curScore);
	} else if (level == "dark"){
		if (curScore != 0){
	
				for (i = 0; i < 10; i++){
			
					tempScore = aDScoresN[i];
					tempInitials = aDScoresI[i];
					if (curScore > tempScore){
			
						aDScoresN[i] = curScore;
						aDScoresI[i] = initialString;
						curScore = tempScore;
						initialString = tempInitials;
					}
				}
		}
		PlayerPrefsX.SetIntArray ("DScoreBoardN", aDScoresN);
		PlayerPrefsX.SetStringArray ("DScoreBoardI", aDScoresI);
		if (KongregateAPI.isKongregate == true)
			Application.ExternalCall("kongregate.stats.submit","HighScoreDark",curScore);
	}
}

