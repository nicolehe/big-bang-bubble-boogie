#pragma strict
var createdTime: float = 0;

function Start() {

    createdTime = Time.timeSinceLevelLoad;

}

function Update() {

    //make a variable to measure the current time
    var currentTime = Time.timeSinceLevelLoad;
    //make a variable to count how many seconds have elapsed since the circle was created
    var counting = currentTime - createdTime;


    //if the text has existed for more than 2 seconds, destroy it
    if (counting > 1) {
        Destroy(gameObject);
    }
}
