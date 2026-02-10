// 遊戲狀態控制
let gameState = 'STORY'; // 狀態：MENU, STORY, ROOM

function nextDialogue() {
  if (currentLine < storyData.length) {
    const textElement = document.getElementById('dialogue-text');
    textElement.innerText = storyData[currentLine];
    currentLine++;
  } else {
    // --- 故事結束，切換到下一個場景：房間 ---
    transitionToRoom();
  }
}

function transitionToRoom() {
  gameState = 'ROOM';

  // 1. 隱藏對話框
  const dialogueBox = document.getElementById('dialogue-box');
  dialogueBox.style.opacity = '0';
  setTimeout(() => (dialogueBox.style.display = 'none'), 500);

  // 2. 顯示房間名稱提示
  const roomName = document.getElementById('room-name');
  roomName.style.display = 'block';
  roomName.style.opacity = '1';

  // 3. 初始化房間數據與玩家位置
  initRoom();
}

function initRoom() {
  console.log('正在加載房間...');
  // 這裡放入我們之前的地圖數據與玩家坐標
  player.x = player.gridX * TILE_SIZE;
  player.y = player.gridY * TILE_SIZE;

  // 啟動移動監聽
  window.addEventListener('keydown', handleMovement);

  // 開始遊戲主循環
  requestAnimationFrame(gameLoop);
}

function gameLoop() {
  if (gameState === 'ROOM') {
    renderRoom(); // 繪製房間與玩家
    requestAnimationFrame(gameLoop);
  }
}
const roomMap = [
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 3, 0, 1], // 3 是書架
  [1, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 2, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
];

// 在 renderRoom 繪製邏輯中加入：
if (tile === 3) {
  ctx.fillStyle = '#8b4513'; // 書架顏色：褐色
  ctx.fillRect(
    offsetX + x * TILE_SIZE,
    offsetY + y * TILE_SIZE,
    TILE_SIZE,
    TILE_SIZE
  );

  // 加一點裝飾，看起來像書
  ctx.fillStyle = '#ffd700';
  ctx.fillRect(
    offsetX + x * TILE_SIZE + 10,
    offsetY + y * TILE_SIZE + 5,
    5,
    20
  );
}
