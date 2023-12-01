import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const input = readFileSync(join(__dirname, 'data.txt')).toString();

// Part 1

const ParseToRPS = {
  A: 'rock',
  B: 'paper',
  C: 'scissors',
  X: 'rock',
  Y: 'paper',
  Z: 'scissors',
};

const PointsForPick = {
  rock: 1,
  paper: 2,
  scissors: 3,
};

let result1 = 0;

type Pick = 'A' | 'B' | 'C' | 'X' | 'Y' | 'Z';
type RPS = 'rock' | 'paper' | 'scissors';

input
  .split('\n')
  .map((line) => line.split(' '))
  .forEach((match) => {
    let player1 = ParseToRPS[match[0] as Pick];
    let player2 = ParseToRPS[match[1] as Pick];

    if (player1 === player2) {
      result1 += 3;
    } else if (player1 === 'rock' && player2 === 'scissors') {
    } else if (player1 === 'paper' && player2 === 'rock') {
    } else if (player1 === 'scissors' && player2 === 'paper') {
    } else {
      result1 += 6;
    }

    result1 += PointsForPick[player2 as RPS];
  });

console.log(result1);

// Part 2

const ParseToRPS2 = {
  A: 'rock',
  B: 'paper',
  C: 'scissors',
  X: 'lose',
  Y: 'draw',
  Z: 'win',
};

let result2 = 0;

type RPS2 = 'rock' | 'paper' | 'scissors' | 'lose' | 'draw' | 'win';

const Lose = {
  rock: 'scissors',
  paper: 'rock',
  scissors: 'paper',
};

const Win = {
  rock: 'paper',
  paper: 'scissors',
  scissors: 'rock',
};

input
  .split('\n')
  .map((line) => line.split(' '))
  .forEach((match) => {
    let player1 = ParseToRPS[match[0] as Pick];
    let player2;
    let needTo = ParseToRPS2[match[1] as Pick];

    if (needTo === 'draw') {
      player2 = player1;
    } else if (needTo === 'win') {
      player2 = Win[player1 as RPS];
    } else if (needTo === 'lose') {
      player2 = Lose[player1 as RPS];
    }

    if (player1 === player2) {
      result2 += 3;
    } else if (player1 === 'rock' && player2 === 'scissors') {
    } else if (player1 === 'paper' && player2 === 'rock') {
    } else if (player1 === 'scissors' && player2 === 'paper') {
    } else {
      result2 += 6;
    }

    result2 += PointsForPick[player2 as RPS];
  });

console.log(result2);
