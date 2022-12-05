import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const input = readFileSync(join(__dirname, 'data.txt')).toString();

// Part 1
let [stacksInput, proceduresInput] = input.split('\n\n');

const stacksLines = stacksInput
  .split('\n')
  .splice(0, stacksInput.split('\n').length - 1)
  .map((line) => line.match(/.{1,4}/g) as string[])
  .map((el) =>
    el.map((el) =>
      el.split(' ').join('').split('[').join('').split(']').join('')
    )
  );

let stacks: string[][] = [];

for (let i = 0; i < stacksLines[0].length; i++) {
  stacks.push([]);
}

stacksLines.forEach((array) => {
  array.forEach((item, stackIndex) => {
    if (item !== '') {
      stacks[stackIndex].push(item[0]);
    }
  });
});

stacks = stacks.map((stack) => stack.reverse());

console.log(stacks);

const proceduresLines = proceduresInput
  .split('\n')
  .map((line) => line.split('move ').splice(1)[0].split(' from '))
  .map((line) => [line[0], ...line[1].split(' to ')])
  .map((line: string[]) => line.map(Number));

proceduresLines.forEach((line) => {
  let [amount, from, to] = line;
  let fromStack = stacks[from - 1];
  let toStack = stacks[to - 1];
  for (let i = 0; i < amount; i++) {
    toStack.push(fromStack.pop() as string);
  }
});

console.log(
  stacks
    .map((stack) => stack[stack.length - 1])
    .reduce((a, b) => (b ? a + b : a + ' '), '')
);

// input.split('\n').forEach((line) => {});

// Part 2
