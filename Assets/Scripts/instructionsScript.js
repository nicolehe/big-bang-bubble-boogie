#pragma strict
import UnityEngine.SceneManagement;



function Start() {

}

function Update() {
    if (Input.anyKey) {
        SceneManager.LoadScene('countdown_scene');
    }

}
