var started = false;
var graph;
var dataset;
var sel;
var setado = false;
var button, button2;


var myPromise = new Promise(function(resolve, reject){
    // resolve the promise after 1 second
    setTimeout(resolve, 1000)
});

async function setup(){
    dataset = loadJSON('dataset.json', callback);
    await myPromise;
    createCanvas(windowWidth, windowHeight);

    var xPos = windowWidth;

    legenda = createElement('h4', 'O grafo a ser mostrado ilustra o caminho com menos conexões (em vermelho) entre os usuários selecionados.');
    legenda.position(xPos / 4 - 100, 0);
    legenda.style('color', '#ff0000');
    
    legenda2 = createElement('h5', 'Os nós azuis representam os nós visitados pela BFS');
    legenda2.position(xPos / 4 - 100, 700);
    legenda2.style('color', '#0000ff');

    button = createButton('RESETAR');
    button.position(xPos / 4 + 470, 50);
    button.mousePressed(resetar);

    button = createButton('FAZER');
    button.position(xPos / 4 + 390, 50);
    button.mousePressed(fazer);

    started = true;
    sel = createSelect();
    sel2 = createSelect();
    sel.position(xPos / 4, 50);
    sel2.position(xPos / 4 + 190, 50);
    sel.option("Selecionar usuário inicial");
    sel2.option("selecionar usuário final");
    for (var i = 0; i < graph.nodes.length; i++) {
        sel.option(graph.nodes[i].value);
    }
    for (var i = 0; i < graph.nodes.length; i++) {
        sel2.option(graph.nodes[i].value);
    }
}

function mySelectEvent() {
    graph.setStart(graph.graph[sel.value()]);
}
function mySelectEvent1() {
    graph.setEnd(graph.graph[sel2.value()]);
    
}
function fazer(){
    setado=true;
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
    if(started){
        textAlign(CENTER);
        sel.changed(mySelectEvent);
        sel2.changed(mySelectEvent1);
        
        background(200);
        if(setado){
            bfs();
            graph.show();
            graph.simulate();
        }
        
    }
    
}

function resetar(){
    if(setado){
        setado=false;
        setup();
    }
}

function bfs(){
    var queue = [];
    var start = graph.start;
    var end = graph.end;
    queue.push(start);
    start.visited = true;
    if(start==end){
        end.color = color(255, 0, 0);
        return;
    }
    while(queue.length > 0){
        var current = queue.shift();
        for(var i=0; i<current.edges.length; i++){
            if(current.edges[i] == end){
                console.log("visitandoend: "+current.edges[i].value);
                end.visited = true;
                end.color = color(255, 0, 0);
                end.parents = current;
                end.parents.color = color(255, 0, 0);
                while (current.parents != null) {

                    current.parents.color = color(255, 0, 0);
                    current = current.parents;
                }
                return;
            }
                if(current.edges[i].visited == false){
                if(current.edges[i] == end){
                    console.log("visitandoend: "+current.edges[i].value);
                    end.visited = true;
                    end.color = color(255, 0, 0);
                    end.parents = current;
                    end.parents.color = color(255, 0, 0);
                    while(current.parents!=null){
                        
                        current.parents.color = color(255, 0, 0);
                        current = current.parents;
                    }
                    return;
                }
                queue.push(current.edges[i]);
                console.log("visitando: " + current.edges[i].value + " i: "+i);
                
                current.edges[i].visited = true;
                current.edges[i].color = color(0,0,255);
                current.edges[i].parents = current;
                console.log("parent: " + current.edges[i].parents.value);
            }
        }
    }
}