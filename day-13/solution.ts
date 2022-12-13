import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const input = readFileSync(join(__dirname, 'data.txt')).toString();
const groups = input.split('\n\n');

const compare = (p1: any, p2: any): number => {
  if (typeof p1 === 'number' && typeof p2 === 'number') {
    if (p1 < p2) {
      return -1;
    } else if (p1 === p2) {
      return 0;
    } else {
      return 1;
    }
  } else if (Array.isArray(p1) && Array.isArray(p2)) {
    let i = 0;
    while (i < p1.length && i < p2.length) {
      const c = compare(p1[i], p2[i]);
      if (c === -1) {
        return -1;
      }
      if (c === 1) {
        return 1;
      }
      i += 1;
    }
    if (i === p1.length && i < p2.length) {
      return -1;
    } else if (i === p2.length && i < p1.length) {
      return 1;
    } else {
      return 0;
    }
  } else if (typeof p1 === 'number' && Array.isArray(p2)) {
    return compare([p1], p2);
  } else {
    return compare(p1, [p2]);
  }
};

const packets = groups.map((group) => {
  const [p1, p2] = group.split('\n');
  return [eval(p1), eval(p2)];
});

let result1 = 0;
for (let i = 0; i < packets.length; i++) {
  const [p1, p2] = packets[i];
  if (compare(p1, p2) === -1) {
    result1 += 1 + i;
  }
}

const packets2: any[] = [];

groups.forEach((group) => {
  const [p1, p2] = group.split('\n');
  packets2.push(eval(p1));
  packets2.push(eval(p2));
});

packets2.push([2]);
packets2.push([6]);

packets2.sort((p1, p2) => compare(p1, p2));

let result2 = 1;
for (let i = 0; i < packets2.length; i++) {
  const p = packets2[i];
  if (p[0] === 2 || p[0] === 6) {
    result2 *= i + 1;
  }
}

console.log(result1);
console.log(result2);
