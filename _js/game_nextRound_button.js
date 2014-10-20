// JavaScript Document

$(document).ready(function(e) {
	
	
    
	var round_i = 0;
	var round_stage = $('.game_stage');
	
	var sprite_feedback = $('.game_roundFeedback');
	var hasSpriteFeedback = false;
	
	if(sprite_feedback.length > 0){
		hasSpriteFeedback = true;
	}
	
	
	(function ( $ ) {
	$.fn.game_nextRound_button = function(opt) {
		
		var defaults = {
 
			// We define an empty anonymous function so that
			// we don't need to check its existence before calling it.
			hideStage: true,
			onNext : function() {
				console.log('Default Next Round');	
			}
		 
		};
		
		var settings = $.extend( {}, defaults, opt );
		
		this.click(function(){
			
			$(this).css('display', 'none');
			if(hasSpriteFeedback){ sprite_feedback.css('display', 'none'); }
			
			if(settings.hideStage){
				round_stage.eq(round_i).css('display', 'none');
			}
				round_i++;
				round_stage.eq(round_i).css('display', 'block');
				$.fn.game_nextRound_index = round_i;
				//console.log($.fn.game_nextRound_index);
			
			settings.onNext.call( this );
				
		});
		
		return this;
	};
	
	$.fn.game_nextRound_index = round_i;
	
	}( jQuery ));
	
	
});