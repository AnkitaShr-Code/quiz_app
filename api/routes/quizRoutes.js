const express = require('express');
const router = express.Router();
const { body, param, validationResult, check } = require('express-validator');
const quizController = require('../controllers/quiz.controller');
const userQuizController = require('../controllers/attemptQuiz.controller');

const startQuizValidations = [
    body('userID').isString().withMessage('User ID must be a string'),
    body('quizID').isUUID().withMessage('Quiz ID must be a valid UUID'),
];

const getQuizProgressValidations = [
    param('userID').isString().withMessage('User ID must be string.'),
    param('quizID').isUUID().withMessage('Quiz ID must be a valid UUID.'),
];

const submitAnswerValidations = [
    body('userID').isString().withMessage('User ID must be a string'),
    body('quizID').isUUID().withMessage('Quiz ID must be a valid UUID'),
    body('questionID').isUUID().withMessage('Question ID must be a valid UUID'),
    body('selectedAnswerID').isInt().withMessage('Selected Answer ID must be an integer'),
];



router.get('/quizzes', 
    quizController.getAllQuiz
);

router.get('/quiz/:quizID',
    quizController.getQuizByID
);

router.post('/quiz', 
    quizController.createQuiz
);

router.post('/start_quiz', startQuizValidations,
    userQuizController.attemptQuiz
);

router.get('/quiz_progress/:userID/:quizID', getQuizProgressValidations,
    userQuizController.getUserQuizProgress
);

router.post('/submit_answer', submitAnswerValidations,
    userQuizController.submitAnswer
)

module.exports = router;