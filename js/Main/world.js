const WORLD_W = 35;
const WORLD_H = 35;
const WORLD_GAP = 2;
const WORLD_COLS = 50;
const WORLD_ROWS = 50;
var tileCollisionRect; // Used for displaying currently colliding rect

// var levelOne = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
// 				1, 1, 1, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
// 				1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
// 				1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1,
// 				1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
// 				1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
// 				1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1,
// 				1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
// 				1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
// 				1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
// 				1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
// 				1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
// 				1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
// 				1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
// 				1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
// 				1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
// 				1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
// 				1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
// 				1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 5, 5, 5, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1,
// 				1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
// 				1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]


var levelOne = [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 14,
	9, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 14,
	9, 25, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 14,
	9, 25, -1, -1, -1, -5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 25, 25, 25, 25, 25, 25, 25, 25, 25, 14,
	9, 25, -2, -1, -1, -1, -1, -1, 30, 30, 30, -1, -1, -5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 25, 25, 25, 25, 25, 14,
	9, 25, -1, 40, -1, -1, -1, 30, -1, -1, -1, -1, -1, -1, -3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 25, 14,
	9, 25, -1, -1, -1, -1, -1, -1, -1, -6, -1, -1, -1, -1, -1, -1, -6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 25, 14,
	9, 25,  0,  1,  1,  1,  1,  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 25, 14,
	9, 25,  3, -1, -1, -1,  7,  7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 25, 14,
	9, 25, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 25, 14,
	9, 25, -1, 29, -1, -1, -1, -1, -1, -1, -1, -1, 29, -1, -1, -1, -1, -1, -1, -1, -1, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 25, 14,
	9, 25, -1, 40, 40, 40, 40, -1, -1, -1, -1, -1, 49, -1, -1, -5, -1, -1, -1, -1, -1, -1, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 25, 14,
	9, 25, -1, 49, -1, -1, -1, -1, 41, 41, 41, 41, 41, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 25, 14,
	9, 25, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 25, 14,
	9, 25, -1, 43, 43, 43, -1, -1, 49, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 25, 14,
	9, 25, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 25, 14,
	9, 25, -1, 49, -1, -1, -1, -1, 42, 42, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 14,
	9, 25, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -5, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, 7, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 14,
	9, 25, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 14,
	9, 25, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, 7, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 14,
	9, 25, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 14,
	9, 25, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, 7, 8, -1, -1, -1, -1, -1, -1, 14,
	9, 25, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 14,
	9, 25, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 14,
	9, 25, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 14,
	9, 25, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 28, -1, 14,
	9, 25, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, 7, 8, -1, 14,
	9, 25, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 14,
	9, 25, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, 7, 8, -1, -1, -1, -1, -1, -1, 14,
	9, 25, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 28, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 14,
	9, 25, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 1, 1, 1, 1, 1, 1, 16, -16, 16, 16, 1, 1, 1, 1, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 14,
	9, 25, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -5, -1, -1, -1, -1, -1, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 14,
	9, 25, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -5, -1, -1, -1, -1, -1, -1, -1, -1, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 14,
	9, 25, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 14,
	9, 25, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 14,
	9, 25, -1, -1, 28, -1, -1, -1, 28, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 14,
	9, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 14,
	9, 3, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 14,
	9, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 14,
	9, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 14,
	9, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 14,
	9, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 14,
	9, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, 7, 7, 7, 7, 7, 7, 7, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 14,
	9, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 14,
	9, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 14,
	9, -1, -1, -1, -2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, 7, 7, 8, -1, -1, -1, -1, 14,
	9, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 14,
	9, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 14,
	9, 11, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 27, 10, 10, 27, -1, -1, -1, -1, -1, -1, -1, 27, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1, 27, 27, 27, 11,
	12, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 12, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, -15, -16, -16, 16, -17, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 11,
];

// Used for frame animation. Update to more optimized format
var frameRow = 0;


var worldGrid = [];
var currentLevel = 1; // This needs to get incremented every time a level is completed

const WORLD_BACKGROUND = -1;

const DOUBLE_PLATFORM_LEFT_TOP = 0;
const DOUBLE_PLATFORM_MIDDLE_TOP = 1;
const DOUBLE_PLATFORM_RIGHT_TOP = 2;
const DOUBLE_PLATFORM_LEFT_BOTTOM = 3;
const DOUBLE_PLATFORM_MIDDLE_BOTTOM = 7;
const DOUBLE_PLATFORM_RIGHT_BOTTOM = 5;

