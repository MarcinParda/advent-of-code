import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const numberMap = {
  0: 'none',
  1: 'one',
  2: 'two',
  3: 'three',
  4: 'four',
  5: 'five',
  6: 'six',
  7: 'seven',
  8: 'eight',
  9: 'nine',
} as const;

function findFirstNumber(line: string[]) {
  return line.find((char) => Number.isInteger(+char));
}

function insertDigitBetweenSpelledDigit(line: string) {
  return line
    .replaceAll('one', 'one1one')
    .replaceAll('two', 'two2two')
    .replaceAll('three', 'three3three')
    .replaceAll('four', 'four4four')
    .replaceAll('five', 'five5five')
    .replaceAll('six', 'six6six')
    .replaceAll('seven', 'seven7seven')
    .replaceAll('eight', 'eight8eight')
    .replaceAll('nine', 'nine9nine');
}

function findCalibartionValue(line: string) {
  const lineArr = Array.from(line);
  const firstNumber = findFirstNumber(lineArr);
  const lastNumber = findFirstNumber(lineArr.reverse());
  return +`${firstNumber}${lastNumber}`;
}

const input = readFileSync(join(__dirname, 'data.txt')).toString();

// example
const exampleData = [
  'two1nine',
  'eightwothree',
  'abcone2threexyz',
  'xtwone3four',
  '4nineeightseven2',
  'zoneight234',
  '7pqrstsixteen',
];

const exampleLines = exampleData.map((line) =>
  insertDigitBetweenSpelledDigit(line)
);
const exampleNumbers = exampleLines.map((exampleLine) => {
  return findCalibartionValue(exampleLine);
});

const exampleResult = exampleNumbers.reduce((sum, number) => {
  return sum + number;
}, 0);
console.log(exampleResult);

// Part 1
const lines = input.split(/\r?\n/);
const numbers = lines.map((line) => {
  return findCalibartionValue(line);
});

const result1 = numbers.reduce((sum, number) => {
  return sum + number;
}, 0);
console.log(result1);

// Part 2
const newLines = lines.map((line) => insertDigitBetweenSpelledDigit(line));

const numbers2 = newLines.map((newLine) => {
  return findCalibartionValue(newLine);
});

const result2 = numbers2.reduce((sum, number) => {
  return sum + number;
}, 0);
console.log(result2);
