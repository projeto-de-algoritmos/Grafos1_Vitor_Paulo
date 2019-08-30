class Node {
    constructor(value) {
        this.value = value;
        this.edges = [];
        this.visited = false;
        this.parents = null;
        this.pos = createVector(random(width), random(height));
        this.color = color(0, 255, 0);
        this.vel = createVector();
    }

    connect() {
        for (var i = 0; i < arguments.length; i++) {
            this.edges.push(arguments[i]);
        }
    }

    isConnected(neighbor) {
        var index = this.edges.indexOf(neighbor);
        if (index >= 0) {
          return true;
        } else {
          return false;
        }
      }
      

    showNode() {
        textAlign(CENTER);
        var w = textWidth(this.value);
        stroke(255);
        fill(this.color);
        ellipse(this.pos.x, this.pos.y, w * 2, w * 2);
        fill(255);
        noStroke();
        text(this.value, this.pos.x, this.pos.y);
    }

    showEdges() {
        noFill();
        stroke(255);
        for (var i = 0; i < this.edges.length; i++) {
            line(this.pos.x, this.pos.y, this.edges[i].pos.x, this.edges[i].pos.y);
        }
    }
}