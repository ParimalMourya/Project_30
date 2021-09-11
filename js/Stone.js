class Stone{
    constructor(x, y, w, h, image){
        
        let options={
            restitution:0.8,
        };
        this.body = Bodies.rectangle(x, y, w, h, options);
        this.w = w;
        this.h = h;
        World.add(world, this.body);
        this.image = image
    }

    display(){
        var pos = this.body.position;

        push();
        ellipseMode(CENTER);
        noStroke();
        fill(152, 153, 148);
        image(this.image, pos.x, pos.y, this.w, this.h);
        pop();
    }
}
