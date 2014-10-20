// JavaScript Document



(function ( $ ) {
		$.fn.game_tool_scaleSprite = function(decimalPercent) {
			
			
			var ori_width = this.width();
			var ori_height = this.height();
			
			var new_width = ori_width * decimalPercent;
			var new_height = ori_height * decimalPercent;
				
			this.css('width', new_width + 'px');
			this.css('height', new_height + 'px');
			this.css('background-size', new_width*2 + 'px ' + new_height + 'px');
			
			return this;
		};
		
		$.fn.game_tool_loopSprite = function(frameNumber, fps, duration){
				
				
				var ani_sprite = this;
				var ani_sprite_width = ani_sprite.width();
				var ani_sprite_x = 0;
				var ani_sprite_x_total = ani_sprite_width * frameNumber;
				
				fps = 1000/fps;
				
				//console.log(this.css('background-size'));
				//console.log(this.css(ani_sprite_width));
				
				var startLoop = setInterval(function(){
					//console.log('hello');
					/*
					if(ani_sprite_x < ani_sprite_x_total){
						ani_sprite_x = ani_sprite_x + ani_sprite_width;
					} else{
						ani_sprite_x = 0;	
					}*/
					
					ani_sprite_x = (ani_sprite_x < ani_sprite_x_total) ? ani_sprite_x + ani_sprite_width : 0;
					
					ani_sprite.css('background-position', ani_sprite_x + 'px, 0');
					}, fps);
					
				setTimeout(function(){
					window.clearInterval(startLoop);
					}, duration);
				
		}
		
		
		
		
	}( jQuery ));