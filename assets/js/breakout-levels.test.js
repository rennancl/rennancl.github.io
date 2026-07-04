import { test } from 'node:test';
import assert from 'node:assert/strict';
import { generatePhase, GRID_ROWS, GRID_COLS, MIN_BLOCKS } from './breakout-levels.js';

test('generatePhase is deterministic for the same phase number', () => {
  const a = generatePhase(5);
  const b = generatePhase(5);
  assert.deepEqual(a, b);
});

test('generatePhase returns the fixed grid dimensions', () => {
  const phase = generatePhase(1);
  assert.equal(phase.rows, GRID_ROWS);
  assert.equal(phase.cols, GRID_COLS);
});

test('generatePhase meets the playability floor for early phases', () => {
  const phase = generatePhase(1);
  assert.ok(
    phase.blocks.length >= MIN_BLOCKS,
    `expected >= ${MIN_BLOCKS} blocks, got ${phase.blocks.length}`
  );
});

test('generatePhase keeps block toughness within [1, 4]', () => {
  const phase = generatePhase(20);
  for (const block of phase.blocks) {
    assert.ok(
      block.hitsRequired >= 1 && block.hitsRequired <= 4,
      `hitsRequired out of range: ${block.hitsRequired}`
    );
  }
});

test('generatePhase keeps block positions within grid bounds', () => {
  const phase = generatePhase(3);
  for (const block of phase.blocks) {
    assert.ok(block.row >= 0 && block.row < GRID_ROWS);
    assert.ok(block.col >= 0 && block.col < GRID_COLS);
  }
});
