#pragma strict
import UnityEngine.SceneManagement;

function Start () {

}

function Update () {	
	print(Time.timeSinceLevelLoad);
	if (Time.timeSinceLevelLoad > 4) {
		SceneManager.LoadScene('scene1');
	}

}