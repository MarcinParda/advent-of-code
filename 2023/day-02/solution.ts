import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const input = readFileSync(join(__dirname, 'example_data.txt')).toString();

function isGamePossible(game: { color: string; count: number }[]): boolean {
  const cubesLeft = [
    { color: 'red', count: 12 },
    { color: 'green', count: 13 },
    { color: 'blue', count: 14 },
  ];

  game.forEach((drawing) => {
    const leftCube = cubesLeft.find((cube) => cube.color === drawing.color);
    leftCube!.count -= drawing.count;
  });
  return !cubesLeft.some((cube) => cube.count < 0);
}

// Part 1

const gameLines = input.split('\n');

const games = gameLines.map((gameLine, idx) => {
  const gameId = idx + 1;
  const sliceNumber = idx > 8 ? (idx > 98 ? 9 : 8) : 7;
  const drawings = gameLine.slice(sliceNumber).split(';');
  const colors = drawings.map((drawing) =>
    drawing.split(',').map((cubes) => {
      const [_trash, count, color] = cubes.split(' ');
      return { color, count: Number(count) };
    })
  );

  return { gameId, drawings: colors };
});

const possibleGames = games.filter((game) => {
  return isGamePossible(game.drawings.flat());
});

console.log(possibleGames);

const result = possibleGames.reduce(
  (sum, game) => sum + Number(game.gameId),
  0
);
console.log(result);

// Part 2
const result2 = 'result2';
console.log(result2);
