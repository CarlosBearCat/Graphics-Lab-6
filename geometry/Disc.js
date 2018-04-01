//Eric Keefe lab 2 
//this function creates a disc of radius 1, which is drawn in the x y plane.

function Disc() {

    this.name = "disc";

    this.numTriangles = 32;
    this.numVertices = this.numTriangles * 3;
    

    this.vertices = [this.numVertices];
    this.colors = [this.numVertices];
    this.normals = [this.numVertices]; //normals


    var vert_colors = [
        vec4(0.0, 0.0, 0.0, 1.0), // black   - v0
        vec4(1.0, 0.0, 0.0, 1.0), // red     - v1
        vec4(1.0, 1.0, 0.0, 1.0), // yellow  - v2
        vec4(0.0, 1.0, 0.0, 1.0), // green   - v3
        vec4(0.0, 0.0, 1.0, 1.0), // blue    - v4
        vec4(1.0, 0.0, 1.0, 1.0), // magenta - v5
        vec4(1.0, 1.0, 1.0, 1.0), // white   - v6
        vec4(0.0, 1.0, 1.0, 1.0)  // cyan    - v7
    ];

   
    for (var i = 0; i < this.numTriangles; i++){
        
        this.vertices[i*6] = vec4(0, 0, 0, 1.0);
        this.vertices[i*6+3] = vec4(0,0,0,1.0);
        var angle1 = (2 * Math.PI * i)/this.numTriangles;


        this.vertices[i*6+1] = vec4(Math.cos(angle1), Math.sin(angle1), 0, 1.0);
        this.vertices[i*6+4] = vec4(Math.cos(angle1), Math.sin(angle1), 0, 1.0);
        var angle2 = angle1 + 2 * Math.PI/this.numTriangles;
        this.vertices[i*6+2] = vec4(Math.cos(angle2), Math.sin(angle2), 0, 1.0);
        this.vertices[i*6+5] = vec4(Math.cos(angle2), Math.sin(angle2), 0, 1.0);


        //NORMALS
        //all vectors end with 0 because they're normals
        //since it's a disk we'll go positive and negative

                //positive
        this.normals[i*6] = vec4(0,1,0,0);
        this.normals[i*6+1] = vec4(0,1,0,0);
        this.normals[i*6+2] = vec4(0,1,0,0);
                //negative
        this.normals[i*6+3] = vec4(0,-1,0,0);
        this.normals[i*6+4] = vec4(0,-1,0,0);
        this.normals[i*6+5] = vec4(0,-1,0,0);
    }
   

    for (var i = 0; i < this.numVertices; i++){
        //this.vertices[i] = unique_vertices[i];
        this.colors[i] = vert_colors[Math.floor(i/3)%2];
    }


}