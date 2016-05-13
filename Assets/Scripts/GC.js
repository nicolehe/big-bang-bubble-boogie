#pragma strict
import UnityEngine.SceneManagement;
import System.Collections.Generic;


var music: AudioSource;
var blip: AudioSource;

var highScore: int;
var keyCode: KeyCode;
var score: int;
var thescore: int;


var RedCircle: GameObject;
var GreenCircle: GameObject;
var YellowCircle: GameObject;
var WhiteCircle: GameObject;

var GOLowScore: GameObject;
var GOHighScore: GameObject;

var canvasGroup: CanvasGroup;
var GO = false;

var colors = ['red', 'green', 'white', 'yellow'];
var colorPick: String;
var yellows: Array;
var greens: Array;
var reds: Array;
var whites: Array;

var whites2: Array = ['q', 'w', 'a', 's'];
var reds2: Array = ['e', 'd', 'r', 'f'];
var greens2: Array = ['g', 't', 'y', 'h'];
var yellows2: Array = ['u', 'i', 'j', 'k'];

var lastTime: float = 0;

var level: int = 0;

var thisKey: String;
var bubbleNum: int = 0;

var bubble: GameObject;
var circle: GameObject;

var counting: float;

var timesFailed: int;

var bubbleTime: float;
var lastG;
var lastR;
var lastW;
var lastY;
var stage;

//for stage 1, keeps track of the last key pressed for each color
var lastKeys = { "lastG": "0", "lastR": "0", "lastW": "0", "lastY": "0" };

//for stage 2, keeps track of whether a key is "remaining" in the available arrays
var remaining = { "g": false, "w": false, "r": false, "y": false };

function Start() {
    thescore = 0;

    //gets the high score
    highScore = PlayerPrefs.GetInt("High Score");

    //makes the finishing UI element invisible for now
    canvasGroup.alpha = 1;

    //time is back to normal
    Time.timeScale = 1;

    //a number used to name each bubble as it appears
    bubbleNum = 0;

    //music starts as normal
    music.pitch = 1;

    //a number that changes how the audience responds
    timesFailed = 0;

    //makes new arrays to keep track of how many bubbles of each color currently exist
    yellows = new Array();
    reds = new Array();
    greens = new Array();
    whites = new Array();

    //the starting stage
    stage = 2;

}

function Update() {
    print(reds2);
    print(yellows2);
    print(whites2);
    print(greens2);

    //if you beat the old high score, your new score is the high score
    if (thescore > highScore) {
        highScore = thescore;
        PlayerPrefs.SetInt("High Score", highScore);
    }

    //make sure timesFailed doesn't go below 0
    if (timesFailed < 0) {
        timesFailed = 0;
    }

    //if the game has not yet ended, check for key presses
    if (GO == false) {
        keyCheck();
    }

    switch (level) {
        case 1:
            bubbleTime = 2;
            music.pitch = 1;
            break;
        case 2:
            bubbleTime = 1.5;
            music.pitch = 1.1;
            break;
        case 3:
            bubbleTime = 1;
            music.pitch = 1.2;
            break;
        case 4:
            bubbleTime = 0.8;
            music.pitch = 1.3;
            break;
        case 5:
            bubbleTime = 0.7;
            music.pitch = 1.4;
            break;
        case 6:
            bubbleTime = 0.6;
            music.pitch = 1.5;
            break;

    }

    //determines how fast the bubbles spawn based on level
    counting = Time.timeSinceLevelLoad - lastTime;

    if (counting > bubbleTime) {
        //increase bubbleNum by 1,
        //instantiate a circle of a random color, give it a name,
        //and add it to the array of bubbles that currently exist of that color
        //then reset lastTime
        bubbleNum++;
        circle = GameObject.Instantiate(pickColor(), Vector3(Random.Range(-6.9, 6.9), -5, -1), Quaternion.identity);
        if (circle.gameObject.name == "YellowCircle(Clone)") {
            circle.name = "y" + bubbleNum;
            yellows.Push(circle.name);
        } else if (circle.gameObject.name == "RedCircle(Clone)") {
            circle.name = "r" + bubbleNum;
            reds.Push(circle.name);
        } else if (circle.gameObject.name == "GreenCircle(Clone)") {
            circle.name = "g" + bubbleNum;
            greens.Push(circle.name);
        } else if (circle.gameObject.name == "WhiteCircle(Clone)") {
            circle.name = "w" + bubbleNum;
            whites.Push(circle.name);
        }
        lastTime = Time.timeSinceLevelLoad;

    }

    //change the audience faces depending on how many times you screw up in a row
    switch (timesFailed) {
        case 0:
            GameObject.Find("Audience").BroadcastMessage("happyFace");
            break;
        case 1:
            GameObject.Find("Audience").BroadcastMessage("mehFace");
            break;
        case 2:
            GameObject.Find("Audience").BroadcastMessage("badFace");
            break;

    }

}

