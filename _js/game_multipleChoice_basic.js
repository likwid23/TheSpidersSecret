// JavaScript Document

$(document).ready(function(e) {
	
	var choice_i = null;
	var round_total = $('.game_checkAnswer').length-1;
	
	
	var sprite_feedback = $('.game_roundFeedback');
	var hasSpriteFeedback = false;
	
	if(sprite_feedback.length > 0){
		hasSpriteFeedback = true;
	}
	
   
   (function ( $ ) {
		$.fn.game_basic_choice = function(opt) {
			
			var btn_choices = this;
			
			var defaults = {
 
			// We define an empty anonymous function so that
			// we don't need to check its existence before calling it.
			
				
				
				onChoice : function() {
					//console.log('');	
				}
		 
			};
			
			var settings = $.extend( {}, defaults, opt );
			
			this.click(function(){
				
				if($(this).hasClass('choice_final') != true){
					if(hasSpriteFeedback){ sprite_feedback.css('display', 'none');}
					btn_choices.css('background-position', 'left');
					btn_choices.removeClass('choice_checked');	
				
					$(this).css('background-position', 'right');
					$(this).addClass('choice_checked');	
					settings.onChoice.call( this );
					
					choice_i = btn_choices.index(this);
					$.fn.game_basic_choice_index = choice_i;
					
				}
			
			});
			
			
			return this;
		};
		
		$.fn.game_basic_choice_index = choice_i;
		
		$.fn.game_basic_choiceCheck = function(opt) {
			
			var btn_check = this;
			
			var defaults = {
 
			// We define an empty anonymous function so that
			// we don't need to check its existence before calling it.
			
				autoFeedback: true,
				
				onRoundAlways : function() {
					//console.log('Default Always Do After Checking');	
				},
				onRoundRight : function() {
					//console.log('Default All Answers Correct');	
				},
				onRoundWrong : function() {
					//console.log('Default Some or All Answers Incorrect');	
				},
				onRoundOver : function() {
					console.log('Default Round is Over');	
				},
				onGameOver : function() {
					console.log('Default Game is Over');	
				}
		 
			};
		
			var settings = $.extend( {}, defaults, opt );
			
			this.click(function(){
					
					if($('.choice_checked').hasClass('choice_correct')){
						var stageID = $(this).parent().attr('id');
						$('.choice_checked').removeClass('choice_checked');
						console.log('answer correct on ' + stageID);
						
						$('#'+stageID+' .game_choice').addClass('choice_final');
						$(this).css('display', 'none');
						
						settings.onRoundRight.call( this );
						
						var tempRound_i = $('.game_checkAnswer').index($(this));
						
						if(tempRound_i == round_total){
							settings.onGameOver.call( this );	
						}else{
							settings.onRoundOver.call( this );
						}
						
						if(hasSpriteFeedback){ sprite_feedback.css('background-position', 'right'); }
							
					}else{
						console.log('answer incorrect');
						settings.onRoundWrong.call( this );
						if(hasSpriteFeedback){ sprite_feedback.css('background-position', 'left'); }
					}
					
					if(hasSpriteFeedback){ sprite_feedback.css('display', 'block');}
					
					
					//console.log(tempRound_i);
					
					settings.onRoundAlways.call( this );
			});
			
			
			return this;
		};
		
		
		
	}( jQuery ));
   
   
    
});

