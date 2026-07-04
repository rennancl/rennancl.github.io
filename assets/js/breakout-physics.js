export function circleRectIntersect(cx, cy, radius, rect) {
  const closestX = Math.max(rect.x, Math.min(cx, rect.x + rect.width));
  const closestY = Math.max(rect.y, Math.min(cy, rect.y + rect.height));
  const dx = cx - closestX;
  const dy = cy - closestY;
  return dx * dx + dy * dy <= radius * radius;
}

export function reflectVelocityOffRect(ball, rect) {
  const overlapLeft = ball.x + ball.radius - rect.x;
  const overlapRight = rect.x + rect.width - (ball.x - ball.radius);
  const overlapTop = ball.y + ball.radius - rect.y;
  const overlapBottom = rect.y + rect.height - (ball.y - ball.radius);

  const minOverlap = Math.min(overlapLeft, overlapRight, overlapTop, overlapBottom);

  if (minOverlap === overlapTop || minOverlap === overlapBottom) {
    return { vx: ball.vx, vy: -ball.vy };
  }
  return { vx: -ball.vx, vy: ball.vy };
}

export function reflectOffPaddle(ball, paddle) {
  const paddleCenter = paddle.x + paddle.width / 2;
  const hitOffset = (ball.x - paddleCenter) / (paddle.width / 2);
  const clampedOffset = Math.max(-1, Math.min(1, hitOffset));
  const speed = Math.hypot(ball.vx, ball.vy);
  const maxAngle = (75 * Math.PI) / 180;
  const angle = clampedOffset * maxAngle;
  return {
    vx: speed * Math.sin(angle),
    vy: -Math.abs(speed * Math.cos(angle)),
  };
}

export function reflectOffWalls(ball, canvasWidth, canvasHeight) {
  let vx = ball.vx;
  let vy = ball.vy;
  if (ball.x - ball.radius <= 0 || ball.x + ball.radius >= canvasWidth) {
    vx = -vx;
  }
  if (ball.y - ball.radius <= 0) {
    vy = -vy;
  }
  return { vx, vy };
}
