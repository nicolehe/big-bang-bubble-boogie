#pragma strict
import UnityEngine.SceneManagement;
var music: AudioSource;


var RedCircle: GameObject;
var GreenCircle: GameObject;
var YellowCircle: GameObject;
var WhiteCircle: GameObject;

var colors = ['red', 'green', 'white', 'yellow'];
var colorsOnScreen : Array;
var colorPick: String;
var correctButtons: Array;

var createdTime: float = 0;
var timeActive: float = 0;

var lastTime: float = 0;

var match : boolean = false;

var level: int = 0;
var circleOnScreen: int = 0;

var thisKey : String;

var circle1 : GameObject;
var circle2 : GameObject;
var circle3 : GameObject;

var circleInfo1 : Array;
var circleInfo2 : Array;
var circleInfo3 : Array;

var counting: float;

//change this variable to make levels shorter or longer, in seconds
var timeBetweenLevels = 20;

//change this variable to give players more or less time to react, in seconds
var timeToReact = 5;

function Start() {
    music.pitch = 1;

    //create arrays for which color circles are on screen and which buttons correspond to them
    colorsOnScreen = new Array();
    correctButtons = new Array();
}

function Update() {

    counting = Time.timeSinceLevelLoad - lastTime;

    //if 3 sec. have passed and players have not gotten all button presses correct yet, set number of circles on screen to 0 and subtract points for each circle remaining
    if(counting > 3 && circleOnScreen != 0){

    	for(var i = 0; i < circleOnScreen; i++){
    		GameObject.Find("ScoreText").BroadcastMessage("minusPoints");
    	}
    	circleOnScreen = 0;
    }

    if (level == 1) {
        music.pitch = 1;
    } else if (level == 2) {
        music.pitch = 1.1;
    } else if (level == 3) {
        music.pitch = 1.2;
    }

	//call function to instantiate circles at interval set by timeToReact variable
    if (counting > timeToReact) {
        displayCircles(level);
        lastTime = Time.timeSinceLevelLoad;
    }

    //if there are circles on screen, check for button presses
    if(circleOnScreen > 0){
    	keyCheck();
    }
 }

 function currentLevel(currentLevel : int) {
    level = currentLevel;
}


//display circles according to level passed in from update function
function displayCircles(lvl) {

	//The next three lines are a safety net. They should all clear naturally, but just in case everything will clear before adding new things
	colorsOnScreen.Clear();
	correctButtons.Clear();
	circleOnScreen = 0;

	//instantiate based on level
	if(lvl == 1) {

		circle1 = Instantiate(pickColor(), Vector3(0, 3, 0), Quaternion.identity);
        
	} else if(lvl == 2) {

		 circle1 = Instantiate(pickColor(), Vector3(-2, 3, 0), Quaternion.identity);
		 circle2 = Instantiate(pickColor(), Vector3(2, 3, 0), Quaternion.identity);

	} else if(lvl == 3) {
        
		 circle1 = Instantiate(pickColor(), Vector3(-4, 3, 0), Quaternion.identity);
		 circle2 = Instantiate(pickColor(), Vector3(0, 3, 0), Quaternion.identity);
		 circle3 = Instantiate(pickColor(), Vector3(4, 3, 0), Quaternion.identity);       

	}
}

//choose a random color and return the one selected every time this function is called from displayCircles
function pickColor() : GameObject {

	var colorPick = colors[Random.Range(0, colors.length)];

    colorsOnScreen.Push(colorPick);
    circleOnScreen += 1;

    if (colorPick == 'green') {
    	correctButtons.Push('g');
    	return GreenCircle;;

    } else if(colorPick == 'red') {
    	correctButtons.Push('r');
    	return RedCircle;

    } else if(colorPick == 'white') {
    	correctButtons.Push('w');
    	return WhiteCircle;

    } else if(colorPick == 'yellow') {
    	correctButtons.Push('y');
    	return YellowCircle;
    }
}

//called if user(s) press a button while circles are on screen
function keyCheck() {
	if(Input.anyKey) {

		//when a key press happens, compare it to the ones in the correctButtons array
		for(var i = 0; i < correctButtons.length; i++){
			thisKey = correctButtons[i];

			//if a match is found, add points, reduce circleOnScreen variable by 1, remove the corresponding key from the correctButtons array, and stop the entire keyCheck function
			if(Input.GetKey(thisKey)){
				GameObject.Find("ScoreText").BroadcastMessage("addPoints", counting);
				circleOnScreen -= 1;
				correctButtons.RemoveAt(i);
				return;
			}
			//if the function gets here, that means there was no match among the correctButtons array. Subtract points for an incorrect press
			GameObject.Find("ScoreText").BroadcastMessage("minusPoints");
		}
	}
}