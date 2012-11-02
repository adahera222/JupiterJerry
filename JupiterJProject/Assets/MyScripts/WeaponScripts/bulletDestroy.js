#pragma strict
var lifeTime = 1.0;
function Awake()
{
	Destroy (gameObject, lifeTime);

}