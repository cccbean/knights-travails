const createGameBoard = () => {
  let gameboard = {};
  for (let i = 0; i < 8; i++) {
    gameboard[i] = [0, 1, 2, 3, 4, 5, 6, 7];
  }
  return gameboard;
};

const createKnight = () => {
  return {
    move(startingCoordinates) {
      let [x, y] = startingCoordinates;
      let potentialCoordinates = [
        [x + 2, y + 1],
        [x + 2, y - 1],
        [x - 2, y + 1],
        [x - 2, y - 1],
        [x + 1, y + 2],
        [x - 1, y + 2],
        [x + 1, y - 2],
        [x - 1, y - 2],
      ];
      potentialCoordinates = potentialCoordinates.filter(
        ([x, y]) => x >= 0 && x < 8 && y >= 0 && y < 8
      );
      return potentialCoordinates;
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
      knightGraph.addVertex(coordinate);
      knightGraph.addEdge(start, coordinate);
      queue.push(coordinate);
    });
  };
  addMoves(knight, start);
  console.log(queue);
  let match = false;
  while (!match) {
    for (const key of knightGraph.adjList.keys()) {
      let [x, y] = key;
      let [a, b] = end;
      if (x === a && y === b) {
        match = true;
      }
    }
    let newStart = queue.shift();
    addMoves(knight, newStart);
  }
  console.log(knightGraph);
  knightGraph.printGraph();
  let output = [];
  const findPath = (end) => {
    for (const key of knightGraph.adjList.keys()) {
      let [x, y] = key;
      let [a, b] = end;
      if (x === a && y === b) {
        output.push(key);
      }
    };
  }
  console.log(queue);
  // while (end !== start) {
  //   findPath(end);
  // }
  console.log(output);
};

const testGameBoard = createGameBoard();
console.log(
  testGameBoard[7],
  testGameBoard[6],
  testGameBoard[5],
  testGameBoard[4],
  testGameBoard[3],
  testGameBoard[2],
  testGameBoard[1],
  testGameBoard[0]
);
const testKnight = createKnight();
console.log(testKnight.move([0, 0]));
knightTravails(testKnight, [0, 0], [0, 4]);