const SINGLE_CENTER = 4;

const SINGLE_PLATFORM_LEFT = 6;
const SINGLE_PLATFORM_MIDDLE = 7;
const SINGLE_PLATFORM_RIGHT = 8;

const TILE_BOUNDARY_1 = 9;
const TILE_BOUNDARY_2 = 10;
const TILE_BOUNDARY_3 = 11;
const TILE_BOUNDARY_4 = 12;
const TILE_BOUNDARY_5 = 13;
const TILE_BOUNDARY_6 = 14;

const SLIME_PIT_LEFT_TOP = 15;
const SLIME_PIT_MIDDLE_TOP = 16;
const SLIME_PIT_RIGHT_TOP = 17;

const SLIME_PIT_LEFT_TOP_ANIM = -15;
const SLIME_PIT_MIDDLE_TOP_ANIM = -16;
const SLIME_PIT_RIGHT_TOP_ANIM = -17;

const SLIME_PIT_LEFT_CENTER = 18;
const SLIME_PIT_MIDDLE_CENTER = 19;
const SLIME_PIT_RIGHT_CENTER = 20;

const SLIME_PIT_LEFT_BOTTOM = 21;
const SLIME_PIT_MIDDLE_BOTTOM = 22;
const SLIME_PIT_RIGHT_BOTTOM = 23;

const RED_TILE = 24;
const GREEN_VINE_WEBS = 25;
const WORLD_BACKGROUND_BROWN = 26;
const THORNS = 27;
const VINES_POISONOUS = 28;
const CRATE = 29;
const PICKUP = 30;

const PLATFORM_RIGHT = 40;
const PLATFORM_LEFT = 41;
const PLATFORM_UP = 42;
const PLATFORM_DOWN = 43;
const PLATFORM_DESTINATION = 49;
var PLATFORM_SPEEDS = [];
PLATFORM_SPEEDS[PLATFORM_RIGHT] = vector.create(1, 0);
PLATFORM_SPEEDS[PLATFORM_LEFT] = vector.create(-1, 0);
PLATFORM_SPEEDS[PLATFORM_UP] = vector.create(0, -1);
PLATFORM_SPEEDS[PLATFORM_DOWN] = vector.create(0, 1);

// const WORLD_PLATFORM = 1;
const WORLD_PLAYERSTART = -2;
const WORLD_ENEMY_DUMB_START = -3;
const WORLD_ENEMY_DUMB_DEST = -6;

const WORLD_GOAL = -4;

const WORLD_FLYING_ENEMY = -5; // spawns a flyingEnemy.js

const slimeLeftBlobSprite = new SpriteSheetClass(slimeLeftBlobAnim, WORLD_W, WORLD_H, 8, 5); // 8 frames, 5 ticks 
const slimeMiddleBlobSprite = new SpriteSheetClass(slimeMiddleBlobAnim, WORLD_W, WORLD_H, 8, 20); // 8 frames
const slimeRightBlobSprite = new SpriteSheetClass(slimeRightBlobAnim, WORLD_W, WORLD_H, 8, 5); // 8 frames, 5 ticks 
const diamondSprite = new SpriteSheetClass(diamondPickupAnim, WORLD_W / 2, WORLD_H / 2, 2, 60); // 2 frames, 20 ticks 



function returnAnimatedTileSprites(tileKindHere) {
	switch (tileKindHere) {
		case SLIME_PIT_LEFT_TOP_ANIM:
			return slimeLeftBlobSprite;
			break;
		case SLIME_PIT_MIDDLE_TOP_ANIM:
			return slimeMiddleBlobSprite;
			break;
		case SLIME_PIT_RIGHT_TOP_ANIM:
			return slimeRightBlobSprite;
			break;
		case PICKUP:
			return diamondSprite;
			break;
	}
}

function returnTileTypeAtColRow(col, row) {
	if (col >= 0 && col < WORLD_COLS &&
		row >= 0 && row < WORLD_ROWS) {
		var trackIndexUnderCoord = rowColToArrayIndex(col, row);
		return worldGrid[trackIndexUnderCoord];
	} else {
		console.log("TileHere is" + worldGrid[rowColToArrayIndex(col, row)]);
	}
}

