import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const input = readFileSync(join(__dirname, 'data.txt')).toString();
const lines = input.split('\n');

const parsedLines: string[] = [];
lines.forEach((line) => {
  if (line === 'noop') {
    parsedLines.push('');
    return;
  }
  parsedLines.push(...line.split('addx '));
});

const cyclesStrength = parsedLines.reduce(
  (acc, value, index) => {
    if (index === 0) return acc;
    if (value === '') return [...acc, acc[index - 1]];

    return [...acc, acc[index - 1] + Number(value)];
  },
  [1]
);

const cycles = [20, 60, 100, 140, 180, 220];

const sprite = cyclesStrength.reduce((acc, _, index) => {
  if (index === 0) return [...acc, '#'];
  const position = index % 40;
  if (
    position >= cyclesStrength[index - 1] - 1 &&
    position <= cyclesStrength[index - 1] + 1
  ) {
    if (position === 0) {
      return [...acc, '\n', '#'];
    }
    return [...acc, '#'];
  }

  if (position === 0) {
    return [...acc, '\n', ' '];
  }
  return [...acc, ' '];
}, [] as string[]);

const result1 = cycles.reduce((acc, value) => {
  return acc + value * cyclesStrength[value - 2];
}, 0);

const result2 = sprite.join('');

console.log(result1);
console.log(result2);