//this function is called from ScoreManager, to update the current level based on the score/time
function currentLevel(currentLevel: int) {
    level = currentLevel;
}

//this is the function that actually picks a rando color and instantiates a bubble based on it
function pickColor(): GameObject {
    var colorPick = colors[Random.Range(0, colors.length)];
    if (colorPick == 'green') {
        return GreenCircle;;
    } else if (colorPick == 'red') {
        return RedCircle;
    } else if (colorPick == 'white') {
        return WhiteCircle;
    } else if (colorPick == 'yellow') {
        return YellowCircle;
    }
}

function audienceNeg() {
    timesFailed++;
}


//called if user(s) press a button while circles are on screen
function keyCheck() {
    if (Input.anyKeyDown) {
        //get the actual key pressed
        var keyInput = Input.inputString;
        var bColor;
        //each color has 4 keys associated with it. return the color based on key pressed
        if (Input.GetKey("q") || Input.GetKey("w") || Input.GetKey("a") || Input.GetKey("s")) {
            bColor = "w";
        } else if (Input.GetKey("e") || Input.GetKey("d") || Input.GetKey("r") || Input.GetKey("f")) {
            bColor = "r";
        } else if (Input.GetKey("g") || Input.GetKey("t") || Input.GetKey("y") || Input.GetKey("h")) {
            bColor = "g";
        } else if (Input.GetKey("u") || Input.GetKey("j") || Input.GetKey("k") || Input.GetKey("i")) {
            bColor = "y";
        }

        switch (stage) {
            //if we're in stage 1, use bubbles1 function
            case 1:
                switch (bColor) {
                    case "w":
                        bubbles1(whites, "lastW", keyInput);
                        break;
                    case "r":
                        bubbles1(reds, "lastR", keyInput);
                        break;
                    case "g":
                        bubbles1(greens, "lastG", keyInput);
                        break;
                    case "y":
                        bubbles1(yellows, "lastY", keyInput);
                        break;
                }
                break;
            //if we're in stage 2, use bubbles2 function
            case 2:
                switch (bColor) {
                    case "w":
                        bubbles2(whites2, whites, "w", keyInput);
                        break;
                    case "r":
                        bubbles2(reds2, reds, "r", keyInput);
                        break;
                    case "g":
                        bubbles2(greens2, greens, "g", keyInput);
                        break;
                    case "y":
                        bubbles2(yellows2, yellows, "y", keyInput);
                        break;
                }
                break;
        }


    }
}

function bubbles1(arr: Array, lastKey, keyInput: String) {
    //if there are bubbles of this color on the screen
    //AND the key pressed is not the same as the last key pressed for this color,
    //add points, make the popping animation, then destroy the gameobject.
    //then, remove that bubble name from the array of bubbles of that color that exist,
    //reduce timesFailed for audience,
    //set the lastKey to the last key pressed
    if (arr.length > 0 && keyInput != lastKeys[lastKey]) {
        GameObject.Find(arr[0]).BroadcastMessage("addPoints");
        GameObject.Find(arr[0]).BroadcastMessage("popIt");
        yield WaitForSeconds(0.05);
        GameObject.Find(arr[0]).BroadcastMessage("destroy");
        arr.RemoveAt(0);
        timesFailed--;
        lastKeys[lastKey] = keyInput;
    //if there are bubbles of this color on the screen
    //but the key pressed is the same as the last key pressed of this color
    //stop the blip sound if it's playing, and play it
    //tell the bubble to do the greyout animation
    } else if (arr.length > 0 && keyInput == lastKeys[lastKey]) {
        blip.Stop();
        GameObject.Find(arr[0]).BroadcastMessage("changeColor");
        blip.Play();
    //if the user hit a key but there are no bubbles of that color on the screen,
    //they lose a life
    } else {
        GameObject.Find("Lives").BroadcastMessage("loseLife");
    }
}