function tileHarmsPlayer(tile) {
	return (tile == SLIME_PIT_LEFT_TOP ||
		tile == SLIME_PIT_MIDDLE_TOP ||
		tile == SLIME_PIT_RIGHT_TOP ||
		tile == SLIME_PIT_LEFT_TOP_ANIM ||
		tile == SLIME_PIT_MIDDLE_TOP_ANIM ||
		tile == SLIME_PIT_RIGHT_TOP_ANIM ||
		tile == SLIME_PIT_LEFT_CENTER ||
		tile == SLIME_PIT_MIDDLE_CENTER ||
		tile == SLIME_PIT_RIGHT_CENTER ||
		tile == SLIME_PIT_LEFT_BOTTOM ||
		tile == SLIME_PIT_MIDDLE_BOTTOM ||
		tile == SLIME_PIT_LEFT_TOP ||
		tile == SLIME_PIT_RIGHT_BOTTOM ||
		tile == RED_TILE ||
		tile == GREEN_VINE_WEBS ||
		tile == THORNS ||
		tile == VINES_POISONOUS)
}

function tileNearbyCollisionCheck(tileLeftHere, tileRightHere, tileUnderHere, tileOverHere, tileType, playerTrackCol, playerTrackRow) {
	tileCollisionRect = {
		x: (playerTrackCol) * WORLD_W,
		y: playerTrackRow * WORLD_H,
		width: WORLD_W,
		height: WORLD_H
	};
	if (tileLeftHere == tileType) {
		tileCollisionRect.x = (playerTrackCol - 1) * WORLD_W;
	}
	if (tileRightHere == tileType) {
		tileCollisionRect.x = (playerTrackCol + 1) * WORLD_W;
	}
	if (tileUnderHere == tileType) {
		tileCollisionRect.y = (playerTrackRow + 1) * WORLD_H;
	}
	if (tileOverHere == tileType) {
		tileCollisionRect.y = (playerTrackRow - 1) * WORLD_H;
	}
}

function playerWorldHandling(whichPlayer) {
	var playerTrackCol = Math.floor(whichPlayer.pos.x / WORLD_W);
	var playerTrackRow = Math.floor(whichPlayer.pos.y / WORLD_H);
	// var healthInterval;
	var tileindex = rowColToArrayIndex(playerTrackCol, playerTrackRow);
	// FIXED: this always evaluated to false
	//console.log("playerTrackCol=" + playerTrackCol); // "NaN"
	//console.log("player xy=" + whichPlayer.x + ',' + whichPlayer.y); // "undefined,undefined"

	if (playerTrackCol >= 0 && playerTrackCol < WORLD_COLS &&
		playerTrackRow >= 0 && playerTrackRow < WORLD_ROWS) {

		var tileHere = returnTileTypeAtColRow(playerTrackCol, playerTrackRow);
		var tileUnderHere = returnTileTypeAtColRow(playerTrackCol, playerTrackRow + 1);
		var tileRightHere = returnTileTypeAtColRow(playerTrackCol + 1, playerTrackRow);
		var tileLeftHere = returnTileTypeAtColRow(playerTrackCol - 1, playerTrackRow);
		var tileOverHere = returnTileTypeAtColRow(playerTrackCol, playerTrackRow - 1);

		tileCollisionRect = {
			x: (playerTrackCol) * WORLD_W,
			y: playerTrackRow * WORLD_H,
			width: WORLD_W,
			height: WORLD_H
		};

		if(whichPlayer.name == "dumb Enemy" && tileHere == WORLD_ENEMY_DUMB_DEST ){
			whichPlayer.toggleDirection = !whichPlayer.toggleDirection;
		}
		if (tileHere == PICKUP && whichPlayer.name == "Player") {
			tileCollisionRect.width = WORLD_W / 2;
			tileCollisionRect.height = WORLD_H / 2;
			var boundingResult = utils.rectIntersect(tileCollisionRect, whichPlayer.boundingBox);
			if (boundingResult) {
				whichPlayer.health++;
				worldGrid[tileindex] = -1;
			}
		}
		//TILEHERE IS THORN
		if (tileLeftHere == THORNS ||
			tileRightHere == THORNS ||
			tileUnderHere == THORNS ||
			tileOverHere == THORNS) {

			tileNearbyCollisionCheck(tileLeftHere, tileRightHere, tileUnderHere, tileOverHere, THORNS, playerTrackCol, playerTrackRow);

			var boundingResult = utils.rectIntersect(tileCollisionRect, whichPlayer.boundingBox);
			if (boundingResult) {
				// whichPlayer.spriteAnim = whichPlayer.hurtAnim;
				if (!whichPlayer.state.isHurt) {

					console.log(whichPlayer.name + " touched a thorn!");
					// healthInterval = intervalCall(whichPlayer.takeDamage(1), 100000);
					whichPlayer.takeDamage(1);
					// player.spriteAnim = player.hurtAnim;
				}
			}
		}
		//TILEHERE IS VINES_POISONOUS
		if (tileLeftHere == VINES_POISONOUS ||
			tileRightHere == VINES_POISONOUS ||
			tileUnderHere == VINES_POISONOUS ||
			tileOverHere == VINES_POISONOUS) {

			tileNearbyCollisionCheck(tileLeftHere, tileRightHere, tileUnderHere, tileOverHere, VINES_POISONOUS, playerTrackCol, playerTrackRow);

			var boundingResult = utils.rectIntersect(tileCollisionRect, whichPlayer.boundingBox);
			if (boundingResult) {
				// whichPlayer.spriteAnim = whichPlayer.hurtAnim;
				if (!whichPlayer.state.isHurt) {
					console.log(whichPlayer.name + " hurt by a vines");
					whichPlayer.takeDamage(1);
				}
			}
			// var boundingResult = utils.rectIntersect(tileCollisionRect, whichPlayer.boundingBox);
			// if(boundingResult){
			// 	// whichPlayer.spriteAnim = whichPlayer.hurtAnim;
			// console.log("I'm hurt");
			// }
		}

		if (tileUnderHere >= SLIME_PIT_LEFT_TOP && tileUnderHere <= SLIME_PIT_RIGHT_BOTTOM) {
			console.log(whichPlayer.name + " touched a slime!");
			whichPlayer.takeDamage(1);
		}

		if (tileHere == WORLD_GOAL) {
			console.log(whichPlayer.name + " WINS!");
			loadLevel(levelOne);
		} // end of track found
	} // end of valid col and row
} // end of playerTrackHandling func

