import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const input = readFileSync(join(__dirname, 'data.txt')).toString();

// Part 1
let result = 0;

let index = 0;
let found = false;
let returnIndex = 0;
const set: Set<string> = new Set([]);
while (!found) {
  let char = input[index];
  if (set.size === 0) {
    returnIndex = index;
  }
  if (!set.has(char)) {
    set.add(char);
    if (set.size === 14) {
      found = true;
    }
  } else {
    set.clear();
    index = returnIndex;
  }
  index++;
}
result = index;

console.log('result1:', result);
