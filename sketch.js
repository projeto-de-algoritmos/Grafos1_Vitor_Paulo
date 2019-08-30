var started = false;
var graph;
var dataset;

var myPromise = new Promise(function(resolve, reject){
	// resolve the promise after 1 second
  setTimeout(resolve, 1000)
});

async function setup(){
    dataset = loadJSON('dataset.json', callback);
    await myPromise;
    started = true;
}

function callback(){
    readData(dataset);
}

function readData(data){
    graph = new Graph();
    var users = data.user;
    for(var i=0; i<users.length; i++){
        var newNodeValue = users[i].name;
        var newNode = graph.getNode(newNodeValue);
        if(newNode == undefined){
            var addedNode = graph.addNode(newNodeValue); //Só adiciona se já não existir
        }
    }
    
    for(var i=0; i<users.length; i++){
        var addedNodeEdges = users[i].friends;
        for(var j=0; j<users[i].friends.length; j++){
            var currentNode = graph.graph[users[i].name];
            currentNode.connect(graph.nodes[addedNodeEdges[j]]);
        }
    }
}

function draw(){
    createCanvas(600, 600);
    background(51);
    if(started){
        graph.setStart(graph.graph["us0"]);
        graph.setEnd(graph.graph["us5"]);
        bfs();
        //console.log(graph);
        graph.show();
        graph.simulate();
        
    }

}

function bfs(){
    //console.log(graph);
    var queue = [];
    var start = graph.start;
    var end = graph.end;
    queue.push(start);
    start.visited = true;
    while(queue.length > 0){
        var current = queue.shift();
        //console.log(current);
        for(var i=0; i<current.edges.length; i++){
            //console.log(current.edges[i].visited);
            if(current.edges[i].visited == false){
                if(current.edges[i] == end){
                    console.log("visitandoend: "+current.edges[i].value);
                    end.visited = true;
                    end.parents = current;
                    end.parents.color = color(255, 0, 0);
                    end.color = color(255, 0, 0);
                    return;
                }
                queue.push(current.edges[i]);
                console.log("visitando: " + current.edges[i].value);
                current.edges[i].visited = true;
                current.edges[i].parents = current;
                console.log("parent: " + current.edges[i].parents.value);
                current.edges[i].parents.color = color(255, 0, 0);
            }
            //console.log(current.value);
        }
    }
}