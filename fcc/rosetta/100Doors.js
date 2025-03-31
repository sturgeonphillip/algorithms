function getFinalOpenedDoors(numDoors) {
  // set all doors to closed
  const doors = new Array(numDoors).fill(0)

  let p = 1;

  while (p <= numDoors) {
    for (let i = 1; i <= numDoors; i++) {
      // count for 0 index
      let status = doors[i -1]

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

console.log(getFinalOpenedDoors(100));
