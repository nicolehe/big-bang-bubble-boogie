#pragma strict
import UnityEngine.SceneManagement;
var music: AudioSource;
var blip: AudioSource;

var highScore;
public
var keyCode: KeyCode;

var RedCircle: GameObject;
var GreenCircle: GameObject;
var YellowCircle: GameObject;
var WhiteCircle: GameObject;

var GOLowScore: GameObject;
var GOHighScore: GameObject;

var happy: GameObject;

var colors = ['red', 'green', 'white', 'yellow'];
var colorsOnScreen: Array;
var colorPick: String;
var correctButtons: Array;
var bubbles: Array;
var yellows: Array;
var greens: Array;
var reds: Array;
var whites: Array;
var keyInputs: Array;

var createdTime: float = 0;
var timeActive: float = 0;

var lastTime: float = 0;

var match: boolean = false;

var level: int = 0;
var circleOnScreen: int = 0;

var thisKey: String;
var bubbleNum: int = 0;

var bubble: GameObject;
var circle: GameObject;
var circle2: GameObject;
var circle3: GameObject;
var circle4: GameObject;
var circle5: GameObject;
var circle6: GameObject;
var circle7: GameObject;
var circle8: GameObject;

var counting: float;

var timesFailed: int;

var GO = true;
var passed = false;
var gotOne = 0;

var bubbleTime: float;

//change this variable to make levels shorter or longer, in seconds
var timeBetweenLevels = 20;

//change this variable to give players more or less time to react, in seconds
var timeToReact = 5;
var lastW;
var lastR;
var lastG;
var lastY;

function Start() {
    Time.timeScale = 1;
    bubbleNum = 0;
    music.pitch = 1;

    timesFailed = 0;
    //create arrays for which color circles are on screen and which buttons correspond to them
    colorsOnScreen = new Array();
    correctButtons = new Array();
    yellows = new Array();
    reds = new Array();
    greens = new Array();
    whites = new Array();
    bubbles = new Array();
    keyInputs = new Array();

}

