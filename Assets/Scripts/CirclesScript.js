#pragma strict
import UnityEngine.SceneManagement;


var createdTime: float = 0;
var button: KeyCode;
var goodHit: boolean = false; //whether the right button has been hit
var badHit: boolean = false; //when any button that's not the right button has been hit
var counting: float;
var GCScript: GC;
var currentColor: String;



function Start() {
    GCScript = GameObject.Find('GameController').GetComponent(GC);
    //make a variable once the circle is created called "createdTime"
    createdTime = Time.timeSinceLevelLoad;
}

function Update() {
    //have the scoring function run constantly
    scoring();
    //make a variable to measure the current time
    var currentTime = Time.timeSinceLevelLoad;
    //make a variable to count how many seconds have elapsed since the circle was created
    counting = currentTime - createdTime;

    //if 1.99 seconds have elapsed and the player has not hit ANY buttons, minus points
    if (counting > 1.99 && goodHit == false && badHit == false) {
        GameObject.Find("ScoreText").BroadcastMessage("minusPoints");
    }

    //if the circle has existed for more than 2 seconds, destroy it
    if (counting > 2) {
        GCScript.circleOnScreen -= 1;
        for(var i=0; i<GCScript.colorsOnScreen.length; i++){
            if(GCScript.colorsOnScreen[i] == currentColor) {
                GCScript.colorsOnScreen.RemoveAt(i);
            }
        }
        Destroy(gameObject);
    }
}

public function CircleColor(color: String) {
    currentColor = color;
    print(currentColor);
}

//Figure out how to make score register correctly

function scoring() {
    //if the user presses the correct button and it has not been hit yet, add points, then say that the button was hit
    if (Input.GetKey(button) && goodHit == false) {
        GCScript.circleOnScreen -= 1;

        for(var i=0; i<GCScript.colorsOnScreen.length; i++){
            if(GCScript.colorsOnScreen[i] == currentColor) {
                GCScript.colorsOnScreen.RemoveAt(i);
            }
        }

        GameObject.Find("ScoreText").BroadcastMessage("addPoints", counting);
        goodHit = !goodHit;

        //TURN GREY/FADE OUT IF THIS BUTTON HAS BEEN PUSHED BUT NOT ALL THIS ROUND HAVE

        //DESTROY CIRCLE IF ALL BUTTONS FOR THIS ROUND HAVE BEEN PUSHED & CHANGE THE WAY TIME IS HANDLED IN GC

    }
    //if the user hits any other button and no button has been hit yet, minus points and say the wrong button was hit
    if (Input.anyKey == true && goodHit == false && badHit == false) {
        print(Input.inputString);

        var currentInputColor;
        if(Input.inputString == 'g') {
            currentInputColor = "green";
        }
        else if(Input.inputString == 'r') {
            currentInputColor = "red";
        }
        else if(Input.inputString == 'y') {
            currentInputColor = "yellow";
        }
        else if(Input.inputString == 'w') {
            currentInputColor = "white";
        }

        var matchesColorOnScreen = false;
        for(var j=0; j<GCScript.colorsOnScreen.length; j++){
            if(GCScript.colorsOnScreen[j] == currentInputColor) {
                matchesColorOnScreen = true;
            }
        }

        if(matchesColorOnScreen == false) { 
            GameObject.Find("ScoreText").BroadcastMessage("minusPoints");
            badHit = !badHit;
        }
    }
}
