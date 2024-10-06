# Quiz Application
Node JS based REST APIs for Quiz Application. REST APIs created for quiz creation, get all quiz details, get quiz details based on ID, get user progress for quiz, start a quiz for user, attempt a quiz and submit answers for quiz questions.

# Purpose
REST APIs for a quiz application that allows users to answer multiple-choice questions and receive feedback on their performance. Project uses an in-memory storage. There is default quiz created. 

# Getting Started
## Clone this repository
```
git clone https://github.com/AnkitaShr-Code/quiz_app.git

cd quiz_app
```
## Install dependencies
```
npm install
```
## Run the app
```
npm start
```
## Alternate Approach: Using Docker compose
1. Clone the repository on your local machine:
   ```
   git clone https://github.com/AnkitaShr-Code/quiz_app.git

   cd quiz_app
   ```
3. Use the following command in terminal
   ```
   docker-compose build
   ```
4. Start the service with following command:
```
   docker-compose up -d
```
# Accessing the service
1. Download the postman collection from ``` quiz_app/postman ```
2. Import the downloaded collection in postman
3. Execute the APIs, you can take help from sample response and request

# Available functionalities
## Create Quiz
   * Endpoint to create a new quiz with a set of questions (atleast 1 question is required).
   * Each question should have exactly 4 answer options and indicate the correct answer.
   * Quiz requires a title and each question and options to have text content.

## Get All Quiz
   * Get list of all available quizzes
   * Return the questions without revealing the correct answers.

## Get Quiz By ID
   * Endpoint to fetch a quiz by its ID.
   * Return the questions without revealing the correct answers.

## Start Quiz
   * Endpoint to start user attempt for a quiz

## Submit Answer
   * Endpoint to submit answer for a specific question of a quiz attempted by user.
   * Returns immediate feedback if the answer is correct or incorrect and provide the correct answer if the user was wrong.

## Get User Progress for Quiz
   * Endpoint to get user progress for quiz
   * Returns the results of an attempted quiz of user
   * Return information if the quiz is completed or not
     
# Limitations
   * This project uses an in memory storage, as a result the details and submissions might get erased on server restarts
     
# Future Enhancements
1. User login setup
2. User Authorization
3. Editing existing quiz
4. Delete existing quiz
5. Create categories for quiz
6. Assign each quiz a category
7. Option for user to reattempt a quiz / question
8. Creating a angular APP using material that can use the REST APIs


