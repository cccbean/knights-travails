const createKnight = () => {
  return {
    move(startingCoordinatesStr) {
      let startingCoordinatesArr = startingCoordinatesStr
        .split(',')
        .map((string) => Number(string));
      let [x, y] = startingCoordinatesArr;
      let potentialCoordinatesArr = [
        [x + 2, y + 1],
        [x + 2, y - 1],
        [x - 2, y + 1],
        [x - 2, y - 1],
        [x + 1, y + 2],
        [x - 1, y + 2],
        [x + 1, y - 2],
        [x - 1, y - 2],
      ];
      potentialCoordinatesStr = potentialCoordinatesArr
        .filter(([x, y]) => x >= 0 && x < 8 && y >= 0 && y < 8)
        .map((arr) => arr.toString());
      return potentialCoordinatesStr;
    },
  };
};

const knightTravails = (knight, start, end) => {
  const graph = () => {
    return {
      noOfVertices: 0,
      adjList: new Map(),
      addVertex(v) {
        this.adjList.set(v, []);
        this.noOfVertices += 1;
      },
      addEdge(v, w) {
        this.adjList.get(v).push(w);
        this.adjList.get(w).push(v);
      },
      printGraph() {
        const getKeys = this.adjList.keys();
        for (const key of getKeys) {
          let getValues = this.adjList.get(key);
          let conc = '';

          for (const value of getValues) {
            conc += value + ' ';
          }
          console.log(key + ' -> ' + conc);
        }
      },
    };
  };

  const knightGraph = graph();
  knightGraph.addVertex(start);
  let queue = [];

  const addMoves = (knight, start) => {
    let canMoveTo = knight.move(start);
    canMoveTo.forEach((coordinate) => {
      let keys = [...knightGraph.adjList.keys()];
      if (!keys.includes(coordinate)) {
        knightGraph.addVertex(coordinate);
        knightGraph.addEdge(start, coordinate);
        queue.push(coordinate);
      };
    });
  };

  addMoves(knight, start);
  let match = false;
  while (!match) {
    for (const key of knightGraph.adjList.keys()) {
      if (key === end) {
        match = true;
      }
    }
    let newStart = queue.shift();
    addMoves(knight, newStart);
  }
  console.log(knightGraph);
  knightGraph.printGraph();
  console.log([...knightGraph.adjList.keys()]);
  console.log(knightGraph.adjList.get('4,2'))
};

const testKnight = createKnight();
console.log(testKnight.move('0,0'));
knightTravails(testKnight, '0,0', '0,4');
// knightTravails(testKnight, '0,0', '1,6');
