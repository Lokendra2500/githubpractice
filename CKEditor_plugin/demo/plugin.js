CKEDITOR.plugins.add( 'demo', {
    availableLangs: {en:1},
    lang: 'en',
    requires: ['dialog'],
	icons: 'demo',
    
	init: function(editor){
        
        var host='localhost:9090/ckeditor/ckeditor';
        var http = ('https:' == document.location.protocol ? 'https://' : 'http://');
        
        CKEDITOR.scriptLoader.load([
           http+host+'/js/eq_config.js',
		   http+host+'/js/eq_editor-lite-17.js',
        ]);
        
        var fileref = document.createElement("link");
        fileref.setAttribute("rel", "stylesheet");
        fileref.setAttribute("type", "text/css");
        fileref.setAttribute("href", http+host+'/plugins/demo/css/equation-embed.css');
        document.getElementsByTagName("head")[0].appendChild(fileref);
        
        CKEDITOR.dialog.add( 'demoDialog', this.path+ 'dialogs/demo.js');
        
        editor.addCommand( 'demo', new CKEDITOR.dialogCommand( 'demoDialog'));
        editor.ui.addButton( 'demo', {
            label: 'Insert Math Equation',
            command: 'demo',
            toolbar: 'insert'
        });
        editor.on( 'doubleclick', function(evt)
		{
			var element = evt.data.element;
			if (element && element.is('img'))
			{
				var sName = element.getAttribute('src').match( /(gif|svg)\.latex\?(.*)/ );
				if(sName!=null)
				{
					evt.data.dialog = pluginCmd;
					evt.cancelBubble = true;
					evt.returnValue = false;
					evt.stop();
				}
			}
		}, null, null, 1);

	}
});