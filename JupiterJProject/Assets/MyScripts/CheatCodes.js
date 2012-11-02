#pragma strict

var addMin1 = "/";
var addScore = ".";
var addMin2 = ",";

function Update () {

	if (Input.GetKeyDown(addMin1))
		Resource1Script.resourceNum += 10;
		
	if (Input.GetKeyDown(addScore))
		ScoreKeeper.score += 10;
		
	if (Input.GetKeyDown(addMin2))
		Resource2Script.resource2Num++;

}