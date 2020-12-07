const fs = require('fs')

// --- Day 7: Handy Haversacks ---
// You land at the regional airport in time for your next flight. In fact, it looks like you'll even have time to grab some food: all flights are currently delayed due to issues in luggage processing.

// Due to recent aviation regulations, many rules (your puzzle input) are being enforced about bags and their contents; bags must be color-coded and must contain specific quantities of other color-coded bags. Apparently, nobody responsible for these regulations considered how long they would take to enforce!

// For example, consider the following rules:

// light red bags contain 1 bright white bag, 2 muted yellow bags.
// dark orange bags contain 3 bright white bags, 4 muted yellow bags.
// bright white bags contain 1 shiny gold bag.
// muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
// shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
// dark olive bags contain 3 faded blue bags, 4 dotted black bags.
// vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
// faded blue bags contain no other bags.
// dotted black bags contain no other bags.
// These rules specify the required contents for 9 bag types. In this example, every faded blue bag is empty, every vibrant plum bag contains 11 bags (5 faded blue and 6 dotted black), and so on.

// You have a shiny gold bag. If you wanted to carry it in at least one other bag, how many different bag colors would be valid for the outermost bag? (In other words: how many colors can, eventually, contain at least one shiny gold bag?)

// In the above rules, the following options would be available to you:

// A bright white bag, which can hold your shiny gold bag directly.
// A muted yellow bag, which can hold your shiny gold bag directly, plus some other bags.
// A dark orange bag, which can hold bright white and muted yellow bags, either of which could then hold your shiny gold bag.
// A light red bag, which can hold bright white and muted yellow bags, either of which could then hold your shiny gold bag.
// So, in this example, the number of bag colors that can eventually contain at least one shiny gold bag is 4.

// How many bag colors can eventually contain at least one shiny gold bag? (The list of rules is quite long; make sure you get all of it.)

// To begin, get your puzzle input.

const input = fs.readFileSync('./07-input.txt', { encoding: 'ascii' })
const testInput =  `light red bags contain 1 bright white bag, 2 muted yellow bags.
dark orange bags contain 3 bright white bags, 4 muted yellow bags.
bright white bags contain 1 shiny gold bag.
muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
dark olive bags contain 3 faded blue bags, 4 dotted black bags.
vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
faded blue bags contain no other bags.
dotted black bags contain no other bags.`

const ruleSentences = input.replace(/ bags?/g, '').split('.\n')
const rules = {}
ruleSentences.forEach(r => rules[r.split(' contain ')[0]] = r.split(' contain ')[1].split(', '))
const WANTED_COLOR = 'shiny gold'

let bagsThatContainShinyGold = [];
let numChecked = 0

const searchForColor = (currentColor, outerBagColor) => {
  if (rules[currentColor]) {
    numChecked++
    if (rules[currentColor].find(c => c.includes(WANTED_COLOR))) {
      // console.log('Found one', currentColor)
      bagsThatContainShinyGold.push(outerBagColor)
    }
    rules[currentColor].forEach(innerColor => {
      if (Number(innerColor[0])) innerColor = innerColor.substr(innerColor.indexOf(' ') + 1) // remove number in front
      // if (currentColor === 'dark tomato') console.log(currentColor, innerColor)
      searchForColor(innerColor, outerBagColor)
    })
  } else {
    // console.log('Not Found for ', currentColor)
  }
}

Object.keys(rules).forEach(outerBagColor => {
  searchForColor(outerBagColor, outerBagColor)

  // if (rules[outerBagColor].find(x => x.includes(WANTED_COLOR))) bagsThatContainShinyGold.push(outerBagColor)
  // rules[outerBagColor].forEach(innerBag => {
  //   const innerBagColor = innerBag.substr(innerBag.indexOf(' '))
  //   console.log('x', innerBagColor)
  // })
})

bagsThatContainShinyGoldDistinct = [...new Set(bagsThatContainShinyGold)]
// console.log(bagsThatContainShinyGoldDistinct, bagsThatContainShinyGold, numChecked, Object.keys(rules).length)
console.log('result #1: ', bagsThatContainShinyGoldDistinct.length)


// --- Part Two ---
// It's getting pretty expensive to fly these days - not because of ticket prices, but because of the ridiculous number of bags you need to buy!

// Consider again your shiny gold bag and the rules from the above example:

// faded blue bags contain 0 other bags.
// dotted black bags contain 0 other bags.
// vibrant plum bags contain 11 other bags: 5 faded blue bags and 6 dotted black bags.
// dark olive bags contain 7 other bags: 3 faded blue bags and 4 dotted black bags.
// So, a single shiny gold bag must contain 1 dark olive bag (and the 7 bags within it) plus 2 vibrant plum bags (and the 11 bags within each of those): 1 + 1*7 + 2 + 2*11 = 32 bags!

// Of course, the actual rules have a small chance of going several levels deeper than this example; be sure to count all of the bags, even if the nesting becomes topologically impractical!

// Here's another example:

// shiny gold bags contain 2 dark red bags.
// dark red bags contain 2 dark orange bags.
// dark orange bags contain 2 dark yellow bags.
// dark yellow bags contain 2 dark green bags.
// dark green bags contain 2 dark blue bags.
// dark blue bags contain 2 dark violet bags.
// dark violet bags contain no other bags.
// In this example, a single shiny gold bag must contain 126 other bags.

// How many individual bags are required inside your single shiny gold bag?


const bagsWithSums = {}
Object.keys(rules).forEach(key => {
  const sum = rules[key].reduce((acc, bagColor) => {
    let howMany = Number(bagColor.substr(0, bagColor.indexOf(' '))) // get number from color string, e.g. '3 shiny gold'
    acc = acc + (howMany || 1)
    return acc
  }, 0)
  bagsWithSums[key] = { bags: rules[key], sum }
})
let total = 0
const callme = (c) => rules[c].forEach(color => {
    let howMany = Number(color.substr(0, color.indexOf(' '))) // get number from color string, e.g. '3 shiny gold'
    let innerColor = color.substr(color.indexOf(' ') + 1) // remove number in front
    if (Number(howMany) && bagsWithSums[innerColor]) {
      callme(innerColor)
    } else {
      return total = total + 1
    }
    console.log(howMany, innerColor,  bagsWithSums[innerColor])
    return total = total + 1 + howMany * bagsWithSums[innerColor].sum
})

// TODO: recursive
// const countContaingBags = (currentColor, total) => {
//   let howMany = Number(currentColor.substr(0, currentColor.indexOf(' '))) // get number in front
//   let color = currentColor.substr(currentColor.indexOf(' ') + 1) // remove number in front
//   if (!howMany || color === 'no other') return 1
//   rules[color].forEach(innerColor => {
//     console.log(howMany, color, innerColor)
//     total = total + howMany * countContaingBags(innerColor, total)
//     return howMany * countContaingBags(innerColor, total)
//   })
// }
// console.log('result #2: ', countContaingBags(`1 ${WANTED_COLOR}`))

callme(WANTED_COLOR)
console.log('result #2: ', total)
