import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const input = readFileSync(join(__dirname, 'data.txt')).toString();

// Part 1
let result1 = 0;
input.split('\n').forEach((line) => {
  const [elf1, elf2] = line.split(',');
  const [elf1AreaStart, elf1AreaEnd] = elf1.split('-').map(Number);
  const [elf2AreaStart, elf2AreaEnd] = elf2.split('-').map(Number);

  if (
    (elf1AreaStart <= elf2AreaStart && elf1AreaEnd >= elf2AreaEnd) ||
    (elf2AreaStart <= elf1AreaStart && elf2AreaEnd >= elf1AreaEnd)
  ) {
    result1++;
  }
});

console.log('result1:', result1);

// Part 2
let result2 = 0;
input.split('\n').forEach((line) => {
  const [elf1, elf2] = line.split(',');
  const [elf1AreaStart, elf1AreaEnd] = elf1.split('-').map(Number);
  const [elf2AreaStart, elf2AreaEnd] = elf2.split('-').map(Number);

  if (
    (elf1AreaStart <= elf2AreaEnd && elf1AreaEnd >= elf2AreaStart) ||
    (elf2AreaStart <= elf1AreaEnd && elf2AreaEnd >= elf1AreaStart)
  ) {
    result2++;
  }
});
console.log('result2:', result2);
