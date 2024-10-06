# Quiz Application
Node JS based REST APIs for Quiz Application. REST APIs created for quiz creation, get all quiz details, get quiz details based on ID, get user progress for quiz, start a quiz for user, attempt a quiz and submit answers for quiz questions.

# Purpose
RESTful APIs for a quiz application that allows users to answer multiple-choice questions and receive feedback on their performance.

# Getting Started
## Clone this repository
git clone https://github.com/AnkitaShr-Code/quiz_app.git

cd quiz_app

## Install dependencies
npm install

## Run the app
npm start

## Alternate Approach: Using Docker compose
1. Clone the repository on your local machine:
   git clone https://github.com/AnkitaShr-Code/quiz_app.git

   cd quiz_app
2. Use the following command in terminal
   docker-compose build
3. Start the service with following command:
  docker-compose up -d

# Accessing the service
1. Download the postman collection from quiz_app/postman
2. Import the downloaded collection in postman
3. Execute the APIs, you can take help from sample response and request


# Future Enhancements
1. User login setup
2. User Authorization
3. Editing existing quiz
4. Delete existing quiz
5. Create categories for quiz
6. Assign each quiz a category
7. Option for user to reattempt a quiz / question
8. Creating a angular APP using material that can use the REST APIs


