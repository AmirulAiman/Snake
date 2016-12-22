$(document).ready(function(){
	
	var canvas = $('#canvas')[0];
	var ctx = canvas.getContext("2d");
	var w = $('#canvas').width();
	var h = $('#canvas').height();
	var cw = 15;
	var d;
	var food;//food
	var score;//score
	var speed = 130;//speed
	var color = "green";
	
	//Snake array
	var snake_array;
	
	//Initialize(game start). 
	function init()
	{
		create_snake();//create snake when the game start.
		create_food();//create food for the snake
		score = 0;
		
		if(typeof game_loop != "undefined") 
			clearInterval(game_loop);
		
		game_loop = setInterval(paint, speed); 
		
	}
	
	//Start game.
	init();
	
	
	//Create snake for the game.
	function create_snake()
	{
		var snake_lenght = 5;//How long hte snake when it start
		snake_array = [];
		
		//
		for(var i = snake_lenght - 1;  i >= 0; i--)
		{
			snake_array.push({x:i, y: 0});//Cerate snake at the (x,y) position.
		}
	}
	
	function create_food()
	{
		food = {
			x: Math.round(Math.random() * (w - cw)/cw),
			y: Math.round(Math.random() * (h - cw)/cw)
		}
	}
	
	//Color the snake
	function paint()
	{
		ctx.fillStyle = "white";
		ctx.fillRect(0,0,w,h);
		ctx.strokeStyle = "white";
		ctx.strokeRect(0,0,w,h);
		
		//For movement
		var nx = snake_array[0].x;
		var ny = snake_array[0].y
		
		if(d == "right")
			nx++;
		else if(d == "left")
			nx--;
		else if(d = "up")
			ny--;
		else if(d == "down")
			ny++
		
		//Check for collision.
		if(nx == -1 || nx == w/cw || ny == -1 || ny == h/cw || check_collision(nx, ny, snake_array))
		{
			init();
			return;
		}
		
		//the snake hit the food
		if(nx == food.x && ny == food.y)
		{
			var tail = {x: nx, y: ny};
			score++;
			//create new food 
			create_food();
		}else
		{
			var tail = snake_array.pop();
			tail.x = nx;
			tail.y = ny;
		}
		
		snake_array.unshift(tail);
		
		for(var i = 0; i < snake_array.length; i++)
		{
			var c = snake_array[i];
			paint_cell(c.x, c.y);
		}
		
		//paint cell.
		paint_cell(food.x, food.y);
		
		//Check score.
		checkscore(score);
	}
	
	function paint_cell(x,y)
	{
		ctx.fillStyle = color;
		ctx.fillRect(x * cw, y * cw , cw, cw);
		ctx.strokeStyle = "white";
		ctx.strokeRect(x * cw, y * cw, cw,cw);
	}
	
	function check_collision(x, y, array)
	{
		for( var i = 0; i < array.length; i++)
		{
			if(array[i].x == x && array[i].y == y)
			{
				return true;
			}
		}
		return false
	}
	
});