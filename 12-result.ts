import { readFileSync } from 'fs'

// --- Day 12: Rain Risk-- -
//   Your ferry made decent progress toward the island, but the storm came in faster than anyone expected.The ferry needs to take evasive actions!

// Unfortunately, the ship's navigation computer seems to be malfunctioning; rather than giving a route directly to safety, it produced extremely circuitous instructions. When the captain uses the PA system to ask if anyone can help, you quickly volunteer.

// The navigation instructions(your puzzle input) consists of a sequence of single - character actions paired with integer input values.After staring at them for a few minutes, you work out what they probably mean:

// Action N means to move north by the given value.
// Action S means to move south by the given value.
// Action E means to move east by the given value.
// Action W means to move west by the given value.
// Action L means to turn left the given number of degrees.
// Action R means to turn right the given number of degrees.
// Action F means to move forward by the given value in the direction the ship is currently facing.
// The ship starts by facing east.Only the L and R actions change the direction the ship is facing. (That is, if the ship is facing east and the next instruction is N10, the ship would move north 10 units, but would still move east if the following action were F.)

// For example:

// F10
// N3
// F7
// R90
// F11
// These instructions would be handled as follows:

// F10 would move the ship 10 units east(because the ship starts by facing east) to east 10, north 0.
// N3 would move the ship 3 units north to east 10, north 3.
// F7 would move the ship another 7 units east(because the ship is still facing east) to east 17, north 3.
// R90 would cause the ship to turn right by 90 degrees and face south; it remains at east 17, north 3.
// F11 would move the ship 11 units south to east 17, south 8.
// At the end of these instructions, the ship's Manhattan distance (sum of the absolute values of its east/west position and its north/south position) from its starting position is 17 + 8 = 25.

// Figure out where the navigation instructions lead.What is the Manhattan distance between that location and the ship's starting position?

const input = readFileSync('./12-input.txt', { encoding: 'ascii' })
const testInput = `F10
N3
F7
R90
F11`
const testInstructions = testInput.split('\n')
const instructions = input.split('\n')

const getCoordinatesAfterIns = (instructions: string[]) => {
  let [x, y] = [0, 0]
  // N = 0, E = 90, S = 180, W = 270
  let currentDirection = 90

  instructions.forEach(inst => {
    const [action, amount] = [inst[0], Number(inst.slice(1))]
    switch (action) {
      case 'N':
        y += amount
        break;
      case 'E':
        x += amount
        break;
      case 'S':
        y -= amount
        break;
      case 'W':
        x -= amount
        break;
      case 'L':
        currentDirection = (currentDirection - amount + 360) % 360
        break;
      case 'R':
        currentDirection = (currentDirection + amount) % 360
        break;
      case 'F':
        switch (currentDirection) {
          case 0:
            y += amount
            break;
          case 90:
            x += amount
            break;
          case 180:
            y -= amount
            break;
          case 270:
            x -= amount
            break;
          default:
            console.log('which direction you want to go?', currentDirection, amount)
        }
        break;
      default: console.log('fail?', action, amount)
    }
  })
  return [x, y, currentDirection]
}

const resultCoords = getCoordinatesAfterIns(instructions)
console.log('result #1', Math.abs(resultCoords[0]) + Math.abs(resultCoords[1]))


// --- Part Two ---
// Before you can give the destination to the captain, you realize that the actual action meanings were printed on the back of the instructions the whole time.

// Almost all of the actions indicate how to move a waypoint which is relative to the ship's position:

// Action N means to move the waypoint north by the given value.
// Action S means to move the waypoint south by the given value.
// Action E means to move the waypoint east by the given value.
// Action W means to move the waypoint west by the given value.
// Action L means to rotate the waypoint around the ship left (counter-clockwise) the given number of degrees.
// Action R means to rotate the waypoint around the ship right (clockwise) the given number of degrees.
// Action F means to move forward to the waypoint a number of times equal to the given value.
// The waypoint starts 10 units east and 1 unit north relative to the ship. The waypoint is relative to the ship; that is, if the ship moves, the waypoint moves with it.

// For example, using the same instructions as above:

// F10 moves the ship to the waypoint 10 times (a total of 100 units east and 10 units north), leaving the ship at east 100, north 10. The waypoint stays 10 units east and 1 unit north of the ship.
// N3 moves the waypoint 3 units north to 10 units east and 4 units north of the ship. The ship remains at east 100, north 10.
// F7 moves the ship to the waypoint 7 times (a total of 70 units east and 28 units north), leaving the ship at east 170, north 38. The waypoint stays 10 units east and 4 units north of the ship.
// R90 rotates the waypoint around the ship clockwise 90 degrees, moving it to 4 units east and 10 units south of the ship. The ship remains at east 170, north 38.
// F11 moves the ship to the waypoint 11 times (a total of 44 units east and 110 units south), leaving the ship at east 214, south 72. The waypoint stays 4 units east and 10 units south of the ship.
// After these operations, the ship's Manhattan distance from its starting position is 214 + 72 = 286.

// Figure out where the navigation instructions actually lead. What is the Manhattan distance between that location and the ship's starting position?

const getCoordinatesAfterInsWaypoint = (instructions: string[]) => {
  let [x, y] = [0, 0]
  let [wpX, wpY] = [10, 1]

  instructions.forEach(inst => {
    const [action, amount] = [inst[0], Number(inst.slice(1))]
    switch (action) {
      case 'N':
        wpY += amount
        break;
      case 'E':
        wpX += amount
        break;
      case 'S':
        wpY -= amount
        break;
      case 'W':
        wpX -= amount
        break;
      case 'L':
        switch (amount) {
          case 90:
            [wpX, wpY] = [wpY * -1, wpX]
            break;
          case 180:
            [wpX, wpY] = [wpX * -1, wpY * -1]
            break;
          case 270:
            [wpX, wpY] = [wpY, wpX * -1]
            break;
          default:
            console.log('L which direction you want to go?', amount)
        }
        break;
      case 'R':
        switch (amount) {
          case 90:
            // R90
            /*
              E10, N4
              => E4, S10
              wpX = 10, wpY = 4
              => wpX = 4, wpY = -10
            */
            [wpX, wpY] = [wpY, wpX * -1]
            break;
          case 180:
            // R180
            /*
              E10, N4
              => W10, S4
              wpX = 10, wpY = 4
              => wpX = -10, wpY = -4
            */
            [wpX, wpY] = [wpX * -1, wpY * -1]
            break;
          case 270:
            // R270
            /*
              E10, N4
              => N10, W4
              wpX = 10, wpY = 4
              => wpX = -4, wpY = 10
            */
            [wpX, wpY] = [wpY * -1, wpX]
            break;
          default:
            console.log('R which direction you want to go?', amount)
        }
        break;
      case 'F':
        x += wpX * amount
        y += wpY * amount
        break;
      default: console.log('fail?', action, amount)
    }
  })
  return [x, y]
}

const resultCoordsWaypoint = getCoordinatesAfterInsWaypoint(instructions)
console.log('result #2', Math.abs(resultCoordsWaypoint[0]) + Math.abs(resultCoordsWaypoint[1]))



