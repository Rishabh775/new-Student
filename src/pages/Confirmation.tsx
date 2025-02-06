import React from "react";
import { useLocation } from "react-router-dom";
import { Mail, Trophy, GraduationCap } from "lucide-react";
import StepCounter from "../components/StepCounter";
import i2CampusLogo from "../assets/image/i2Logo.svg";
import Dnr from "../assets/image/dnr.svg";

const Confirmation: React.FC = () => {
  const location = useLocation();
  const { percentage, fullName, email } = location.state || {};

  return (
    <div className=" bg-gradient-to-b from-blue-50 to-white flex flex-col py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between">
        <img src={i2CampusLogo} alt="i2campus" />
        <img src={Dnr} alt="Do not Repeat" />
      </div>
      <StepCounter currentStep={5} totalSteps={5} />
      <div className="max-w-3xl w-full mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
          <div className="text-center">
            <div className="relative inline-block">
              <Trophy className="mx-auto h-16 w-16 text-yellow-500" />
              <div className="absolute -top-2 -right-2 bg-blue-500 text-white text-sm font-bold rounded-full w-8 h-8 flex items-center justify-center">
                {percentage}%
              </div>
            </div>
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Welcome to Our Institution!
            </h2>
            <p className="mt-2 text-lg text-gray-600">
              Congratulations {fullName}! Your registration is complete.
            </p>
          </div>

          <div className="bg-blue-50 rounded-xl p-6">
            <div className="flex items-start space-x-4">
              <Mail className="w-6 h-6 text-blue-500 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Check Your Email
                </h3>
                <p className="mt-1 text-gray-600">
                  We've sent a confirmation email to{" "}
                  <span className="font-medium">{email}</span> with important
                  information about:
                </p>
                <ul className="mt-4 space-y-3">
                  <li className="flex items-center text-gray-700">
                    <GraduationCap className="w-5 h-5 text-blue-500 mr-2" />
                    Your course schedule and materials
                  </li>
                  <li className="flex items-center text-gray-700">
                    <GraduationCap className="w-5 h-5 text-blue-500 mr-2" />
                    Next steps and orientation details
                  </li>
                  <li className="flex items-center text-gray-700">
                    <GraduationCap className="w-5 h-5 text-blue-500 mr-2" />
                    Important dates and deadlines
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="text-center text-gray-600">
            <p>
              If you don't receive the email within 5 minutes, please check your
              spam folder or contact our support team.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
