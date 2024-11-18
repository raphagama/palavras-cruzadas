const words = [
    { word: 'REACT', clue: 'Biblioteca JavaScript para construir interfaces de usuário', direction: 'across', x: 0, y: 0, id: 1 },
    { word: 'CSS', clue: 'Linguagem de estilo para web', direction: 'down', x: 5, y: 1, id: 2 },
    { word: 'HTML', clue: 'Linguagem de marcação para web', direction: 'across', x: 0, y: 2, id: 3 },
    { word: 'JS', clue: 'Abreviação para JavaScript', direction: 'down', x: 4, y: 3, id: 4 },
];

const grid = Array(5).fill().map(() => Array(6).fill(''));

// Cria o grid com as células vazias e marca as células que fazem parte das palavras
function createGrid() {
    const gridElement = document.getElementById('grid');

    // Cria as células da grade
    for (let y = 0; y < 5; y++) {
        for (let x = 0; x < 6; x++) {
            const input = document.createElement('input');
            input.type = 'text';
            input.maxLength = 1;
            input.className = 'cell';
            input.dataset.x = x;
            input.dataset.y = y;

            if (!grid[y][x]) {
                input.classList.add('empty'); // Células vazias recebem uma classe diferente
            }

            // Adiciona os números das dicas nas células que fazem parte de palavras
            const isPartOfWord = words.some(({ word, x: startX, y: startY, direction, id }) => {
                for (let i = 0; i < word.length; i++) {
                    const cellX = direction === 'across' ? parseInt(startX) + i : parseInt(startX);
                    const cellY = direction === 'down' ? parseInt(startY) + i : parseInt(startY);
                    if (cellX === x && cellY === y) {
                        input.classList.add('part-of-word');
                        input.setAttribute('data-number', id); // Atribui o número da dica
                        return true;
                    }
                }
                return false;
            });

            input.addEventListener('input', handleInput);
            gridElement.appendChild(input);
        }
    }
}

// Lida com a entrada do usuário
function handleInput(event) {
    const { x, y } = event.target.dataset;
    grid[y][x] = event.target.value.toUpperCase();
}

// Verifica se as respostas estão corretas
function checkAnswers() {
    let correct = true;

    words.forEach(({ word, x, y, direction }) => {
        for (let i = 0; i < word.length; i++) {
            const cellX = direction === 'across' ? parseInt(x) + i : parseInt(x);
            const cellY = direction === 'down' ? parseInt(y) + i : parseInt(y);

            const cell = document.querySelector(`.cell[data-x="${cellX}"][data-y="${cellY}"]`);
            if (cell.value.toUpperCase() !== word[i]) {
                correct = false;
                break;
            }
        }
    });

    const messageElement = document.getElementById('message');
    messageElement.textContent = correct ? 'Parabéns! Você completou o jogo!' : 'Tente novamente!';
}

// Exibe as dicas
function displayClues() {
    const cluesList = document.getElementById('cluesList');

    words.forEach(({ id, clue }) => {
        const li = document.createElement('li');
        li.textContent = `${id}. ${clue}`;
        cluesList.appendChild(li);
    });
}

createGrid();
displayClues();