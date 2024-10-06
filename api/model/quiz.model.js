const {quizzes} = require('../data/quizDetails');

// Get all quizzes
function getAllQuiz() {
    return quizzes;
}

// Get Quiz based on input ID, without 
function getQuizByID(requestedQuizID) {
    console.log('Getting details for quizID: ' + requestedQuizID);
    return Array.isArray(quizzes) ? quizzes.find((quiz) => quiz.id == requestedQuizID) : null;
}

// add a new quiz to the system
function addQuiz(quiz) {
    return quizzes.push(quiz);
}



module.exports = {
    getAllQuiz,
    getQuizByID,
    addQuiz,
}