#pragma strict

var xStart:float;
var zStart:float;
var x:float;
var z:float;
var transScaler:TransformWrapScaler;
var horizontalAlign = false;
var verticalAlign = false;
var lazerImpactPrefab:Transform;

var roundScaleIncrease:float;

function Update(){

	x = xStart * (1 + (roundScaleIncrease * (CameraScript.roundNum - 1)));
	z = zStart * (1 + (roundScaleIncrease * (CameraScript.roundNum - 1)));
	
	if (verticalAlign == true){
		transform.localScale.z = 2 * x;
		if (transform.position.x > 1){
			transform.position.x = x;
		} else if (transform.position.x < 1){
			transform.position.x = -x;
		}
	}
	if (horizontalAlign == true){
		transform.localScale.x = 2 * z;
		if (transform.position.z > 1){
			transform.position.z = z;
		} else if (transform.position.z < 1){
			transform.position.z = -z;
		}
	}

}

function OnTriggerEnter(object:Collider){
	if (object.tag == "bullet"){
		Instantiate(lazerImpactPrefab, object.transform.position, object.transform.rotation);
		Destroy(object.gameObject);
	}
}

function OnTriggerStay (object:Collider) {

	
	//if (object.tag != "bullet" && object.tag != "Bomb"){
		var objectTrans = object.transform;
		var obTag = object.tag;
		if (objectTrans.position.x <= -x) {

			CheckAster(object.gameObject);
			if (CheckAster(object.gameObject) || obTag == "Player"){
				objectTrans.position = new Vector3(x-1, 3, objectTrans.position.z);
			}
		}
		if (objectTrans.position.x >= x) {
			
			CheckAster(object.gameObject);
			if (CheckAster(object.gameObject) || obTag == "Player"){
				objectTrans.position = new Vector3(-(x-1), 3, objectTrans.position.z);
			}
		}
		if (objectTrans.position.z <= -z) {
			
			CheckAster(object.gameObject);
			if (CheckAster(object.gameObject) || obTag == "Player"){
				objectTrans.position = new Vector3(objectTrans.position.x, 3, z-1);
			}
		}
		if (objectTrans.position.z >= z) {
			
			CheckAster(object.gameObject);
			if (CheckAster(object.gameObject) || obTag == "Player"){
				objectTrans.position = new Vector3(objectTrans.position.x, 3, -(z-1));
			}
		}
	//}
}

function CheckAster(object:GameObject){
	
	var objectTag = object.tag;
	if ((objectTag.Length > 8 && objectTag.Substring(0,8) == "Asteroid") || objectTag == "Bomb"){
		
		
		transScaler = object.GetComponent(TransformWrapScaler);
		transScaler.enabled = true;
		transScaler.small = true;
		transScaler.big = false;
		if (transScaler.ready == true){
			//transScaler.big = true;
			return(true);
		}else {
			transScaler.small = true;
			transScaler.big = false;
			return(false);
		}
		
		//object.collider.isTrigger = true;
		//object.GetComponent(AsteroidOverlap).enabled = true;
	
	}
	
	
}
