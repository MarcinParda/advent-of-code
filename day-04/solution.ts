import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const input = readFileSync(join(__dirname, 'data.txt')).toString();

// Part 1
let result1 = 0;
input.split('\n').forEach((line) => {
  const [elf1, elf2] = line.split(',');
  const [areaStart, areaEnd] = elf1.split('-');
  const [elf2AreaStart, elf2AreaEnd] = elf2.split('-');
  let area1ContainsElf2Start = false;
  let area2ContainsElf2End = false;
  for (let i = parseInt(areaStart); i <= parseInt(areaEnd); i++) {
    if (i.toString() === elf2AreaStart) {
      area1ContainsElf2Start = true;
    }
    if (i.toString() === elf2AreaEnd) {
      area2ContainsElf2End = true;
    }
  }
  let dontRunSecondLoop = false;

  if (area1ContainsElf2Start && area2ContainsElf2End) {
    result1++;
    dontRunSecondLoop = true;
  }

  if (!dontRunSecondLoop) {
    area1ContainsElf2Start = false;
    area2ContainsElf2End = false;
    for (let i = parseInt(elf2AreaStart); i <= parseInt(elf2AreaEnd); i++) {
      if (i.toString() === areaStart) {
        area1ContainsElf2Start = true;
      }
      if (i.toString() === areaEnd) {
        area2ContainsElf2End = true;
      }
    }

    if (area1ContainsElf2Start && area2ContainsElf2End) {
      result1++;
    }
  }
});

console.log('result1:', result1);

// Part 2
let result2 = 0;
input.split('\n').forEach((line) => {
  const [elf1, elf2] = line.split(',');
  const [areaStart, areaEnd] = elf1.split('-');
  const [elf2AreaStart, elf2AreaEnd] = elf2.split('-');
  let area1ContainsElf2Start = false;
  let area2ContainsElf2End = false;
  for (let i = parseInt(areaStart); i <= parseInt(areaEnd); i++) {
    if (i.toString() === elf2AreaStart) {
      area1ContainsElf2Start = true;
    }
    if (i.toString() === elf2AreaEnd) {
      area2ContainsElf2End = true;
    }
  }
  let dontRunSecondLoop = false;

  if (area1ContainsElf2Start || area2ContainsElf2End) {
    result2++;
    dontRunSecondLoop = true;
  }

  if (!dontRunSecondLoop) {
    area1ContainsElf2Start = false;
    area2ContainsElf2End = false;
    for (let i = parseInt(elf2AreaStart); i <= parseInt(elf2AreaEnd); i++) {
      if (i.toString() === areaStart) {
        area1ContainsElf2Start = true;
      }
      if (i.toString() === areaEnd) {
        area2ContainsElf2End = true;
      }
    }

    if (area1ContainsElf2Start || area2ContainsElf2End) {
      result2++;
    }
  }
});
console.log('result2:', result2);
