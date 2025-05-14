import { sdk } from 'https://esm.sh/@farcaster/frame-sdk';

const app = document.getElementById('app');

// Expanded Question List
const questions = [
  { question: "What’s your favorite weekend activity?", answers: [{ text: "Hanging out with friends", type: "Extrovert" }, { text: "Reading alone at home", type: "Introvert" }] },
  { question: "How do you handle challenges?", answers: [{ text: "Find a quick solution", type: "Practical" }, { text: "Think through every possibility", type: "Reflective" }] },
  { question: "What do you value most in life?", answers: [{ text: "Warm social connections", type: "Emotional" }, { text: "Independence and autonomy", type: "Independent" }] },
  { question: "How do you prefer working?", answers: [{ text: "In a team", type: "Collaborative" }, { text: "Alone", type: "Self-Sufficient" }] },
  { question: "How do you relax?", answers: [{ text: "Going out and exploring", type: "Active" }, { text: "Watching a movie", type: "Relaxed" }] }
];

let currentQuestionIndex = 0;
let results = {};

function showQuestion() {
  const current = questions[currentQuestionIndex];
  app.innerHTML = `<h2>${current.question}</h2>`;
  
  current.answers.forEach(answer => {
    const button = document.createElement('button');
    button.textContent = answer.text;
    button.onclick = () => selectAnswer(answer);
    app.appendChild(button);
  });
}

function selectAnswer(answer) {
  results[answer.type] = results[answer.type] ? results[answer.type] + 1 : 1;
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    setTimeout(showQuestion, 300);
  } else {
    setTimeout(showResult, 300);
  }
}

function showResult() {
  let maxScore = 0;
  let personality = "";
  for (const type in results) {
    if (results[type] > maxScore) {
      maxScore = results[type];
      personality = type;
    }
  }
  
  app.innerHTML = `
    <h2>Your Personality Type: ${personality}!</h2>
    <p>Your hidden traits have been revealed! Share on Warpcast and let your friends take the test too!</p>
    <button onclick="shareResult('${personality}')">Share on Warpcast</button>
  `;
}

function shareResult(personality) {
  sdk.cast({
    text: `I just took the Personality Test and my result is ${personality}! Try it now!`,
    embeds: [JSON.stringify({
      version: "next",
      button: {
        title: "Try the Test!",
        action: {
          type: "launch_frame",
          url: "https://yourapp.vercel.app",
          name: "Personality Test"
        }
      }
    })]
  });
}

showQuestion();