function Update() {
    //print(lastW);
    if (timesFailed < 0) {
        timesFailed = 0;
    }
    keyCheck();
    // print(yellows);
    // print(greens);
    // print(whites);
    // print(reds);

    switch (level) {
        case 1:
            bubbleTime = 3;
            music.pitch = 1;
            break;
        case 2:
            bubbleTime = 2;
            music.pitch = 1.1;
            break;
        case 3:
            bubbleTime = 1;
            music.pitch = 1.2;
            break;
        case 4:
            bubbleTime = 0.5;
            music.pitch = 1.3;
            break;
        case 5:
            bubbleTime = 0.3;
            music.pitch = 1.4;
            break;
        case 6:
            bubbleTime = 0.2;
            music.pitch = 1.5;
            break;

    }
    if (gotOne == level) {
        passed = true;
    }

    if (passed) {
        if (timesFailed > 0) {
            timesFailed--;
        }
        passed = false;
        gotOne = 0;
    }
    counting = Time.timeSinceLevelLoad - lastTime;




    if (counting > bubbleTime) {
        bubbleNum++;
        circle = GameObject.Instantiate(pickColor(), Vector3(Random.Range(-6.9, 6.9), -5, 0), Quaternion.identity);
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

    colorsOnScreen.Push(colorPick);
    circleOnScreen += 1;

    if (colorPick == 'green') {
        correctButtons.Push('g');
        return GreenCircle;;

    } else if (colorPick == 'red') {
        correctButtons.Push('r');
        return RedCircle;

    } else if (colorPick == 'white') {
        correctButtons.Push('w');
        return WhiteCircle;

    } else if (colorPick == 'yellow') {
        correctButtons.Push('y');
        return YellowCircle;
    }
}

function audienceNeg() {
    timesFailed++;
}



//called if user(s) press a button while circles are on screen
function keyCheck() {
    //print(lastW);
    if (Input.anyKeyDown) {
        keyInputs = ["q", "w", "a", "s", "e", "d", "r", "f", "g", "t", "y", "h", "u", "j", "k", "i"];
        var keyInput = Input.inputString;



        var key;
        if (Input.GetKey("q") || Input.GetKey("w") || Input.GetKey("a") || Input.GetKey("s")) {
            //var lastW = keyInput;
            key = "w";
        } else if (Input.GetKey("e") || Input.GetKey("d") || Input.GetKey("r") || Input.GetKey("f")) {
            //var lastR = keyInput;
            key = "r";
        } else if (Input.GetKey("g") || Input.GetKey("t") || Input.GetKey("y") || Input.GetKey("h")) {
           // var lastG = keyInput;
            key = "g";
        } else if (Input.GetKey("u") || Input.GetKey("j") || Input.GetKey("k") || Input.GetKey("i")) {
            //var lastY = keyInput;
            key = "y";
        }


        switch (key) {
            case "w":

                if (whites.length > 0 && keyInput != lastW) {
                    
                    //pick random white bubble that still exists
                    var num = Random.Range(0, whites.length);
                    GameObject.Find(whites[num]).BroadcastMessage("addPoints");
                    GameObject.Find(whites[num]).BroadcastMessage("destroy"); //.SendMessage("destroy");
                    whites.RemoveAt(num);
                    timesFailed--;
                    lastW = keyInput;
                } else if (whites.length > 0 && keyInput == lastW) {
                    blip.Stop();
                    print("NOPE, gotta change W");
                    blip.Play();
                } else {
                    GameObject.Find("Lives").BroadcastMessage("loseLife");
                }
                break;
            case "r":

                if (reds.length > 0 && keyInput != lastR) {
                    
                    num = Random.Range(0, reds.length);
                    GameObject.Find(reds[num]).BroadcastMessage("addPoints");
                    GameObject.Find(reds[num]).BroadcastMessage("destroy");
                    reds.RemoveAt(num);
                    timesFailed--;
                    lastR = keyInput;
                } else if (reds.length > 0 && keyInput == lastR) {
                    blip.Stop();
                    print("NOPE, gotta change R");
                    blip.Play();
                } else {
                    GameObject.Find("Lives").BroadcastMessage("loseLife");
                }
                break;
            case "g":
                if (greens.length > 0 && keyInput != lastG) {
                    
                    num = Random.Range(0, greens.length);
                    GameObject.Find(greens[num]).BroadcastMessage("addPoints");
                    GameObject.Find(greens[num]).BroadcastMessage("destroy");
                    greens.RemoveAt(num);
                    timesFailed--;
                    lastG = keyInput;
                } else if (greens.length > 0 && keyInput == lastG) {
                    blip.Stop();
                    print("NOPE, gotta change G");
                    blip.Play();
                } else {
                    GameObject.Find("Lives").BroadcastMessage("loseLife");
                }
                break;
            case "y":
                if (yellows.length > 0 && keyInput != lastY) {
                    
                    
                    num = Random.Range(0, yellows.length);
                    GameObject.Find(yellows[num]).BroadcastMessage("addPoints");
                    GameObject.Find(yellows[num]).BroadcastMessage("destroy");
                    yellows.RemoveAt(num);
                    timesFailed--;
                    lastY = keyInput;
                } else if (yellows.length > 0 && keyInput == lastY) {
                    blip.Stop();
                    print("NOPE, gotta change Y");
                    blip.Play();
                } else {
                    GameObject.Find("Lives").BroadcastMessage("loseLife");
                }
                break;
        }

    }
}

function gameOverFailed() {
    Time.timeScale = 0;
    music.Stop();
    if (GO == true) {
        Instantiate(GOLowScore, Vector3(0, 0, 0), Quaternion.identity);
        GO = false;
    }
    if (Input.anyKey) {
        GO = true;
        GameObject.Find("GameOverLowScore(Clone)").BroadcastMessage("destroy");
        SceneManager.LoadScene('title_scene');

    }
}

function gameOverHighScore() {
    Time.timeScale = 0;
    music.Stop();
    if (GO == true) {
        Instantiate(GOHighScore, Vector3(0, 0, 0), Quaternion.identity);
        GO = false;
    }
    if (Input.anyKey) {
        GO = true;
        GameObject.Find("GameOverHighScore(Clone)").BroadcastMessage("destroy");
        SceneManager.LoadScene('title_scene');

    }
}
