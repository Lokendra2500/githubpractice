// Generally you should only need to change the host variable.
{
	var http = ('https:' == document.location.protocol ? 'https://' : 'http://');
 var host='localhost:9090/ckeditor/ckeditor';
	
	EQUATION_ENGINE = http+host;
	FAVORITE_ENGINE = http+host+'/json';
	EDITOR_SRC      = http+host;
	EMBED_ENGINE    = http+host+'/plugins/demo/js/editor_embedded_json.php';
	EDIT_ENGINE     = http+'www.codecogs.com/eqnedit.php';
	EDITOR_SW_FLASH = http+'download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0';
	EDITOR_SW_PLAYER= http+'www.macromedia.com/go/getflashplayer';
}