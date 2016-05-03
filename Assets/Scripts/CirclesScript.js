#pragma strict
import UnityEngine.SceneManagement;

var GCScript: GC;

function Start() {

    GCScript = GameObject.Find('GameController').GetComponent(GC);
}

function Update() {

	//if GC doesn't think there should be circles on the screen, self-destruct
    if(GCScript.circleOnScreen == 0){
    	Destroy(gameObject);
    }

}

