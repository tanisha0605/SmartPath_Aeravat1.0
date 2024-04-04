'use client';
import React, { ChangeEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Input } from '@/components/ui/input';
import Chatbot from '@/components/components/Chatbot';
import { HoverBorderGradient } from '@/components/ui/hover-border-gradient';
import Link from 'next/link';
import { TracingBeam } from '@/components/ui/tracing-beam';
import { Button } from '@/components/ui/button';
import CheckIcon from '@/components/icons/CheckIcon';
import { useRouter } from 'next/navigation';

function Create() {
    const route = useRouter();
    const [userData, setUserData] = useState({
        dreamRole: '',
        targetYear: '',
    });
    const [quizStatus, setQuizStatus] = useState({});
    const [resume, setResume] = useState<File | null>(null);
    const [submitStatus, setSubmitStatus] = useState(false);
    const [roadmap, setRoadmap] = useState(false);
    const [quiz, setQuiz] = useState(false);
   
    const [res, setRes] = useState({
        roadmap: [
            {
                
                framework: '',
                optional: '',
                project: '',
                topics: [],
                duration : ''
            },
        ],
    });
    const [resource, setResource] = useState([
        'w3schools.com',
        'freecodecamp.org',
        'codecademy.com',
        'udemy.com',
    ]);
    const [resourceStatus, setResourceStatus] = useState(false);
    const [abc, setABC] = useState([
        {
            quiz: [
                {
                    correct:
                        'A library for numerical computation developed by Google',
                    options: [
                        'A deep learning framework',
                        'A programming language',
                        'A library for numerical computation developed by Google',
                        'An operating system',
                    ],
                    question: 'What is TensorFlow?',
                    tier: 'beginner',
                },
                {
                    correct: 'String',
                    options: ['Float', 'Integer', 'Boolean', 'String'],
                    question:
                        'Which of the following is NOT a data type supported by TensorFlow?',
                    tier: 'intermediate',
                },
                {
                    correct:
                        'To execute the operations defined in the TensorFlow graph',
                    options: [
                        'To store data in memory',
                        'To visualize the TensorFlow graph',
                        'To execute the operations defined in the TensorFlow graph',
                        'To train the neural network',
                    ],
                    question: 'What is a TensorFlow session used for?',
                    tier: 'intermediate',
                },
                {
                    correct: 'A way to feed data into the TensorFlow graph',
                    options: [
                        'A node in the TensorFlow graph',
                        'A way to define variables in TensorFlow',
                        'A way to feed data into the TensorFlow graph',
                        'A way to save and load TensorFlow models',
                    ],
                    question: 'What is a TensorFlow placeholder?',
                    tier: 'advanced',
                },
                {
                    correct:
                        'To simplify the process of creating and training TensorFlow models',
                    options: [
                        'To visualize the TensorFlow graph',
                        'To execute TensorFlow operations in parallel',
                        'To simplify the process of creating and training TensorFlow models',
                        'To optimize TensorFlow models for mobile devices',
                    ],
                    question: 'What is the purpose of TensorFlow Estimators?',
                    tier: 'advanced',
                },
            ],
        },
    ]);

    const [selectedOptions, setSelectedOptions] = useState(
        Array(abc[0].quiz.length).fill(null)
    );
    const [currentPage, setCurrentPage] = useState(0);

    const handleOptionChange = (questionIndex: number, optionIndex: number) => {
        const newSelectedOptions = [...selectedOptions];
        newSelectedOptions[questionIndex] = optionIndex;
        setSelectedOptions(newSelectedOptions);
    };

    const calculateScore = () => {
        let score = 0;
        abc[0].quiz.forEach((question, index) => {
            if (selectedOptions[index] === null) return;
            if (question.options[selectedOptions[index]] === question.correct) {
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

    useEffect(() => {
        setSubmitStatus(false);
    }, []);

    const uploadResume = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setResume(file);
            toast.success('Resume uploaded successfully');
        } else {
            toast.error('Please upload the resume again');
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData((prevUserData) => ({
            ...prevUserData,
            [name]: value,
        }));
    };

    const generateRoadmapwithResume = async () => {
        if (resume === null) {
            toast.error('Please upload a resume.');
            return;
        }
        try {
            const formData = new FormData();
            formData.append('file', resume as File);
            formData.append('role', userData.dreamRole);
            formData.append('year', userData.targetYear);
            const response = await fetch(
                'http://127.0.0.1:5000/generate/resume-roadmap',
                {
                    method: 'POST',
                    body: formData,
                }
            ).then(async (res) => {
                const responseJson = await res.json();
                console.log(responseJson);
                setRes(responseJson);
                setSubmitStatus(true);
            });
        } catch (error) {
            console.error('Error submitting form data:', error);
            toast.error('Error submitting form data');
        }
        setRoadmap(true);
    };

    const generateRoadmap = async () => {
        try {
            const response = await fetch(
                'http://127.0.0.1:5000/generate/roadmap',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        role: userData.dreamRole,
                        year: userData.targetYear,
                    }),
                }
            ).then(async (res) => {
                console.log('res' + res);
                const responseJson = await res.json();
                console.log(responseJson);
                console.log(responseJson.roadmap);
                setRes(responseJson);
                setRoadmap(true);
            });
        } catch (error) {
            console.error('Error generating roadmap:', error);
            toast.error('Error generating roadmap');
        }
        setRoadmap(true);
    };

    const handleSubmit = () => {
        setSubmitStatus(true);
    };

    const handleTest = async (input: string) => {
        console.log('Test for ' + input + ' clicked');
        const response = await fetch('http://127.0.0.1:5000/generate/quiz', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                input: input,
            }),
        }).then(async (res) => {
            console.log('res' + res);
            const responseJson = await res.json();
            console.log(responseJson);
            console.log(responseJson.quiz);
            setQuiz(responseJson.quiz);
            setQuizStatus(true);
            console.log(quizStatus);
        });
    };

    

    

    if (submitStatus === false && roadmap === false && quiz === false) {
        return (
            <main className=" p-4">
                <div className="mt-[72px] px-8 py-4 min-h-100vh z-10 text-center">
                    <div className="w-full text-center mb-8">
                        <h1 className="text-4xl font-semibold w-full bg-gradient-to-r bg-clip-text from-blue-500 to-blue-400 text-transparent m-4">
                            Lets Start By Uploading Your Resume
                        </h1>
                    </div>
                    <div className="border border-blue-400 " />
                    <div className="w-1/2 p-8 mx-auto h-full  m-4 rounded-lg border border-rounded  dark:border-blue-400 text-center bg-[url('/images/bg.png')] shadow-lg shadow-white">
                        <Input
                            placeholder="Dream Role"
                            className=" w-full border border-rounded border-black p-2 dark:text-black my-4"
                            name="dreamRole"
                            value={userData.dreamRole}
                            onChange={handleChange}
                            required
                        />
                        <Input
                            placeholder="Target Year"
                            type="number"
                            min={2024}
                            max={2040}
                            className=" w-full border border-rounded border-black dark:text-black my-4"
                            name="targetYear"
                            value={userData.targetYear}
                            onChange={handleChange}
                            required
                        />
                        <div className="w-full h-auto flex justify-center">
                            <label
                                htmlFor="fileInput"
                                className="mx-4 file:text-white bg-background relative cursor-pointer w-full border  border-black  p-1 rounded-sm dark:bg-white dark:text-black"
                            >
                                {resume === null
                                    ? 'Upload Resume'
                                    : 'Resume Uploaded'}
                                <input
                                    type="file"
                                    id="fileInput"
                                    className="hidden w-full "
                                    name="resume"
                                    onChange={uploadResume}
                                    accept=".pdf"
                                />
                            </label>
                        </div>
                        <div className="mt-4 flex justify-center m-4 space-x-4">
                            <Button
                                onClick={handleSubmit}
                                className="border border-black"
                            >
                                Explore
                            </Button>

                            <Button
                                onClick={generateRoadmapwithResume}
                                className="border border-black"
                            >
                                Generate Roadmap
                            </Button>
                        </div>
                    </div>
                </div>
            </main>
        );
    } else if (submitStatus === true && roadmap === false) {
        return (
            <div>
                <Chatbot />
                <div className=" flex justify-center items-center m-2 p-2 rounded-lg">
                    <Button onClick={generateRoadmap}>Generate Roadmap</Button>
                </div>
            </div>
        );
    } else if (roadmap === true && quiz === false) {
        return (
            <main className="pt-[72px] ">
                <div className="flex justify-end mr-4">
                    <div className="border border-inherit rounded-lg p-2 bg-gradient-to-r bg-clip-text from-blue-500 to-blue-400 text-transparent flex items-center dark:border-white">
                        <div className="flex items-center">
                            <CheckIcon optional={false} />
                            <h4 className="ml-2">:Compulsory techstack</h4>
                        </div>
                        <div className="flex items-center ml-4">
                            <CheckIcon optional={true} />
                            <h4 className="ml-2">:Optional techstack</h4>
                        </div>
                    </div>
                </div>

                <TracingBeam className="px-6">
                    <div className="p-4 mx-8 relative">
                        {res.roadmap.map((item, index) => (
                            <div
                                key={index}
                                className="p-4 m-2 border border-inherit rounded-lg flex  justify-evenly items-center dark:border-white shadow-lg"
                            >
                                <div className="border m-2 w-1/3 border-inherit rounded-lg p-4 bg-gradient-to-r bg-clip-text  from-blue-500 to-blue-400 text-transparent flex flex-wrap items-center">
                                    <div className="w-full  inline-block ">
                                        <h1 className="font-semibold mx-2 w-full ">
                                            {item.optional === 'true' ? (
                                                <CheckIcon optional={true} />
                                            ) : (
                                                <CheckIcon optional={false} />
                                            )}
                                            <Link href="/quiz">
                                                {item.framework}
                                            </Link>
                                        </h1>
                                    </div>
                                    <div className="w-full ">
                                        <Button
                                            className="p-2 m-2"
                                            onClick={() =>
                                                handleTest(item.framework)
                                            }
                                        >
                                            Take Quiz
                                        </Button>
                                    </div>
                                    <div>
                                        <h4 className="text-black">Duration:{item.duration}</h4>
                                    </div>
                                </div>
                                <div className="border border-inherit rounded-lg m-2 p-4 w-1/3 text-center   dark:bg-white dark:text-black dark:border-black">
                                    <div>
                                        <h2 className="font-semibold text-lg bg-gradient-to-r bg-clip-text  from-blue-500 to-blue-400 text-transparent ">
                                            Topics
                                        </h2>
                                        <ul>
                                            {(item.topics ?? []).map(
                                                (topic, topicIndex) => (
                                                    <li key={topicIndex}>
                                                        {topic}
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    </div>
                                    <div className="w-full flex justify-center ">
                                        <Button
                                            className="p-2 mt-2 bg-blue-300 dark:text-black"
                                            
                                        >
                                            Resources
                                        </Button>
                                    </div>
                                </div>
                                {item.project && (
                                    <div className="border m-2 border-inherit rounded-lg p-4 w-1/3  dark:border-black dark:bg-white dark:text-black text-center">
                                        <h2 className="font-semibold text-lg bg-gradient-to-r bg-clip-text  from-blue-500 to-blue-400 text-transparent ">
                                            Projects
                                        </h2>
                                        <p>{item.project}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </TracingBeam>
                
            </main>
        );
    }
    if (quizStatus === true) {
        return (
            <div className="pt-[72px] p-4 min-h-screen z-50">
                <div className="w-full flex justify-start p-4">
                    <button onClick={() => setCurrentPage(0)} disabled={currentPage === 0}>Start Over</button>
                </div>
                <div className="max-w-md mx-auto p-4 bg-[url('/images/bg.png')] rounded-lg shadow-lg mt-20">
                    <div className="p-4  pt-4 text-center border border-gray-400 rounded-lg">
                        <p className="text-xl font-bold">
                            Your Score: {calculateScore()}
                        </p>
                    </div>
                    {abc[0].quiz[currentPage] && (
                        <div className="mb-4">
                            <h2 className="text-lg font-semibold mb-2">
                                {abc[0].quiz[currentPage].question}
                            </h2>
                            {abc[0].quiz[currentPage].options.map(
                                (option, optionIndex) => (
                                    <div
                                        key={optionIndex}
                                        className="flex items-center mb-2"
                                    >
                                        <input
                                            type="radio"
                                            id={`question${currentPage}-option${optionIndex}`}
                                            name={`question${currentPage}`}
                                            value={optionIndex}
                                            checked={
                                                selectedOptions[currentPage] ===
                                                optionIndex
                                            }
                                            onChange={() =>
                                                handleOptionChange(
                                                    currentPage,
                                                    optionIndex
                                                )
                                            }
                                            className="mr-2"
                                        />
                                        <label
                                            htmlFor={`question${currentPage}-option${optionIndex}`}
                                        >
                                            {option}
                                        </label>
                                    </div>
                                )
                            )}
                        </div>
                    )}
                    <div className="flex justify-between">
                        {/* <button onClick={goToPreviousPage} disabled={currentPage === 0}>Previous</button> */}
                        <button
                            onClick={goToNextPage}
                            disabled={currentPage === abc[0].quiz.length - 1}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        );
    } else if (resourceStatus === true) {
        return (
            <div>
                <h1>Hello</h1>
            </div>
        );
    }
}

export default Create;
