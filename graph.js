class Graph {
    constructor() {
        this.nodes = [];
        this.graph = {};
        this.start = null;
        this.end = null;
        this.springLength = 150;
    }

    setStart(node) {
        this.start = node;
    }

    setEnd(node) {
        this.end = node;
    }

    addNode(value) {
        var node = new Node(value);
        this.graph[value] = node;
        this.nodes.push(node);
        return node;
    }

    getNode(value) {
        return this.graph[value];
    }

    show() {
        for (var j = 0; j < this.nodes.length; j++) {
            this.nodes[j].showEdges();
        }
        for (var i = 0; i < this.nodes.length; i++) {
            this.nodes[i].showNode();
        }
    }

    // Simulate some physics!
    simulate() {

        // First node always in center
        this.nodes[0].pos.set(width / 2, height / 2);

        // Look at every node against every other node
        for (var i = 1; i < this.nodes.length; i++) {
            var node1 = this.nodes[i];
            for (var j = 0; j < this.nodes.length; j++) {
                // Nodes don't interact with themselves!
                if (i == j) continue;
                var node2 = this.nodes[j];

                // A vector that points between the nodes
                var force = p5.Vector.sub(node1.pos, node2.pos);
                var dist = force.mag();

                // What is spring force?
                var spring = 0;
                var k = 0.06;
                // If they are connected calculate
                if (node1.isConnected(node2) || node2.isConnected(node1)) {
                    spring = k * (this.springLength - dist);
                }
                // All nodes need their own space even if not connected
                var separate = 1 / (dist * k);
                // Apply the force!
                force.setMag(spring + separate)
                node1.vel.add(force);
                // Slow down velocity so that it dampens over time
                node1.vel.mult(0.95);
            }
        }

        // Add velocity to position for all nodes
        for (var i = 0; i < this.nodes.length; i++) {
            var node = this.nodes[i];
            node.pos.add(node.vel);
        }
    }

}