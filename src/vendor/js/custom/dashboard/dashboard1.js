$(function () {
    "use strict";
	Chart.defaults.global.defaultFontColor = '#8699bd';
	var data = [], totalPoints = 100

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
		borderColor: '#f3f3f3',
		borderWidth: 1,
		tickColor  : '#f3f3f3'
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
	
		//Polar Chart
		new Chart(document.getElementById("polar-chart"), {
			type: 'polarArea',
			data: {
			  datasets: [
				{
				  label: "Population (millions)",
				  backgroundColor: ["#36a2eb", "#ff6384","#4bc0c0","#ffcd56","#07b107"],
				  data: [2478,5267,5734,3784]
				}
			  ]
			}
		});
		
		//Radar chart
		new Chart(document.getElementById("radar-chart"), {
			type: 'radar',
			data: {
			  labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
			  datasets: [
				{
				  label: "250",
				  fill: true,
				  backgroundColor: "rgba(155,231,221,0.4)",
				  borderColor: "rgba(155,231,221,1)",
				  pointBorderColor: "#9be7dd",
				  pointBackgroundColor: "rgba(255,255,255,1)",
				  data: [65,59,90,81,56]
				}, {
				  label: "4050",
				  fill: true,
				  backgroundColor: "rgba(255,99,132,0.2)",
				  borderColor: "rgba(255,99,132,1)",
				  pointBorderColor: "#fff",
				  pointBackgroundColor: "rgba(255,99,132,1)",
				  pointBorderColor: "#fff",
				  data: [28,48,40,19,96,27]
				}
			  ]
			}
		});
		
		// Pie chart
		new Chart(document.getElementById("pie-chart"), {
			type: 'pie',
			data: {
			  datasets: [{
				label: "Population (millions)",
				backgroundColor: ["#2ddb62", "#bcccdc","#3ca7f9","#ff484a","#a78bd5"],
				data: [2478,5267,3734,2784]
			  }]
			}
		});
		
	}); 
 function labelFormatter(label, series) {
	return '<div style="font-size:13px; text-align:center; padding:2px; color: #fff; font-weight: 600;">'
	  + label
	  + '<br>'
	  + Math.round(series.percent) + '%</div>'
  }
 