

static var instance : KongregateAPI;

function Start(){
	if(instance == null){
		Application.ExternalEval("if(typeof(kongregateUnitySupport) != 'undefined'){kongregateUnitySupport.initAPI('" + gameObject.name + "', 'OnKongregateAPILoaded');};");
		instance = this;
	}
}

static var isKongregate = false;
var userId = 0;  
var username = "Guest";
var gameAuthToken = "";
 
function OnKongregateAPILoaded(userInfoString){
  // We now know we're on Kongregate
  isKongregate = true;
 
  // Split the user info up into tokens
  var params = userInfoString.Split("|"[0]);
  userId = parseInt(params[0]);
  username = params[1];
  gameAuthToken = params[2];
}