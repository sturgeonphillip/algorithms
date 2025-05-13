function getFinalOpenedDoors(numDoors) {
  // set all doors to closed
  const doors = new Array(numDoors).fill(0)

  let p = 1;

  while (p <= numDoors) {
    for (let i = 1; i <= numDoors; i++) {
      // count for 0 index
      let status = doors[i - 1]

      // change every p doors on pass
      if (i % p === 0) {
        status = status === 0 ? 1 : 0;
      }

      doors[i - 1] = status
    }

    p++;
  }

  return doors.map((x, i) => {
    // open door # is index + 1
  return x === 1 ? i + 1 : false
  }).filter((x) => x !== false);
}


console.log(getFinalOpenedDoors(100))
/**
 * 100 Doors
 * 
 * There are 100 doors in a row that are all initially closed. You make 100 passes by the doors. The first time through, visit every door and 'toggle' the door (if the door is closed, open it; if it is open, close it). The second time, only visit every 2nd door (i.e., door #2, #4, #6, ...) and toggle it. The third time, visit every 3rd door (i.e., door #3, #6, #9, ...), etc., until you only visit the 100th door.

Implement a function to determine the state of the doors after the last pass. Return the final result in an array, with only the door number included in the array if it is open.
 */
