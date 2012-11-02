#pragma strict

var speed = 3.0;
var rotateSpeed=3.0;
var pelletPrefab:Transform; 

function Update () {
	var controller : CharacterController = GetComponent(CharacterController);

	transform.Rotate(0, Input.GetAxis("Horizontal")*rotateSpeed, 0);
	
	var forward = transform.TransformDirection(Vector3.forward);
	var curSpeed = speed * Input.GetAxis("Vertical");
	controller.Move(forward * curSpeed);
	
	if (Input.GetButtonDown("Jump")){
		var pellet = Instantiate(pelletPrefab, GameObject.Find("pelletSpawn").transform.position, Quaternion.identity);
		pellet.rigidbody.AddForce(transform.forward * 200);
	}
}

@script RequireComponent(CharacterController);