$(function(){
	set_story_divs_width();
	set_drag_and_drop_feature();
	move_stories_to_corresponding_status_column();
	set_web_socket_channel();
});

function set_story_divs_width(){
	$("[name=story_name]").each(function(index){
		var max_width = 190;
		var number_of_letters = $(this).text().length;
		var width = (number_of_letters * 12) + 30
		if (width > max_width) { width = max_width; }
		$(this).closest(".story").css("width", width);
	});
}

function set_drag_and_drop_feature(){
	$(".story").draggable({
		revert: "invalid",
		revertDuration: 250,
		helper: "original",
		opacity: 0.7
	});
	
	var color;
	inprogress_color = "#F5F6CE";
	done_color = "#CEF6D8";
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
			var new_status;
			if ($(this).attr("id").indexOf("drop_inprogress_") != -1) {
				$(ui.draggable).css("background-color", inprogress_color);
				new_status = 1;
			} else {
				$(ui.draggable).css("background-color", done_color);				
				new_status = 2;
			}
			$(this).css("background-color", color);
			$(ui.draggable).css({ zIndex: get_max_z_index() });
			set_status($(ui.draggable).closest(".story"), new_status);
			//setTimeout(publish_status_refresh, 2000);
			publish_status_refresh($(ui.draggable).closest(".story"), new_status);
		}
	});
}

function get_max_z_index(){
	var index_highest = 0;
	$("[id*=story_]").each(function(){
		index_current = parseInt($(this).css("zIndex"));
		if (index_current > index_highest) { index_highest = index_current; }
	});
	return index_highest + 1;
}

function set_status(div_story, new_status) {
	var story_id = $(div_story).attr("id").split('_')[1];
	$.ajax({
	    url: 'http://0.0.0.0:3000/set_status',
	    type: 'PUT',
	    data: 'id=' + story_id + '&new_status=' + new_status
			//,success: function() { alert('status set!' + new_status); }
	});
}

function publish_status_refresh(div_story, new_status) {
	var story_id = $(div_story).attr("id").split('_')[1];

	var faye = new Faye.Client('http://0.0.0.0:9292/faye');
	var publication = faye.publish('/refresh', { story_id: story_id, status: new_status });
	
	/*publication.callback(function() {
	  alert('Message received by server!');
	});

	publication.errback(function(error) {
	  alert('There was a problem: ' + error.message);
	});*/
}

function move_stories_to_corresponding_status_column(){
	inprogress_color = "#F5F6CE";
	done_color = "#CEF6D8";
	status_col_width = parseInt($(".inprogress").css("width")) + 20;
	
	$(".story").each(function(index){
		story_status = $(this).find("input[id=story_status]").val();
		
		if (story_status == 1) { 
			$(this).css("background-color", inprogress_color); 
			$(this).css("left", status_col_width); 
		}
		if (story_status == 2) { 
			$(this).css("background-color", done_color); 
			$(this).css("left", status_col_width * 2); 
		}
	});
}

function set_web_socket_channel() {
	var faye = new Faye.Client('http://0.0.0.0:9292/faye');
	var sub = faye.subscribe('/refresh', function(data){
		//alert(data.story_id + ' - ' + data.status);
		$("[id=story_" + data.story_id + "]").find("input[id=story_status]").val(data.status);
		move_stories_to_corresponding_status_column();
	});
	/*sub.callback(function(){ alert("callback"); });
	sub.errback(function(error){ alert(error.message); });*/
}