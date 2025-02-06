import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { BookOpen, ArrowRight, ArrowLeft } from "lucide-react";
import StepCounter from "../components/StepCounter";
import { questions } from "../data/questions";
import i2CampusLogo from "../assets/image/i2Logo.svg";
import Dnr from "../assets/image/dnr.svg";

const Quiz: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>(
    new Array(questions.length).fill(-1)
  );
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const handleNext = () => {
    if (selectedOption !== null) {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(
          answers[currentQuestion + 1] !== -1
            ? answers[currentQuestion + 1]
            : null
        );
      } else {
        const score = answers.reduce((acc, answer, index) => {
          return acc + (answer === questions[index].correctAnswer ? 1 : 0);
        }, 0);
        const passed = score / questions.length >= 0.6;
        navigate("/result", {
          state: {
            ...location.state,
            score,
            totalQuestions: questions.length,
            passed,
          },
        });
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedOption(
        answers[currentQuestion - 1] !== -1
          ? answers[currentQuestion - 1]
          : null
      );
    }
  };

  const handleOptionSelect = (optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = optionIndex;
    setAnswers(newAnswers);
    setSelectedOption(optionIndex);
  };

  const question = questions[currentQuestion];
  const isLastQuestion = currentQuestion === questions.length - 1;

  return (
    <div className=" bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between">
        <img src={i2CampusLogo} alt="i2campus" />
        <img src={Dnr} alt="Do not Repeat" />
      </div>
      <StepCounter currentStep={3} totalSteps={5} />
      <div className="max-w-3xl w-full mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <BookOpen className="mx-auto h-12 w-12 text-blue-500" />
            <h2 className="mt-4 text-3xl font-extrabold text-gray-900">
              Entrance Quiz
            </h2>
            <div className="mt-2 flex items-center justify-center">
              <div className="bg-blue-100 text-blue-800 px-4 py-1 rounded-full text-sm font-medium">
                Question {currentQuestion + 1} of {questions.length}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900">
              {question.question}
            </h3>
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionSelect(index)}
                  className={`w-full text-left px-6 py-4 border-2 rounded-xl transition-all duration-200 ${
                    selectedOption === index
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-200 hover:border-blue-200 hover:bg-blue-50"
                  }`}
                >
                  <div className="flex items-center">
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-3 ${
                        selectedOption === index
                          ? "border-blue-500 bg-blue-500"
                          : "border-gray-300"
                      }`}
                    >
                      {selectedOption === index && (
                        <div className="w-2 h-2 rounded-full bg-white" />
                      )}
                    </div>
                    <span className="text-lg">{option}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className={`flex items-center px-6 py-3 rounded-lg text-sm font-medium transition-colors ${
                currentQuestion === 0
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </button>
            <div className="flex-1 flex justify-center">
              <div className="flex gap-1">
                {questions.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      index === currentQuestion
                        ? "bg-blue-500"
                        : answers[index] !== -1
                        ? "bg-green-500"
                        : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
            <button
              onClick={handleNext}
              disabled={selectedOption === null}
              className={`flex items-center px-6 py-3 rounded-lg text-sm font-medium ${
                selectedOption === null
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              {isLastQuestion ? "Finish Quiz" : "Next Question"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
