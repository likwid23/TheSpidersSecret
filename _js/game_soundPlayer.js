// JavaScript Document

$(document).ready(function(e) {
    
	function getInternetExplorerVersion()
	// Returns the version of Internet Explorer or a -1
	// (indicating the use of another browser).
	{
		var rv = -1; // Return value assumes failure.
		if (navigator.appName == 'Microsoft Internet Explorer')
		{
			var ua = navigator.userAgent;
			var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
			if (re.exec(ua) != null)
				rv = parseFloat( RegExp.$1 );
		}
		return rv;
	}
				
	var ver = getInternetExplorerVersion();
	
	
	var soundNames = new Array();
	
	if ( ver > -1 && ver <= 8.0)
	{
		
		$('body').append('<object id="sndFlash" type="application/x-shockwave-flash" data="../_assets/_swf/game_soundPlayer.swf" width="1" height="1" style="position:absolute; left:9999px;">'+
							
							'<param name="movie" value="../_assets/_swf/game_soundPlayer.swf" />'+
							'<param name="quality" value="high" />'+
							'<param name="wmode" value="transparent" />'+
							'<param name="allowScriptAccess" value="sameDomain" /></object>');
								
		var flashPlayer = document.getElementById('sndFlash');
				 
	} 
	
	function playSound(sn){
		if ( ver > -1 && ver <= 8.0){
			flashPlayer.game_playSound(soundNames[sn]);	  
		}else{
			soundNames[sn].play();
		}			
	}
	
	function addSound(sn){
		if ( ver > -1 && ver <= 8.0){
			soundNames[sn] = sn;
		}else{
			$('body').append('<audio id="'+ sn +'"><source src="../_assets/_snd/'+sn+'.ogg" type="audio/ogg"><source src="../_assets/_snd/'+sn+'.mp3" type="audio/mpeg"></audio>');
			var tempSnd = document.getElementById(sn);
			soundNames[sn] = tempSnd;
		}
	}
	
	 (function ( $ ) {
			$.fn.game_soundPlayer_add = function(soundName) {
				addSound(soundName);
				return this;
			};
	
			$.fn.game_soundPlayer_play = function(soundName) {
				playSound(soundName);
				return this;
			};
	}( jQuery ));
	
	
});