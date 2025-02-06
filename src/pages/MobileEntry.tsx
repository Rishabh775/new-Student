import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Phone } from "lucide-react";
import StepCounter from "../components/StepCounter";
import i2CampusLogo from "../assets/image/i2Logo.svg";
import Dnr from "../assets/image/dnr.svg";

const MobileEntry: React.FC = () => {
  const [mobile, setMobile] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mobile.length === 10) {
      navigate("/otp", { state: { mobile } });
    }
  };

  return (
    <div className=" bg-gray-100 flex flex-col py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between">
        <img src={i2CampusLogo} alt="i2campus" />
        <img src={Dnr} alt="Do not Repeat" />
      </div>
      <StepCounter currentStep={0} totalSteps={5} />
      <div className="max-w-md w-full mx-auto">
        <div className="text-center">
          <Phone className="mx-auto h-12 w-12 text-blue-500" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Enter your mobile number
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            We'll send you a verification code
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <input
              type="tel"
              required
              className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="Mobile Number"
              value={mobile}
              onChange={(e) =>
                setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))
              }
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={mobile.length !== 10}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MobileEntry;
