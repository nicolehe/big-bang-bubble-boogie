#pragma strict
import UnityEngine.SceneManagement;

var RedCircle: GameObject;
var GreenCircle: GameObject;
var YellowCircle: GameObject;
var BlueCircle: GameObject;
var lastTime: float = 0;


function Start() {


	/*

	CHANGES TO MAKE:
	1) Connect scripts we will need to work with
		a) CirclesScript
		b) ScoreManager

	*/ 


}

function Update() {


	/*

	CHANGES TO MAKE:
	1) Allow user input to change counting on the fly (ex: goodHit will change counting so players aren't waiting too long for next circle)
	2) Add parameters to pickColor(), pickColor2(), etc. so that the x-positions in Vector3s can be passed in.

	*/ 


    //make a variable to keep track of how many seconds have elapsed since "lastTime"
    var counting = Time.timeSinceLevelLoad - lastTime;
    //every 5 seconds, run pickColor() and reset "lastTime"

    if (Time.timeSinceLevelLoad < 20) {

        if (counting > 5) {
            pickColor();
            lastTime = Time.timeSinceLevelLoad;
        }
    } else {
        if (counting > 5) {
            pickColor2();
            lastTime = Time.timeSinceLevelLoad;
        }
    }


}

function pickColor() {

	/*

	CHANGES TO MAKE:
	1) Break colorPick into its own function.
	2) Use position parameters passed into function.

	*/
    
    var colors = ['red', 'green', 'blue', 'yellow'];
    var colorPick = colors[Random.Range(0, colors.length)];
    print(colorPick);
    //depending on what was picked, create an instance of that color circle
    if (colorPick == "green") {
        Instantiate(GreenCircle, Vector3(0, 3, 0), Quaternion.identity);
    } else if (colorPick == "red") {
        Instantiate(RedCircle, Vector3(0, 3, 0), Quaternion.identity);
    } else if (colorPick == "blue") {
        Instantiate(BlueCircle, Vector3(0, 3, 0), Quaternion.identity);
    } else {
        Instantiate(YellowCircle, Vector3(0, 3, 0), Quaternion.identity);
    }

}

function pickColor2() {
    var colors = ['red', 'green', 'blue', 'yellow'];
    var colorPick = colors[Random.Range(0, colors.length)];
    var colorPick2 = colors[Random.Range(0, colors.length)];
    print(colorPick);
    //depending on what was picked, create an instance of that color circle
 
    /*

    CHANGES TO MAKE:
    1) Rather than redoing pickColor, use different parameters to run function above with different position instead

    */


    if (colorPick == "green") {
        Instantiate(GreenCircle, Vector3(-2, 3, 0), Quaternion.identity);
    } else if (colorPick == "red") {
        Instantiate(RedCircle, Vector3(-2, 3, 0), Quaternion.identity);
    } else if (colorPick == "blue") {
        Instantiate(BlueCircle, Vector3(-2, 3, 0), Quaternion.identity);
    } else if (colorPick == "yellow") {
        Instantiate(YellowCircle, Vector3(-2, 3, 0), Quaternion.identity);
    }

    if (colorPick2 == "green") {
        Instantiate(GreenCircle, Vector3(2, 3, 0), Quaternion.identity);
    } else if (colorPick2 == "red") {
        Instantiate(RedCircle, Vector3(2, 3, 0), Quaternion.identity);
    } else if (colorPick2 == "blue") {
        Instantiate(BlueCircle, Vector3(2, 3, 0), Quaternion.identity);
    } else if (colorPick2 == "yellow") {
        Instantiate(YellowCircle, Vector3(2, 3, 0), Quaternion.identity);
    }
}



//COLOR PICK FUNCTION

/*

ADD A NEW FUNCTION: controls the relationships between circles that have been pushed. Do they just need to be pushed in any order, or in sequence this round?
Maybe they need to be pushed down simultaneously. This function will also send the appropriate things to the CirclesScripts to ensure the score and when they
are destroyed works out.

*/