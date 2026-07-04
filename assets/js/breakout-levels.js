export const GRID_ROWS = 10;
export const GRID_COLS = 14;
export const MIN_BLOCKS = 20;
const MAX_RETRIES = 5;

export function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function generateNoiseGrid(rng, density) {
  const grid = [];
  for (let r = 0; r < GRID_ROWS; r++) {
    const row = [];
    for (let c = 0; c < GRID_COLS; c++) {
      row.push(rng() < density);
    }
    grid.push(row);
  }
  return grid;
}

function countAliveNeighbors(grid, row, col) {
  let count = 0;
  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      if (dr === 0 && dc === 0) continue;
      const r = row + dr;
      const c = col + dc;
      if (r >= 0 && r < GRID_ROWS && c >= 0 && c < GRID_COLS && grid[r][c]) {
        count++;
      }
    }
  }
  return count;
}

function smooth(grid) {
  const next = [];
  for (let r = 0; r < GRID_ROWS; r++) {
    const row = [];
    for (let c = 0; c < GRID_COLS; c++) {
      const neighbors = countAliveNeighbors(grid, r, c);
      if (neighbors >= 4) {
        row.push(true);
      } else if (neighbors <= 2) {
        row.push(false);
      } else {
        row.push(grid[r][c]);
      }
    }
    next.push(row);
  }
  return next;
}

function countAlive(grid) {
  let count = 0;
  for (let r = 0; r < GRID_ROWS; r++) {
    for (let c = 0; c < GRID_COLS; c++) {
      if (grid[r][c]) count++;
    }
  }
  return count;
}

export function generatePhase(phaseNumber) {
  const baseDensity = Math.min(0.35 + phaseNumber * 0.01, 0.6);
  let grid;
  let rng;
  let attempt = 0;

  while (true) {
    const seed = phaseNumber * 1000 + attempt;
    rng = mulberry32(seed);
    const density = Math.min(baseDensity + attempt * 0.05, 0.9);
    grid = generateNoiseGrid(rng, density);

    for (let i = 0; i < 3; i++) {
      grid = smooth(grid);
    }

    if (countAlive(grid) >= MIN_BLOCKS || attempt >= MAX_RETRIES) {
      break;
    }
    attempt++;
  }

  const toughnessMax = Math.min(1 + phaseNumber / 5, 4);
  const blocks = [];
  for (let r = 0; r < GRID_ROWS; r++) {
    for (let c = 0; c < GRID_COLS; c++) {
      if (grid[r][c]) {
        const noiseValue = rng();
        const hitsRequired = Math.min(
          Math.max(1 + Math.floor(noiseValue * toughnessMax), 1),
          4
        );
        blocks.push({ row: r, col: c, hitsRequired });
      }
    }
  }

  return { rows: GRID_ROWS, cols: GRID_COLS, blocks };
}
