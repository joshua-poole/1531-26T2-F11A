import promptSync from 'prompt-sync';

/**
 * Given an array of n integers, caclulate the minimum, maximum, and the
 * product of the first n-1 numbers and last n-1 numbers.
 */
function drykiss(myList: number[]) {
  const myMin = Math.min(...myList);
  const myMax = Math.max(...myList);
  // const myMax = Math.max(a, b, c, d, e);

  console.log();
  const prod = myList.reduce((product, current) => {
    product *= current;
    return product;
  }, 1);

  const prodHead = prod / myList[myList.length - 1];

  const result = [myMin, myMax, prodHead, prod];
  return result;
}

const prompt = promptSync();
const myList: number[] = [];
for (const item of 'abcde') {
  myList.push(parseInt(prompt(`Enter ${item}: `)));
}

const result = drykiss(myList);
console.log('Minimum:');
console.log(`${result[0]}`);
console.log('Maximum:');
console.log(`${result[1]}`);
console.log('Product of first 4 numbers:');
console.log(`${result[2]}`);
console.log('Product of last 4 numbers');
console.log(`${result[3]}`);
