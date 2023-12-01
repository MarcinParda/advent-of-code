import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const input = readFileSync(join(__dirname, 'data.txt')).toString();
const rocks = input.split('\n');

const rawRocksDirections = rocks
  .map((rock) => rock.split(' -> '))
  .map((rock) =>
    rock.map((coord) => {
      const [x, y] = coord.split(',');
      return [Number(x) + 1, Number(y) + 1];
    })
  );

const allCoords = rawRocksDirections.reduce(
  (acc, curr) => [...acc, ...curr],
  []
);

const rocksXCoords = allCoords.map((rock) => rock[0]);
const rocksYCoords = allCoords.map((rock) => rock[1]);

const lowestX = Math.min(...rocksXCoords);
const sandStartingCoords = [502 - lowestX + 250, 1];

const outputWidth = Math.max(...rocksXCoords) - lowestX + 3;
const outputHeight = Math.max(...rocksYCoords) + 3;

const rocksDirections = rawRocksDirections.map((rock) =>
  rock.map((coord) => {
    const [x, y] = coord;
    return [x - lowestX + 1 + 250, y];
  })
);

const rocksCoords = rocksDirections.map((rock) => {
  return rock.reduce((coords, coord) => {
    const coordsLength = coords.length;
    if (coordsLength === 0) {
      return [coord];
    }
    const [startX, startY] = coord;
    const [endX, endY] = coords[coordsLength - 1];

    if (startX === endX) {
      const yDiff = endY - startY;
      const yStep = yDiff / Math.abs(yDiff);
      const yCoords = Array.from(
        { length: Math.abs(yDiff) },
        (_, i) => endY - yStep * (i + 1)
      );
      return [...coords, ...yCoords.map((y) => [startX, y])];
    }

    if (startY === endY) {
      const xDiff = endX - startX;
      const xStep = xDiff / Math.abs(xDiff);
      const xCoords = Array.from(
        { length: Math.abs(xDiff) },
        (_, i) => endX - xStep * (i + 1)
      );
      return [...coords, ...xCoords.map((x) => [x, startY])];
    }

    return [...coords, coord];
  }, [] as number[][]);
});

const output = Array.from({ length: outputHeight }, () =>
  Array.from({ length: outputWidth + 500 }, () => '.')
).map((row, y) =>
  row
    .map((_, x) => {
      if (
        rocksCoords.some((rock) =>
          rock.some((coords) => coords[0] === x && coords[1] === y)
        ) ||
        y === outputHeight - 1
      ) {
        return '#';
      }
      if (sandStartingCoords[0] === x && sandStartingCoords[1] === y) {
        return '+';
      }
      return '.';
    })
    .join('')
);

// screw funtional paradigms

let done = false;

while (!done) {
  const sandCoords = [...sandStartingCoords];
  while (true) {
    const [x, y] = sandCoords;
    if (output[y][x] === 'o') {
      done = true;
      break;
    }
    const nextCoords = [x, y + 1];
    const [nextX, nextY] = nextCoords;
    if (output[nextY][nextX] === '.') {
      sandCoords[1] = nextY;
      continue;
    }
    if (output[nextY][nextX] === '#' || output[nextY][nextX] === 'o') {
      const left = [x - 1, nextY];
      const right = [x + 1, nextY];

      if (output[left[1]][left[0]] === '.') {
        sandCoords[0] = left[0];
        sandCoords[1] = left[1];
        continue;
      }

      if (output[right[1]][right[0]] === '.') {
        sandCoords[0] = right[0];
        sandCoords[1] = right[1];
        continue;
      }

      output[y] = output[y].slice(0, nextX) + 'o' + output[y].slice(nextX + 1);
      break;
    }
  }
}

console.log(output.join('\n'));

const result1 = output.reduce(
  (acc, curr) => acc + curr.split('o').length - 1,
  0
);
console.log(result1);
