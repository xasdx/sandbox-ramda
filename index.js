let { expect } = require("chai")
let R = require("ramda")

Object.values({
  
  "copiesArrays": () => {
    
    let array = [0, 1, 2]
    let otherArray = [...array]
    otherArray[1] = 3
    expect(array).to.deep.equal([0, 1, 2])
    expect(otherArray).to.deep.equal([0, 3, 2])
  },
  "replacesForLoopWithARange": () => {
    
    expect(R.range(2, 5).reverse().map(n => n + 1)).to.deep.equal([5, 4, 3])
  }
}).forEach(f => f())