function rowColToArrayIndex(col, row) {
	return col + WORLD_COLS * row;
}

function tileVisible(tx, ty) {
	//console.log("tileVisible "+tx+","+ty+" must be inside " + camPanX+","+camPanY+" and "+camPanX+canvas.width+","+camPanY+canvas.height);
	return (
		(tx >= camPanX - WORLD_W) &&
		(ty >= camPanY - WORLD_H) &&
		(tx <= camPanX + canvas.width) &&
		(ty <= camPanY + canvas.height));
}

function drawWorld() {
	var arrayIndex = 0;
	var drawTileX = 0;
	var drawTileY = 0;

	for (var eachRow = 0; eachRow < WORLD_ROWS; eachRow++) {
		for (var eachCol = 0; eachCol < WORLD_COLS; eachCol++) {
			var arrayIndex = rowColToArrayIndex(eachCol, eachRow);
			var tileKindHere = worldGrid[arrayIndex];
			//converting to see what this tile kind here index means 
			//Used for TIleset
			var tilesetRow = tileKindHere > 0 ? Math.floor(tileKindHere / 3) : 0;
			var tilesetCol = tileKindHere > 0 ? Math.floor(tileKindHere % 3) : 0; //Here 3 is columns in tileset
			// var useImg = trackPics[tileKindHere];
			// if (tileVisible(drawTileX, drawTileY)) {
			// 	if (!useImg) {
			// 		console.log("Missing trackPics[" + tileKindHere + "] in drawTracks!");
			// 		break;
			// 	}
			// }
			// canvasContext.drawImage(useImg, drawTileX, drawTileY);
			// var useImg = trackPics[tileKindHere];
			// if (tileVisible(drawTileX, drawTileY)) {
			// 	if (!useImg) {
			// 		console.log("Missing trackPics[" + tileKindHere + "] in drawTracks!");
			// 		break;
			// 	}
			// }
			if (tileKindHere != WORLD_BACKGROUND && tileKindHere != WORLD_ENEMY_DUMB_DEST) {
				if (isTileAnimated(tileKindHere)) {
					var animatedTile = returnAnimatedTileSprites(tileKindHere);
					animatedTile.update();
					animatedTile.draw(animatedTile.frameIndex, frameRow, drawTileX + WORLD_W / 2, drawTileY + WORLD_H / 2, false, false);
				}
				else {
					if (tileKindHere == CRATE) {
						canvasContext.drawImage(crateBox, drawTileX, drawTileY);
					}
					canvasContext.drawImage(slickTileSet,
						tilesetCol * WORLD_W, tilesetRow * WORLD_H, // top-left corner of tile art, multiple of tile width for clipped image
						WORLD_W, WORLD_H, // get full tile size from source
						drawTileX, drawTileY, // x,y top-left corner for image destination
						WORLD_W, WORLD_H); // stretch or shrink coordinates
				}
			}
			drawTileX += WORLD_W;
			arrayIndex++;
		} // end of for each col
		drawTileY += WORLD_H;
		drawTileX = 0;
	} // end of for each row
} // end of drawWorld func

