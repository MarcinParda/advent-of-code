import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const input = readFileSync(join(__dirname, 'data.txt')).toString();
const lines = input.split('\n');

function moveTail(head: [number, number], tail: [number, number]) {
  const horizontalGap = head[0] - tail[0];
  const verticalGap = head[1] - tail[1];

  if (Math.abs(horizontalGap) >= 2 || Math.abs(verticalGap) >= 2) {
    // Move the tail in a diagonal direction towards the head
    tail[0] = tail[0] + Math.sign(horizontalGap);
    tail[1] = tail[1] + Math.sign(verticalGap);
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

    const tailTrackPositions = tailsPositions.at(-1);
    const neckTrackPositions = tailsPositions.at(0);

    if (tailTrackPositions && neckTrackPositions) {
      const tailTrack = tailTrackPositions.join(',');
      const neckTrack = neckTrackPositions.join(',');

      result1.add(tailTrack);
      result2.add(neckTrack);
    }
  }
}

console.log(result1.size);
console.log(result2.size);
