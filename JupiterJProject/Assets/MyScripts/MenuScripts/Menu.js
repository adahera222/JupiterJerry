#pragma strict

var buttonWidth=150.0;
var buttonHeight=50.0;

var titleLabel:String;
var titleStyle:GUIStyle;

var scoreC1Label:String;
var scoreC2Label:String;
var scoreD1Label:String;
var scoreD2Label:String;
var scoreStyle:GUIStyle;
var scoreHeadStyle:GUIStyle;
var controlStyle:GUIStyle;

static var basicControlsL = false;
static var basicControlsR = false;
static var advancedControls = true;

var mainMenuEnabled = true;
var titleTexture:Texture;
var scoreBoardEnabled = false;
var controlScreenEnabled = false;
var howToPlayScreenEnabled = false;
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
	scoreC1Label = aScoresI[0] + "   " + aScoresN[0] +
			"\n" + aScoresI[1] + "   " + aScoresN[1] + 
			"\n" + aScoresI[2] + "   " + aScoresN[2] +
			"\n" + aScoresI[3] + "   " + aScoresN[3] +
			"\n" + aScoresI[4] + "   " + aScoresN[4] +
			"\n" + aScoresI[5] + "   " + aScoresN[5] +
			"\n" + aScoresI[6] + "   " + aScoresN[6] +
			"\n" + aScoresI[7] + "   " + aScoresN[7] +
			"\n" + aScoresI[8] + "   " + aScoresN[8] +
			"\n" + aScoresI[9] + "   " + aScoresN[9];
	
	scoreD1Label =      aDScoresI[0] + "   " + aDScoresN[0] + 
				 "\n" + aDScoresI[1] + "   " + aDScoresN[1] + 
				 "\n" + aDScoresI[2] + "   " + aDScoresN[2] + 
				 "\n" + aDScoresI[3] + "   " + aDScoresN[3] + 
				 "\n" + aDScoresI[4] + "   " + aDScoresN[4] + 
				 "\n" + aDScoresI[5] + "   " + aDScoresN[5] + 
				 "\n" + aDScoresI[6] + "   " + aDScoresN[6] + 
				 "\n" + aDScoresI[7] + "   " + aDScoresN[7] + 
				 "\n" + aDScoresI[8] + "   " + aDScoresN[8] + 
				 "\n" + aDScoresI[9] + "   " + aDScoresN[9];

	
	if (mainMenuEnabled == true){
		//GUI.DrawTexture(Rect(0, 0, 960, 600), genericGUIBackTex, ScaleMode.ScaleToFit, true, 0);
	
		//GUI.DrawTexture(Rect (318, 145, 602, 299), titleTexture, ScaleMode.ScaleToFit, true, 0);

		GUI.Label(Rect(880, 370, 70, 40), "Volume", volTextStyle);
		GUI.Box(Rect(905, 410, 20, 120), GUIContent.none, volSliderStyle);
		CameraScript.volSliderValue = GUI.VerticalSlider(Rect(910, 420, 20, 100), CameraScript.volSliderValue, 100.0, 0.0);

		if (GUI.Button(Rect(80, 145, buttonWidth, buttonHeight), "Classic Mode")){
			audio.Play();
			Application.LoadLevel("MainLevel");
		}
		if (GUI.Button(Rect(80, 215, buttonWidth, buttonHeight), "Dark Mode")){
			audio.Play();
			Application.LoadLevel("DarkLevel");
		}
		if (GUI.Button(Rect(80, 285, buttonWidth, buttonHeight), "Scoreboard")){
			audio.Play();
			mainMenuEnabled = false;
			scoreBoardEnabled = true;
		}
		if (GUI.Button(Rect(80, 355, buttonWidth, buttonHeight), "Control Setup")){
			audio.Play();
			mainMenuEnabled = false;
			controlScreenEnabled = true;
		}
		if (GUI.Button(Rect(80, 425, buttonWidth, buttonHeight), "How to Play")){
			audio.Play();
			mainMenuEnabled = false;
			howToPlayScreenEnabled = true;
		}
	}
	
	if (scoreBoardEnabled == true){
	
		GUI.DrawTexture(Rect(0, 0, 960, 600), genericGUIBackTex, ScaleMode.ScaleToFit, true, 0);
	
		GUI.Label(Rect (Screen.width*0.15 - 50, Screen.height / 6 - 75, 300, 50), "Asteroids Destroyed", scoreHeadStyle);
		GUI.Label(Rect (Screen.width*0.25 - 80, Screen.height / 6 - 40, 300, 500), scoreRankNumbers, scoreStyle);
		GUI.Label(Rect (Screen.width*0.25 - 50, Screen.height / 6 - 40, 300, 500), scoreC1Label, scoreStyle);
		
		GUI.Label(Rect (Screen.width / 2 - 100, Screen.height * 0.25 - 50, 200, 100), "Classic\nMode", scoreHeadStyle);
		
		GUI.Label(Rect (Screen.width*0.15 - 50, Screen.height / 6 - 75 + 300, 300, 50), "Asteroids Destroyed", scoreHeadStyle);
		GUI.Label(Rect (Screen.width*0.25 - 80, Screen.height / 6 - 40 + 300, 300, 500), scoreRankNumbers, scoreStyle);
		GUI.Label(Rect (Screen.width*0.25 - 50, Screen.height / 6 - 40 + 300, 300, 500), scoreD1Label, scoreStyle);
		
		GUI.Label(Rect (Screen.width / 2 - 100, Screen.height * 0.75 - 50, 200, 100), "Dark\nMode", scoreHeadStyle);
		
		if (GUI.Button(Rect(Screen.width / 2 - buttonWidth / 2, Screen.height * 0.5 - buttonHeight / 2, buttonWidth, buttonHeight), "Back")){
			audio.Play();
			mainMenuEnabled = true;
			scoreBoardEnabled = false;
		}
	}
	if (controlScreenEnabled == true){
	
	//Draw control screen textures
		if (basicControlsR == true)
			GUI.DrawTexture(Rect(0, 0, 960, 600), controlBRTex, ScaleMode.ScaleToFit, true, 0);
		if (basicControlsL == true)
			GUI.DrawTexture(Rect(0, 0, 960, 600), controlBLTex, ScaleMode.ScaleToFit, true, 0);
		if (advancedControls == true)
			GUI.DrawTexture(Rect(0, 0, 960, 600), controlATex, ScaleMode.ScaleToFit, true, 0);
			
	//Control selection buttons	
		if (basicControlsR == true){
			GUI.Label(Rect(720, 306, buttonWidth + 40, buttonHeight), "Right Handed Controls\nActive", controlStyle);	
		} else {
			if (GUI.Button(Rect(740, 306, buttonWidth, buttonHeight), "Classic Controls:\nRight Handed")){
				audio.Play();
				basicControlsR = true;
				basicControlsL = false;
				advancedControls = false;
			}
		}
		
		if (basicControlsL == true){
			GUI.Label(Rect(720, 376, buttonWidth + 40, buttonHeight), "Left Handed Controls\nActive", controlStyle);	
		} else {
			if (GUI.Button(Rect(740, 376, buttonWidth, buttonHeight), "Classic Controls:\nLeft Handed")){
				audio.Play();
				basicControlsR = false;
				basicControlsL = true;
				advancedControls = false;
			}
		}
		
		if (advancedControls == true){
			GUI.Label(Rect(720, 446, buttonWidth + 40, buttonHeight), "Mouse Controls\nActive", controlStyle);	
		} else {
			if (GUI.Button(Rect(740, 446, buttonWidth, buttonHeight), "Mouse Controls")){
				audio.Play();
				basicControlsR = false;
				basicControlsL = false;
				advancedControls = true;
			}
		}
		
		
		
		if (GUI.Button(Rect(740, 516, buttonWidth, buttonHeight), "Back")){
			audio.Play();
			mainMenuEnabled = true;
			controlScreenEnabled = false;
		}
		
	}
	
	if (howToPlayScreenEnabled == true){
	
		GUI.DrawTexture(Rect(0, 0, 960, 600), howToPlayTex, ScaleMode.ScaleToFit, true, 0);
		
		if (GUI.Button(Rect(754, 520, buttonWidth, buttonHeight), "Back")){
			audio.Play();
			mainMenuEnabled = true;
			howToPlayScreenEnabled = false;
		}
	}
	GUI.DrawTexture(Rect(Screen.width / 2 - 100, Screen.height / 2 - 72, 200, 144), cameraBoxTex, ScaleMode.ScaleToFit, true, 0);
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

