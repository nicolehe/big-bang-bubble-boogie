#pragma strict
import UnityEngine.SceneManagement;
var instructions: GameObject;
var instructions2: GameObject;
var pressCount = 0;
var pressed = false;



function Start() {
    Time.timeScale = 1;
}

function Update() {
	print(pressed);
    if (Input.anyKeyDown) {
        pressCount++;
        if (pressCount == 1) {
            GameObject.Instantiate(instructions, Vector3(0, 0, -1), Quaternion.identity);
        } else if (pressCount == 2){
        	GameObject.Instantiate(instructions2, Vector3(0, 0, -2), Quaternion.identity);
        } else if (pressCount == 3){
        	SceneManager.LoadScene("countdown_scene");
        }
    }

}
