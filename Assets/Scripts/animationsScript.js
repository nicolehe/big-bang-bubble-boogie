#pragma strict
import UnityEngine.SceneManagement;

var anim: Animator;
var level = 1;


function Start() {
    anim = GetComponent. < Animator > ();

    anim.speed = 1;

}


function Update() {
	anim.speed = level * 0.6;
}

function nextLevel(nextLevel : int) {
	level = nextLevel;
}
