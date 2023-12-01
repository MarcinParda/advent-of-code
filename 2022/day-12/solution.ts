import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const input = readFileSync(join(__dirname, 'data.txt')).toString();
const lines = input.split('\n');

const map: number[][] = lines.map((line) =>
  line.split('').map((char) => {
    if (char === 'S') {
      return 1;
    } else if (char === 'E') {
      return 26;
    } else {
      return char.charCodeAt(0) - 'a'.charCodeAt(0) + 1;
    }
  })
);

const BFS = (part: number) => {
  const queue = lines
    .map(
      (line, rowIndex) =>
        line.split('').map((char, columnIndex) => {
          if (
            (part === 1 && char === 'S') ||
            (part === 2 && map[rowIndex][columnIndex] === 1)
          ) {
            return [rowIndex, columnIndex, 0];
          }
          return [];
        })[0]
    )
    .filter((array) => array.length > 0);

  console.log(queue);

  const set = new Set();

  while (queue.length > 0) {
    const [row, column, visited] = queue.shift() as [number, number, number];

    if (set.has(`${row},${column}`)) {
      continue;
    }

    set.add(`${row},${column}`);
    if (lines[row][column] === 'E') {
      return visited;
    }

    [
      [-1, 0],
      [0, 1],
      [1, 0],
      [0, -1],
    ].forEach(([horizontal, vertical]) => {
      const rowsLength = lines.length;
      const columnsLength = lines[0].length;

      const newRow = row + horizontal;
      const newColumn = column + vertical;

      if (
        0 <= newRow &&
        newRow < rowsLength &&
        0 <= newColumn &&
        newColumn < columnsLength &&
        map[newRow][newColumn] <= 1 + map[row][column]
      ) {
        queue.push([newRow, newColumn, visited + 1]);
      }
    });
  }
};

const result1 = BFS(1);
const result2 = BFS(2);

console.log(result1);
console.log(result2);
