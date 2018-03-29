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
  }
}).forEach(f => f())
