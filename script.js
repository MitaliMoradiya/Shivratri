// DOM Elements
const passwordSection = document.getElementById('password');
const proposalSection = document.getElementById('proposal');
const diyaSection = document.getElementById('diya');
const quizSection = document.getElementById('quiz');
const finalSection = document.getElementById('final');
const celebrationSection = document.getElementById('celebration');
const enterBtn = document.getElementById('enter-btn');
const passwordInput = document.getElementById('password-input');
const passwordFeedback = document.getElementById('password-feedback');
const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const startQuizBtn = document.getElementById('start-quiz-btn');
const foreverBtn = document.getElementById('forever-btn');
const muteBtn = document.getElementById('mute-btn');
const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const quizFeedback = document.getElementById('quiz-feedback');
const bgMusic = document.getElementById('bg-music');
const bellSound = document.getElementById('bell-sound');
const ringGlow = document.getElementById('ring-glow');

// Wrong Answer Messages (short, funny, teasing him)
const wrongMessages = [
    "Wrong! Even Shivji knows better 😏",
    "Oops! My love, think harder 😉",
    "Fail! But you're still cute 🥰",
    "Nope! Parvati would tease you 😜",
    "Try again! Don't make me laugh 😂",
    "Incorrect! Love guru fail? 😆",
    "Wrong! But I still love you 💕",
    "Fail! Cute mistake though 🥺",
    "Nope! Mahadev is judging 😇",
    "Oops! Retry, my silly Shiv 🕉️"
];
let wrongMessageIndex = 0;

// Quiz Data
const questions = [
    {
        question: "When did we first date?",
        options: ["7th Oct 2025", "11th Oct 2025", "16th Oct 2025"],
        correct: 1
    },
    {
        question: "Our First Movie?",
        options: ["Bicharo Bachelor", "Thama", "Mardani 3"],
        correct: 1
    },
    {
        question: "Best part of our chats?",
        options: ["Random talks", "Stickers", "Late night chats"],
        correct: 1
    },
    {
        question: "If I’m sad for no reason, what will you do?",
        options: ["Tell me it’s not a big deal", "Say “why are you like this?”", "Sit beside me and comfort me until I smile again"],
        correct: 2
    },
    {
        question: "If I’m angry at you, how do you fix it?",
        options: ["Ignore me", "Say sorry 100 times", "Hug me tightly and act cute"],
        correct: 2
    },
    {
        question: "What is our relationship built on?",
        options: ["Ego", "Understanding", "Arguments"],
        correct: 1
    },
    {
        question: "What makes us strong?",
        options: ["Drama", "Trust + Friendship + Love", "Social media"],
        correct: 1
    },
    {
        question: "If we fight, how long does it last?",
        options: ["2 days", "Until one of us gets hungry", "Forever"],
        correct: 1
    },
    {
        question: "What am I most possessive about?",
        options: ["My phone", "You", "My sleep"],
        correct: 1
    },
    {
        question: "What are we meant to be?",
        options: ["Just a phase", "Temporary", "Shiv & Parvati type forever bond 🕉️🤍"],
        correct: 2
    }
];

let currentQuestion = 0;
let imagesUnblurred = 0;
let diyasLit = 0;

// Password Entry
enterBtn.addEventListener('click', () => {
    const password = passwordInput.value.toLowerCase();
    if (password === 'shiv') {
        passwordFeedback.classList.add('hidden');
        passwordSection.classList.add('glow'); // Add golden glow class
        setTimeout(() => {
            passwordSection.classList.remove('active');
            proposalSection.classList.add('active');
            // Start background music on user interaction to avoid autoplay block
            bgMusic.play().catch(() => {}); // Ignore if blocked
        }, 2000);
    } else {
        passwordFeedback.textContent = "Faith opens the right doors… Try again 🕉️";
        passwordFeedback.classList.remove('hidden');
    }
});

// Proposal Buttons
yesBtn.addEventListener('click', () => {
    alert("Not That Easy 😌\nUnlock our love first 🗝️");
    proposalSection.classList.remove('active');
    diyaSection.classList.add('active');
});

noBtn.addEventListener('click', () => {
    alert("Think again… Mahadev gives second chances 😉");
    // Show second chance options
    setTimeout(() => {
        const secondChance = confirm("One More Chance: YES or DEFINITELY YES?");
        if (secondChance) {
            alert("Not That Easy 😌\nUnlock our love first 🗝️");
            proposalSection.classList.remove('active');
            diyaSection.classList.add('active');
        }
    }, 1000);
});

// Diya Lighting
document.querySelectorAll('.diya').forEach((diya, index) => {
    diya.addEventListener('click', () => {
        if (!diya.classList.contains('lit')) {
            diya.classList.add('lit');
            bellSound.play().catch(() => {}); // Play bell sound, ignore if blocked
            diyasLit++;
            if (diyasLit === 3) {
                startQuizBtn.classList.remove('hidden');
            }
        }
    });
});

// Start Quiz
startQuizBtn.addEventListener('click', () => {
    diyaSection.classList.remove('active');
    quizSection.classList.add('active');
    showQuestion();
});

// Show Question
function showQuestion() {
    const q = questions[currentQuestion];
    questionEl.textContent = q.question;
    optionsEl.innerHTML = '';
    quizFeedback.classList.add('hidden');

    q.options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.textContent = option;
        btn.classList.add('option');
        btn.addEventListener('click', () => checkAnswer(index));
        optionsEl.appendChild(btn);
    });
}

// Check Answer
function checkAnswer(selected) {
    const q = questions[currentQuestion];
    if (selected === q.correct) {
        quizFeedback.textContent = "One memory unlocked 🕉️✨";
        quizFeedback.classList.remove('hidden');
        unblurImage();
        currentQuestion++;
        if (currentQuestion < questions.length) {
            setTimeout(showQuestion, 2000);
        } else {
            quizSection.classList.remove('active');
            finalSection.classList.add('active');
            ringGlow.style.display = 'block';
        }
    } else {
        // Cycle through different short funny teasing wrong messages
        quizFeedback.textContent = wrongMessages[wrongMessageIndex % wrongMessages.length];
        wrongMessageIndex++;
        quizFeedback.classList.remove('hidden');
    }
}

// Unblur Image
function unblurImage() {
    imagesUnblurred++;
    const img = document.getElementById(`img${imagesUnblurred}`);
    img.classList.remove('blurred');
    img.classList.add('unblurred');
}

// Forever Button (transition to celebration)
foreverBtn.addEventListener('click', () => {
    finalSection.classList.remove('active');
    celebrationSection.classList.add('active');
});

// Mute/Unmute Music (now also starts playback if paused)
muteBtn.addEventListener('click', () => {
    if (bgMusic.paused) {
        bgMusic.play().then(() => {
            muteBtn.textContent = "Mute Music 🔇";
        }).catch(() => {
            // If still blocked, show play icon
            muteBtn.textContent = "Play Music 🎵";
        });
    } else {
        bgMusic.muted = !bgMusic.muted;
        muteBtn.textContent = bgMusic.muted ? "Unmute Music 🔊" : "Mute Music 🔇";
    }
});