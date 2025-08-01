let currentStep = 1;
let totalSteps = 13;
let totalScore = 0;

// Progress bar updater
function updateProgress() {
  const progress = document.getElementById('progress');
  if (progress && currentStep <= totalSteps) {
    progress.innerText = `Step ${currentStep} of ${totalSteps}`;
  }
}

// Move to next question
function nextQuestion(currentId, score) {
  totalScore += score;

  const currentQuestion = document.getElementById(currentId);
  const nextQuestion = currentQuestion.nextElementSibling;

  // Hide current question
  currentQuestion.classList.remove('active');
  currentQuestion.style.display = 'none';

  // If there's another question, show it
  if (nextQuestion && nextQuestion.classList.contains('question')) {
    nextQuestion.classList.add('active');
    nextQuestion.style.display = 'block';
    currentStep++;
    updateProgress();
  } else {
    showResult();
  }
}

// Show result
function showResult() {
  document.getElementById('progress').style.display = 'none';
  document.querySelectorAll('.question').forEach(q => q.style.display = 'none');
  
  const resultBox = document.getElementById('result');
  const resultText = document.getElementById('totalFootprint');
  resultBox.classList.remove('hidden');
  resultBox.style.display = 'block';

  let level = '';
  let advice = '';

  if (totalScore < 1200) {
    level = 'Low';
    advice = `
      Great job! Your water footprint is quite low. Keep up the sustainable habits like short showers, mindful eating, and minimal wastage.
    `;
  } else if (totalScore < 2000) {
    level = 'Moderate';
    advice = `
      You're doing okay, but there’s room to improve! Try reducing meat consumption, cutting down on long showers, and avoiding fast fashion. 
    `;
  } else {
    level = 'High';
    advice = `
      Your water footprint is quite high. Consider changes like eating less meat, turning off taps while brushing, avoiding bottled water, and checking for household leaks. Every drop counts!
    `;
  }

  resultText.innerHTML = `
    <h2>Your estimated daily water footprint is <strong>${totalScore} liters</strong>.</h2>
    <h3>That’s around <strong>${Math.round(totalScore * 365 / 1000)} kiloliters</strong> per year.</h3>
    <h3>Footprint Level: <span style="color: #007BFF">${level}</span></h3>
    <p style="margin-top: 1rem;">${advice}</p>
    
  `;
}

// On load, only show the first question
window.onload = function () {
  const allQuestions = document.querySelectorAll('.question');
  allQuestions.forEach((q, i) => {
    q.style.display = i === 0 ? 'block' : 'none';
  });
  updateProgress();
};
