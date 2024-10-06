// In-memory DB for quiz storage
const quizzes = [ {
    "id": "f18c4efe-5208-4aca-b2a8-bb385ba41577",
    "title": "JavaScript Beginner Quiz",
    "questions": [
        {
            "text": "Among the given statements, which statement defines closures in JavaScript?",
            "id": "85a476da-975b-43d4-9dab-5bd5154576a9",
            "options": [
                {
                    "text": "Closure is a function that is enclosed with references to its inner function scope",
                    "id": 1,
                    "isCorrectAnswer": false
                },
                {
                    "text": "Closure is a function that is enclosed with references to its lexical environment",
                    "id": 2,
                    "isCorrectAnswer": true
                },
                {
                    "text": "Closure is a function that is enclosed with references to its lexical environment",
                    "id": 3,
                    "isCorrectAnswer": false
                },
                {
                    "text": "Closure is a function that is enclosed with references to its lexical environment",
                    "id": 4,
                    "isCorrectAnswer": false
                }
            ]
        },
        {
            "text": "What will be the output of the following JavaScript statement? \n var grand_Total=eval(\"10*10+5\");",
            "id": "dd95957f-ce6a-40b9-b53c-8121419bd366",
            "options": [
                {
                    "text": "10*10+5",
                    "id": 1,
                    "isCorrectAnswer": false
                },
                {
                    "text": "105 as a string",
                    "id": 2,
                    "isCorrectAnswer": false
                },
                {
                    "text": "105 as an integer value",
                    "id": 3,
                    "isCorrectAnswer": true
                },
                {
                    "text": "Exception is thrown",
                    "id": 4,
                    "isCorrectAnswer": false
                }
            ]
        }
    ]
}];

module.exports = {
    quizzes
};
