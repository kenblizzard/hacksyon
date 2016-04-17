$(function() {

	var options = {
		responsive: true,

	};
	$.get('/result/candidates/matched', {}, function(data, status) {
		console.log(data, status);


		data = JSON.parse(data);
		var matched = [];
		console.log(data[0]._id);

		for(var i = 0; i < data.length; i ++) {
			console.log(data[i])
			switch(parseInt(data[i]._id)) {
				case 1: matched.push( {
					value: data[i].rating_sum,
					color:"#FF5722",
					highlight: "#FF7043",
					label: "Jejomar Binay"
				}); break;

				case 2: matched.push( {
					value: data[i].rating_sum,
					color:"#C62828",
					highlight: "#E53935",
					label: "Miriam Santiago"
				}); break;

				case 3: matched.push( {
					value: data[i].rating_sum,
					color:"#3F51B5",
					highlight: "#5C6BC0",
					label: "Rodrigo Duterte"
				}); break;

				case 4: matched.push( {
					value: data[i].rating_sum,
					color:"#2196F3",
					highlight: "#42A5F5",
					label: "Grace Poe"
				}); break;

				case 5: matched.push( {
					value: data[i].rating_sum,
					color:"#FBC02D",
					highlight: "#FDD835",
					label: "Mar Roxas"
				}); break;
			}
		}



		console.log(matched)
		var ctx = $("#myChart").get(0).getContext("2d");
		console.log(new Chart(ctx))
		var myPieChart = new Chart(ctx).Pie(matched,options);


	});


$.get('/result/candidates/preffered', {}, function(data, status) {


	data = JSON.parse(data);
	var matched = [];
	console.log(data[0]._id);

	for(var i = 0; i < data.length; i ++) {
		
		switch(data[i]._id) {
			case "1": matched.push( {
				value: data[i].rating_sum,
				color:"#FF5722",
				highlight: "#FF7043",
				label: "Jejomar Binay"
			}); break;

			case "2": matched.push( {
				value: data[i].rating_sum,
				color:"#C62828",
				highlight: "#E53935",
				label: "Miriam Santiago"
			}); break;

			case "3": matched.push( {
				value: data[i].rating_sum,
				color:"#3F51B5",
				highlight: "#5C6BC0",
				label: "Rodrigo Duterte"
			}); break;

			case "4": matched.push( {
				value: data[i].rating_sum,
				color:"#2196F3",
				highlight: "#42A5F5",
				label: "Grace Poe"
			}); break;

			case "5": matched.push( {
				value: data[i].rating_sum,
				color:"#FBC02D",
				highlight: "#FDD835",
				label: "Mar Roxas"
			}); break;
		}
	}

	
	console.log(data);

	var ctx2 = $("#myChart2").get(0).getContext("2d");
	console.log(new Chart(ctx2))
	var myPieChart2 = new Chart(ctx2).Pie(matched,options);


});


$.get('/result/issues', {}, function(data, status) {
	data = JSON.parse(data);

	$.ajax( {
		url : '/result/issues/api',
		crossOrigin: true,

		success :
		function(api, status) {
			api = JSON.parse(api);
			console.log(data)
			for(var i = 0; i < data.length; i++ ) {
				console.log('hello', api[parseInt(data[i]._id)]);

				if(!api[parseInt(data[i]._id)]) {
					continue
				}
				$("#tableIssues").append("<tr ><td class='text-center a"+(i+1)+"'>"+ (i + 1)+"</td><td>"
					+ api[parseInt(data[i]._id)-1].issue +"</td> <td>"+ data[i].rating_sum +"</td></tr>");
			}
		}
	});
});


$.get('/result/issues/candidates', {}, function(data, status) {
	data = JSON.parse(data);

	$.ajax( {
		url : '/result/issues/api',
		crossOrigin: true,

		success :
		function(api, status) {
			api = JSON.parse(api);
			console.log(api, data);
			var isRendered = [];
			for(var i = 0; i < data.length; i++ ) {

				if(isRendered[parseInt(data[i]._id.id)]) {
					continue;
				}
				isRendered[data[i]._id.id] = true;

				if(!api[parseInt(data[i]._id.id)]) {
					continue;
				}
				$("#tableIssuesCandidates").append("<tr ><td>"+ (i+1)+ "</td><td>"+ api[parseInt(data[i]._id.id)-1].issue +"</td>" +
					"<td class='text-center' >"+
					"<img class='col-md-3 col-sm-12 col-xs-12 img-cand-issue' src='img/ic_"+(data[i]._id.candidate_id)+".png'/> "
					 + "<span class='col-md-9 col-sm-12 col-xs-12'>" + data[i]._id.quote + "</span></td>" +
					 "<td>"+ data[i].rating_sum+ "</td>"
					+"</tr>");
			
			}
		}
	});
});

var electDay = new Date(2016, 04, 09);
var today = new Date();
var timeDiff = Math.abs(electDay.getTime() - today.getTime());
var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 

$('#daysLeft').text(diffDays + " DAYS LEFT");


$(".link").click(function() {
    $('html, body').animate({
        scrollTop: $($(".link").data("target")).offset().top
    }, 2000);
});

});