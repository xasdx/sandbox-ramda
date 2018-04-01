let { expect } = require("chai")
let R = require("ramda")
let _ = R.__

Object.values({

  "copiesArrays": () => {

    let array = [0, 1, 2]
    let otherArray = [...array]

    otherArray[1] = 3

    expect(array).to.deep.equal([0, 1, 2])
    expect(otherArray).to.deep.equal([0, 3, 2])
  },

  "generatesRanges": () => {

    expect(R.range(2, 5).reverse().map(n => n + 1)).to.deep.equal([5, 4, 3])
  },

  "curriesFunctions": () => {

    let add = (a, b) => a + b
    let subtract = (a, b) => a - b
    let sum = (...args) => R.sum(args)

    let f = R.curry(add)(5)
    expect(f(6)).to.equal(11)

    let g = R.curry(add)
    expect(g(5, 7)).to.equal(12)

    let h = R.curry(subtract)(_, 10)
    expect(h(5)).to.equal(-5)

    expect(sum(1, 2, 3)).to.equal(6)

    let i = R.curryN(2, sum)
    expect(i(4, 5)).to.equal(9)
  },

  "filtersFilterables": () => {

    let range = R.range(1, 10)
    let obj = { a: 2, b: 3 }
    let isEven = n => n % 2 === 0

    let filterEvenNumbers = R.filter(isEven)

    expect(filterEvenNumbers(range)).to.deep.equal([2, 4, 6, 8])
    expect(filterEvenNumbers(obj)).to.deep.equal({ a: 2 })
  },

  "composesFunctions": () => {

    let isNotNil = R.compose(R.not, R.isNil)
    let obj = { name: "paul" }
    let nameNotNil = R.compose(isNotNil, R.prop("name"))

    expect(isNotNil("")).to.be.true
    expect(isNotNil(null)).to.be.false
    expect(nameNotNil(obj)).to.be.true
    expect(nameNotNil({})).to.be.false
  },

  "pipesFunctions": () => {

    let doSomeComputation = R.pipe(R.add, R.inc, R.tap(console.log), R.negate)

    expect(doSomeComputation(3, 4)).to.equal(-8)
  },

  "abstractsConditionalStatements": () => {

    let expected = "hello paul"
    let obj = { name: "paul", age: 1 }
    let otherObj = { age: 1 }

    let greet = obj => `hello ${R.ifElse(
      R.has("name"),
      R.prop("name"),
      R.pipe(R.assoc("name", "paul"), R.prop("name"))
    )(obj)}`

    expect(greet(obj)).to.equal(expected)
    expect(greet(otherObj)).to.equal(expected)
  }
}).forEach(f => f())
