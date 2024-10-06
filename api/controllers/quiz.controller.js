const {getAllQuiz, getQuizByID, addQuiz} = require('../model/quiz.model');
const {excludeCorrectAnswers, checkValidQuestions, generateQuizID} = require('../utilities/quizUtil');
exports.getAllQuiz = function (req, res) {
    const quizzes = getAllQuiz();

    if (!Array.isArray(quizzes)) {
        return res.status(500).json({ message: 'Something went wrong!', error: 'Invalid quizzes data structure' });
    }

    return res.status(200).json({
        message: 'List of all available quiz',
        data: {
            quizDetails: quizzes.map(excludeCorrectAnswers), // return quiz details after removing answers
        }
    }).end();  
};

exports.getQuizByID = function(req, res) {
    let requestData = {
        quizID: req.params.quizID,
    }
    console.info('Requested quiz details for: '+ requestData.quizID);
    try{
        let quizDetail = getQuizByID(requestData.quizID);
        
        return res.status(200).json({
            message: quizDetail && Object.keys(quizDetail).length > 0 ? 'Quiz details found.' : 'No associated quiz found!',
            data: {
                    quizDetails: quizDetail ? [excludeCorrectAnswers(quizDetail)] : [] // return quizdetails after removing correct answer
                }
            }).end();
    } catch(error) {
        console.error(`Unexpected error in getting quiz details based on ID: ${requestData.quizID} : Error: ${error}`);
        return res.status(500).send('Something went wrong!');
    }
        
};

exports.createQuiz = function(req, res) {
    let requestData = {
        title: req.body.title,
        questions: req.body.questions,
    };

    if(!requestData.title) {
        return res.status(400).json({
            error: 'Missing required parameters!',
            message: 'Require quiz title.'
        }).end();
    }

    if(!requestData.questions 
        || !Array.isArray(requestData.questions) 
        || requestData.questions.length === 0) {
            return res.status(400).json({
                error: 'Missing required parameters!',
                message: 'Require atleast 1 question for quiz.'
            }).end();
    }

    if(checkValidQuestions(requestData.questions)) {
        return res.status(400).json({
            error: 'Missing required parameters!',
            message: 'Require each question to have a text and exactly 4 options, only 1 of the options to be true.'
        }).end();
    }

    requestData.quiz = {
        id: generateQuizID(),
        title: requestData.title,
        questions: requestData.questions.map((ele) => {
            ele.id = generateQuizID();
            ele.options.forEach((option, index) => {
                option.id = index + 1
            });
            return ele;
        }),
    };

    
    if(addQuiz(requestData.quiz)) {
        return res.status(200)
            .json({
                message: 'Successfully created quiz!',
            }).end();
    } else{
        return res.status(500).json({
            error: 'Unable to process the request.',
            message: 'Something went wrong!'
        }).end();
    }



};

