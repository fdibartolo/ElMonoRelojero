$(function(){
	
	/*calculate story width*/
	$("[name=story_name]").each(function(index){
		var number_of_letters = $(this).text().length;
		var width = (number_of_letters * 12) + 20
		$(this).closest(".story").css("width", width);
	});
	
	/*set drag and drop prefs*/
	$(".story").draggable({
		revert: "invalid",
		revertDuration: 250,
		helper: "original",
		opacity: 0.7
	});
	
	var color;
	var inprogress_color = "#F5F6CE";
	var done_color = "#CEF6D8";
	$("[id*=drop]").droppable({
		accept: ".story",
		over: function (e, ui) {
			color = $(this).css("background-color");
			$(this).css("background-color", "lightgray");
		},
		out: function (e, ui) {
			$(this).css("background-color", color);
		},
		drop: function(e, ui) {
			if ($(this).attr("id").indexOf("drop_inprogress_") != -1 ) {
				$(ui.draggable).css("background-color", inprogress_color);
			} else {
				$(ui.draggable).css("background-color", done_color);				
			}
			$(this).css("background-color", color);
		}
	});
});
