#pragma strict

var asteroidBehave:AsteroidBehaviour;
var bulletDmg:float;

var lazerImpactPrefab:Transform;
var shieldUp:ShieldUp;
var bulletCol:GameObject;

function Start(){
	
	shieldUp = GameObject.Find("PlayerShip").GetComponent(ShieldUp);
	
	if (shieldUp.shieldUpChk == false){
		bulletCol.collider.enabled = true;
	}
}



function OnTriggerEnter (hostile:Collider) {

	var hostileTag = hostile.tag;
    if (hostileTag.Length > 8 && hostileTag.Substring(0,8) == "Asteroid") {
		asteroidBehave = hostile.GetComponent(AsteroidBehaviour);
		if (hostileTag != "AsteroidS")
			var impact = Instantiate(lazerImpactPrefab, transform.position, transform.rotation);
		else
			impact = Instantiate(lazerImpactPrefab, hostile.transform.position, transform.rotation);
		impact.transform.eulerAngles.x = 180;
		if (hostileTag != "AsteroidG" && hostileTag != "AsteroidH") {
			asteroidBehave.curHP -= bulletDmg;
		} else 
			impact.GetComponent(Generic3SoundScript).enabled = true;
    	Destroy(gameObject);
    }
 
}

function OnTriggerExit(shield:Collider){

	if (shield.tag == "PlayerShield"){
		bulletCol.collider.enabled = true;
	}
	

}