"use client"
import React, { useState } from 'react';

const QuizPage = () => {
    const [res, setRes] = useState([
        {
            quiz: [
                {
                    correct_answer: '<section>',
                    options: ['<div>', '<span>', '<section>', '<article>'],
                    question: 'Which of the following is NOT a valid HTML tag?',
                },
                {
                    correct_answer:
                        "<link rel='stylesheet' type='text/css' href='styles.css'>",
                    options: [
                        "<link rel='stylesheet' type='text/css' href='styles.css'>",
                        "<style src='styles.css'>",
                        "<css src='styles.css'>",
                        "<link href='styles.css'>",
                    ],
                    question:
                        'What is the correct way to include an external CSS file in an HTML document?',
                },
                {
                    correct_answer: 'The element that triggered the event',
                    options: [
                        'The current function',
                        'The global object',
                        'The parent object',
                        'The element that triggered the event',
                    ],
                    question:
                        "In JavaScript, what does the 'this' keyword refer to?",
                },
                {
                    correct_answer:
                        'Expands the box to include padding and border',
                    options: [
                        'Expands the box to include padding and border',
                        'Expands the box to include margin',
                        'Shrinks the box to exclude padding and border',
                        'Shrinks the box to exclude margin',
                    ],
                    question:
                        "What does the 'box-sizing: border-box;' CSS property do?",
                },
                {
                    correct_answer: 'event.preventDefault()',
                    options: [
                        'event.preventDefault()',
                        'form.stopSubmit()',
                        'form.preventSubmit()',
                        'event.stopSubmission()',
                    ],
                    question:
                        'How can you prevent a form from submitting using JavaScript?',
                },
            ],
        },
    ]);

    const [selectedOptions, setSelectedOptions] = useState(Array(res[0].quiz.length).fill(null));
    const [currentPage, setCurrentPage] = useState(0);

    const handleOptionChange = (questionIndex: number, optionIndex: number) => {
        const newSelectedOptions = [...selectedOptions];
        newSelectedOptions[questionIndex] = optionIndex;
        setSelectedOptions(newSelectedOptions);
    };

    const calculateScore = () => {
        let score = 0;
        res[0].quiz.forEach((question, index) => {
            if (selectedOptions[index] === null) return;
            if (question.options[selectedOptions[index]] === question.correct_answer) {
                score++;
            }
        });
        return score;
    };

    const goToNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const goToPreviousPage = () => {
        setCurrentPage(currentPage - 1);
    };

    return (
        <div className="flex flex-col justify-start items-start h-screen">
            <div className="max-w-md mx-auto p-4 bg-[url('/images/bg.png')] rounded-lg shadow-lg mt-20">
                <div className="p-4  pt-4 text-center border border-gray-400 rounded-lg">
                    <p className="text-xl font-bold">Your Score: {calculateScore()}</p>
                </div>
                {res[0].quiz[currentPage] && (
                    <div className="mb-4">
                        <h2 className="text-lg font-semibold mb-2">{res[0].quiz[currentPage].question}</h2>
                        {res[0].quiz[currentPage].options.map((option, oIndex) => (
                            <div key={oIndex} className="flex items-center mb-2">
                                <input 
                                    type="radio"
                                    id={`question${currentPage}-option${oIndex}`}
                                    name={`question${currentPage}`}
                                    value={oIndex}
                                    checked={selectedOptions[currentPage] === oIndex}
                                    onChange={() => handleOptionChange(currentPage, oIndex)}
                                    className="mr-2"
                                />
                                <label htmlFor={`question${currentPage}-option${oIndex}`}>{option}</label>
                            </div>
                        ))}
                    </div>
                )}
                <div className="flex justify-between">
                    <button onClick={goToPreviousPage} disabled={currentPage === 0}>Previous</button>
                    <button onClick={goToNextPage} disabled={currentPage === res[0].quiz.length - 1}>Next</button>
                </div>
            </div>
        </div>
    );
}

export default QuizPage;

