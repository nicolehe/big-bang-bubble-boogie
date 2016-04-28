#pragma strict
import UnityEngine.SceneManagement;

var anim: Animation;



function Start() {
    anim = GetComponent. < Animation > ();

    for (var state: AnimationState in anim) {
        state.speed = 0.1;
    }
}

function Update() {

}
