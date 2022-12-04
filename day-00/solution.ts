import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const input = readFileSync(join(__dirname, 'data.txt')).toString();

// Part 1
let result1 = 0;

console.log('result1:', result1);

// Part 2
let result2 = 0;
console.log('result2:', result2);