function bubbles2(keyArr: Array, arr: Array, c: String, keyInput: String) {
    //whenever this function is called, set "remaining" for that color to be false
    remaining[c] = false;
    //iterate through the array of the remaining keys for this color
    //if the key input matches with one of the elements in the array,
    //set "remaining" for that color to be true
    //remove that key from the key array
    for (var i = 0; i < keyArr.length; i++) {
        if (keyInput == keyArr[i]) {
            remaining[c] = true;
            keyArr.RemoveAt(i);
        }
    }
    //if there are bubbles of this color that exist, and remaining for that color is true,
    //add points, make the popping animation, then destroy the gameobject.
    //then, remove that bubble name from the array of bubbles of that color that exist,
    //reduce timesFailed for audience,
    if (arr.length > 0 && remaining[c] == true) {
        GameObject.Find(arr[0]).BroadcastMessage("addPoints");
        GameObject.Find(arr[0]).BroadcastMessage("popIt");
        yield WaitForSeconds(0.05);
        GameObject.Find(arr[0]).BroadcastMessage("destroy");
        arr.RemoveAt(0);
        timesFailed--;
    //if there are bubbles of this color that exist, but remaining for this color is false,
    //stop the blip sound if it's playing, and play it
    //tell the bubble to do the greyout animation
    } else if (arr.length > 0 && remaining[c] == false) {
        blip.Stop();
        GameObject.Find(arr[0]).BroadcastMessage("changeColor");
        blip.Play();
    //if the user hit a key but there are no bubbles of that color on the screen,
    //they lose a life
    } else {
        GameObject.Find("Lives").BroadcastMessage("loseLife");
    }

    //if the user has cleared all the keys from the key array, reset the key array
    if (keyArr.length == 0) {
        reset(keyArr);
    }
}

//resets the key array, called when the user has cleared it
function reset(keyArr: Array) {
    switch (keyArr) {
        case whites2:
            whites2 = ['q', 'w', 'a', 's'];
            break;
        case reds2:
            reds2 = ['e', 'd', 'r', 'f'];
            break;
        case greens2:
            greens2 = ['g', 't', 'y', 'h'];
            break;
        case yellows2:
            yellows2 = ['u', 'i', 'j', 'k'];
            break;
    }
}


function gameOver() {
    //capture the time when the game ends
    var GOTime: float;

    //make the gameover canvas visible
    canvasGroup.alpha = 0;

    //stop the music
    music.Stop();

    //the GO boolean is to make sure this following code only happens once:
    if (GO == false) {
        //get the time
        //if you got the high score, make the high score text
        //if you didn't, make the low score text
        GOTime = Time.time;
        if (thescore == highScore) {
            Instantiate(GOHighScore, Vector3(0, 0, -3), Quaternion.identity);
        } else {
            Instantiate(GOLowScore, Vector3(0, 0, -3), Quaternion.identity);
        }
        GameObject.Find("ScoreText").BroadcastMessage("gameOverScore");
        GO = true;
    }

    //make the timescale very small so that it appears frozen, but we can still use Time
    Time.timeScale = 0.0001;
    yield WaitForSeconds(5 * Time.timeScale);

    if (Time.time - GOTime > 15) {
        SceneManager.LoadScene('title_scene');

    }
}

//this is called from the ScoreManager to keep track of what the score is at all times
function keepScore(score: int) {
    thescore = score;
}

//this is called from CirclesScript to remove a bubble from the array of existing bubbles
//if the bubble gets destroyed by making it off screen
function removeFromArray(myColor: String) {

    switch (myColor) {
        case "red":
            reds.RemoveAt(0);
            break;
        case "green":
            greens.RemoveAt(0);
            break;
        case "white":
            whites.RemoveAt(0);
            break;
        case "yellow":
            yellows.RemoveAt(0);
            break;
    }
}
