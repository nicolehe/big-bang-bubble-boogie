#pragma strict
import UnityEngine.SceneManagement;
var music: AudioSource;

var highScore;


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

}

function Update() {
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



    //if 3 sec. have passed and players have not gotten all button presses correct yet, set number of circles on screen to 0 and subtract points for each circle remaining
    if (counting > bubbleTime && circleOnScreen != 0) {

        // for (var i = 0; i < circleOnScreen; i++) {
        //     GameObject.Find("ScoreText").BroadcastMessage("minusPoints");
        // }
        timesFailed++;
        circleOnScreen = 0;
    }


    //call function to instantiate circles at interval set by timeToReact variable
    if (counting > bubbleTime) {
        bubbleNum++;
        circle = GameObject.Instantiate(pickColor(), Vector3(Random.Range(-6.9, 6.9), -5, 0), Quaternion.identity);
        if (circle.gameObject.name == "YellowCircle(Clone)") {
            circle.name = "y" + bubbleNum;
            yellows.Push(circle);
        } else if (circle.gameObject.name == "RedCircle(Clone)") {
            circle.name = "r" + bubbleNum;
            reds.Push(circle);
        } else if (circle.gameObject.name == "GreenCircle(Clone)") {
            circle.name = "g" + bubbleNum;
            greens.Push(circle);
        } else if (circle.gameObject.name == "WhiteCircle(Clone)") {
            circle.name = "w" + bubbleNum;
            whites.Push(circle);
        }
        //print(circle.name);
        //circle.gameObject.name = "b" + bubbleNum;
        lastTime = Time.timeSinceLevelLoad;
        //bubbles.Push(circle);

    }

    //if there are circles on screen, check for button presses
    if (circleOnScreen > 0) {
        keyCheck();
    } else {
        if (Input.anyKeyDown) {
            GameObject.Find("ScoreText").BroadcastMessage("minusPoints");
        }
    }

    if (timesFailed == 0) {
        GameObject.Find("Audience").BroadcastMessage("happyFace");
    } else if (timesFailed == 1) {
        GameObject.Find("Audience").BroadcastMessage("mehFace");
    } else if (timesFailed == 2) {
        GameObject.Find("Audience").BroadcastMessage("badFace");
    } else if (timesFailed >= 3) {
        gameOverFailed();
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

//called if user(s) press a button while circles are on screen
function keyCheck() {

    if (Input.anyKeyDown) {
        var key;
        if (Input.GetKey("q") || Input.GetKey("w") || Input.GetKey("a") || Input.GetKey("s")) {
            key = "w";
        } else if (Input.GetKey("e") || Input.GetKey("d") || Input.GetKey("r") || Input.GetKey("f")) {
            key = "r";
        } else if (Input.GetKey("g") || Input.GetKey("t") || Input.GetKey("y") || Input.GetKey("h")) {
            key = "g";
        } else if (Input.GetKey("u") || Input.GetKey("j") || Input.GetKey("k") || Input.GetKey("i")) {
            key = "y";
        }

        switch (key) {
            case "w":
                if (whites.length > 0) {
                    GameObject.Find("ScoreText").BroadcastMessage("addPoints", counting);
                    //pick random white bubble that still exists
                    var num = Random.Range(0, whites.length);
                    var name = whites[num];
                    print(name);
                    whites.RemoveAt(num);
                    GameObject.Find(name).BroadcastMessage("destroy");

                } else {
                    GameObject.Find("Lives").BroadcastMessage("loseLife");
                }
                break;
            case "r":
                if (reds.length > 0) {
                    GameObject.Find("ScoreText").BroadcastMessage("addPoints", counting);
                    //pick random white bubble that still exists
                    num = Random.Range(0, reds.length);
                    name = reds[num];
                    print(name);
                    reds.RemoveAt(num);
                    GameObject.Find(name).BroadcastMessage("destroy");

                } else {
                    GameObject.Find("Lives").BroadcastMessage("loseLife");
                }
                break;
            case "g":
                if (greens.length > 0) {
                    GameObject.Find("ScoreText").BroadcastMessage("addPoints", counting);
                    //pick random white bubble that still exists
                    num = Random.Range(0, greens.length);
                    name = greens[num];
                    print(name);
                    whites.RemoveAt(num);
                    GameObject.Find(name).BroadcastMessage("destroy");

                } else {
                    GameObject.Find("Lives").BroadcastMessage("loseLife");
                }
                break;
            case "y":
                if (yellows.length > 0) {
                    GameObject.Find("ScoreText").BroadcastMessage("addPoints", counting);
                    //pick random white bubble that still exists
                    num = Random.Range(0, yellows.length);
                    name = yellows[num];
                    yellows.RemoveAt(num);
                    GameObject.Find(name).BroadcastMessage("destroy");

                } else {
                    GameObject.Find("Lives").BroadcastMessage("loseLife");
                }
                break;
        }

        // //when a key press happens, compare it to the ones in the correctButtons array
        // for (var i = 0; i < correctButtons.length; i++) {
        //     thisKey = correctButtons[i];
        //     print("bubble" + (i + 1));
        //     //if a match is found, add points, reduce circleOnScreen variable by 1, remove the corresponding key from the correctButtons array, and stop the entire keyCheck function
        //     if (key == thisKey) {
        //         GameObject.Find("ScoreText").BroadcastMessage("addPoints", counting);
        //         gotOne++;
        //         circleOnScreen -= 1;
        //         correctButtons.RemoveAt(i);

        //         GameObject.Find("bubble" + (i + 1)).BroadcastMessage("destroy");
        //         bubbles.RemoveAt(i);
        //         return;
        //     }

        // }
        // //if the function gets here, that means there was no match among the correctButtons array. Subtract points for an incorrect press
        // GameObject.Find("ScoreText").BroadcastMessage("minusPoints");
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
