import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const input = readFileSync(join(__dirname, 'data.txt')).toString();

// Part 1

function calculatePriority(letter: string) {
  const alphabet = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ];
  return alphabet.indexOf(letter) + 1;
}

const backpacks = input.split('\n');
let result1 = 0;
backpacks.forEach((backpack) => {
  const firstHalf = backpack.substring(0, backpack.length / 2);
  const secondHalf = backpack.substring(backpack.length / 2);
  const firstHalfLetters = firstHalf.split('');
  const secondHalfLetters = secondHalf.split('');
  const reapeatedLetters = firstHalfLetters.filter((letter) =>
    secondHalfLetters.includes(letter)
  );
  const uniqueReapeatedLetters = [...new Set(reapeatedLetters)];
  uniqueReapeatedLetters.forEach(
    (letter) => (result1 += calculatePriority(letter))
  );
});

console.log(result1);

// Part 2
let result2 = 0;

const groupOfBackpacks: string[] = [];
while (backpacks.length > 0) {
  // @ts-ignore
  groupOfBackpacks.push([
    backpacks.shift(),
    backpacks.shift(),
    backpacks.shift(),
  ]);
}
groupOfBackpacks.forEach((group) => {
  const intersection12 = group[0]
    .split('')
    .filter((element) => group[1].split('').includes(element));

  const uniqueIntersection12 = [...new Set(intersection12)];

  const intersection123 = intersection12.filter((element) =>
    group[2].split('').includes(element)
  );
  const uniqueIntersection123 = [...new Set(intersection123)];

  result2 += calculatePriority(uniqueIntersection123[0]);
});
console.log(result2);
