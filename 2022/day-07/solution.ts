import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const input = readFileSync(join(__dirname, 'data.txt')).toString();

// Part 1
let result1 = 0;

const lines = input.split('\n');
const disc: Record<string, number> = {};
const path: string[] = [];

lines.forEach((line) => {
  const words = line.split(' ');
  if (words[1] === 'cd') {
    if (words[2] === '..') {
      path.pop();
    } else {
      path.push(words[2]);
    }
  } else if (words[1] !== 'ls') {
    const sz = parseInt(words[0]) || 0;
    for (let i = 0; i < path.length; i++) {
      const pathName = path.slice(0, i + 1).join('/');

      if (disc[pathName]) {
        disc[pathName] += sz;
      } else {
        disc[pathName] = sz;
      }
    }
  }
});

Object.entries(disc).forEach(([key, value]) => {
  if (value < 100000) {
    result1 += value;
  }
});

console.log('result1:', result1);

// Part 2

const MAX_SPACE = 70000000;
const usedSpace = disc['/'];

const needToDelete = usedSpace - 40000000;

let result2: number = MAX_SPACE;
const spaces: number[] = [];

Object.entries(disc).forEach(([key, value]) => {
  if (value >= needToDelete) spaces.push(value);
  if (value >= needToDelete) {
    result2 = Math.min(...spaces);
  }
});

console.log('result2:', result2);
