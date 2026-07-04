import { generatePhase } from './breakout-levels.js';
import {
  circleRectIntersect,
  reflectVelocityOffRect,
  reflectOffPaddle,
  reflectOffWalls,
} from './breakout-physics.js';

const CANVAS_WIDTH = 560;
const CANVAS_HEIGHT = 700;
const BLOCK_AREA_HEIGHT = 315;
const BLOCK_GAP = 2;
const GRID_COLS = 14;
const GRID_ROWS = 10;
const PADDLE_WIDTH = 90;
const PADDLE_HEIGHT = 12;
const PADDLE_Y = CANVAS_HEIGHT - 40;
const PADDLE_SPEED = 7;
const BALL_RADIUS = 7;
const BASE_BALL_SPEED = 4.5;
const STORAGE_KEY = 'breakout-best';
const BLOCK_SHADES = ['#a8d5c8', '#5a9c86', '#0d7a5f', '#065143'];

const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

const scoreEl = document.getElementById('hud-score');
const livesEl = document.getElementById('hud-lives');
const phaseEl = document.getElementById('hud-phase');
const bestEl = document.getElementById('hud-best');
const overlay = document.getElementById('game-overlay');
const overlayTitle = document.getElementById('overlay-title');
const overlayMessage = document.getElementById('overlay-message');
const overlayButton = document.getElementById('overlay-button');

function loadBest() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { bestScore: 0, bestPhase: 1 };
    const parsed = JSON.parse(raw);
    return {
      bestScore: parsed.bestScore || 0,
      bestPhase: parsed.bestPhase || 1,
    };
  } catch {
    return { bestScore: 0, bestPhase: 1 };
  }
}

function saveBest() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.best));
}

const state = {
  phaseNumber: 1,
  score: 0,
  lives: 3,
  blocks: [],
  paddle: {
    x: (CANVAS_WIDTH - PADDLE_WIDTH) / 2,
    y: PADDLE_Y,
    width: PADDLE_WIDTH,
    height: PADDLE_HEIGHT,
  },
  ball: null,
  status: 'ready',
  best: loadBest(),
};

function ballSpeedForPhase(phaseNumber) {
  const multiplier = Math.min(1 + phaseNumber * 0.03, 1.5);
  return BASE_BALL_SPEED * multiplier;
}

function resetBall() {
  const speed = ballSpeedForPhase(state.phaseNumber);
  state.ball = {
    x: state.paddle.x + state.paddle.width / 2,
    y: state.paddle.y - BALL_RADIUS - 1,
    radius: BALL_RADIUS,
    vx: 0,
    vy: -speed,
  };
  state.status = 'ready';
}

function blockPixelRects(blocks) {
  const blockWidth = (CANVAS_WIDTH - BLOCK_GAP) / GRID_COLS - BLOCK_GAP;
  const blockHeight = (BLOCK_AREA_HEIGHT - BLOCK_GAP) / GRID_ROWS - BLOCK_GAP;
  return blocks.map((b) => ({
    row: b.row,
    col: b.col,
    hitsRequired: b.hitsRequired,
    maxHits: b.hitsRequired,
    x: BLOCK_GAP + b.col * (blockWidth + BLOCK_GAP),
    y: BLOCK_GAP + b.row * (blockHeight + BLOCK_GAP),
    width: blockWidth,
    height: blockHeight,
  }));
}

function startPhase(phaseNumber) {
  state.phaseNumber = phaseNumber;
  const phase = generatePhase(phaseNumber);
  state.blocks = blockPixelRects(phase.blocks);
  resetBall();
}

function startGame() {
  state.score = 0;
  state.lives = 3;
  overlay.hidden = true;
  startPhase(1);
}

function launchBall() {
  if (state.status !== 'ready') return;
  const speed = ballSpeedForPhase(state.phaseNumber);
  const angle = (Math.random() * 60 - 30) * (Math.PI / 180);
  state.ball.vx = speed * Math.sin(angle);
  state.ball.vy = -Math.abs(speed * Math.cos(angle));
  state.status = 'playing';
}

function loseLife() {
  state.lives -= 1;
  if (state.lives <= 0) {
    gameOver();
  } else {
    resetBall();
  }
}

