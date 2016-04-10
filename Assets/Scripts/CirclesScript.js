#pragma strict

var createdTime : float = 0;



function Start () {
	createdTime = Time.timeSinceLevelLoad;
}

function Update () {
	var currentTime = Time.timeSinceLevelLoad;
	var counting = currentTime - createdTime;
	if (counting > 2) {
		Destroy(gameObject);
	} 

}