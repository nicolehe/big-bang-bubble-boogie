#pragma strict

var happy: Sprite;
var meh: Sprite;
var bad: Sprite;

public var happyC: RuntimeAnimatorController;
public var mehC: RuntimeAnimatorController;
public var badC: RuntimeAnimatorController;



function happyFace() {
	GetComponent(SpriteRenderer).sprite = happy;
	GetComponent(Animator).runtimeAnimatorController = happyC;

}

function mehFace() {
	GetComponent(SpriteRenderer).sprite = meh;
	GetComponent(Animator).runtimeAnimatorController = mehC;

}

function badFace() {
	GetComponent(SpriteRenderer).sprite = bad;
	GetComponent(Animator).runtimeAnimatorController = badC;

}