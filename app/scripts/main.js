require.config({
	paths: {
		jquery: '../bower_components/jquery/jquery',
		eve: '../bower_components/eve-adobe/eve',
		raphael: '../bower_components/raphael/raphael',
		'g.raphael': '../bower_components/g.raphael/g.raphael',
		'g.pie': '../bower_components/g.raphael/g.pie',
		'seedrandom': '../bower_components/seedrandom/seedrandom'
	},
	shim: {
		'eve': {
			exports: "eve"
		},
		'raphael': {
			deps: ["eve"],
			exports: "Raphael"
		},
		'g.raphael': ['raphael'],
		'g.pie': ['g.raphael']
	}
});

require(['seedrandom', 'raphael', 'g.pie'], function (seedrandom) {
	'use strict';
	// use app here

	// console.log(Raphael.fn.g.piechart);
	var r = Raphael("wheel", 800, 600),

	legend = ["Midi", "12h01", "12h02", "12h03", "12h04", "12h05", "12h06", "12h07", "12h08", "12h09", "12h10", "12h11", "12h12", "12h13", "12h14", "midi-écart"],

	pie = r.piechart(400, 300, 200, [1.015, 1.014, 1.013, 1.012, 1.011, 1.01, 1.009, 1.008, 1.007, 1.006, 1.005, 1.004, 1.003, 1.002, 1.001, 1.0],
		{ legend: legend,
		// legendpos: "south",
		// init: true,
		colors: ["#051039", "#FF0000", "#AED0CF", "#CDCDCD", "#ADA59A", "#ECB813", "#FF4B00", "#BAC900", "#595959", "#D2204C", "#55BCBE", "#3E647E", "#8F7092", "#EC7413", "#6F8793", "#526180"]
	});

	var today = new Date();

	Math.seedrandom(""+today.getDate()+"-"+today.getMonth()+"-"+today.getYear());
	var midi = document.getElementById("midi").firstChild,
		wheel = document.getElementById("wheel");

	wheel.className = 'click';
	wheel.onclick = function() {

		var max = 32,
			min = 48,
			angle = Math.floor((Math.random() * ((max + 1) - min)) + min);

		angle *= -360/16.0;

		var oldIndex = 0;
		var getCurrentTime = window.setInterval(function() {
			// try {
				var angle = (-pie.series[0].transform()[0][1]+11.25)%360;
				if (angle < 0) angle += 360;

				var currentIndex = parseInt((angle/360.0)*16);

				if (currentIndex != oldIndex) {
					// console.log(pie.labels);
					pie.labels[currentIndex].attr({"font-weight": 800});
					pie.labels[oldIndex].attr({"font-weight": 400});
					pie.series[currentIndex].attr({"stroke": "black", "stroke-width": 4}).toFront();
					pie.series[oldIndex].attr({"stroke": false});
					// console.log(legend[currentIndex]);
					midi.data = legend[currentIndex];
				}

				oldIndex = currentIndex;
			// } catch (e) {console.log(e)}
		}, 33);

		pie.series.animate({transform:"r"+angle+",400,300"}, 12000, "cubic-bezier(0,.36,.3,1)", function() {
			window.clearInterval(getCurrentTime);
			wheel.className = '';
		});

		wheel.className = 'wait';
		wheel.onclick = function() {};

		return false;
	};


	/*pie.hover(function () {
	this.sector.stop();
	this.sector.scale(1.1, 1.1, this.cx, this.cy);

	if (this.label) {
		this.label[0].stop();
		this.label[0].attr({ r: 7.5 });
		this.label[1].attr({ "font-weight": 800 });
	}
	}, function () {
	this.sector.animate({ transform: '...s1 1 ' + this.cx + ' ' + this.cy }, 500, "bounce");

	if (this.label) {
		this.label[0].animate({ r: 5 }, 500, "bounce");
		this.label[1].attr({ "font-weight": 400 });
	}
	});*/
});