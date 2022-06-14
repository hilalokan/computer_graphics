var gl;		
var thetaLoc;
var theta; 
var isDirClockwise = false; 
var delay = 500;
var rate_theta=0;
var stop_rotation=true;
var color = [60 / 255, 100 / 255, 200 / 255];
var color_loc;
var factorScaling = 1;
var scale_loc;
var translate = vec2(0,0);
var translate_loc;

window.onload =	function main(){
		const canvas = document.querySelector("#glcanvas");
		//initialize the gl context
		gl = WebGLUtils.setupWebGL(canvas);
		//only continue if webgl is available and working 
		if(!gl){
			alert("Unable to initialize Webgl. Your browser or machine may not support it");
			return;
		}

		var program = initShaders(gl,"vertex-shader","fragment-shader");
		gl.useProgram( program );

		//adding button to change the direction
		var myButton = document.getElementById("DirectionButton");
		myButton.addEventListener("click", function() {isDirClockwise = !isDirClockwise;});

		//start/stop rotation
		var myButton2 = document.getElementById("StopRotation");
		myButton2.addEventListener("click",function(){stop_rotation = !stop_rotation;});


		//changing speed
		document.getElementById("slide").onchange = function() {delay = this.value;};


		//color
		document.getElementById("color_change").oninput = change_color_function;


		//scaling
		window.onwheel = scale_function;

		//translate
		window.onkeydown = translate_function;


		var vertices = [ 
			//H
			vec2(-.9, -.4), 
		    vec2(-0.9, .4),
		    vec2(-0.7, -0.4),

			vec2(-0.7, -0.4),
			vec2(-0.9, 0.4),
			vec2(-0.7, 0.4),

			vec2(-0.7, -0.1),
			vec2(-0.7, 0.1),
			vec2(-0.3, 0.1),

			vec2(-0.7, -0.1),
			vec2(-0.3, 0.1),
			vec2(-0.3, -0.1),

			vec2(-0.3, -0.4),
			vec2(-0.3, 0.4),
			vec2(-0.1, -0.4),

			vec2(-0.3, 0.4),
			vec2(-0.1, -0.4),
			vec2(-0.1, 0.4),



			//N
			vec2(0.1, -0.4),
			vec2(0.1, 0.4),
			vec2(0.3, -0.4),

			vec2(0.1, 0.4),
			vec2(0.3, -0.4),
			vec2(0.3, 0.4),

			vec2(0.6, -0.4),
			vec2(0.6, 0.4),
			vec2(0.8, -0.4),
		
			vec2(0.6, 0.4),
			vec2(0.8, -0.4),
			vec2(0.8, 0.4),
			
			vec2(0.3, 0.1),
			vec2(0.6, -0.4),
			vec2(0.3, 0.4),

			vec2(0.6, -0.4),
			vec2(0.3, 0.4),
			vec2(0.8, -0.4)
		
		
		
		];

		 
		var bufferId = gl.createBuffer();
		gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
		gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );

		// Associate out shader variables with our data buffer
		var vPosition = gl.getAttribLocation( program, "vPosition" );
		gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
		gl.enableVertexAttribArray( vPosition );

		//uniform locations

		thetaLoc = gl.getUniformLocation(program, "theta");
		theta = 0;
		gl.uniform1f(thetaLoc,theta);

		color_loc = gl.getUniformLocation(program,"color");

		scale_loc = gl.getUniformLocation(program,"scaling");

		translate_loc = gl.getUniformLocation(program,"translate");
			
		render();			
							
	}

	
	function scale_function(event) {
		if (event.deltaY < 0){
			factorScaling += 0.2;}
			
		if(event.deltaY > 0){
			if((factorScaling -0.2) <= 0.2){factorScaling = 0.2;}
			if(factorScaling > 0.2){factorScaling -= 0.2;}
		}	
	}

	function translate_function(event){

		var key = String.fromCharCode(event.keyCode);

		if(key == 'W'){
			translate[1] += 0.3;
		}

		if(key == 'A'){
			translate[0] -= 0.3;
		}

		if(key == 'S'){
			translate[1] -= 0.3;
		}

		if(key == 'D'){
			translate[0] += 0.3;
		}


	}

	function control_theta(){
		
		if(stop_rotation == false){
			if(isDirClockwise == true){
				rate_theta = -0.1;
			}
			if(isDirClockwise == false){
				rate_theta = 0.1;
			}
		}

		if(stop_rotation == true){
			rate_theta = 0;
		}

		theta = theta+rate_theta;
	}

	function change_color_function(event){
		const red = parseInt(event.target.value.substr(1, 2), 16);
		const green = parseInt(event.target.value.substr(3, 2), 16);
		const blue = parseInt(event.target.value.substr(5, 2), 16);
		color = [red/255,green/255,blue/255];
	}

	function render(){

		setTimeout(function (){
			requestAnimFrame(render);//this will indicate double buffering 
			gl.clearColor(0.0, 0.0, 0.0, 1.0);
			gl.clear(gl.COLOR_BUFFER_BIT);
			control_theta();
			gl.uniform1f(thetaLoc,theta);
			gl.uniform3fv(color_loc,color);
			gl.uniform1f(scale_loc, factorScaling);
			gl.uniform2fv(translate_loc,translate);
			gl.drawArrays( gl.TRIANGLE_FAN, 0, 3);
			gl.drawArrays( gl.TRIANGLE_FAN, 3, 3);
			gl.drawArrays( gl.TRIANGLE_FAN, 6, 3);
			gl.drawArrays( gl.TRIANGLE_FAN, 9, 3);
			gl.drawArrays( gl.TRIANGLE_FAN, 12, 3);
			gl.drawArrays( gl.TRIANGLE_FAN, 15, 3);
			gl.drawArrays( gl.TRIANGLE_FAN, 18, 3);
			gl.drawArrays( gl.TRIANGLE_FAN, 21, 3);
			gl.drawArrays( gl.TRIANGLE_FAN, 24, 3);
			gl.drawArrays( gl.TRIANGLE_FAN, 27, 3);
			gl.drawArrays( gl.TRIANGLE_FAN, 30, 3);
			gl.drawArrays( gl.TRIANGLE_FAN, 33, 3);
			
		}, delay);

	}
	