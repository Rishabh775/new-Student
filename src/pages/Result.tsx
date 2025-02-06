import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle2, XCircle } from "lucide-react";
import StepCounter from "../components/StepCounter";
import i2CampusLogo from "../assets/image/i2Logo.svg";
import Dnr from "../assets/image/dnr.svg";

const Result: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { passed, score, totalQuestions } = location.state || {};
  const percentage = Math.round((score / totalQuestions) * 100);

  useEffect(() => {
    if (passed) {
      const timer = setTimeout(() => {
        navigate("/confirmation", {
          state: {
            ...location.state,
            percentage,
          },
        });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [passed, navigate, location.state, percentage]);

  return (
    <div className=" bg-gray-100 flex flex-col py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between">
        <img src={i2CampusLogo} alt="i2campus" />
        <img src={Dnr} alt="Do not Repeat" />
      </div>
      <StepCounter currentStep={4} totalSteps={5} />
      <div className="max-w-md w-full mx-auto">
        <div className="text-center">
          {passed ? (
            <CheckCircle2 className="mx-auto h-16 w-16 text-green-500" />
          ) : (
            <XCircle className="mx-auto h-16 w-16 text-red-500" />
          )}
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            {passed ? "Congratulations!" : "Try Again"}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            You scored {score} out of {totalQuestions} questions ({percentage}%)
          </p>
          <div className="mt-8">
            {passed ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-800">
                  Redirecting you to the confirmation page...
                </p>
              </div>
            ) : (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-800">
                  Unfortunately, you didn't pass the entrance quiz. Please try
                  again later.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;
