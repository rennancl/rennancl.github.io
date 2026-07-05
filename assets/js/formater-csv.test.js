import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseCSV, formatCSVAligned } from './formater-csv.js';

test('parseCSV splits simple comma-separated rows', () => {
  const result = parseCSV('a,b,c\n1,2,3');
  assert.deepEqual(result, [
    ['a', 'b', 'c'],
    ['1', '2', '3'],
  ]);
});

test('parseCSV handles a trailing newline without an extra empty row', () => {
  const result = parseCSV('a,b\n1,2\n');
  assert.deepEqual(result, [
    ['a', 'b'],
    ['1', '2'],
  ]);
});

test('parseCSV keeps commas inside quoted fields', () => {
  const result = parseCSV('a,"b,c",d');
  assert.deepEqual(result, [['a', 'b,c', 'd']]);
});

test('parseCSV unescapes doubled quotes inside quoted fields', () => {
  const result = parseCSV('a,"he said ""hi""",b');
  assert.deepEqual(result, [['a', 'he said "hi"', 'b']]);
});

test('parseCSV keeps newlines inside quoted fields within one row', () => {
  const result = parseCSV('a,"line1\nline2",b');
  assert.deepEqual(result, [['a', 'line1\nline2', 'b']]);
});

test('parseCSV preserves ragged rows as-is', () => {
  const result = parseCSV('a,b,c\n1,2');
  assert.deepEqual(result, [
    ['a', 'b', 'c'],
    ['1', '2'],
  ]);
});

test('parseCSV returns an empty array for empty input', () => {
  assert.deepEqual(parseCSV(''), []);
});

test('formatCSVAligned pads columns to their max width', () => {
  const result = formatCSVAligned([
    ['a', 'bb'],
    ['ccc', 'd'],
  ]);
  assert.equal(result, 'a    bb\nccc  d');
});

test('formatCSVAligned handles ragged rows by treating missing cells as empty', () => {
  const result = formatCSVAligned([['a', 'b'], ['c']]);
  assert.equal(result, 'a  b\nc');
});

test('formatCSVAligned returns an empty string for no rows', () => {
  assert.equal(formatCSVAligned([]), '');
});
