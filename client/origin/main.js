const img = {
  src: 'book.gif',
  width: 842,
  height: 1200,
}

const state = {
  root: null,
  selection: null,
  stats: null,
  isDrawing: false,
  isMoving: false,
  x: 0,
  y: 0,
  w: 0,
  h: 0,
}

function init() {
  state.root = document.getElementById('root');
  state.selection = document.getElementById('selection');
  state.stats = document.getElementById('stats');
}

function resizeRoot() {
  const { root } = state;
  root.style.width = `${img.width}px`;
  root.style.height = `${img.height}px`;
  root.style.backgroundImage = `url(${img.src})`;
}

function updateStats() {
  const { x, y, w, h } = state;
  let text = `Selection: [${x}, ${y}] x [${x + w}, ${y + h}]`;
  if (w === 0 || h === 0) {
    text = `No selection`;
  }

  state.stats.innerText = text;
}

function drawSelection() {
  const { selection, x, y, w, h } = state;
  selection.style.left = x + 'px';
  selection.style.top = y + 'px';
  selection.style.width = w + 'px',
  selection.style.height = h + 'px';

  updateStats();
}

function onMouseDown(event) {
  const x = event.offsetX - 3;
  const y = event.offsetY - 3;

  state.isDrawing = true;
  state.x = x;
  state.y = y;
  state.w = 0;
  state.h = 0;

  drawSelection();
}

function onMouseMove(event) {
  const { isDrawing, x, y } = state;
  if (!isDrawing) {
    return;
  }

  const endX = event.offsetX - 3;
  const endY = event.offsetY - 3;

  state.isMoving = true;
  state.w = Math.max(0, endX - x);
  state.h = Math.max(0, endY - y);

  drawSelection();
}

function onMouseUp() {
  if (!state.isMoving) {
    state.x = 0;
    state.y = 0;
    state.w = 0;
    state.h = 0;
  }

  state.isDrawing = false;
  state.isMoving = false;
  drawSelection();
}

document.addEventListener('DOMContentLoaded', () => {
  init();
  resizeRoot();

  const { root } = state;
  root.addEventListener('mousedown', onMouseDown);
  root.addEventListener('mousemove', onMouseMove);
  root.addEventListener('mouseup', onMouseUp);
});
