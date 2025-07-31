class MathQuiz {
    constructor() {
        this.questions = [];
        this.currentScore = 0;
        this.totalScore = parseInt(sessionStorage.getItem('totalScore')) || 0;
        this.totalQuestions = parseInt(sessionStorage.getItem('totalQuestions')) || 0;
        this.isSubmitted = false;

        this.init();
    }

    init() {
        this.updateTotalScoreDisplay();
        this.generateQuestions();
        this.renderQuestions();
        this.bindEvents();
    }

    generateQuestions() {
        this.questions = [];

        for (let i = 0; i < 10; i++) {
            const question = this.createRandomQuestion();
            this.questions.push(question);
        }
    }

    createRandomQuestion() {
        const operations = ['multiplication', 'division'];
        const operation = operations[Math.floor(Math.random() * operations.length)];
        const formats = ['missing_result', 'missing_factor'];
        const format = formats[Math.floor(Math.random() * formats.length)];

        let num1, num2, result, questionText, correctAnswer;

        // We'll use '__BLANK__' as a placeholder for the answer box
        if (operation === 'multiplication') {
            num1 = Math.floor(Math.random() * 12) + 1;
            num2 = Math.floor(Math.random() * 12) + 1;
            result = num1 * num2;

            if (format === 'missing_result') {
                questionText = `${num1} × ${num2} = __BLANK__`;
                correctAnswer = result;
            } else {
                // Randomly choose which factor to hide
                if (Math.random() < 0.5) {
                    questionText = `${num1} × __BLANK__ = ${result}`;
                    correctAnswer = num2;
                } else {
                    questionText = `__BLANK__ × ${num2} = ${result}`;
                    correctAnswer = num1;
                }
            }
        } else { // division
            num2 = Math.floor(Math.random() * 12) + 1;
            num1 = Math.floor(Math.random() * 12) + 1;
            result = num1 * num2;

            if (format === 'missing_result') {
                questionText = `${result} ÷ ${num2} = __BLANK__`;
                correctAnswer = num1;
            } else {
                // Randomly choose dividend or divisor to hide
                if (Math.random() < 0.5) {
                    questionText = `${result} ÷ __BLANK__ = ${num1}`;
                    correctAnswer = num2;
                } else {
                    questionText = `__BLANK__ ÷ ${num2} = ${num1}`;
                    correctAnswer = result;
                }
            }
        }

        return {
            text: questionText,
            answer: correctAnswer,
            userAnswer: null,
            isCorrect: null
        };
    }

    renderQuestions() {
        const container = document.getElementById('questionsContainer');
        container.innerHTML = '';

        this.questions.forEach((question, index) => {
            const questionDiv = document.createElement('div');
            questionDiv.className = 'question';

            // Always replace __BLANK__ with the input box
            let inputBox = `<input type="text" inputmode="numeric" pattern="[0-9]*" class="answer-input" data-index="${index}" placeholder="?">`;
            let html = question.text.replace('__BLANK__', inputBox);

            questionDiv.innerHTML = `
                <div class="question-text">
                    <div class="question-number">${index + 1}</div>
                    <span>${html}</span>
                </div>
            `;
            container.appendChild(questionDiv);
        });

        // Add event listeners to inputs
        const inputs = container.querySelectorAll('.answer-input');
        inputs.forEach(input => {
            input.addEventListener('input', (e) => {
                const index = parseInt(e.target.dataset.index);
                // Only accept numbers, treat blank as null
                const val = e.target.value.trim();
                this.questions[index].userAnswer = val === '' ? null : parseInt(val);
                this.updateProgress();
            });

            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.submitAnswers();
                }
            });
        });
    }

    updateProgress() {
        const answeredQuestions = this.questions.filter(q => q.userAnswer !== null).length;
        const progressPercent = (answeredQuestions / 10) * 100;
        document.getElementById('progressFill').style.width = `${progressPercent}%`;
    }

    bindEvents() {
        document.getElementById('submitBtn').addEventListener('click', () => {
            this.submitAnswers();
        });

        document.getElementById('nextBtn').addEventListener('click', () => {
            this.nextRound();
        });
    }

    submitAnswers() {
        if (this.isSubmitted) return;

        this.isSubmitted = true;
        this.currentScore = 0;

        // Grade the answers, treat blank as 0
        this.questions.forEach((question, index) => {
            // If userAnswer is null or NaN, treat as 0
            let userAns = (question.userAnswer === null || isNaN(question.userAnswer)) ? 0 : question.userAnswer;
            question.isCorrect = userAns === question.answer;
            if (question.isCorrect) {
                this.currentScore++;
            }

            // Update UI to show results
            const questionDiv = document.querySelectorAll('.question')[index];
            const input = questionDiv.querySelector('.answer-input');

            if (question.isCorrect) {
                questionDiv.classList.add('correct');
                input.classList.add('correct');
            } else {
                questionDiv.classList.add('incorrect');
                input.classList.add('incorrect');

                // Show correct answer
                const correctAnswerDiv = document.createElement('div');
                correctAnswerDiv.className = 'correct-answer';
                correctAnswerDiv.textContent = `Answer: ${question.answer}`;
                questionDiv.appendChild(correctAnswerDiv);
            }

            input.disabled = true;
        });

        // Update scores
        this.totalScore += this.currentScore;
        this.totalQuestions += this.questions.length;
        sessionStorage.setItem('totalScore', this.totalScore.toString());
        sessionStorage.setItem('totalQuestions', this.totalQuestions.toString());
        this.updateScoreDisplay();

        // Show results
        this.showResults();

        // Update buttons
        document.getElementById('submitBtn').style.display = 'none';
        document.getElementById('nextBtn').style.display = 'inline-block';

        // Update progress to 100%
        document.getElementById('progressFill').style.width = '100%';
    }

    showResults() {
        const resultsDiv = document.getElementById('results');
        const resultText = document.getElementById('resultText');

        let message = '';
        let emoji = '';

        if (this.currentScore === 10) {
            message = 'Perfect score! You\'re a math superstar!';
            emoji = '🏆🌟';
        } else if (this.currentScore >= 8) {
            message = 'Excellent work! Keep it up!';
            emoji = '🎉👏';
        } else if (this.currentScore >= 6) {
            message = 'Good job! You\'re getting better!';
            emoji = '😊👍';
        } else if (this.currentScore >= 4) {
            message = 'Nice try! Practice makes perfect!';
            emoji = '💪📚';
        } else if (this.currentScore > 0) {
            message = 'Keep practicing! You can do it!';
            emoji = '🌱💝';
        } else {
            message = 'Try again! Answer at least one question to get a score.';
            emoji = '😅';
        }

        resultText.innerHTML = `${emoji}<br>You got ${this.currentScore} out of 10 questions correct!<br>${message}`;
        resultsDiv.style.display = 'block';

        // Scroll to results
        resultsDiv.scrollIntoView({ behavior: 'smooth' });
    }

    updateScoreDisplay() {
        document.getElementById('currentScore').textContent = this.currentScore;
        // Show total score as a percentage of all questions attempted
        let percent = this.totalQuestions > 0 ? Math.round((this.totalScore / this.totalQuestions) * 100) : 0;
        document.getElementById('totalScore').textContent = percent + '%';
    }

    updateTotalScoreDisplay() {
        this.updateScoreDisplay();
    }

    nextRound() {
        // Reset everything for a new round
        this.currentScore = 0;
        this.isSubmitted = false;

        // Update current score display
        document.getElementById('currentScore').textContent = '0';

        // Hide results
        document.getElementById('results').style.display = 'none';

        // Reset buttons
        document.getElementById('submitBtn').style.display = 'inline-block';
        document.getElementById('nextBtn').style.display = 'none';

        // Reset progress bar
        document.getElementById('progressFill').style.width = '0%';

        // Generate new questions
        this.generateQuestions();
        this.renderQuestions();

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Initialize the quiz when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new MathQuiz();
});