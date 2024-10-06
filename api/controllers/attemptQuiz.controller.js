const {validationResult} = require('express-validator');
const {startQuiz, getUserProgress, addAnswerToProgress} = require('../model/userProgress.model');
const {getQuizByID} = require('../model/quiz.model');

const attemptQuiz = (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {userID, quizID} = req.body;
    const progress = startQuiz(userID, quizID);
    if(!progress) {
        return res.status(400)
            .json({ message: 'Invalid User ID or Quiz ID' });
    }

    return res.status(200).json({
        message: 'Quiz started',
        progress
    });
};

// Get user progress for a specific quiz
const getUserQuizProgress = (req, res) => {
    // Validate request parameters
    const errors= validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { userID, quizID } = req.params;

    const progress = getUserProgress(userID, quizID);

    if(!progress) {
        return res.status(404).json({ 
            message: 'Progress not found for the selected quiz. Try re-attempting it.' 
        });
    }

    return res.status(200).json({
        userID,
        quizID,
        currentQuestion: progress.currentQuestion,
        score: progress.score,
        totalQuestions: progress.totalQuestions,
        completed: progress.completed,
        answers: progress.answers
    }).end();
};


const submitAnswer = (req, res) => {
    // Validate request data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() }).end();
    }
    
    const { userID, quizID, questionID, selectedAnswerID } = req.body;
    const quiz = getQuizByID(quizID);

    const question = quiz.questions.find(q => q.id === questionID);

    if(!question) {
        return res.status(404).json({ message: 'Question not found' });
    }

    // Find the selected answer
    const selectedAnswer = question.options.find(option => option.id === selectedAnswerID);
    const correctAnswer = question.options.find(option => option.isCorrectAnswer);
    if (!selectedAnswer) {
        return res.status(404).json({ message: 'Selected answer not found' });
    }

    // Check if the answer is correct
    const isCorrect = selectedAnswer.isCorrectAnswer;

    // Retrieve user progress for the quiz
    let quizProgress = getUserProgress(userID, quizID);
   
    if (!quizProgress) {
        return res.status(404).json({ message: 'User progress not found for the quiz' });
    }

    if(quizProgress.completed) {
        return res.status(400).json({ message: 'You have already completed this quiz! Try a different one.' });
    }

    let alreadyAttempted = quizProgress.userAnswers.find(q => q.questionID === questionID);
    if(alreadyAttempted) {
        return res.status(400).json({ message: 'You have already attempted this question! Try a different one.' });
    }
    // Add answer to progress
    addAnswerToProgress(userID, quizID, questionID, isCorrect, selectedAnswer.text);

    // Construct response
    let responseMessage;
    let feedback = {
        isCorrect,
        score: quizProgress.score,
        currentQuestion: quizProgress.currentQuestion,
        remainingQuestions: quizProgress.totalQuestions - quizProgress.currentQuestion,
    };

    if (isCorrect) {
        responseMessage = "Correct! Well done!";
    } else {
        responseMessage = "Incorrect! The correct answer is: " + correctAnswer.text;
        feedback.correctAnswer = correctAnswer.text;
    }

    // Respond with feedback
    return res.json({
        message: responseMessage,
        data: {
            feedback,
            progress: quizProgress
        }
    });
};


module.exports = {
    attemptQuiz,
    getUserQuizProgress,
    submitAnswer
}