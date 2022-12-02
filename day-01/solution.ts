import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const input = readFileSync(join(__dirname, 'data.txt')).toString();

// Part 1
const elfes = input.split('\n\n').map((elf) =>
  elf
    .split('\n')
    .map(Number)
    .reduce((a, b) => a + b, 0)
);
const result1 = Math.max(...elfes);
console.log(result1);

// Part 2
const [elf1, elf2, elf3] = elfes.sort((a, b) => a - b).reverse();
const result2 = elf1 + elf2 + elf3;
console.log(result2);
