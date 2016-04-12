var Forum = {
	preview_form : function() 
	{
		$.ajax({
			type: "POST",
			url: "/pages/forums/forum_ajax.php",
			dataType: "xml",
			data: { mode:'preview', text: $('#i_content').val() }
		}).done(function(xml){	
			$('#msgpreview_content').html($(xml).find('html').text());
		
		//	$('#msginput').slideUp();
			$('#msgpreview').slideDown();
					
		//	$('#prebutton').text('Edit');
		//	$('#prebutton').attr("onclick", "Forum.edit_form()");
		});
	},
	
	edit_form : function()
	{
		/*$('#msginput').show();
		$('#msgpreview').hide();*/
		$('#msginput').animate({ height:"show" }, { duration:"slow", queue:false});
		$('#msgpreview').animate({ height:"hide" }, { duration:"slow", queue:false});
		$('#prebutton').html('Preview');
		$('#prebutton').attr("onclick", "Forum.preview_form()");
	},
	
	/* save post, creating a new one if none existed before */
	save : function()
	{
	  $.ajax({
			type: "POST",
			url: "/pages/forums/forum_ajax.php?mode=save",
			dataType: "xml",
			data: $('#forum').serialize()+'&posts='+$('#posts').length
		}).done(function(xml){	
  		if($('#posts').length)
			{
				
				$('#posts > tbody > tr:first').after($(xml).find('html').text());
			}
		});
	},
	
	del : function(button, id)
	{
		noty({
			text: '<p>Are you sure you want to delete this post?</p>',
			type: 'information',
			buttons: [ 
				{ addClass: 'positive', text: 'Ok', onClick: function($noty){
					$noty.close();
					$(button).replaceWith('<img id="wait" src="/images/icons/wait.gif" width="13" height="13" />');
					$.ajax({
						type: "POST",
						url: "/pages/forums/forum_ajax.php",
						dataType: "xml",
						data: { mode:'delete', id:id }
					}).done(function(xml){
						var a=$(xml).find('del').text();
						if(a>0) $('#message_'+a).remove();
						else {
							noty({
								text: $(xml).find('error').text(),
								type: 'error',
								timeout: 3000
							});
						}
					});	
				} },  
				{	text: 'Cancel', onClick: function($noty) { $noty.close(); } }
			]
		});
				
	
	},
	
	forumchange_running: false,
	
	edit : function(id,pid)
	{
		if(this.forumchange_running) return false;
		this.forumchange_running=true;
			
		var oldNode=$$('commentreplybox');
		var newNode=$$('message_'+id);
		oldNode.parentNode.removeChild(oldNode);
		newNode.appendChild(oldNode);
		newNode.scrollIntoView(false); 
	
		$('#i_id').val(id);
		$('#submitbutton').val('Save Edit');
		if(id==pid)	{ 
			$('#reply_id').val(0);
			$('#editheader').fadeIn();
			$('#replymsg').html('<strong>Post Heading: (editing main message)</strong>');
		}	else {
			$('#reply_id').val(pid);
			$('#editheader').fadeOut();
			$('#replymsg').html('<strong>Post Heading: (editing reply message)</strong>');
		}
		$('#is_edit').val(1);
	
		$.ajax({
			type: "POST",
			url: "/pages/forums/forum_ajax.php",
			dataType: "xml",
			data: { mode:'edit', id: id }
		}).done(function(xml){	
			$('#forum_dropdown').html($(xml).find('cat').text());
			$('#i_heading').val($(xml).find('heading').text());
			$('#i_content').val($(xml).find('text').text()).focus();			
		});
		this.forumchange_running=false;
	
		return true;
	},
	
	/* Moves the forum reply box so that its below the message being changesd. */
	move_reply: function(id)
	{
		var oldNode=$$('commentreplybox');
		var newNode=$$('message_'+id);
		oldNode.parentNode.removeChild(oldNode);
		newNode.appendChild(oldNode);
		newNode.scrollIntoView(false); 
		$('#i_content').focus();
	},
	
	reply: function(id,pid)
	{
		$('#reply_id').val(id);
		$('#is_edit').val(0);
		
		$('#editheader').fadeOut();
		$('#i_heading').val($('#heading_'+pid).html());
			
		$('#submitbutton').val('Post Reply');
		$('#replymsg').html('<strong>Post Heading: (reply to main message)</strong>');
	},
	
	fornews: function(id, state) {
		var val=(state.checked?1:0);
		$.ajax({
			type: "GET",
			url: "/pages/forums/forum_ajax.php",
			dataType: "xml",
			data: { mode:'fornew', id: id, state:val }
		});
	},

	forum_alert: function(id, state, user) 
	{
		var val=(state.checked?1:0);
		$.ajax({
			type: "GET",
			url: "/pages/forums/forum_ajax.php",
			dataType: "xml",
			data: { mode:'alert', id: id, state:val, user:user }
		});
	},
	
	reset_edit: function() 
	{
		var oldNode=$$('commentreplybox');
		var newNode=$$('message_new');
		oldNode.parentNode.removeChild(oldNode);
		newNode.appendChild(oldNode);
		newNode.scrollIntoView(false);
	
		$('#reply_id').val(0);
		$('#is_edit').val(0);
		$('#submitbutton').val('Post New Message');
	
		$('#replymsg').html('<strong>Post Heading: (new thread)</strong>');
		$('#i_content').focus();
	},
		
	formlock:false,
	button:null,
	
	new_post: function(button, id, replyid)	
	{
		if(!this.formlock)
		{
			this.formlock=true;
			this.button=button;
			$(button).after('<img id="wait" src="/images/icons/wait.gif" width="13" height="13" style="margin-left:5px" />');
			$.ajax({
				type: "POST",
				url: "/pages/forums/forum_ajax.php",
				dataType: "xml",
				data: { mode:'loadform', catid: id, reply: replyid }
			}).done(function(xml){
				var h=$(xml).find('htmlData').text();	
				$('#wait').remove();			
				$(button).removeClass('positive').after(h); 
				$('#i_heading').focus();
					
				$('#forum').submit(function(e) {
        	e.preventDefault();
					Forum.save();
					Forum.formlock=false;
					$('#forum').parent().remove();
					$(button).addClass('positive');
				});
			});
		}
	}
};