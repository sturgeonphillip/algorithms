
function checkPerf(f, x) {
  const start = performance.now()
  f(x)
  const end = performance.now()

  return {f: f.name, e:`${end - start} ms`}
}


function isPrimeFor(n) {
  for (let i = 2, s = Math.sqrt(n); i <= s; i++) {
    if (n % i === 0) return false
  }
  return n > 1
}



function isPrimeRec(p, x = 2) {
  if (p < 2) return false
  if (p === x) return true
    if (p % x === 0) return false

    return isPrimeRec(p, x + 1)
}


const pars = [3, 13, 36, 37, 39, 42, 157, 612, 100309]
const results = {}
pars.forEach(x => {
  const af = `${checkPerf(isPrimeFor, x).f}`
  const bf = checkPerf(isPrimeFor, x).e

  const ar = `${checkPerf(isPrimeRec, x).f}`
  const br = checkPerf(isPrimeRec, x).e

  const faster = bf < br ? af : ar
results[x] = {
  [af]: bf,
  [ar]: br,
  faster,
  time: faster === af ? bf : br
}
  
})

// console.log(results)
const faster = () => {
  let f = 0
  let r = 0
  for (const fun in results) {
    console.log(results[fun]['faster'])
    if (results[fun].faster === 'isPrimeFor') {
      f++
    } else {
      r++
    }
  }
  console.log(f, r)
  return f > r ? {'f':f} : {'r':r}
}
console.log(faster())
