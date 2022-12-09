import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const input = readFileSync(join(__dirname, 'data.txt')).toString();
const lines = input.split('\n');

function moveTail(
  head: [number, number],
  tail: [number, number]
): [number, number] {
  const horizontlGap = head[0] - tail[0];
  const verticalGap = head[1] - tail[1];

  // to close, dont move
  if (Math.abs(horizontlGap) <= 1 && Math.abs(verticalGap) <= 1) {
    return tail;
  }

  // to far, move diagonal
  if (Math.abs(horizontlGap) >= 2 && Math.abs(verticalGap) >= 2) {
    if (tail[0] < head[0]) {
      tail[0] = head[0] - 1;
    } else {
      tail[0] = head[0] + 1;
    }
    if (tail[1] < head[1]) {
      tail[1] = head[1] - 1;
    } else {
      tail[1] = head[1] + 1;
    }
    return tail;
  }

  // to far, move horizontal
  if (Math.abs(horizontlGap) >= 2) {
    if (tail[0] < head[0]) {
      tail[0] = head[0] - 1;
    } else {
      tail[0] = head[0] + 1;
    }
    tail[1] = head[1];
    return tail;
  }

  // to far, move vertical
  if (Math.abs(verticalGap) >= 2) {
    tail[0] = head[0];
    if (tail[1] < head[1]) {
      tail[1] = head[1] - 1;
    } else {
      tail[1] = head[1] + 1;
    }
    return tail;
  }

  return tail;
}

function moveHead(direction: string) {
  switch (direction) {
    case 'L':
      headPosition[1] -= 1;
      break;
    case 'U':
      headPosition[0] -= 1;
      break;
    case 'R':
      headPosition[1] += 1;
      break;
    case 'D':
      headPosition[0] += 1;
      break;
  }
}

const headPosition: [number, number] = [0, 0];
const tailsPositions: [number, number][] = Array.from({ length: 9 }, () => [
  0, 0,
]);
const result1 = new Set<string>([]);
const result2 = new Set<string>([]);

for (const line of lines) {
  const [direction, steps] = line.split(' ');

  for (let i = 0; i < Number(steps); i++) {
    moveHead(direction);

    tailsPositions[0] = moveTail(headPosition, tailsPositions[0]);
    for (let i = 1; i < tailsPositions.length; i++) {
      tailsPositions[i] = moveTail(tailsPositions[i - 1], tailsPositions[i]);
    }

    const tailTrack = `${tailsPositions[0][0]},${tailsPositions[0][1]}`;
    const neckTrack = `${tailsPositions[8][0]},${tailsPositions[8][1]}`;

    result1.add(tailTrack);
    result2.add(neckTrack);
  }
}

console.log(result1.size);
console.log(result2.size);
