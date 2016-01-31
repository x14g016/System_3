
function Jdash2(){
var SCREEN_WIDTH = 800; // 横幅
var SCREEN_HEIGHT = 600; // 縦幅

// 画像
// 部屋
var ROOM1_IMAGE = "Room1.png";// 正面(ドアあり)
var ROOM2_IMAGE = "Room2.png";// 右
var ROOM3_IMAGE = "Room3.png";// 後ろ
var ROOM4_IMAGE = "Room4.png";// 左
var QUES_IMAGE = "Ques.png"; // 問題

// アセットリスト
var ASSETS = [ ROOM1_IMAGE, ROOM2_IMAGE, ROOM3_IMAGE, ROOM4_IMAGE, QUES_IMAGE ];

/*
 * グローバル変数
 */
var game = null;

/*
 * 汎用処理
 */
// ランダム値生成
var randfloat = function(min, max) {
	return Math.random() * (max - min) + min;
};

/*
 * メイン処理
 */
window.onload = function() {
	// ゲームオブジェクトの生成
	game = new Game(SCREEN_WIDTH, SCREEN_HEIGHT);
	var isTouch = false; // タッチフラグ(タッチ中のみ true にする)
	var touchX = null; // タッチX座標
	var touchY = null; // タッチY座標

	game.preload(ASSETS);
	// 矢印
	game.preload("ArrowR.png");// 右
	game.preload("ArrowL.png");// 左
	game.preload("ArrowB.png");// 戻る
	// 扉
	game.preload("door.png");// ドアノブなし
	game.preload("door2.png");// ドアノブあり
	game.preload("door3.png");// ドア開く
	// ドアノブ
	game.preload("Doorknob.png");
	// キャンバス
	game.preload("Canvas.png");// 1:問題解答前
	game.preload("Canvas2.png");// 2:問題解答後
	// テーブル
	game.preload("Table.png");
	// パレット
	game.preload("Palette.png");
	// メッセージ
	game.preload("Mes1.png");// 1:パレット選択
	game.preload("Mes2.png");// 2:ドア選択(ドアノブなし)
	game.preload("Mes3.png");// 3:ドアノブ選択
	game.preload("Mes4.png");// 4:ドアノブドロップ
	game.preload("Mes5.png");// 5:問題解答後キャンバス
	// 選択肢
	game.preload("Cho1.png");// 1
	game.preload("Cho2.png");// 2
	game.preload("Cho3.png");// 3
	game.preload("Cho4.png");// 4
	// 解答
	game.preload("Ans.png");

	// ゲーム開始時の処理
	game.onload = function() {

		var scene = game.rootScene;
		scene.backgroundColor = "black";

		// 配列
		var item = Array();

		var e = 3;// ドアノブ用
		var a = 0;// 解答用
		var b = 0;// 選択肢用
		var m = 0;// メッセージ用
		var d = 0;// ドア用

		var view = 1;
		Room(view);

		// 部屋の絵表示
		function Room(view) {

			switch (view) {
			case 1:
				var room1 = new Sprite(800, 600);
				room1.image = game.assets[ROOM1_IMAGE];
				room1.moveTo(0, 0);
				scene.addChild(room1);
				Right();
				Left();
				Door();
				break;
			case 2:
				var room2 = new Sprite(800, 600);
				room2.image = game.assets[ROOM2_IMAGE];
				room2.moveTo(0, 0);
				scene.addChild(room2);
				Right();
				Left();
				Knob();
				break;
			case 3:
				var room3 = new Sprite(800, 600);
				room3.image = game.assets[ROOM3_IMAGE];
				room3.moveTo(0, 0);
				scene.addChild(room3);
				Right();
				Left();
				Table();
				Pal();
				break;
			case 4:
				var room4 = new Sprite(800, 600);
				room4.image = game.assets[ROOM4_IMAGE];
				room4.moveTo(0, 0);
				scene.addChild(room4);
				Right();
				Left();
				Can()
				Han()
				break;
			case 5:
				var ques = new Sprite(800, 600);
				ques.image = game.assets[QUES_IMAGE];
				ques.moveTo(0, 0);
				scene.addChild(ques);
				Cho1();
				Cho2();
				Cho3();
				Cho4();
				Back()
				break;
			}

			// 右矢印
			function Right() {
				var right = new Sprite(70, 79);
				right.image = game.assets["ArrowR.png"];
				right.moveTo(700, 200);
				scene.addChild(right);

				right.ontouchstart = function() {
					switch (view) {
					case 1:
						Room(2);
						m = 0;
						break;
					case 2:
						Room(3);
						m = 0;
						break;
					case 3:
						Room(4);
						m = 0;
						break;
					case 4:
						Room(1);
						m = 0;
						break;
					}
				};
			}

			// 左矢印
			function Left() {
				var left = new Sprite(70, 79);
				left.image = game.assets["ArrowL.png"];
				left.moveTo(50, 200);
				scene.addChild(left);

				left.ontouchstart = function() {
					switch (view) {
					case 1:
						Room(4);
						m = 0;
						break;
					case 2:
						Room(1);
						m = 0;
						break;
					case 3:
						Room(2);
						m = 0;
						break;
					case 4:
						Room(3);
						m = 0;
						break;
					case 5:
						break;
					}
				};
			}

			// 戻る
			function Back() {
				var back = new Sprite(79, 70);
				back.image = game.assets["ArrowB.png"];
				back.moveTo(350, 500);
				scene.addChild(back);

				back.ontouchstart = function() {
					switch (view) {
					case 1:
						break;
					case 2:
						break;
					case 3:
						break;
					case 4:
						break;
					case 5:
						Room(4);
						b = 0;
						m = 0;
						break;
					}
				};
			}

			return;

			// ドアノブ
			function Knob() {
				if (e == 2) {
					var key = new Sprite(45, 32);
					key.image = game.assets["Doorknob.png"];
					key.moveTo(180, 400);
					scene.addChild(key);
					key.ontouchstart = function() {
						key.moveTo(30, 300);
						e = 0;
						if (m == 0) {
							var msg3 = new Sprite(700, 450);
							msg3.image = game.assets["Mes3.png"];
							msg3.moveTo(50, 383);
							scene.addChild(msg3);
							m = 1;
							msg3.ontouchstart = function() {
								m = 0;
								Room(2);
							}
						}
					}
				}
				;
			}

			// ドア
			function Door() {
				var door = new Sprite(150, 225);
				if (d == 0) {
					door.image = game.assets["door.png"];// ドアノブなし
				} else {
					door.image = game.assets["door2.png"];// ドアノブあり
				}

				door.moveTo(325, 229);
				scene.addChild(door);
				door.ontouchstart = function() {
					if (e == 0 && d == 1) {
						door.image = game.assets["door3.png"];// ドアが開く
					} else if (e == 0) {
						door.image = game.assets["door2.png"];
						door.moveTo(325, 229);
						d = 1;
					} else {
						var msg2 = new Sprite(700, 450);
						msg2.image = game.assets["Mes2.png"];
						msg2.moveTo(50, 383);
						scene.addChild(msg2);
						msg2.ontouchstart = function() {
							m = 0;
							Room(1);
						}
					}
				}
			}

			// パレット
			function Pal() {
				var pal = new Sprite(100, 60);
				pal.image = game.assets["Palette.png"];
				pal.moveTo(400, 325);
				scene.addChild(pal);
				pal.ontouchstart = function() {
					if (m == 0) {
						var msg1 = new Sprite(700, 450);
						msg1.image = game.assets["Mes1.png"];
						msg1.moveTo(50, 383);
						scene.addChild(msg1);
						m = 1;
						msg1.ontouchstart = function() {
							m = 0;
							Room(3);
						}
					}
				}
			}

			// テーブル
			function Table() {
				var tab = new Sprite(182, 200);
				tab.image = game.assets["Table.png"];
				tab.moveTo(350, 350);
				scene.addChild(tab);
			}

			// キャンバス
			function Can() {
				if (e == 2 || e == 0) {
					var can = new Sprite(180, 295);
					can.image = game.assets["Canvas2.png"];
					can.moveTo(400, 250);
					scene.addChild(can);
					can.ontouchstart = function() {
						var msg5 = new Sprite(700, 450);
						msg5.image = game.assets["Mes5.png"];
						msg5.moveTo(50, 383);
						scene.addChild(msg5);
						m = 1;
						msg5.ontouchstart = function() {
							m = 0;
							Room(4);
						}
					}

				} else {
					var can = new Sprite(180, 295);
					can.image = game.assets["Canvas.png"];
					can.moveTo(400, 250);
					scene.addChild(can);
					can.ontouchstart = function() {
						Room(5);
					}
				}
			}

			// 選択肢
			function Cho1() { // 1
				var cho1 = new Sprite(100, 100); // 1
				cho1.image = game.assets["Cho1.png"];
				cho1.moveTo(50, 300);
				scene.addChild(cho1);
				cho1.ontouchstart = function() {
					var ques = new Sprite(100, 100);
					if (b == 0) {
						if (a == 0) {
							ques.image = game.assets["Ans.png"];
							ques.moveTo(50, 300);
							scene.addChild(ques);
							a = 1;
							b = 1;
						}
						{
						}
					} else if (b = 1) {
						a = 0;
						b = 0;
						Room(5);

					}

				}
			}

			function Cho2() { // 2
				var cho2 = new Sprite(100, 100); // 2
				cho2.image = game.assets["Cho2.png"];
				cho2.moveTo(250, 300);
				scene.addChild(cho2);
				cho2.ontouchstart = function() {
					var ques = new Sprite(100, 100);
					if (b == 0) {
						if (a == 0) {
							ques.image = game.assets["Ans.png"];
							ques.moveTo(250, 300);
							scene.addChild(ques);
							a = 2;
							b = 1;
							m = 1;
						}
						{
						}
					} else if (b = 1) {
						a = 0;
						b = 0;
						Room(5);
					}
				}
			}

			function Cho3() { // 3
				var cho3 = new Sprite(100, 100); // 3
				cho3.image = game.assets["Cho3.png"];
				cho3.moveTo(450, 300);
				scene.addChild(cho3);
				cho3.ontouchstart = function() {
					var ques = new Sprite(100, 100);
					if (b == 0) {
						if (a == 0) {
							ques.image = game.assets["Ans.png"];
							ques.moveTo(450, 300);
							scene.addChild(ques);
							a = 3;
							b = 1;
						}
						{
						}
					} else if (b = 1) {
						a = 0;
						b = 0;
						Room(5);
					}
				}
			}

			function Cho4() { // 4
				var cho4 = new Sprite(100, 100); // 4
				cho4.image = game.assets["Cho4.png"];
				cho4.moveTo(650, 300);
				scene.addChild(cho4);
				cho4.ontouchstart = function() {
					var ques = new Sprite(100, 100);
					if (b == 0) {
						if (a == 0) {
							ques.image = game.assets["Ans.png"];
							ques.moveTo(650, 300);
							scene.addChild(ques);
							a = 4;
							b = 1;
						}
						{
						}
					} else if (b = 1) {
						a = 0;
						b = 0;
						Room(5);
					}
				}
			}

			// 判定
			function Han() {
				if (a == 2 && m == 1) {
					var msg4 = new Sprite(700, 450);
					msg4.image = game.assets["Mes4.png"];
					msg4.moveTo(50, 383);
					scene.addChild(msg4);
					e = 2;
					m = 0;
					a = 0;
					msg4.ontouchstart = function() {
						Room(4);
					}

				} else {
					a = 0;
					b = 0;
				}
			}

		}// room

	};

	game.start();
};
}
