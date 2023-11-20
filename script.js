let sequences = [];
let currentIndex = 0;
let startTime;

function generateSequence() {
    const keys = ['W', 'A', 'S', 'D'];
    let sequence = '';
    for (let i = 0; i < 4; i++) {
        sequence += keys[Math.floor(Math.random() * keys.length)];
    }
    return sequence;
}

function displaySequence() {
    let sequence = generateSequence();
    document.getElementById('sequence').textContent = `Sequence to press: ${sequence}`;
    sequences.push({ sequence: sequence, startTime: Date.now() });
    currentIndex++;
}

function checkInput(e) {
    if (e.key.toUpperCase() === sequences[currentIndex - 1].sequence.charAt(currentIndex - 1)) {
        if (currentIndex === sequences[currentIndex - 1].sequence.length) {
            let endTime = Date.now();
            let timeTaken = (endTime - sequences[currentIndex - 1].startTime) / 1000;
            document.getElementById('timeTaken').textContent = `Time taken: ${timeTaken.toFixed(2)} seconds`;
            setTimeout(displaySequence, 1000);
        }
    } else {
        document.getElementById('userInput').value = '';
    }
}

displaySequence();
document.getElementById('userInput').addEventListener('keyup', checkInput);
