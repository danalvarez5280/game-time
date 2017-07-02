/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(1);

	var Game = __webpack_require__(5);

	const canvas = document.getElementById('frogger');
	const context = canvas.getContext('2d');

	const livesLabel = document.getElementById('lives');
	const levelLabel = document.getElementById('level');

	var frogger;

	function initialize() {
	  frogger = new Game(canvas, context);

	  frogger.addPlatforms();
	  frogger.addPlayers();
	  frogger.addMovers();

	  //move this into it's own function?
	  livesLabel.innerText = `Lives: ${frogger.player.lives}`;
	  levelLabel.innerText = `Level: ${frogger.currentLevel}`;

	  gameLoop();
	}

	function gameLoop() {
	  // order of drawing doodads: Platforms, Movers, Player
	  // console.log('loop');
	  frogger.clearCanvas();
	  frogger.drawPlatforms();
	  frogger.drawMovers();
	  frogger.tickCalc();
	  frogger.drawPlayer();
	  frogger.zoneCheck();
	  frogger.winCheck();
	  frogger.updateHeader(livesLabel, levelLabel);
	  // if (frogger.player.y >= 350 && frogger.player.y < 600) {
	  //   frogger.checkCollision();
	  // }
	  // if (frogger.player.y >= 50 && frogger.player.y < 300) {
	  //   frogger.checkCollisionWater();
	  // }
	  frogger.moveMovers();
	  requestAnimationFrame(gameLoop);
	}

	window.addEventListener('keydown', function (event) {
	  // console.log(event.keyCode);
	  switch (event.keyCode) {
	    case 39:
	      frogger.player.x += 50;
	      break;
	    case 37:
	      frogger.player.x -= 50;
	      break;
	    case 38:
	      frogger.player.y -= 50;
	      frogger.player.currentLane++;
	      break;
	    case 40:
	      frogger.player.y += 50;
	      frogger.player.currentLane--;
	      break;
	  }
	  frogger.player.animateOn = true;
	});

	initialize();

	//

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(2);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../node_modules/css-loader/index.js!./frog.css", function() {
				var newContent = require("!!../node_modules/css-loader/index.js!./frog.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, "#frogger {\n  border: 5px solid black;\n  display: block;\n  margin: auto;\n}\n", ""]);

	// exports


/***/ }),
/* 3 */
/***/ (function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	
	var Platform = __webpack_require__(6);
	var Player = __webpack_require__(8);
	var Mover = __webpack_require__(9);
	var Lane = __webpack_require__(10);
	var Lilypad = __webpack_require__(11);

	class Game {
	  constructor(canvas, context) {
	    this.canvas = canvas;
	    this.context = context;
	    this.platforms = [];
	    this.lanes = [];
	    this.player = undefined;
	    this.currentLevel = 1;
	  }

	  clearCanvas() {
	    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	  }

	  //TODO: maybe use the mover.walkable property to merge this function with
	  //      the water collision check function
	  checkCollision() {
	    // console.log('road collision');
	    for (let i = 0; i < this.lanes.length; i++) {
	      for (let j = 0; j < this.lanes[i].moversInMyLane.length; j++) {
	        let mover = this.lanes[i].moversInMyLane[j];
	        let frog = this.player;

	        //TODO: figgure out exact 'give' (right now it's 5)
	        //      do we need to actually check Y collisions?
	        if (mover.x < frog.x + (frog.width - 15) && mover.x + mover.width > frog.x + 15 && mover.y < frog.y + (frog.height - 15) && mover.height + mover.y > frog.y) {
	          this.resetPlayer(true);
	          // console.log('collision detected');
	          // collision detect
	        } else {
	            // no collision
	          }
	      }
	    }
	  }

	  //TODO: This function is proof of concept for detecting water collisions
	  //      it is not being called anywhere yet
	  checkCollisionWater() {
	    // console.log('water collision');
	    var didILand = false;

	    for (let j = 0; j < this.lanes[this.player.currentLane].moversInMyLane.length; j++) {
	      let lane = this.lanes[this.player.currentLane];
	      let mover = lane.moversInMyLane[j];
	      let frog = this.player;

	      if (frog.x > mover.x - 15 && frog.x < mover.x + mover.width && frog.x + frog.width > mover.x && frog.x + frog.width < mover.x + mover.width + 15) {
	        // console.log('frogX', frog.x, 'lane', i, 'mover', j, ':', mover.x);
	        didILand = true;
	        //landed but on a lily pad
	        if (frog.currentLane === this.lanes.length - 1) {
	          mover.model = frog.model;
	          mover.occupied = true;

	          this.resetPlayer(false);
	        } else {
	          //frog landed, but on a log
	          frog.x += lane.direction * lane.speed;
	        }
	      }
	    }
	    //did not land so i die
	    if (!didILand) {
	      this.resetPlayer(true);
	    }
	  }

	  borderCheck() {
	    if (this.player.x < 0) {
	      this.player.x = 0;
	    }
	    if (this.player.x > this.canvas.width - 50) {
	      this.player.x = this.canvas.width - 50;
	    }
	    if (this.player.y < 0) {
	      this.player.y = 0;
	    }
	    if (this.player.y > this.canvas.height - 50) {
	      this.player.y = this.canvas.height - 50;
	    }
	  }

	  winCheck() {
	    var lastLaneIndex = this.lanes.length - 1;
	    var lastLaneMovers = this.lanes[lastLaneIndex].moversInMyLane;
	    var didIWin = true;
	    // console.log(lastLane);

	    for (let i = 0; i < lastLaneMovers.length; i++) {
	      let mover = lastLaneMovers[i];
	      // console.log(mover);
	      if (mover.occupied === false) {
	        didIWin = false;
	        // console.log('asdfasdf');
	      }
	    }

	    if (didIWin === true) {
	      this.currentLevel++;
	      for (let i = 0; i < this.lanes.length; i++) {
	        this.lanes[i].speed = this.lanes[i].speed * 5.5;
	        // console.log(this.lanes[i].speed);
	        //reset lilipads model
	        //update current level label
	        //maybe update score
	      }

	      for (let i = 0; i < lastLaneMovers.length; i++) {
	        lastLaneMovers[i].occupied = false;
	        lastLaneMovers[i].model = 'pink';
	      }
	    }

	    //if all lilypads.model = frog.model then you win
	  }
	  // can't get this to run properly, ended up calling the if statment in the index
	  zoneCheck() {

	    this.borderCheck();

	    if (this.player.y >= 350 && this.player.y < 600) {
	      this.checkCollision();
	    }
	    if (this.player.y >= 0 && this.player.y < 300) {
	      this.checkCollisionWater();
	    }
	  }

	  addPlatforms() {
	    var startZone = new Platform(0, 600, this.canvas.width, 50, 'pink', true);

	    this.platforms.push(startZone);

	    var road = new Platform(0, 350, this.canvas.width, 250, 'black', true);

	    this.platforms.push(road);

	    var median = new Platform(0, 300, this.canvas.width, 50, 'green', true);

	    this.platforms.push(median);

	    var water = new Platform(0, 50, this.canvas.width, 250, 'blue', true);

	    this.platforms.push(water);

	    var endZone = new Platform(0, 0, this.canvas.width, 50, 'green', false);

	    this.platforms.push(endZone);
	  }

	  addPlayers() {
	    var playerImage = new Image();
	    playerImage.src = '../images/frog-spriteB.png';
	    this.player = new Player(350, 600, 50, 50, 'yellow', 3, playerImage);
	  }

	  addMovers() {

	    var start = new Lane('1', 0, 600);
	    var median = new Lane('1', 0, 300);
	    var end = new Lane('1', 0, 0);

	    var road1 = new Lane('-1', 1.3, 550);
	    var road2 = new Lane('1', 2.3, 500);
	    var road3 = new Lane('-1', 3.3, 450);
	    var road4 = new Lane('1', 4.3, 400);
	    var road5 = new Lane('-1', 5.3, 350);

	    var agua1 = new Lane('1', 1, 250);
	    var agua2 = new Lane('-1', 1, 200);
	    var agua3 = new Lane('1', 1, 150);
	    var agua4 = new Lane('-1', 1, 100);
	    var agua5 = new Lane('1', 1, 50);

	    var truck1 = new Mover(100, road1.y, 100, 50, 'red', false);
	    var truck2 = new Mover(250, road1.y, 100, 50, 'red', false);
	    var truck3 = new Mover(-100, road2.y, 125, 50, 'blue', false);
	    var truck4 = new Mover(-250, road2.y, 125, 50, 'blue', false);
	    var truck5 = new Mover(150, road3.y, 150, 50, 'purple', false);
	    var truck6 = new Mover(350, road3.y, 150, 50, 'purple', false);
	    var truck7 = new Mover(-100, road4.y, 50, 50, 'grey', false);
	    var truck8 = new Mover(-200, road4.y, 50, 50, 'grey', false);
	    var truck9 = new Mover(100, road5.y, 200, 50, 'orange', false);

	    var log1 = new Mover(-450, agua1.y, 650, 50, 'brown', true);
	    var log2 = new Mover(-150, agua1.y, 350, 50, 'brown', true);
	    var log3 = new Mover(150, agua2.y, 625, 50, 'brown', true);
	    var log4 = new Mover(300, agua2.y, 325, 50, 'brown', true);
	    var log5 = new Mover(-100, agua3.y, 600, 50, 'brown', true);
	    var log6 = new Mover(-300, agua3.y, 300, 50, 'brown', true);
	    var log7 = new Mover(-100, agua4.y, 675, 50, 'brown', true);
	    var log8 = new Mover(-300, agua4.y, 375, 50, 'brown', true);
	    var log9 = new Mover(300, agua5.y, 600, 50, 'brown', true);

	    var lilyPad1 = new Lilypad(125, end.y, 50, 50, 'pink', true, false);
	    var lilyPad2 = new Lilypad(250, end.y, 50, 50, 'pink', true, false);
	    var lilyPad3 = new Lilypad(375, end.y, 50, 50, 'pink', true, false);
	    var lilyPad4 = new Lilypad(500, end.y, 50, 50, 'pink', true, false);
	    var lilyPad5 = new Lilypad(625, end.y, 50, 50, 'pink', true, false);

	    road1.pushOntoLane(truck1);
	    road1.pushOntoLane(truck2);
	    road2.pushOntoLane(truck3);
	    road2.pushOntoLane(truck4);
	    road3.pushOntoLane(truck5);
	    road3.pushOntoLane(truck6);
	    road4.pushOntoLane(truck7);
	    road4.pushOntoLane(truck8);
	    road5.pushOntoLane(truck9);

	    agua1.pushOntoLane(log1);
	    // agua1.pushOntoLane(log2);
	    agua2.pushOntoLane(log3);
	    // agua2.pushOntoLane(log4);
	    agua3.pushOntoLane(log5);
	    // agua3.pushOntoLane(log6);
	    agua4.pushOntoLane(log7);
	    // agua4.pushOntoLane(log8);
	    agua5.pushOntoLane(log9);

	    end.pushOntoLane(lilyPad1);
	    // end.pushOntoLane(lilyPad2);
	    // end.pushOntoLane(lilyPad3);
	    // end.pushOntoLane(lilyPad4);
	    // end.pushOntoLane(lilyPad5);

	    this.lanes.push(start);
	    this.lanes.push(road1);
	    this.lanes.push(road2);
	    this.lanes.push(road3);
	    this.lanes.push(road4);
	    this.lanes.push(road5);
	    this.lanes.push(median);
	    this.lanes.push(agua1);
	    this.lanes.push(agua2);
	    this.lanes.push(agua3);
	    this.lanes.push(agua4);
	    this.lanes.push(agua5);
	    this.lanes.push(end);
	  }

	  drawPlatforms() {
	    for (let i = 0; i < this.platforms.length; i++) {
	      this.platforms[i].draw(this.context);
	    }
	  }

	  //TODO: because we want to use ticksPerFrame at 1, this could be greatly cleaned up
	  tickCalc() {
	    if (this.player.animateOn) {

	      this.player.tickCount += 1;
	      if (this.player.tickCount > this.player.ticksPerFrame) {
	        this.player.tickCount = 0; // we are drawing, so need to reset

	        if (this.player.frameIndex < this.player.numberOfFrames - 1) {
	          this.player.frameIndex += 1;
	        } else {
	          this.player.frameIndex = 0;
	          this.player.animateOn = false;
	        }
	      }
	    } else {
	      this.player.frameIndex = 0;
	    }
	  }

	  drawPlayer() {
	    // this.context.drawImage(
	    //   this.player.image, //image source
	    //   this.player.frameIndex * 50, // source x
	    //   0, //source y
	    //   50, //source width
	    //   50, //source height
	    //   this.player.x, //destination x
	    //   this.player.y, //destination y
	    //   50, // destination width
	    //   50); // destination height

	    this.player.draw(this.context);
	  }

	  drawMovers() {
	    for (let i = 0; i < this.lanes.length; i++) {
	      for (let j = 0; j < this.lanes[i].moversInMyLane.length; j++) {
	        this.lanes[i].moversInMyLane[j].draw(this.context);
	      }
	    }
	  }

	  moveMovers() {
	    for (let i = 0; i < this.lanes.length; i++) {
	      for (let j = 0; j < this.lanes[i].moversInMyLane.length; j++) {

	        if (this.lanes[i].direction === '1') {

	          if (this.lanes[i].moversInMyLane[j].x <= this.canvas.width) {
	            this.lanes[i].moversInMyLane[j].x += this.lanes[i].speed;
	          } else {
	            this.lanes[i].moversInMyLane[j].x = this.lanes[i].moversInMyLane[j].width * -1;
	          }
	        } else {

	          if (this.lanes[i].moversInMyLane[j].x + this.lanes[i].moversInMyLane[j].width >= 0) {
	            this.lanes[i].moversInMyLane[j].x -= this.lanes[i].speed;
	          } else {
	            this.lanes[i].moversInMyLane[j].x = this.canvas.width;
	          }
	        }

	        //else do this:
	      }
	    }
	  }

	  resetPlayer(didPlayerDie) {
	    if (didPlayerDie) {
	      this.player.lives--;
	    }
	    this.player.x = 350;
	    this.player.y = 600;
	    this.player.currentLane = 0;
	    // if ( this.player.lives <= 0) {
	    //game over
	    // }
	  }

	  //TODO: maybe instead of having this update 60 tiems a second,
	  //      we call this function from winCheck and zoneCheck
	  updateHeader(livesLabel, levelLabel) {
	    livesLabel.innerText = `Lives: ${this.player.lives}`;
	    levelLabel.innerText = `Level: ${this.currentLevel}`;
	  }

	}

	module.exports = Game;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	var Doodad = __webpack_require__(7);

	class Platform extends Doodad {
	  constructor(x, y, width, height, model, walkable) {
	    super(x, y, width, height, model);
	    this.walkable = walkable;
	  }

	  draw(context) {
	    super.draw(context);
	  }

	};

	module.exports = Platform;

/***/ }),
/* 7 */
/***/ (function(module, exports) {

	class Doodad {
	  constructor(x, y, width, height, model) {
	    this.x = x;
	    this.y = y;
	    this.width = width;
	    this.height = height;
	    this.model = model;
	  }

	  draw(context) {
	    context.fillStyle = this.model;
	    context.fillRect(this.x, this.y, this.width, this.height); // x, y, width, height
	  }

	};

	module.exports = Doodad;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	var Doodad = __webpack_require__(7);

	class Player extends Doodad {
	  constructor(x, y, width, height, model, lives, image) {
	    super(x, y, width, height, model);
	    this.lives = lives;
	    this.currentLane = 0;

	    this.image = image;
	    this.animateOn = false;
	    this.frameIndex = 0;
	    this.tickCount = 0;
	    this.ticksPerFrame = 1;
	    this.numberOfFrames = 7;
	  }

	  draw(context) {
	    context.drawImage(this.image, //image source
	    this.frameIndex * 50, // source x
	    0, //source y
	    50, //source width
	    50, //source height
	    this.x, //destination x
	    this.y, //destination y
	    50, // destination width
	    50); // destination height
	    //super.draw(context)
	  }

	}

	module.exports = Player;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	var Platform = __webpack_require__(6);

	class Mover extends Platform {

	  constructor(x, y, width, height, model, walkable) {
	    super(x, y, width, height, model, walkable);
	  }

	}

	module.exports = Mover;

/***/ }),
/* 10 */
/***/ (function(module, exports) {

	

	class Lane {
	  constructor(direction, speed, y) {
	    this.direction = direction;
	    this.speed = speed;
	    this.y = y;
	    this.moversInMyLane = [];
	  }

	  pushOntoLane(mover) {
	    this.moversInMyLane.push(mover);
	  }
	}

	module.exports = Lane;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	var Mover = __webpack_require__(9);

	class Lilypad extends Mover {
	  constructor(x, y, width, height, model, walkable, occupied) {
	    super(x, y, width, height, model, walkable);
	    this.occupied = occupied;
	  }
	}

	module.exports = Lilypad;

/***/ })
/******/ ]);