function gameOver() {
  state.status = 'gameover';
  if (state.score > state.best.bestScore) state.best.bestScore = state.score;
  if (state.phaseNumber > state.best.bestPhase) state.best.bestPhase = state.phaseNumber;
  saveBest();
  overlayTitle.textContent = 'Game Over';
  overlayMessage.textContent = `Score: ${state.score} — Phase: ${state.phaseNumber}`;
  overlayButton.textContent = 'Play Again';
  overlay.hidden = false;
}

function applyKeyboardInput() {
  if (keys.has('ArrowLeft')) state.paddle.x -= PADDLE_SPEED;
  if (keys.has('ArrowRight')) state.paddle.x += PADDLE_SPEED;
  state.paddle.x = Math.max(0, Math.min(CANVAS_WIDTH - state.paddle.width, state.paddle.x));
}

function update() {
  if (state.status === 'ready' && state.ball) {
    state.ball.x = state.paddle.x + state.paddle.width / 2;
  }

  if (state.status !== 'playing') return;

  const ball = state.ball;
  ball.x += ball.vx;
  ball.y += ball.vy;

  const wallReflection = reflectOffWalls(ball, CANVAS_WIDTH, CANVAS_HEIGHT);
  ball.vx = wallReflection.vx;
  ball.vy = wallReflection.vy;
  if (ball.x - ball.radius < 0) ball.x = ball.radius;
  if (ball.x + ball.radius > CANVAS_WIDTH) ball.x = CANVAS_WIDTH - ball.radius;
  if (ball.y - ball.radius < 0) ball.y = ball.radius;

  if (ball.y - ball.radius > CANVAS_HEIGHT) {
    loseLife();
    return;
  }

  if (ball.vy > 0 && circleRectIntersect(ball.x, ball.y, ball.radius, state.paddle)) {
    const reflected = reflectOffPaddle(ball, state.paddle);
    ball.vx = reflected.vx;
    ball.vy = reflected.vy;
    ball.y = state.paddle.y - ball.radius - 1;
  }

  for (let i = state.blocks.length - 1; i >= 0; i--) {
    const block = state.blocks[i];
    if (circleRectIntersect(ball.x, ball.y, ball.radius, block)) {
      const reflected = reflectVelocityOffRect(ball, block);
      ball.vx = reflected.vx;
      ball.vy = reflected.vy;
      block.hitsRequired -= 1;
      if (block.hitsRequired <= 0) {
        state.score += 10 * block.maxHits;
        state.blocks.splice(i, 1);
      }
      break;
    }
  }

  if (state.blocks.length === 0) {
    startPhase(state.phaseNumber + 1);
  }
}

function render() {
  ctx.fillStyle = '#fafdf2';
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  for (const block of state.blocks) {
    const shadeIndex = Math.min(block.hitsRequired, BLOCK_SHADES.length) - 1;
    ctx.fillStyle = BLOCK_SHADES[shadeIndex];
    ctx.fillRect(block.x, block.y, block.width, block.height);
  }

  ctx.fillStyle = '#2e282a';
  ctx.fillRect(state.paddle.x, state.paddle.y, state.paddle.width, state.paddle.height);

  ctx.beginPath();
  ctx.arc(state.ball.x, state.ball.y, state.ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = '#065143';
  ctx.fill();
}

function updateHud() {
  scoreEl.textContent = String(state.score);
  livesEl.textContent = String(state.lives);
  phaseEl.textContent = String(state.phaseNumber);
  bestEl.textContent = `${state.best.bestScore} (phase ${state.best.bestPhase})`;
}

function loop() {
  applyKeyboardInput();
  update();
  render();
  updateHud();
  requestAnimationFrame(loop);
}

const keys = new Set();
window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') keys.add(e.key);
  if (e.key === ' ' || e.key === 'ArrowUp') launchBall();
});
window.addEventListener('keyup', (e) => {
  keys.delete(e.key);
});

canvas.addEventListener('pointermove', (e) => {
  const rect = canvas.getBoundingClientRect();
  const scale = CANVAS_WIDTH / rect.width;
  const x = (e.clientX - rect.left) * scale;
  state.paddle.x = Math.max(
    0,
    Math.min(CANVAS_WIDTH - state.paddle.width, x - state.paddle.width / 2)
  );
});

canvas.addEventListener('pointerdown', () => {
  launchBall();
});

overlayButton.addEventListener('click', () => {
  startGame();
});

startGame();
requestAnimationFrame(loop);
