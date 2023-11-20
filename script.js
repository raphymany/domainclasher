let sequences = [];
let currentIndex = 0;
let startTime;
let activeUsers = 0;

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
    document.getElementById('userInput').value = ''; // Clears the input field for a new sequence
    currentIndex = 0;
    startTime = Date.now();
}

function checkInput(e) {
    let userSequence = sequences[sequences.length - 1].sequence;

    if (e.key.toUpperCase() === userSequence[currentIndex]) {
        currentIndex++;

        if (currentIndex === userSequence.length) {
            let endTime = Date.now();
            let timeTaken = (endTime - startTime) / 1000;
            document.getElementById('timeTaken').textContent = `Time taken: ${timeTaken.toFixed(2)} seconds`;
            setTimeout(displaySequence, 1000);
        }
    } else {
        e.preventDefault(); // Prevents the default behavior of the keypress
        document.getElementById('userInput').value = ''; // Clears the input field on wrong key press
    }
}

function updateActiveUsers() {
    document.getElementById('activeUsers').textContent = activeUsers;
}

// Increment active users count when page loads
window.onload = function() {
    activeUsers++;
    updateActiveUsers();
};

// Decrement active users count when page unloads
window.onbeforeunload = function() {
    activeUsers--;
    updateActiveUsers();
};

displaySequence();
document.getElementById('userInput').addEventListener('keydown', checkInput);
