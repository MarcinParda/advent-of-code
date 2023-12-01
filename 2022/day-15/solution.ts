import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const input = readFileSync(join(__dirname, 'data.txt')).toString();
const lines = input.split('\n');

const multiplier = 4000000;

const knownBeacons = new Set<number>();
const intervals: [number, number][] = [];

for (let Y = 0; Y < multiplier; Y++) {
  lines.forEach((line) => {
    const [sensorX, sensorY, beaconX, beaconY] = line
      .match(/-?\d+/g)!
      .map(Number);

    const sensorBeaconDistance =
      Math.abs(sensorX - beaconX) + Math.abs(sensorY - beaconY);
    const sensorToColumnDistance = Math.abs(sensorY - Y);
    const toColumn = sensorBeaconDistance - sensorToColumnDistance;

    if (toColumn < 0) return;

    const interval = [sensorX - toColumn, sensorX + toColumn] as [
      number,
      number
    ];

    intervals.push(interval);

    if (beaconY === Y) {
      knownBeacons.add(beaconX);
    }
  });

  intervals.sort((a, b) => a[0] - b[0]);

  const wrappedIntervals: [number, number][] = [];

  intervals.forEach(([startInterval, endInterval], index) => {
    if (index === 0) {
      wrappedIntervals.push([startInterval, endInterval]);
      return;
    }

    const [_, lastInterval] = wrappedIntervals[wrappedIntervals.length - 1];

    if (startInterval > lastInterval + 1) {
      wrappedIntervals.push([startInterval, endInterval]);
      return;
    }

    wrappedIntervals[wrappedIntervals.length - 1][1] = Math.max(
      lastInterval,
      endInterval
    );
  });

  let result2 = 0;
  let breaked = false;

  wrappedIntervals.forEach(([startInterval, endInterval], index) => {
    if (result2 < startInterval) {
      console.log(result2 * multiplier + Y);
      breaked = true;
      return;
    }
    result2 = Math.max(result2, endInterval + 1);
    if (result2 > multiplier) {
      return;
    }
  });

  if (breaked) {
    break;
  }
}
