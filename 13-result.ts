import { readFileSync } from 'fs'
// --- Day 13: Shuttle Search-- -
//   Your ferry can make it safely to a nearby port, but it won't get much further. When you call to book another ship, you discover that no ships embark from that port to your vacation island. You'll need to get from the port to the nearest airport.

//     Fortunately, a shuttle bus service is available to bring you from the sea port to the airport! Each bus has an ID number that also indicates how often the bus leaves for the airport.

// Bus schedules are defined based on a timestamp that measures the number of minutes since some fixed reference point in the past.At timestamp 0, every bus simultaneously departed from the sea port.After that, each bus travels to the airport, then various other locations, and finally returns to the sea port to repeat its journey forever.

// The time this loop takes a particular bus is also its ID number: the bus with ID 5 departs from the sea port at timestamps 0, 5, 10, 15, and so on.The bus with ID 11 departs at 0, 11, 22, 33, and so on.If you are there when the bus departs, you can ride that bus to the airport!

// Your notes(your puzzle input) consist of two lines.The first line is your estimate of the earliest timestamp you could depart on a bus.The second line lists the bus IDs that are in service according to the shuttle company; entries that show x must be out of service, so you decide to ignore them.

// To save time once you arrive, your goal is to figure out the earliest bus you can take to the airport. (There will be exactly one such bus.)

// For example, suppose you have the following notes:

// 939
// 7, 13, x, x, 59, x, 31, 19
// Here, the earliest timestamp you could depart is 939, and the bus IDs in service are 7, 13, 59, 31, and 19. Near timestamp 939, these bus IDs depart at the times marked D:

// time   bus 7   bus 13  bus 59  bus 31  bus 19
// 929.       .       .       .       .
// 930.       .       .D.
// 931      D.       .       .D
// 932.       .       .       .       .
// 933.       .       .       .       .
// 934.       .       .       .       .
// 935.       .       .       .       .
// 936.D.       .       .
// 937.       .       .       .       .
// 938      D.       .       .       .
// 939.       .       .       .       .
// 940.       .       .       .       .
// 941.       .       .       .       .
// 942.       .       .       .       .
// 943.       .       .       .       .
// 944.       .D.       .
// 945      D.       .       .       .
// 946.       .       .       .       .
// 947.       .       .       .       .
// 948.       .       .       .       .
// 949.D.       .       .
// The earliest bus you could take is bus ID 59. It doesn't depart until timestamp 944, so you would need to wait 944 - 939 = 5 minutes before it departs. Multiplying the bus ID by the number of minutes you'd need to wait gives 295.

// What is the ID of the earliest bus you can take to the airport multiplied by the number of minutes you'll need to wait for that bus?

const input = readFileSync('./13-input.txt', { encoding: 'ascii' })
const testInput = `939
7,13,x,x,59,x,31,19`
const testInput2 = `000
67,7,59,61`
const testInput3 = `000
67,x,7,59,61`
const testInput4 = `000
67,7,x,59,61`
const testInput5 = `000
1789,37,47,1889`

const inputInUse = input
const earliestTimestamp = Number(inputInUse.split('\n')[0])
const busIdsWithX = inputInUse.split('\n')[1].split(',').map(x => x === 'x' ? undefined : Number(x))
const busIds = busIdsWithX.filter(x => typeof x === 'number')

const getClosestTimestamp = (busIds: number[], timestamp: number) => {
  let minTime = Number.MAX_VALUE
  let minTimeBusId = 0
  busIds.forEach(busId => {
    const closestMultiplier = Math.ceil(timestamp / busId);
    const waitingTime = (busId * closestMultiplier) - timestamp
    if (waitingTime < minTime) {
      minTime = waitingTime
      minTimeBusId = busId
    }
  })

  return [minTimeBusId, minTime]
}

const [id, waitingTime] = getClosestTimestamp(busIds, earliestTimestamp)
console.log('result #1', id * waitingTime)


// --- Part Two ---
// The shuttle company is running a contest: one gold coin for anyone that can find the earliest timestamp such that the first bus ID departs at that time and each subsequent listed bus ID departs at that subsequent minute. (The first line in your input is no longer relevant.)

// For example, suppose you have the same list of bus IDs as above:

// 7,13,x,x,59,x,31,19

// An x in the schedule means there are no constraints on what bus IDs must depart at that time.

// This means you are looking for the earliest timestamp (called t) such that:

// Bus ID 7 departs at timestamp t.
// Bus ID 13 departs one minute after timestamp t.
// There are no requirements or restrictions on departures at two or three minutes after timestamp t.
// Bus ID 59 departs four minutes after timestamp t.
// There are no requirements or restrictions on departures at five minutes after timestamp t.
// Bus ID 31 departs six minutes after timestamp t.
// Bus ID 19 departs seven minutes after timestamp t.
// The only bus departures that matter are the listed bus IDs at their specific offsets from t. Those bus IDs can depart at other times, and other bus IDs can depart at those times. For example, in the list above, because bus ID 19 must depart seven minutes after the timestamp at which bus ID 7 departs, bus ID 7 will always also be departing with bus ID 19 at seven minutes after timestamp t.

