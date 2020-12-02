const fs = require('fs')

// Specifically, they need you to find the two entries that sum to 2020 and then multiply those two numbers together.

// For example, suppose your expense report contained the following:

// 1721
// 979
// 366
// 299
// 675
// 1456
// In this list, the two entries that sum to 2020 are 1721 and 299. Multiplying them together produces 1721 * 299 = 514579, so the correct answer is 514579.

// Of course, your expense report is much larger. Find the two entries that sum to 2020; what do you get if you multiply them together?

const listAsString = fs.readFileSync('./01-input.txt', { encoding: 'ascii'})
const listArray = listAsString.split('\n')

const getListAsObj = (list) => {
  const listAsObj = {}
  for (const key of listArray) {
    listAsObj[key] = true
  }
  return listAsObj
}

const findTupleThatSumsTo = (list = [], sumVal = 0) => {
  if (!list || list.length === 0 || !sumVal) return undefined

  const listAsObj = getListAsObj(listArray)
  const compatNum = list.find(num => {
    console.log(sumVal, num, sumVal - num, listAsObj[sumVal - num])
    return listAsObj[sumVal - num]
  })
  return [compatNum, sumVal - compatNum]
}

const compatTuple = findTupleThatSumsTo(listArray, 2020)
console.log('Result #1: ',compatTuple, compatTuple[0] * compatTuple[1])

// --- Part Two ---
// The Elves in accounting are thankful for your help; one of them even offers you a starfish coin they had left over from a past vacation. They offer you a second one if you can find three numbers in your expense report that meet the same criteria.

// Using the above example again, the three entries that sum to 2020 are 979, 366, and 675. Multiplying them together produces the answer, 241861950.

// In your expense report, what is the product of the three entries that sum to 2020?

const findTripleThatSumsTo = (list = [], sumVal = 0) => {
  if (!list || list.length === 0 || !sumVal) return undefined

  const listAsObj = getListAsObj(listArray)
  let compatNum2 = undefined
  const compatNum1 = list.find(num1 => {
    compatNum2 = list.find(num2 => listAsObj[sumVal - num1 - num2])
    return compatNum2
  })
  return [compatNum1, compatNum2, sumVal - compatNum1 - compatNum2]
}

const compatTriple = findTripleThatSumsTo(listArray, 2020)
console.log('Result #2: ',compatTriple, compatTriple[0] * compatTriple[1] * compatTriple[2])
