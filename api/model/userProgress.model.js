const {userDetails} = require('../data/userDetails');
const {quizzes} = require('../data/quizDetails');
const {getQuizByID} = require("../model/quiz.model")

// Retrieve progress for a user and a quiz
const getUserProgress = (userID, quizID) => {
    const user = userDetails[userID] || {};
    return user && user.userAttemptedQuiz ? user.userAttemptedQuiz[quizID] : null;
};

// Update the progress (score, current question, etc.)
const updateUserQuizProgress = (userID, quizID, progress) => {
    const user = userDetails[userID];

    if (user) {
      user.userAttemptedQuiz[quizID] = progress;
    }
};

// Check if all questions are answered
const checkIfQuizCompleted = (quizProgress) => {
    return quizProgress.currentQuestion === quizProgress.totalQuestions;
};

// Add answer to user progress
const addAnswerToProgress = (userID, quizID, questionID, isCorrect, answer) => {
    const quizProgress = getUserProgress(userID, quizID);
    
    if (quizProgress) {
      quizProgress.userAnswers.push({
        questionID,
        isCorrect,
        answer
      });
      quizProgress.score += isCorrect ? 1 : 0;
      quizProgress.currentQuestion += 1;
  
      // Check if all questions are answered
      if (checkIfQuizCompleted(quizProgress)) {
        quizProgress.completed = true;
      }
  
      updateUserQuizProgress(userID, quizID, quizProgress);
    }
};
  

// start a quiz for a user
function startQuiz(userID, quizID) {
    if(!userID || !quizID) {
        return null;
    }

    // Initialize progress for the user and quiz if not already started
    if(!userDetails[userID]) {
        userDetails[userID] = {
            userAttemptedQuiz: {}
        };
    }

    if(!userDetails[userID].userAttemptedQuiz[quizID]) {
        const quiz = getQuizByID(quizID);
        if(!quiz) return null;

        userDetails[userID].userAttemptedQuiz[quizID] = {
            currentQuestion: 0,
            score: 0,
            userAnswers: [],
            totalQuestions: quiz.questions.length,
            completed: false,
        }
    }

    return userDetails[userID].userAttemptedQuiz[quizID];
}


module.exports = {
    startQuiz,
    getUserProgress,
    updateUserQuizProgress,
    addAnswerToProgress,
    checkIfQuizCompleted
}