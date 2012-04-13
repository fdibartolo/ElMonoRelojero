$(function(){
	$(".story").draggable({
		revert: "invalid",
		revertDuration: 250,
		helper: "clone",
		opacity: 0.5
	});
	
	var color;
	$("#droptarget").droppable({
		accept: ".story",
		over: function (e, ui) {
			color = $(this).css("background-color");
			$(this).css("background-color", "lightgray");
		},
		out: function (e, ui) {
			$(this).css("background-color", color);
		},
		drop: function(e, ui) {
			var story_name = $(ui.draggable).find("h2").text();
			$(this).text(story_name);
			$(this).css("background-color", color);
		}
	});
});