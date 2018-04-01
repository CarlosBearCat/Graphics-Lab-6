//Carlos Luevanos
//Lab 6: Fractal landscape



function Fractal () {

    this.name = "fractal";
    f = new FractalDEM(8); // create fractal
    var width = 10;
    scal = width/(f.gridSize*2); //scale
    this.vertices = []; //vertices
    this.colors = []; //colors
    this.normals = []; //normals
    this.numVertices = (f.gridSize * f.gridSize * 6); //for printing purposes
    console.log("numVerts = " + this.numVertices); //print vertices



    for (i = 0; i < f.gridSize; i++) {
        for (j = 0; j < f.gridSize; j++) {
            //6 vertices for square
            this.vertices.push(vec4((i+1)*scal,f.getH(i+1,j+1),(j+1)*scal,1)); //1
            this.vertices.push(vec4((i+1)*scal,f.getH(i+1,j), j*scal,1)); //2
            this.vertices.push(vec4(i*scal,f.getH(i,j),j*scal,1)); //3
            this.vertices.push(vec4(i*scal,f.getH(i,j),j*scal,1)); //4
            this.vertices.push(vec4(i*scal,f.getH(i,j+1),(j+1)*scal,1));//5
            this.vertices.push(vec4((i+1)*scal,f.getH(i+1,j+1),(j+1)*scal,1)); //6
                //normals
            this.normals.push(this.getNormals(i+1,j+1));
            this.normals.push(this.getNormals(i+1,j));
            this.normals.push(this.getNormals(i,j));
            this.normals.push(this.getNormals(i,j));
            this.normals.push(this.getNormals(i,j+1));
            this.normals.push(this.getNormals(i+1,j+1));

                //colors
            this.colors.push(this.colorRamp(f.getH(i+1,j+1)));
            this.colors.push(this.colorRamp(f.getH(i+1,j)));
            this.colors.push(this.colorRamp(f.getH(i,j)));
            this.colors.push(this.colorRamp(f.getH(i,j)));
            this.colors.push(this.colorRamp(f.getH(i,j+1)));
            this.colors.push(this.colorRamp(f.getH(i+1,j+1)));
        }
    }

}

Fractal.prototype.colorRamp = function (h) {
    var blue = vec4(0.0, 0.0, 1.0, 1.0); //blue
    var green = vec4(0.0, 1.0, 0.0, 1.0); //green
    var brown = vec4(0.8, 0.3, 0.3, 1.0);//brown
    var white = vec4(1.0, 1.0, 1.0, 1.0);//white

    if (h == 0.0){
        return blue
    }else if (h < 0.1){
        return brown;
    }else if (h <0.5){
        return green;
    }else if(h < 0.8){
        return brown;
    } else if (h <0.81){
        return white;
    } else
        return white;
};


//calculate the normals
Fractal.prototype.getNormals = function(x,y){
    var a = vec4(scal*2, f.getH(x+1,y)-f.getH(x-1,y),0,0);
    var b = vec4(0, f.getH(x, y+1)-f.getH(x,y-1),scal*2,0);
    return vec4(cross(b,a),0);
};
