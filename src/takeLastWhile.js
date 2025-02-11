import { isArray } from './_internals/isArray.js'

export function takeLastWhile(predicate, input){
  if (arguments.length === 1){
    return _input => takeLastWhile(predicate, _input)
  }
  if (input.length === 0) return input
  let found = false
  const toReturn = []
  let counter = input.length

  while (!found && counter){
    counter--
    if (predicate(input[ counter ]) === false){
      found = true
    } else if (!found){
      toReturn.push(input[ counter ])
    }
  }

  return isArray(input) ? toReturn.reverse() : toReturn.reverse().join('')
}
