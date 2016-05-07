#pragma strict
import UnityEngine.SceneManagement;



function Start() {
Time.timeScale = 1;
}

function Update() {
    if (Input.anyKey) {
        SceneManager.LoadScene('instructions_scene');
    }

}
