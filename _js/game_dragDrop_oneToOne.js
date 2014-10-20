// JavaScript Document

$(document).ready(function(e) {
	
	
	var sprite_feedback = $('.game_roundFeedback');
	var hasSpriteFeedback = false;
	
	var btn_check = null;
	var game_draggable = null;
	var round_i = 0;
	var drag_i = 0;
	
	var drag_ori_Xs = new Array();
	var drag_ori_Ys = new Array();
	
	if(sprite_feedback.length > 0){
		hasSpriteFeedback = true;
	}
	
	var notGameStoped = true;
	var sortZIndex = false;
	var hasIconFeedback = false;
	
	//console.log(hasSpriteFeedback);
	
	
	
	function AllDragDropped(){
		if(btn_check != null){
			
			var stageID = btn_check.eq(round_i).parent().attr('id');
			var totalRoundDrags = $('#'+ stageID +' .draggable_container .draggable').length;
			//console.log(stageID + '   ' + totalRoundDrags);
			if(totalRoundDrags == 0){
				btn_check.eq(round_i).css('display', 'block');
				return true;	
			}
		}
	}
	
	
	(function ( $ ) {
	
	$.fn.game_oneToOne_draggable = function(opt) {
		game_draggable = this;
		
		var defaults = {
 
			// We define an empty anonymous function so that
			// we don't need to check its existence before calling it.
			iconFeedback: false
		
		};
		
		var settings = $.extend( {}, defaults, opt );
		
		hasIconFeedback = settings.iconFeedback;
		
		this.draggable({revert:"invalid"});
		
		this.mousedown(function(){
			if(notGameStoped){
				if(hasSpriteFeedback){ sprite_feedback.css('display', 'none'); }
			
			var tempRound_i = $('.draggable_container').index($(this).parent());
			round_i = tempRound_i;
			
			$(this).css('cursor', 'url(../_assets/_img/icon_closedHandCur.png), pointer');
			$(this).css('z-index', '11');
			}
				
		});
	
		this.mouseup(function(){
			if(notGameStoped){
				$(this).css('cursor', 'url(../_assets/_img/icon_openHandCur.png), pointer');
				$(this).css('z-index', '1');
			}
			
		});
		
		this.each(function(index, element) {
			
			if(hasIconFeedback){$(this).append('<div class="game_iconFeedback"></div>');}
			//<div class="game_iconFeedback"></div> $(this).append('<div class="skg_feedback"></div>');
			drag_ori_Xs[drag_i] = $(this).css('left');
			drag_ori_Ys[drag_i] = $(this).css('top');
			drag_i++;
		});
		
		return this;
	};
	
	
	$.fn.game_oneToOne_droppable = function(opt) {
		
		var defaults = {
 
			// We define an empty anonymous function so that
			// we don't need to check its existence before calling it.
			onDrop : function() {
				console.log('Default on Every Drop');	
			},
			onAllDropped : function() {
				console.log('Default When Everything Drops');	
			},
			// ... rest of settings ...
		 
		};
		
		var settings = $.extend( {}, defaults, opt );
		
		this.droppable({tolerance: "pointer", hoverClass:'game_debug_dropHover',  
						drop: function( event, ui ) {
								
								if($(this).is(':empty')){
									ui.draggable.appendTo($(this));	
								} else{
									var childUIDrag = $(this).children('.ui-draggable');
									childUIDrag.appendTo(ui.draggable.parent());
									
									if(childUIDrag.parent().hasClass('draggable_container')){
										drag_i = game_draggable.index(childUIDrag);
										childUIDrag.css('left', drag_ori_Xs[drag_i]);
										childUIDrag.css('top', drag_ori_Ys[drag_i]);
										if(sortZIndex){childUIDrag.css('z-index', drag_i);}
									
									}
							
									ui.draggable.appendTo($(this));
								}
								
								ui.draggable.css('left', '0');
								ui.draggable.css('top', '0');
								
								settings.onDrop.call( this );
								
								if(AllDragDropped()){
									settings.onAllDropped.call( this );
								};
						}
						
		});
		
		return this;
	};
	
	$.fn.game_oneToOne_checkBtn = function(opt) {
		btn_check = this;
		
		var defaults = {
 
			// We define an empty anonymous function so that
			// we don't need to check its existence before calling it.
			delay: 0,
			sortZIndex:false,
			autoFeedback: true,
			
			onRoundAlways : function() {
				console.log('Default Always Do After Checking');	
			},
			onRoundRight : function() {
				console.log('Default All Answers Correct');	
			},
			onRoundWrong : function() {
				console.log('Default Some or All Answers Incorrect');	
			},
			onRoundOver : function() {
				console.log('Default Round is Over');	
			},
			onGameOver : function() {
				console.log('Default Game is Over');	
			}
		 
		};
		
		var settings = $.extend( {}, defaults, opt );
		
		
		sortZIndex = settings.sortZindex;
		
		this.click(function(){
			
				$(this).css('display', 'none');
				var stageID = $(this).parent().attr('id');
				var roundDraggable = $('#'+stageID + ' .ui-droppable .ui-draggable');
				var roundTotal = roundDraggable.length;
				
				if(game_draggable != null){

					roundDraggable.each(function(index, element) {

						drag_i = game_draggable.index(this);

						
						var answer_id = $(this).attr('id').replace('drag', 'drop');
						
						if($(this).parent().attr('id') == answer_id){
					
							$(this).draggable( "option", "disabled", true );
							$(this).parent().droppable( "option", "disabled", true );
							$(this).addClass('drag_correct');
							
							if(hasIconFeedback){
											$(this).children('.game_iconFeedback').css('background-position', 'right');
											if(settings.delay == 0){
												$(this).children('.game_iconFeedback').css('display', 'block');
											}
									}
							
							
						}
						else{
							
									if(settings.delay != 0){
										$(this).addClass('drag_incorrect');
										$(this).draggable( "option", "disabled", true );	
									}
									else{
										if(sortZIndex){$(this).css('z-index', drag_i);}
										$(this).css('left', drag_ori_Xs[drag_i]);
										$(this).css('top', drag_ori_Ys[drag_i]);
										$(this).appendTo('#'+stageID + ' .draggable_container');
									}
								
						}
						
					});
					
					if(settings.delay != 0){
							if(hasIconFeedback){$('.game_iconFeedback').css('display', 'block');}
					}
					
					var correctTotal = $('#'+stageID+' .drag_correct').length;
					
					
					if(correctTotal == roundTotal){
						settings.onRoundRight.call( this );
						if(hasSpriteFeedback){ sprite_feedback.css('background-position', 'right'); }
						
						if(round_i == $('.game_checkAnswer').length-1){
							settings.onGameOver.call( this );
							notGameStoped = false;
						}
						else{
							settings.onRoundOver.call( this );
						}
						
							
					}
					else{
						
						if(settings.delay != 0){
							notGameStoped = false;
							setTimeout(function(){
								$('.drag_incorrect').each(function(index, element) {
										drag_i = game_draggable.index(this);
										if(sortZIndex){$(this).css('z-index', drag_i);}
										$(this).css('left', drag_ori_Xs[drag_i]);
										$(this).css('top', drag_ori_Ys[drag_i]);
										$(this).appendTo('#'+stageID + ' .draggable_container');
										$(this).draggable("enable");
										if(hasIconFeedback){$(this).children('.game_iconFeedback').css('display', 'none');}
										$(this).removeClass('drag_incorrect');
										notGameStoped = true;
                                });
								}, settings.delay);
						}
						
						settings.onRoundWrong.call( this );
						if(hasSpriteFeedback){ sprite_feedback.css('background-position', 'left'); }
						
					}
					
					settings.onRoundAlways.call( this );
					if(hasSpriteFeedback){ sprite_feedback.css('display', 'block');}
					
				}
				
			});

		return this;
	};
	
	//$.game_oneToOne_hello = true;
	$.fn.game_oneToOne_autoFeedback = function(boolean){
			if(hasSpriteFeedback){hasSpriteFeedback = boolean;}
	};
	
	$.fn.game_oneToOne_checkScope = function(opt) {
		btn_check = this;
		
		var defaults = {
 
			// We define an empty anonymous function so that
			// we don't need to check its existence before calling it.
			delay: 0,
			scopeArray: new Array('scope1', 'scope2'),
			sortZIndex:false,
			
			onRoundAlways : function() {
				console.log('Default Always Do After Checking');	
			},
			onRoundRight : function() {
				console.log('Default All Answers Correct');	
			},
			onRoundWrong : function() {
				console.log('Default Some or All Answers Incorrect');	
			},
			onRoundOver : function() {
				console.log('Default Round is Over');	
			},
			onGameOver : function() {
				console.log('Default Game is Over');	
			}
		 
		};
		
		var settings = $.extend( {}, defaults, opt );
		
		sortZIndex = settings.sortZindex;
		
		this.click(function(){
			
				$(this).css('display', 'none');
				var stageID = $(this).parent().attr('id');
				var roundDraggable = $('#'+stageID + '  .ui-droppable .ui-draggable');
				var roundTotal = roundDraggable.length;
				
				if(game_draggable != null){
					
					for( var scope_i = 0; scope_i < settings.scopeArray.length; scope_i++){
					 
							 var scopeDraggable = $('#'+stageID + ' .ui-draggable.'+settings.scopeArray[scope_i]);
							 
							 scopeDraggable.each(function(index, element) {
								drag_i = game_draggable.index(this);
								
								if($(this).parent().hasClass(settings.scopeArray[scope_i])){
									$(this).draggable( "option", "disabled", true );
									$(this).parent().droppable( "option", "disabled", true );
									$(this).addClass('drag_correct');
									if(hasIconFeedback){
											$(this).children('.game_iconFeedback').css('background-position', 'right');
											if(settings.delay == 0){
												$(this).children('.game_iconFeedback').css('display', 'block');
											}
									}
									
								}
								else{
									
									if(settings.delay != 0){
										$(this).addClass('drag_incorrect');
										$(this).draggable( "option", "disabled", true );	
									}
									else{
										if(sortZIndex){$(this).css('z-index', drag_i);}
										$(this).css('left', drag_ori_Xs[drag_i]);
										$(this).css('top', drag_ori_Ys[drag_i]);
										$(this).appendTo('#'+stageID + ' .draggable_container');
									}
										
								}
								
							});	
					}
					
					if(settings.delay != 0){
							if(hasIconFeedback){$('.game_iconFeedback').css('display', 'block');}
					}
					
					var correctTotal = $('#'+stageID+' .drag_correct').length;
					console.log(correctTotal + '   ' + roundTotal);
					
					
					if(correctTotal == roundTotal){
						settings.onRoundRight.call( this );
						if(hasSpriteFeedback){ sprite_feedback.css('background-position', 'right'); }
						
						if(round_i == $('.game_checkAnswer').length-1){
							settings.onGameOver.call( this );
							notGameStoped = false;
						}
						else{
							settings.onRoundOver.call( this );
						}	
					}
					else{
						if(settings.delay != 0){
							notGameStoped = false;
							setTimeout(function(){
								$('.drag_incorrect').each(function(index, element) {
										drag_i = game_draggable.index(this);
										if(sortZIndex){$(this).css('z-index', drag_i);}
										$(this).css('left', drag_ori_Xs[drag_i]);
										$(this).css('top', drag_ori_Ys[drag_i]);
										$(this).appendTo('#'+stageID + ' .draggable_container');
										$(this).draggable("enable");
										if(hasIconFeedback){$(this).children('.game_iconFeedback').css('display', 'none');}
										$(this).removeClass('drag_incorrect');
										notGameStoped = true;
                                });
								}, settings.delay);
						}
						settings.onRoundWrong.call( this );
						if(hasSpriteFeedback){ sprite_feedback.css('background-position', 'left'); }
						
					}
					
					settings.onRoundAlways.call( this );
					if(hasSpriteFeedback){ sprite_feedback.css('display', 'block');}
					
				}
				
			});

		return this;
	};
	
	}( jQuery ));
	
	
});