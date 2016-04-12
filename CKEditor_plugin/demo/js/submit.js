/* 
 Copyright CodeCogs 2006-2008
 Written by Will Bateman.
*/
function addText(wnd,id, txt ) 
{
  var myField = wnd.getElementById(id);
  txt+=' ';
	var pos;
	var txtsel=0;   // How much to select
  var txtlen=txt.indexOf('...');
	if(txtlen==-1) txtlen=txt.length;
	else txtsel=3;
	// IE 
  if (wnd.selection) 
  {
    myField.focus();
		
    sel = wnd.selection.createRange();
	  
		// Find position of caret
		var i = myField.value.length+1; 
		theCaret = sel.duplicate(); 
		while (theCaret.parentElement()==myField 
		&& theCaret.move("character",1)==1) --i; 
	
		// take account of line feeds
		
		var pos = i - myField.value.split('\n').length + 1 + txtlen; 
				
    sel.text = txt;

		var range = myField.createTextRange();
		range.collapse(true);
		range.moveEnd('character', pos+txtsel);
		range.moveStart('character', pos);
		range.select(); 
	}
  // MOZILLA
  else 
  {
		var scrolly=myField.scrollTop;
		var pos;
    if (myField.selectionStart || myField.selectionStart == '0') 
    {
      var startPos = myField.selectionStart;
      var endPos = myField.selectionEnd;
      myField.value = myField.value.substring(0, startPos) 
	        + txt 
					+ myField.value.substring(endPos, myField.value.length);
		  pos=startPos + txtlen;
    } 
    else 
    {
      myField.value += txt;
    	pos=myField.value.length;
    }
		myField.focus();
	  myField.setSelectionRange(pos,pos+txtsel);
		myField.scrollTop=scrolly;
  }	
}
 
function markup(elementType,id)
{
  var txt = '';
  switch( elementType )
  { 
		case 'bold' : txt = '\\b';
		break;
		case 'italic' : txt = '\\e';
		break;
	  case 'codetemplate' :
		txt = '//! Brief Description\n'
        + '/*!\n'
        + 'Detailed Description...\n\n'
        + '\\param [details of 1st parameters here]\n\n'
        + '\\return [details of any return value here]\n\n'
        + '\\par Example\n'
        + '\\code\n'
        + '  [working example goes here]\n'
        + '\\endcode\n'
        + '\\b Output:\n'
        + '\\code\n'
        + '  [output from working example goes here]\n'
        + '\\endcode\n\n'
		    + '\\author ' + document.getElementById('authordetails').value + '\n'
        + '\\par References:\n'
        + '  [enter references here]\n'
				+ '*/\n'
				+ '[ENTER YOUR SOURCE CODE HERE]\n';
		break;
    case 'function' : 
	  txt = '//! Brief Description\n'
	      + '/*!\nDetailed Description...\n\n*/';  
	      + 'double fn()\n{\n}\n'; 
	  break; 
		
    case 'note' : 
	  txt = '\\note ' + prompt('Enter the note text here') + '\n'; 
	  break; 
    case 'input_params' :
	  txt = '\\param ' + prompt('Enter the parameter name') + ' ' + prompt('Describe the parameter') + '\n';
	  break; 
    case 'return_val' :
	  txt = '\\return ' + prompt('Describe the function\'s return value') + '\n'; 
	  break; 
    case 'example' :  
	  txt = '\\example\n'
	      + '\\code\n'
		  + '  [working example foes here]\n'
		  + '\\endcode\n'
		  + '\\b Output:\n'
		  + '\\code\n'
		  + '  [output from working example goes here]\n'
		  + '\\endcode\n';
	  break; 
    case 'references' :  
	  txt = '\\par References: ' + prompt('Enter the reference here') + '\n';
	  break;
		case 'compatibility' :
		txt = '\\par Compatibility\n'
		    + '\begin{html}\n'
				+ '<table class="compat">\n'
				+ '<tr><th></th><th>DOS</th><th>UNIX</th><th>Windows</th><th>ANSI C</th><th>C++ only</th></tr>\n'
				+ '<tr><td>[fn]</td><td>&bull; [DOS]</td><td>&bull; [UNIX]</td><td>&bull; [Windows]</td><td>&bull; [ANSI]</td><td>&bull; [C++]</td></tr>\n'
        + '</table>\n\end{html}\n';
		break;
    default : txt = '';
  }
  insertText(txt,id);
} 

function insertText(txt,id) { addText(document,id,txt); }



myUndo=0;
myRedo=0;
store_text=new Array();

//store_text[0] store initial textarea value
store_text.push("");
var lastkey=0;

function countclik(box,e, tag) {
  if (window.event)
    key=window.event.keyCode;
  else if (e) key=e.which;

  if((key!=32 && key!=8 && key!=46) || key==lastkey)
	{
    lastkey=key; 
		return;
	}
	
	lastkey=key;
	myUndo-=myRedo;
	if(myUndo>10) store_text.shift();
	else myUndo++;
	
	store_text[myUndo]=tag.value;
	myRedo=0;
	$('#redobutton_'+box).attr('class',"img_redo_x");
  $('#undobutton_'+box).attr('class',"img_undo");
}

function undo(box) {
	tag=document.getElementById(box);
	if(myRedo==0)
	{
    if(myUndo>10) store_text.shift();
	  else myUndo++;
		store_text[myUndo]=tag.value;
	}
	
  if (myRedo<myUndo) {
    myRedo++;
		if(myRedo==myUndo) $('#undobutton_'+box).attr('class',"img_undo_x");
		$('#redobutton_'+box).attr('class',"img_redo");
  } 
	else return;
	
  var z=store_text.length - myRedo-1;
  if (store_text[z])	tag.value=store_text[z];
  else tag.value=store_text[0];
	tag.focus();
}

function redo(box) {
	tag=document.getElementById(box);
  if(myRedo>0) {
    myRedo--;
		if(myRedo==0) $('#redobutton_'+box).attr('class',"img_redo_x");
		$('#undobutton_'+box).attr('class',"img_undo");
  } 
	else return;
  
  var z=store_text.length - myRedo-1;
  if (store_text[z]) tag.value=store_text[z];
  else tag.value=store_text[0];
	tag.focus();
}