function placeEntityOnWorldTileType(whichEntity, tileTypeToCheck) {
	whichEntity.pos = findCenterPositionOfTileType(tileTypeToCheck);
	setTileAtPositionToType(whichEntity.pos, WORLD_BACKGROUND);
}


function findCenterPositionOfTileType(tileTypeToCheck) {
	var tileCenterPosition = vector.create(0, 0);
	var arrayIndex = 0;
	for (var eachRow = 0; eachRow < WORLD_ROWS; eachRow++) {
		for (var eachCol = 0; eachCol < WORLD_COLS; eachCol++) {
			if (worldGrid[arrayIndex] == tileTypeToCheck) {
				tileCenterPosition.x = eachCol * WORLD_W + WORLD_W / 2;
				tileCenterPosition.y = eachRow * WORLD_H + WORLD_H / 2;
				return tileCenterPosition;
			} // end of player start if
			arrayIndex++
		} // end of col for
	} // end of row for
	console.log("NO TILE FOUND, type: (" + tileTypeToCheck + ")");
}

function setTileAtPositionToType(position, newType) {
	// assumes valid position
	var arrayIndex = positionToIndex(position);
	worldGrid[arrayIndex] = newType;
}

function isTransparentInBackground(tile) {
	return (
		tile == DOUBLE_PLATFORM_LEFT_BOTTOM ||
		tile == DOUBLE_PLATFORM_MIDDLE_BOTTOM ||
		tile == DOUBLE_PLATFORM_RIGHT_BOTTOM ||
		tile == SINGLE_CENTER ||
		tile == SINGLE_PLATFORM_LEFT ||
		tile == SINGLE_PLATFORM_MIDDLE ||
		tile == SINGLE_PLATFORM_RIGHT ||
		tile == SLIME_PIT_LEFT_TOP ||
		tile == SLIME_PIT_MIDDLE_TOP ||
		tile == SLIME_PIT_RIGHT_TOP ||
		tile == GREEN_VINE_WEBS ||
		tile == THORNS ||
		VINES_POISONOUS ||
		CRATE
	);
}

function isTileAnimated(tile) {
	return (
		tile == SLIME_PIT_LEFT_TOP_ANIM ||
		tile == SLIME_PIT_MIDDLE_TOP_ANIM ||
		tile == SLIME_PIT_RIGHT_TOP_ANIM ||
		tile == PICKUP
	);

}

function isPlatformAtPixelCoord(hitPixelX, hitPixelY) {
	var tileCol = hitPixelX / WORLD_W;
	var tileRow = hitPixelY / WORLD_H;
	// using Math.floor to round down to the nearest whole number
	tileCol = Math.floor(tileCol);
	tileRow = Math.floor(tileRow);

	if (tileCol > 0 && tileCol <= WORLD_COLS &&
		tileRow > 0 && tileRow <= WORLD_ROWS) {

		var brickIndex = rowColToArrayIndex(tileCol, tileRow);
		var tileHere = worldGrid[brickIndex];
		return tileCollidable(tileHere);	
	}	
}

//Just add any tile you want to act as collidable
function tileCollidable(tile){
		return ( 
			tile != WORLD_BACKGROUND &&
			tile != PICKUP &&
			tile != CRATE &&
			tile !=  PLATFORM_RIGHT &&
			tile !=  PLATFORM_LEFT &&
			tile !=  PLATFORM_UP &&
			tile !=  PLATFORM_DOWN &&
			tile != WORLD_ENEMY_DUMB_DEST 
			);
}
