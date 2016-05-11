#pragma strict
import UnityEngine.SceneManagement;
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

var lastKeys = { "lastG": "0", "lastR": "0", "lastW": "0", "lastY": "0" };

function Start() {
    thescore = 0;
    highScore = PlayerPrefs.GetInt("High Score");
    canvasGroup.alpha = 1;
    Time.timeScale = 1;
    bubbleNum = 0;
    music.pitch = 1;

    timesFailed = 0;

    yellows = new Array();
    reds = new Array();
    greens = new Array();
    whites = new Array();
    stage = 1;

}

function Update() {
    // print("lastW " + lastW);
    // print("lastR " + lastR);
    // print("g" + greens.length);
    // print("r" + reds.length);



    if (thescore > highScore) {
        highScore = thescore;
        PlayerPrefs.SetInt("High Score", highScore);
    }

    if (timesFailed < 0) {
        timesFailed = 0;
    }
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


    counting = Time.timeSinceLevelLoad - lastTime;

    if (counting > bubbleTime) {
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

function currentLevel(currentLevel: int) {
    level = currentLevel;
}


//choose a random color and return the one selected every time this function is called from displayCircles
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
        var keyInput = Input.inputString;
        var bColor;
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
            case 2:
                //to do
                break;
        }


    }
}

function bubbles1(arr: Array, lastKey, keyInput: String) {
    if (arr.length > 0 && keyInput != lastKeys[lastKey]) {
        GameObject.Find(arr[0]).BroadcastMessage("addPoints");
        GameObject.Find(arr[0]).BroadcastMessage("popIt");
        yield WaitForSeconds(0.05);
        GameObject.Find(arr[0]).BroadcastMessage("destroy");
        arr.RemoveAt(0);
        timesFailed--;
        lastKeys[lastKey] = keyInput;
    } else if (arr.length > 0 && keyInput == lastKeys[lastKey]) {
        blip.Stop();
        GameObject.Find(arr[0]).BroadcastMessage("changeColor");
        blip.Play();
    } else {
        GameObject.Find("Lives").BroadcastMessage("loseLife");
    }
}

// function bubbles2(){
//     for (var i; i<arr.length; i++){
//         if (keyInput == i){

//         }
//     }
}

function gameOver() {
    var GOTime: float;

    canvasGroup.alpha = 0;
    music.Stop();


    if (GO == false) {
        GOTime = Time.time;
        if (thescore == highScore) {
            Instantiate(GOHighScore, Vector3(0, 0, -3), Quaternion.identity);
        } else {
            Instantiate(GOLowScore, Vector3(0, 0, -3), Quaternion.identity);
        }
        GameObject.Find("ScoreText").BroadcastMessage("gameOverScore");
        GO = true;
    }

    Time.timeScale = 0.0001;
    yield WaitForSeconds(5 * Time.timeScale);

    if (Input.anyKeyDown || Time.time - GOTime > 15) {
        SceneManager.LoadScene('title_scene');

    }
}

function keepScore(score: int) {
    thescore = score;
}

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
