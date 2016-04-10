#pragma strict

var createdTime : float = 0;
var button : KeyCode;
var rightButton: boolean = false;



function Start () {
	createdTime = Time.timeSinceLevelLoad;
}

function Update () {
	scoring();
	var currentTime = Time.timeSinceLevelLoad;
	var counting = currentTime - createdTime;
	if (counting > 2) {
		Destroy(gameObject);
	} 

}

function scoring () {
	if (Input.GetKey(button)) {
		rightButton = true;
		GameObject.Find("GameController").BroadcastMessage ("addPoints");
	} else {
		rightButton = false;
	}

	if (rightButton == false && Input.anyKey == true) {
		GameObject.Find("GameController").BroadcastMessage ("minusPoints");
	}
}