// In this example, the earliest timestamp at which this occurs is 1068781:

// time     bus 7   bus 13  bus 59  bus 31  bus 19
// 1068773    .       .       .       .       .
// 1068774    D       .       .       .       .
// 1068775    .       .       .       .       .
// 1068776    .       .       .       .       .
// 1068777    .       .       .       .       .
// 1068778    .       .       .       .       .
// 1068779    .       .       .       .       .
// 1068780    .       .       .       .       .
// 1068781    D       .       .       .       .
// 1068782    .       D       .       .       .
// 1068783    .       .       .       .       .
// 1068784    .       .       .       .       .
// 1068785    .       .       D       .       .
// 1068786    .       .       .       .       .
// 1068787    .       .       .       D       .
// 1068788    D       .       .       .       D
// 1068789    .       .       .       .       .
// 1068790    .       .       .       .       .
// 1068791    .       .       .       .       .
// 1068792    .       .       .       .       .
// 1068793    .       .       .       .       .
// 1068794    .       .       .       .       .
// 1068795    D       D       .       .       .
// 1068796    .       .       .       .       .
// 1068797    .       .       .       .       .
// In the above example, bus ID 7 departs at timestamp 1068788 (seven minutes after t). This is fine; the only requirement on that minute is that bus ID 19 departs then, and it does.

// Here are some other examples:

// The earliest timestamp that matches the list 17,x,13,19 is 3417.
// 67,7,59,61 first occurs at timestamp 754018.
// 67,x,7,59,61 first occurs at timestamp 779210.
// 67,7,x,59,61 first occurs at timestamp 1261476.
// 1789,37,47,1889 first occurs at timestamp 1202161486.
// However, with so many bus IDs in your list, surely the actual earliest timestamp will be larger than 100000000000000!

// What is the earliest timestamp such that all of the listed bus IDs depart at offsets matching their positions in the list?


const hasValInCommon = (busIds) => {
  const results = {}
  busIds.forEach((x, j) => {
    for (let i = 0; i < busIds.length; i = j + i + x) {
      if (x !== undefined && busIds[i] !== undefined && x + i !== undefined && i !== 0) {
        // console.log('val', x, ' index', i, 'val[index]', busIds[i])
        results[busIds[i]] = results[busIds[i]] ? `${results[busIds[i]]},${x}` : x
      }
    }
  })
  // const mostCommonsKey = Object.keys(results).sort((keyA, keyB) => results[keyB].split(',').length - (results[keyA] && results[keyA].split(',').length || 0))[0]
  // const multiplicator = Number(mostCommonsKey) * results[mostCommonsKey].reduce((acc, x) => acc *= x, 1)
  let multiplicator = 1
  if (Object.keys(results).length > 0) multiplicator = Number(Object.keys(results)[0]) * results[Object.keys(results)[0]].split(',').reduce((acc, x) => acc *= Number(x), 1)
  return multiplicator
}
/* =>
val 23  index 23 val[index] 647
val 41  index 54 val[index] 557
val 13  index 54 val[index] 557
*/
// https://www.matheretter.de/rechner/kgv
// kgv(41, 557, 13) = 296881
// kgv(23, 647) =      14881

const findEarliestTimestampWithPattern = (busIds: (number | undefined)[]) => {
  const timestampOffset = 99999999808657 //(100000000000000 / kgv)
  const kgv = hasValInCommon(busIds)
  let failed = false
  let foundTs = undefined

  console.log(busIds, kgv)
  for (let ts = 0; foundTs === undefined; ts += kgv) {
    failed = false
    // enhance check for 23 (and 647) for performance boost
    // const indexDiff = (54 - 23) // index54 = 557, index 23 = 647
    // if ((ts - indexDiff) % 14881 > 0) { // 23*647=14881
    //   failed = true
    //   continue;
    // }
    // check rest of the bus ids
    for (let k = 0; k < busIds.length; k++) {
      if (!busIds[k]) continue
      const indexDiff = (Math.abs(k - (busIds.length - 1)))
      // console.log(ts, busIds[k], indexDiff, (ts - indexDiff) % busIds[k])
      if ((ts - indexDiff) % busIds[k] !== 0) {
        failed = true
        break;
      }
    }
    if (!failed) {
      console.log('FOUND ONE', ts, busIds.length)
      foundTs = ts - (busIds.length - 1)
      break;
    }
  }
  return foundTs
}

console.log('result #2', findEarliestTimestampWithPattern(busIdsWithX))

