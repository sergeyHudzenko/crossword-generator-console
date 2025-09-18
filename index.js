const filler = ' - ';
const size = 20; // grid size
const words = ["CAT", "DOG", "TOWERS", "BOSS", "STAR", "GATE"];
const grid = Array.from({ length: size }, () => Array(size).fill(filler));
const placedWords = [];

// Utility: put a word horizontally or vertically
function placeWord(word, x, y, dir) {
  if (dir === 'h') {
    for (let i = 0; i < word.length; i++) grid[y][x + i] = ` ${word[i]} `;
  } else {
    for (let i = 0; i < word.length; i++) grid[y + i][x] = ` ${word[i]} `;
  }
  placedWords.push({ word, x, y, dir });
}

// Try to place a word intersecting with existing words
function tryPlace(word) {
  for (const placed of placedWords) {
    for (let i = 0; i < word.length; i++) {
      for (let j = 0; j < placed.word.length; j++) {
        if (word[i] !== placed.word[j]) continue;

        if (placed.dir === 'h') {
          const x = placed.x + j;
          const y = placed.y - i;
          if (y >= 0 && y + word.length <= size) {
            let fits = true;
            for (let k = 0; k < word.length; k++) {
              const yy = y + k;
              if (
                grid[yy][x] !== filler &&
                grid[yy][x] !== ` ${word[k]} `
              ) {
                fits = false;
                break;
              }
            }
            if (fits) {
              placeWord(word, x, y, 'v');
              return true;
            }
          }
        } else {
          const x = placed.x - i;
          const y = placed.y + j;
          if (x >= 0 && x + word.length <= size) {
            let fits = true;
            for (let k = 0; k < word.length; k++) {
              const xx = x + k;
              if (
                grid[y][xx] !== filler &&
                grid[y][xx] !== ` ${word[k]} `
              ) {
                fits = false;
                break;
              }
            }
            if (fits) {
              placeWord(word, x, y, 'h');
              return true;
            }
          }
        }
      }
    }
  }
  return false;
}

// Step 1: place longest word in middle
words.sort((a, b) => b.length - a.length);
const first = words.shift();
const midY = Math.floor(size / 2);
const startX = Math.floor((size - first.length) / 2);
placeWord(first, startX, midY, 'h');

// Step 2: try to place the rest
for (const w of words) {
  if (!tryPlace(w)) {
    console.log(`❌ Skipped: ${w}`);
  }
}

// Display grid
function displayGrid() {
  console.log(grid.map(row => row.join('')).join('\n'));
}
displayGrid();
