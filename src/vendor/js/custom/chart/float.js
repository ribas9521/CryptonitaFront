$(function () {
    "use strict";
	var data = [], totalPoints = 100

	function getRandomData() {

	  if (data.length > 0)
		data = data.slice(1)

	  // Do a random walk
	  while (data.length < totalPoints) {

		var prev = data.length > 0 ? data[data.length - 1] : 50,
			y    = prev + Math.random() * 10 - 5

		if (y < 0) {
		  y = 0
		} else if (y > 100) {
		  y = 100
		}

		data.push(y)
	  }

	  // Zip the generated y values with the x values
	  var res = []
	  for (var i = 0; i < data.length; ++i) {
		res.push([i, data[i]])
	  }

	  return res
	}

	var interactive_plot = $.plot('#interactive', [getRandomData()], {
	  grid  : {
		borderColor: '#f3f3f3',
		borderWidth: 1,
		tickColor  : '#f3f3f3'
	  },
	  series: {
		shadowSize: 0, // Drawing is faster without shadows
		color     : '#108f2e'
	  },
	  lines : {
		fill : true, //Converts the line chart to area chart
		color: '#108f2e'
	  },
	  yaxis : {
		min : 0,
		max : 100,
		show: true
	  },
	  xaxis : {
		show: true
	  },
	  yaxis : {
                
		font : {
			color : '#CBD2E1'
		}
	  },
	  xaxis : {
			
			font : {
				color : '#CBD2E1'
			}
		}
	})

	var updateInterval = 500 //Fetch data ever x milliseconds
	var realtime       = 'on' //If == to on then fetch data every x seconds. else stop fetching
	function update() {

	  interactive_plot.setData([getRandomData()])

	  // Since the axes don't change, we don't need to call plot.setupGrid()
	  interactive_plot.draw()
	  if (realtime === 'on')
		setTimeout(update, updateInterval)
	}

	//INITIALIZE REALTIME DATA FETCHING
	if (realtime === 'on') {
	  update()
	}
	//REALTIME TOGGLE
	$('#realtime .btn').click(function () {
	  if ($(this).data('toggle') === 'on') {
		realtime = 'on'
	  }
	  else {
		realtime = 'off'
	  }
	  update()
	})
	/*
	 * END INTERACTIVE CHART
	 */

	/*
	 * LINE CHART
	 * ----------
	 */
	//LINE randomly generated data

	var sin = [], cos = []
	for (var i = 0; i < 14; i += 0.5) {
	  sin.push([i, Math.sin(i)])
	  cos.push([i, Math.cos(i)])
	}
	var line_data1 = {
	  data : sin,
	  color: '#01b8b4'
	}
	var line_data2 = {
	  data : cos,
	  color: '#ff9800'
	}
	$.plot('#line-chart', [line_data1, line_data2], {
	  grid  : {
		hoverable  : true,
		borderColor: '#394a67',
		borderWidth: 1,
		tickColor  : '#394a67'
	  },
hAxis: {
    textStyle:{color: '#FFF'}
},
	  series: {
		shadowSize: 0,
		lines     : {
		  show: true
		},
		points    : {
		  show: true
		}
	  },
	  lines : {
		fill : false,
		color: ['#3c8dbc', '#f56954']
	  },
	  yaxis : {
		show: true
	  },
	  xaxis : {
		show: true
	  },
	  yaxis : {
                
		font : {
			color : '#CBD2E1'
		}
	  },
	  xaxis : {
			
			font : {
				color : '#CBD2E1'
			}
		}
	})
	//Initialize tooltip on hover
	$('<div class="tooltip-inner" id="line-chart-tooltip"></div>').css({
	  position: 'absolute',
	  display : 'none',
	  opacity : 0.8
	}).appendTo('body')
	$('#line-chart').bind('plothover', function (event, pos, item) {

	  if (item) {
		var x = item.datapoint[0].toFixed(2),
			y = item.datapoint[1].toFixed(2)

		$('#line-chart-tooltip').html(item.series.label + ' of ' + x + ' = ' + y)
		  .css({ top: item.pageY + 5, left: item.pageX + 5 })
		  .fadeIn(200)
	  } else {
		$('#line-chart-tooltip').hide()
	  }

	})
	/* END LINE CHART */

	/*
	 * FULL WIDTH STATIC AREA CHART
	 * -----------------
	 */
	var areaData = [[2, 88.0], [3, 93.3], [4, 102.0], [5, 108.5], [6, 115.7], [7, 115.6],
	  [8, 124.6], [9, 130.3], [10, 134.3], [11, 141.4], [12, 146.5], [13, 151.7], [14, 159.9],
	  [15, 165.4], [16, 167.8], [17, 168.7], [18, 169.5], [19, 168.0]]
	$.plot('#area-chart', [areaData], {
	  grid  : {
		borderWidth: 0
	  },
	  series: {
		shadowSize: 0, // Drawing is faster without shadows
		color     : '#cb69dc'
	  },
	  lines : {
		fill: true //Converts the line chart to area chart
	  },
	  yaxis : {
		show: false
	  },
	  xaxis : {
		show: false
	  }
	})

	/* END AREA CHART */

	/*
	 * BAR CHART
	 * ---------
	 */

	var bar_data = {
	  data : [['January', 10], ['February', 8], ['March', 4], ['April', 13], ['May', 17], ['June', 9]],
	  color: '#ff404a'
	}
	$.plot('#bar-chart', [bar_data], {
	  grid  : {
		borderWidth: 1,
		borderColor: '#475877',
		tickColor  : '#475877'
	  },
	  series: {
		bars: {
		  show    : true,
		  barWidth: 0.5,
		  align   : 'center'
		}
	  },
	  xaxis : {
		mode      : 'categories',
		tickLength: 0
	  },
	  yaxis : {
                
		font : {
			color : '#CBD2E1'
		}
	  }
	})
	/* END BAR CHART */

	/*
	 * DONUT CHART
	 * -----------
	 */

	var donutData = [
	  { label: 'Series2', data: 30, color: '#03a9f4' },
	  { label: 'Series3', data: 20, color: '#ff9800' },
	  { label: 'Series4', data: 50, color: '#39b54a' }
	]
	$.plot('#donut-chart', donutData, {
	  series: {
		pie: {
		  show       : true,
		  radius     : 1,
		  innerRadius: 0.5,
		  label      : {
			show     : true,
			radius   : 2 / 3,
			formatter: labelFormatter,
			threshold: 0.1
		  }

		}
	  },
	  legend: {
		show: false
	  }
	})
	
	/*
	 * END DONUT CHART
	 */
	}); 
 function labelFormatter(label, series) {
	return '<div style="font-size:13px; text-align:center; padding:2px; color: #fff; font-weight: 600;">'
	  + label
	  + '<br>'
	  + Math.round(series.percent) + '%</div>'
  }
 