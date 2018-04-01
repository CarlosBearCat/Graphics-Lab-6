//Carlos Luevanos and Jamie Leary
//Lab 5: Phong Lighting



var canvas;       // HTML 5 canvas
var gl;           // webgl graphics context
var vPosition;    // shader variable attrib location for vertices
var vNormal;      // shader variable attrib location for normals
var vColor;       // shader variable attrib location for color
var uColor;       // shader uniform variable location for color
var uProjection;  //  shader uniform variable for projection matrix
var uModel_view;  //  shader uniform variable for model-view matrix
var program;      //global program

var lightObj = new Lighting();     //lighting object

var lightAngle = 0; // lighting angle to move the light



var camera = new Camera(); 
var stack = new MatrixStack();

window.onload = function init()
{



    //set Event Handlers
    setKeyEventHandler();
    setMouseEventHandler();
    
    canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor(0.309, 0.505, 0.74, 1.0);
    
    gl.enable(gl.DEPTH_TEST);

    initWindowListeners();

    //  Load shaders
     program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );


    //Load the lighting object after shaderSetup

    lightObj.setUp();

    shaderSetup();

    Shapes.initShapes();  // create the primitive and other shapes


    render();
};


    // listener for slider to move light cube
function initWindowListeners() {
    document.getElementById("slider").addEventListener("input", function(e) {
        lightAngle = document.getElementById("slider").value;
    })
}

/**
 *  Load shaders, attach shaders to program, obtain handles for 
 *  the attribute and uniform variables.
 * @return {undefined}
 */
function shaderSetup() {
    //  Load shaders
    // get handles for shader attribute variables. 
    // We will need these in setting up buffers.
    vPosition = gl.getAttribLocation(program, "vPosition");
    vColor = gl.getAttribLocation(program, "vColor"); // we won't use vertex here
                            // colors but we keep it in for possible use later.

    vNormal = gl.getAttribLocation(program, "vNormal"); //normals
   
    // get handles for shader uniform variables: 
    uColor = gl.getUniformLocation(program, "uColor");  // uniform color
    uProjection = gl.getUniformLocation(program, "uProjection"); // projection matrix
    uModel_view = gl.getUniformLocation(program, "uModel_view");  // model-view matrix

  //  uLight_position = gl.getUniformLocation(program, "uLight_Position");
}

function render()
{
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    var projMat = camera.calcProjectionMat();   // Projection matrix
    gl.uniformMatrix4fv(uProjection, false, flatten(projMat));

    var viewMat = camera.calcViewMat();   // View matrix

        //multiply the view matrix by the ligtobj to set world coordinate light position
        //the rotateY is for the lightAngle which rotates the light and our cube
    gl.uniform4fv(uLight_position, mult(mult(viewMat,rotateX(lightAngle)),lightObj.light_position));
    gl.uniform4fv(uColor, vec4(0,0,0,1));

    stack.clear(); //clear the stack
    stack.multiply(viewMat);// put the viewMat

    stack.push();
    stack.multiply(rotateX(lightAngle)); // Rotate our light angle about Y
    stack.multiply(translate(0,15,0)); //translate it into this point in space
    stack.multiply(scalem(1,1,1)); //scale our light cube
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
    Shapes.drawPrimitive(Shapes.cube); //draw our cube
    stack.pop();




    stack.clear();
    stack.multiply(viewMat);

    // Need these 2 lines since camera is sitting at origin.
    // Without them, you would be sitting inside twwhe cube.
    // REMOVE once camera controls are working
    // stack.multiply(translate(0, 0, -10));
    // gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));


    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
 //   Shapes.axis.draw();

    stack.push();
    gl.uniform4fv(uColor, vec4(0, 1.0, 0.0, 1.0));
            //add fractal here
    stack.multiply(translate(0,0,0));
    //stack.multiply(scalem(10,12,10));
    gl.uniformMatrix4fv(uModel_view, false, flatten(stack.top()));
    Shapes.drawPrimitive(Shapes.fractal);
    stack.pop();

    requestAnimFrame(render);

}

