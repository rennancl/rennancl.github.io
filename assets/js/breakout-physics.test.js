import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  circleRectIntersect,
  reflectVelocityOffRect,
  reflectOffPaddle,
  reflectOffWalls,
} from './breakout-physics.js';

test('circleRectIntersect detects overlap', () => {
  const rect = { x: 10, y: 10, width: 20, height: 10 };
  assert.equal(circleRectIntersect(15, 15, 5, rect), true);
  assert.equal(circleRectIntersect(100, 100, 5, rect), false);
});

test('reflectVelocityOffRect flips vertical velocity on a top/bottom hit', () => {
  const ball = { x: 20, y: 9, radius: 5, vx: 2, vy: 3 };
  const rect = { x: 10, y: 10, width: 20, height: 10 };
  const result = reflectVelocityOffRect(ball, rect);
  assert.equal(result.vy, -3);
  assert.equal(result.vx, 2);
});

test('reflectVelocityOffRect flips horizontal velocity on a side hit', () => {
  const ball = { x: 9, y: 15, radius: 3, vx: 2, vy: 3 };
  const rect = { x: 10, y: 10, width: 20, height: 10 };
  const result = reflectVelocityOffRect(ball, rect);
  assert.equal(result.vx, -2);
  assert.equal(result.vy, 3);
});

test('reflectOffPaddle always sends the ball upward', () => {
  const ball = { x: 50, y: 90, vx: 0, vy: 5 };
  const paddle = { x: 30, y: 95, width: 40, height: 10 };
  const result = reflectOffPaddle(ball, paddle);
  assert.ok(result.vy < 0, 'ball should bounce upward');
});

test('reflectOffPaddle steers left when hit on the left half', () => {
  const ball = { x: 32, y: 90, vx: 0, vy: 5 };
  const paddle = { x: 30, y: 95, width: 40, height: 10 };
  const result = reflectOffPaddle(ball, paddle);
  assert.ok(result.vx < 0, 'hitting the left half should steer left');
});

test('reflectOffPaddle steers right when hit on the right half', () => {
  const ball = { x: 68, y: 90, vx: 0, vy: 5 };
  const paddle = { x: 30, y: 95, width: 40, height: 10 };
  const result = reflectOffPaddle(ball, paddle);
  assert.ok(result.vx > 0, 'hitting the right half should steer right');
});

test('reflectOffWalls flips vx at the left/right bounds', () => {
  const canvasWidth = 100;
  const canvasHeight = 200;
  const leftHit = reflectOffWalls(
    { x: 2, y: 50, radius: 5, vx: -3, vy: 2 },
    canvasWidth,
    canvasHeight
  );
  assert.equal(leftHit.vx, 3);
  assert.equal(leftHit.vy, 2);
});

test('reflectOffWalls flips vy at the top bound', () => {
  const canvasWidth = 100;
  const canvasHeight = 200;
  const topHit = reflectOffWalls(
    { x: 50, y: 2, radius: 5, vx: 1, vy: -2 },
    canvasWidth,
    canvasHeight
  );
  assert.equal(topHit.vy, 2);
  assert.equal(topHit.vx, 1);
});

test('reflectOffWalls leaves velocity unchanged away from bounds', () => {
  const result = reflectOffWalls(
    { x: 50, y: 100, radius: 5, vx: 1, vy: 2 },
    100,
    200
  );
  assert.equal(result.vx, 1);
  assert.equal(result.vy, 2);
});
