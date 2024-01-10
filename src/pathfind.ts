import { Vector } from "./Vector.type"
import { VectorPriorityQueue } from "./VectorPriorityQueue.class"

export const pathfind = (A: boolean[][], P: Vector, Q: Vector): number => {
  
  if(vectorsAreEqual(P, Q)) {
    // If statement to handle when P == Q off the bat
    return 0;
  }

  let vPrioQueue = new VectorPriorityQueue((A[0].length) * A.length); // Create a Vector Priority Queue with the same size as number of squares in grid
  let distMap = initialiseDistMap(A);
  A[P.y][P.x] = false; // This treats the starting square as a wall to prevent the algorithm going back on itself during the 'expand' function.

  return bfs(A, distMap, P, Q, vPrioQueue);
}

function bfs(mapArray: boolean[][], distMap: number[][], currentV: Vector, vToFind: Vector, queue: VectorPriorityQueue): number {
  /*
    Bread and butter recursive Breadth First Search algorithm. I chose BFS due to 
    its simplicity and speed to find close targets, which is more likely due to the
    moveable nature of p and q.
    Searches for q and returns the distance to q.

    mapArray : boolean[][] - 2D array depicting the map
    distMap : number[][] - 2D array mimicking a, but with the distance of each point from the start point
    currentV : Vector - current coordinates of the bfs algorithm
    vToFind : Vector - the coordinates of the target to reach
    queue : VectorPriorityQueue - the queue to be used to store vectors to search 

    Returns a the minimum distance from p to q as a number type variable.
  */

  let qDist = expand(mapArray, distMap, currentV, vToFind, queue); // Check adjacent squares

  if(qDist !== -1) {
    // If q is found
    return qDist; // Base case
  }

  try {
    // As VectorQueue.dequeue() may throw an error if the queue is empty, use a try/catch block.
    let newV = queue.dequeue(); // Get next vector to visit from queue
    return bfs(mapArray, distMap, newV, vToFind, queue); // Recursive case
  }
  catch(e) {
    console.log(e);
    return -1;
  }

}

function expand(mapArray: boolean[][], distMap: number[][], currentV: Vector, vToFind: Vector, queue: VectorPriorityQueue): number {
  /*
    This is where the magic happens.
    The 'expand' function does the following:
      Checks the adjacent unchecked squares for q
      Prevents the algorithm going back on itself by treating the adjacent checked squares as a walls
      Gives said adjacent squares distant values
      Enqueues adjacent floor squares in this order:
        TOP
        RIGHT
        DOWN
        LEFT
    
    mapArray : boolean[][] - 2D array depicting the map
    distMap : number[][] - 2d array mimicking a, but with the distance of each point from the start point
    currentV : Vector - current coordinates of the bfs algorithm
    vToFind : Vector - the coordinates of the target to reach
    queue : VectorPriorityQueue - the queue to be used to store vectors to search 

    Returns -1 if q is not found, and returns the distance between p and q if q is found as a number type variable
  */

  let tempX = currentV.x;

  

  let newVs : Vector[] = [
    {x: currentV.x, y: currentV.y + 1}, // UP
    {x: currentV.x + 1, y: currentV.y}, // RIGHT
    {x: currentV.x, y: currentV.y - 1}, // DOWN
    {x: currentV.x - 1, y: currentV.y} // LEFT
  ]
  // 2D array of adjacent squares

  for(let i = 0; i < newVs.length; i++) {
    // For loop to check each adjacent square
    if(isFloor(mapArray, newVs[i])) {
      mapArray[newVs[i].y][newVs[i].x] = false; // Turn the checked square into a wall - essentially marking current square as 'checked'
      setDistanceValue(currentV, newVs[i], distMap); // Give checked square distance value
      if(vectorsAreEqual(newVs[i], vToFind)) {
        // q found!
        return distMap[newVs[i].y][newVs[i].x]; // Return distance between q and p
      }

      try {
        // As VectorQueue.enqueue() may throw an error if the queue is full, use a try/catch block.
        queue.enqueue(newVs[i], movesTowardsQ(currentV, newVs[i], vToFind));
      }
      catch(e) {
        console.log(e);
        return -2; // End program early and gracefully. -2 as -1 is used in bfs function to indicate algorithm is still searching.
      }
    
    }
  }

  return -1; // If q isn't found

}


// ------ UTILITY FUNCTIONS ------

function isFloor(mapArray: boolean[][], currentV: Vector): boolean {
  /*
    Checks if a given vector is a floor in a.

    mapArray : boolean[][] - 2D array depicting the map
    currentV : Vector - current coordinates of the bfs algorithm

    Returns a boolean depicting if v is a floor or not.
  */

  let lowerX = 0, 
      lowerY = 0, 
      upperX = mapArray[0].length - 1,
      upperY = mapArray.length - 1; // Define boundaries of the map. Just to make the code a bit prettier.
  
  if(currentV.x < lowerX || currentV.x > upperX || currentV.y < lowerY || currentV.y > upperY) {
    return false; // Treat out of bounds as a wall
  }
  else {
    return mapArray[currentV.y][currentV.x]; // Return whether the square is a floor or wall
  }

}

function setDistanceValue(vA: Vector, vB: Vector, distMap: number[][]) {
  /*
    Calculates distance between vector vB and p.

    vA : Vector - vector already with a distance value
    vB : Vector - vector to be given a distance value
    distMap : number[][] - 2D array mimicking a, but with the distance of each point from the start point
  */
 
  distMap[vB.y][vB.x] = distMap[vA.y][vA.x] + 1; // Sets value of b at the coordinates of vB to the distance between vB and p
}

function initialiseDistMap(mapArray: boolean[][]): number[][] {
  /*
    Initialises the distMap 2D array.

    mapArray : boolean[][] - 2D array depicting the map.

    Returns the 2D array full of 0s.
  */

  let mapLength = mapArray[0].length,
      mapHeight = mapArray.length;
  
  let distMap = new Array(mapHeight).fill(null).map(() => new Array(mapLength).fill(0));
  // I learnt how to use the fill() and map() functions from geeksforgeeks.org (https://www.geeksforgeeks.org/what-is-the-most-efficient-way-to-create-a-zero-filled-array-in-javascript/)

  return distMap;
}

function vectorsAreEqual(vA: Vector, vB: Vector): boolean {
  /* 
    Simple function to test if vectors are equal.

    Returns a boolean depicting if they are equal
  */

  if(vA.x == vB.x && vA.y == vB.y) {
    return true;
  }
  else {
    return false;
  }
}

function movesTowardsQ(vA: Vector, vB: Vector, vToFind: Vector): boolean {
  /*
    A function that returns a boolean depicting whether the next checked vector is moving 
    towards Q.

    vA : Vector - starting vector
    vB : Vector - next vector to check
    vToFind : Vector - the vector to eventually reach; Q

    Returns a boolean
  */

  let deltaVA : Vector = { x: Math.abs(vA.x - vToFind.x), y: Math.abs(vA.y - vToFind.y)};
  let deltaVB : Vector = { x: Math.abs(vB.x - vToFind.x), y: Math.abs(vB.y - vToFind.y)};
  
  if(deltaVB.x < deltaVA.x || deltaVB.y < deltaVA.y) {
    // If the distance between vB and vToFind in the x or y axis is lower than the distance between vA and vToFind
    return true;
  }
  else {
    return false;
  }
}
