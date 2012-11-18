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

static var currentControls = "mouse";

var currentScreen = "main";
var scoreRankNumbers = " 1.\n 2.\n 3.\n 4.\n 5.\n 6.\n 7.\n 8.\n 9.\n10.";

var controlLabelWidth:float;
var controlLabelHeight:float;
var controlButtonWidth:float;
var controlButtonHeight:float;

static var aScoresN = PlayerPrefsX.GetIntArray ("ScoreBoardN");
static var aScoresI = PlayerPrefsX.GetStringArray ("ScoreBoardI");

static var aDScoresN = PlayerPrefsX.GetIntArray ("DScoreBoardN");
static var aDScoresI = PlayerPrefsX.GetStringArray ("DScoreBoardI");

var controlBRTex:Texture;
var controlBLTex:Texture;
var controlATex:Texture;
var howToPlayTex:Texture;
var genericGUIBackTex:Texture;
var cameraBoxTex:Texture;

var volTextStyle:GUIStyle;
var volSliderStyle:GUIStyle;

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
	
	AudioListener.volume = CameraScript.volSliderValue / 100.0;


}

function OnGUI () {
	scoreN1Label = aScoresI[0] +
			" - \n" + aScoresI[1] +
			" - \n" + aScoresI[2] +
			" - \n" + aScoresI[3] +
			" - \n" + aScoresI[4] +
			" - \n" + aScoresI[5] +
			" - \n" + aScoresI[6] +
			" - \n" + aScoresI[7] +
			" - \n" + aScoresI[8] +
			" - \n" + aScoresI[9] + " - ";
	
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
				 " - \n" + aDScoresI[1] +
				 " - \n" + aDScoresI[2] +
				 " - \n" + aDScoresI[3] +
				 " - \n" + aDScoresI[4] +
				 " - \n" + aDScoresI[5] +
				 " - \n" + aDScoresI[6] +
				 " - \n" + aDScoresI[7] +
				 " - \n" + aDScoresI[8] +
				 " - \n" + aDScoresI[9] + " - ";
	
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

		//if (GUI.Button(Rect(80, 145, buttonWidth, buttonHeight), "Classic Mode")){
		//	audio.Play();
		//	Application.LoadLevel("MainLevel");
		//}
		//if (GUI.Button(Rect(80, 215, buttonWidth, buttonHeight), "Dark Mode")){
		//	audio.Play();
		//	Application.LoadLevel("DarkLevel");
		//}
		if (GUI.Button(Rect(456, 349, buttonWidth, buttonHeight), "", startButtonStyle)){
			audio.Play();
			currentScreen = "start";		
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
	
	if (currentScreen == "scores"){
	
		GUI.Label(Rect (Screen.width*0.15 - 60, Screen.height / 5 - 65, 300, 50), "Asteroids Destroyed", scoreHeadStyle);
		GUI.Label(Rect (Screen.width*0.25 - 90, Screen.height / 5 - 30, 30, 500), scoreRankNumbers, scoreStyle);
		GUI.Label(Rect (Screen.width*0.25 - 65, Screen.height / 5 - 30, 80, 500), scoreN1Label, scoreStyle);
		GUI.Label(Rect (Screen.width*0.25 + 20, Screen.height / 5 - 30, 50, 500), scoreN2Label, scoreNStyle);
		
		GUI.Label(Rect (Screen.width / 2 - 100, Screen.height * 0.25 - 50, 200, 100), "Classic\nMode", scoreHeadStyle);
		
		GUI.Label(Rect (Screen.width*0.65 - 50, Screen.height / 9 - 75 + 250, 300, 50), "Asteroids Destroyed", scoreHeadStyle);
		GUI.Label(Rect (Screen.width*0.75 - 80, Screen.height / 9 - 40 + 250, 30, 500), scoreRankNumbers, scoreStyle);
		GUI.Label(Rect (Screen.width*0.75 - 55, Screen.height / 9 - 40 + 250, 80, 500), scoreD1Label, scoreStyle);
		GUI.Label(Rect (Screen.width*0.75 + 30, Screen.height / 9 - 40 + 250, 50, 500), scoreD2Label, scoreNStyle);
		
		GUI.Label(Rect (Screen.width / 2 - 100, Screen.height * 0.75 - 50, 200, 100), "Dark\nMode", scoreHeadStyle);
		
		if (GUI.Button(Rect(100, 450, buttonWidth, buttonHeight), "Back")){
			audio.Play();
			currentScreen = "main";
		}
	}
	if (currentScreen == "controls"){
	
	//Draw control screen textures
		if (currentControls == "keyRight")
			GUI.DrawTexture(Rect(0, 0, 960, 600), controlBRTex, ScaleMode.ScaleToFit, true, 0);
		if (currentControls == "keyLeft")
			GUI.DrawTexture(Rect(0, 0, 960, 600), controlBLTex, ScaleMode.ScaleToFit, true, 0);
		if (currentControls == "mouse")
			GUI.DrawTexture(Rect(0, 0, 960, 600), controlATex, ScaleMode.ScaleToFit, true, 0);
			
	//Control selection buttons	
		if (currentControls == "keyRight"){
			GUI.Label(Rect(720, 306, buttonWidth + 40, buttonHeight), "Right Handed Controls\nActive", controlStyle);	
		} else {
			if (GUI.Button(Rect(740, 306, buttonWidth, buttonHeight), "Classic Controls:\nRight Handed")){
				audio.Play();
				currentControls == "keyRight";
			}
		}
		
		if (currentControls == "keyLeft"){
			GUI.Label(Rect(720, 376, buttonWidth + 40, buttonHeight), "Left Handed Controls\nActive", controlStyle);	
		} else {
			if (GUI.Button(Rect(740, 376, buttonWidth, buttonHeight), "Classic Controls:\nLeft Handed")){
				audio.Play();
				currentControls = "keyLeft";
			}
		}
		
		if (currentControls == "mouse"){
			GUI.Label(Rect(720, 446, buttonWidth + 40, buttonHeight), "Mouse Controls\nActive", controlStyle);	
		} else {
			if (GUI.Button(Rect(740, 446, buttonWidth, buttonHeight), "Mouse Controls")){
				audio.Play();
				currentControls = "mouse";
			}
		}
		
		
		
		if (GUI.Button(Rect(740, 516, buttonWidth, buttonHeight), "Back")){
			audio.Play();
			currentScreen = "main";
		}
		
	}
	
	if (currentScreen == "howToPlay"){
	
		GUI.DrawTexture(Rect(0, 0, 960, 600), howToPlayTex, ScaleMode.ScaleToFit, true, 0);
		
		if (GUI.Button(Rect(754, 520, buttonWidth, buttonHeight), "Back")){
			audio.Play();
			currentScreen = "main";
		}
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
	}
}

