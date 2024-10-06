const { v4 : uuidv4 } = require('uuid');

exports.excludeCorrectAnswers = function(quiz) {
    const quizCopy = JSON.parse(JSON.stringify(quiz));
    // Create a Deep copy
    quizCopy.questions = quizCopy.questions.map(({options, ...restDetails}) => { // For each question in quiz get options
        let answerExcludedOptions = options.map(({isCorrectAnswer, ...restOptions}) => restOptions); // filter the question option details
        return {...restDetails, options: answerExcludedOptions}; // return the question details as in previous format but without answer info
    });
    return quizCopy;
}

exports.checkValidQuestions = function(questions) {
    let hasIssue = false;

    // Iterate over each question
    questions.forEach((question, index) => {

        if(!question.text){
            console.log(`Question ${index + 1} must have question content.`);
            hasIssue = true;
        }

        // check if there are no options or atleast 4 options
        if (!question.options || question.options.length !== 4) {
            console.log(`Question ${index + 1} must have exactly 4 options.`);
            hasIssue = true;
        }

        // Check if more than one option has isCorrectAnswer as true
        const correctAnswers = question.options.filter(option => option.isCorrectAnswer || !option.text).length;

        if (correctAnswers !== 1) {
            console.log(`Question ${index + 1} has ${correctAnswers} correct answers (should be exactly 1)
                 and each option should have content.`);
            hasIssue = true;
        }
    });

    return hasIssue; 
}

exports.generateQuizID = function() {
    let quizID = uuidv4();
    return quizID;
}