import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const input = readFileSync(join(__dirname, 'data.txt')).toString();

// Part 1
let result = 0;
const treeArray: number[][] = [];
input.split('\n').forEach((line, lineIndex) => {
  treeArray.push([]);
  for (let i = 0; i < line.length; i++) {
    treeArray[lineIndex].push(Number(line[i]));
  }
});

const transposedTreeArray = treeArray[0].map((_, colIndex) =>
  treeArray.map((row) => row[colIndex])
);

function isVisibleInRow(treeArray: number[][], x: number, y: number): boolean {
  const row = treeArray[x];
  const rowToIndex = row.slice(0, y);
  const rowFromIndex = row.slice(y + 1, treeArray.length);

  return Math.max(...rowToIndex) < row[y] || Math.max(...rowFromIndex) < row[y];
}

function isVisibleInColumn(
  transposedTreeArray: number[][],
  x: number,
  y: number
): boolean {
  const column = transposedTreeArray[y];
  const columnToIndex = column.slice(0, x);
  const columnFromIndex = column.slice(x + 1, transposedTreeArray.length);

  return (
    Math.max(...columnToIndex) < column[x] ||
    Math.max(...columnFromIndex) < column[x]
  );
}

treeArray.forEach((line, x) => {
  line.forEach((tree, y) => {
    if (
      x !== 0 &&
      y !== 0 &&
      x !== treeArray.length - 1 &&
      y !== treeArray[0].length - 1
    ) {
      if (
        isVisibleInRow(treeArray, x, y) ||
        isVisibleInColumn(transposedTreeArray, x, y)
      )
        result++;
    }
  });
});

const edges = treeArray.length * 2 - 2 + treeArray[0].length * 2 - 2;
result += edges;

console.log('result1:', result);

// Part 2

function howManyTreesOnLeft(
  treeArray: number[][],
  x: number,
  y: number
): number {
  const row = treeArray[x];
  const rowToIndex = row.slice(0, y).reverse();

  for (let i = 0; i < rowToIndex.length; i++) {
    if (rowToIndex[i] >= treeArray[x][y]) {
      return i + 1;
    }
  }
  return rowToIndex.length;
}

function howManyTreesOnRight(
  treeArray: number[][],
  x: number,
  y: number
): number {
  const row = treeArray[x];
  const rowFromIndex = row.slice(y + 1, treeArray.length);

  for (let i = 0; i < rowFromIndex.length; i++) {
    if (rowFromIndex[i] >= treeArray[x][y]) {
      return i + 1;
    }
  }
  return rowFromIndex.length;
}

function howManyTreesOnTop(
  treeArray: number[][],
  x: number,
  y: number
): number {
  const column = transposedTreeArray[y];
  const columnToIndex = column.slice(0, x).reverse();

  for (let i = 0; i < columnToIndex.length; i++) {
    if (columnToIndex[i] >= treeArray[x][y]) {
      return i + 1;
    }
  }
  return columnToIndex.length;
}

function howManyTreesOnBottom(
  treeArray: number[][],
  x: number,
  y: number
): number {
  const column = transposedTreeArray[y];
  const columnFromIndex = column.slice(x + 1, transposedTreeArray.length);

  for (let i = 0; i < columnFromIndex.length; i++) {
    if (columnFromIndex[i] >= treeArray[x][y]) {
      return i + 1;
    }
  }
  return columnFromIndex.length;
}

const arrayOfPoints: number[] = [];

treeArray.forEach((line, x) => {
  line.forEach((tree, y) => {
    if (
      x !== 0 &&
      y !== 0 &&
      x !== treeArray.length - 1 &&
      y !== treeArray[0].length - 1
    ) {
      if (
        isVisibleInRow(treeArray, x, y) ||
        isVisibleInColumn(transposedTreeArray, x, y)
      ) {
        let score = 1;
        score *= howManyTreesOnLeft(treeArray, x, y);
        score *= howManyTreesOnRight(treeArray, x, y);
        score *= howManyTreesOnTop(treeArray, x, y);
        score *= howManyTreesOnBottom(treeArray, x, y);

        arrayOfPoints.push(score);
      }
    }
  });
});

console.log('result2', Math.max(...arrayOfPoints));
