$(document).ready(function(){
	$("#search").click(function(){
		var input = $('<input />', {
	        'type': 'text',
	        'id': 'searchBar',
	        "placeholder":"Enter a search term and hit enter"
		});
		$(this).replaceWith(input);
		$('#searchBar').bind('keyup', function(e) {
			if ( e.keyCode === 13 ) { // 13 is enter key
				getResult();
			}
		});
		
		$("#reset").html("RESET PAGE");	
	});
	
	function getResult() {
		var inputValue = $("input").val();
		
		$.ajax({
			url:"https://en.wikipedia.org/w/api.php?action=opensearch&search=" + inputValue + "&format=json&callback=?",
			dataType:'json',
			type:"GET",
			async:false
			}).done	(function(data){
				$("#output").html("");
				$("#results").html("Results");
				for (i=0; i < data[1].length; i++) {
					$("#output").prepend("<li><a href= "+data[3][i]+">"+data[1][i]+"</a><p>"+data[2][i]+"</p>");
				}
				$("#searchBar").val("");
			}).fail (function (){
				alert("Unable to perform search at this time.");
			});
	}
	$("#reset").click (function(){
		window.location.reload();
	});
});