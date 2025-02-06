import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import StepCounter from "../components/StepCounter";
import i2CampusLogo from "../assets/image/i2Logo.svg";
import Dnr from "../assets/image/dnr.svg";

const Registration: React.FC = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    studentPhoto: null as File | null,
    fullName: "",
    dateOfBirth: "",
    gender: "",
    aadharCardNumber: "",
    nationality: "",
    religion: "",
    residentialAddress: "",
    postalAddress: "",
    father: {
      fullName: "",
      occupation: "",
      contactNumber: "",
      emailAddress: "",
      aadharCardNumber: "",
    },
    mother: {
      fullName: "",
      occupation: "",
      contactNumber: "",
      emailAddress: "",
      aadharCardNumber: "",
    },
    guardian: {
      fullName: "",
      relationship: "",
      contactNumber: "",
      address: "",
    },
    currentSchool: {
      name: "",
      address: "",
      gradeLastAttended: "",
      reasonForLeaving: "",
    },
    academicAchievements: "",
    extracurricularAchievements: "",
    applyingGrade: "",
    transportationMode: "",
    busVillageName: "",
    languagesSpoken: "",
    specialNeeds: "",
    medical: {
      conditions: "",
      emergencyContact: {
        name: "",
        relationship: "",
        number: "",
      },
      familyDoctor: {
        name: "",
        number: "",
      },
    },
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
    path: string
  ) => {
    const keys = path.split(".");
    const lastKey = keys.pop();
    setFormData((prev: any) => {
      let ref = prev;
      keys.forEach((key) => {
        if (!ref[key]) ref[key] = {};
        ref = ref[key];
      });
      ref[lastKey as string] = e.target.value;
      return { ...prev };
    });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!allowedTypes.includes(file.type)) {
        alert("Please upload a valid image (JPEG, PNG, or GIF)");
        return;
      }

      if (file.size > maxSize) {
        alert("File size should not exceed 5MB");
        return;
      }

      setFormData((prev) => ({
        ...prev,
        studentPhoto: file,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formDataToSubmit = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (key === "studentPhoto" && value) {
        formDataToSubmit.append(key, value as File);
      } else if (typeof value === "string" || typeof value === "number") {
        formDataToSubmit.append(key, value.toString());
      } else if (typeof value === "object" && value !== null) {
        formDataToSubmit.append(key, JSON.stringify(value));
      }
    });

    console.log(formData);
    navigate("/quiz", { state: formData });
  };

  return (
    <div className=" bg-gray-100 flex flex-col py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between">
        <img src={i2CampusLogo} alt="i2campus" />
        <img src={Dnr} alt="Do not Repeat" />
      </div>
      <StepCounter currentStep={2} totalSteps={5} />
      <div className="max-w-4xl w-full mx-auto">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <h2 className="text-3xl font-bold text-center">
            Student Registration
          </h2>

          {/* Student Personal Information */}
          <fieldset className="border p-4 rounded">
            <legend className="font-semibold text-xl">
              Student Information
              <span className="text-red-500">*</span>
            </legend>
            {/* Student Photo Upload */}
            <div className="mb-4 flex items-center gap-x-2">
              <label className="block font-medium text-gray-700 ">
                Student Photo
              </label>
              <div className="flex items-center">
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/jpeg,image/png,image/gif"
                  onChange={handlePhotoUpload}
                  className="hidden"
                  required
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-blue-500 text-white px-4 py-2 rounded mr-4"
                >
                  Choose Photo
                </button>
                {formData.studentPhoto && (
                  <span className="text-green-600">
                    {formData.studentPhoto.name}
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-500 ">
                Allowed formats: JPEG, PNG, GIF (Max 5MB)
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                required
                placeholder="Full Name"
                value={formData.fullName}
                onChange={(e) => handleChange(e, "fullName")}
                className="block w-full p-2 border rounded"
              />
              <input
                type="date"
                required
                placeholder="Date of Birth"
                value={formData.dateOfBirth}
                onChange={(e) => handleChange(e, "dateOfBirth")}
                className="block w-full p-2 border rounded"
              />
              <select
                required
                value={formData.gender}
                onChange={(e) => handleChange(e, "gender")}
                className="block w-full p-2 border rounded"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              <input
                type="text"
                required
                placeholder="Aadhar Card Number"
                value={formData.aadharCardNumber}
                onChange={(e) => handleChange(e, "aadharCardNumber")}
                className="block w-full p-2 border rounded"
              />
              <input
                type="text"
                required
                placeholder="Nationality"
                value={formData.nationality}
                onChange={(e) => handleChange(e, "nationality")}
                className="block w-full p-2 border rounded"
              />
              <input
                type="text"
                required
                placeholder="Religion"
                value={formData.religion}
                onChange={(e) => handleChange(e, "religion")}
                className="block w-full p-2 border rounded"
              />
              <textarea
                placeholder="Residential Address"
                required
                value={formData.residentialAddress}
                onChange={(e) => handleChange(e, "residentialAddress")}
                className="block w-full p-2 border rounded col-span-2"
              />
              <textarea
                placeholder="Postal Address"
                required
                value={formData.postalAddress}
                onChange={(e) => handleChange(e, "postalAddress")}
                className="block w-full p-2 border rounded col-span-2"
              />
            </div>
          </fieldset>

          {/* Father's Details */}
          <fieldset className="border p-4 rounded">
            <legend className="font-semibold text-xl">
              Father's Details
              <span className="text-red-500">*</span>
            </legend>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                required
                placeholder="Full Name"
                value={formData.father.fullName}
                onChange={(e) => handleChange(e, "father.fullName")}
                className="block w-full p-2 border rounded"
              />
              <input
                type="text"
                required
                placeholder="Occupation"
                value={formData.father.occupation}
                onChange={(e) => handleChange(e, "father.occupation")}
                className="block w-full p-2 border rounded"
              />
              <input
                type="tel"
                required
                placeholder="Contact Number"
                value={formData.father.contactNumber}
                onChange={(e) => handleChange(e, "father.contactNumber")}
                className="block w-full p-2 border rounded"
              />
              <input
                type="email"
                required
                placeholder="Email Address"
                value={formData.father.emailAddress}
                onChange={(e) => handleChange(e, "father.emailAddress")}
                className="block w-full p-2 border rounded"
              />
              <input
                type="text"
                required
                placeholder="Aadhar Card Number"
                value={formData.father.aadharCardNumber}
                onChange={(e) => handleChange(e, "father.aadharCardNumber")}
                className="block w-full p-2 border rounded"
              />
            </div>
          </fieldset>

          {/* Mother's Details */}
          <fieldset className="border p-4 rounded">
            <legend className="font-semibold text-xl">
              Mother's Details
              <span className="text-red-500">*</span>
            </legend>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                required
                placeholder="Full Name"
                value={formData.mother.fullName}
                onChange={(e) => handleChange(e, "mother.fullName")}
                className="block w-full p-2 border rounded"
              />
              <input
                type="text"
                required
                placeholder="Occupation"
                value={formData.mother.occupation}
                onChange={(e) => handleChange(e, "mother.occupation")}
                className="block w-full p-2 border rounded"
              />
              <input
                type="tel"
                required
                placeholder="Contact Number"
                value={formData.mother.contactNumber}
                onChange={(e) => handleChange(e, "mother.contactNumber")}
                className="block w-full p-2 border rounded"
              />
              <input
                type="email"
                required
                placeholder="Email Address"
                value={formData.mother.emailAddress}
                onChange={(e) => handleChange(e, "mother.emailAddress")}
                className="block w-full p-2 border rounded"
              />
              <input
                type="text"
                required
                placeholder="Aadhar Card Number"
                value={formData.mother.aadharCardNumber}
                onChange={(e) => handleChange(e, "mother.aadharCardNumber")}
                className="block w-full p-2 border rounded"
              />
            </div>
          </fieldset>

          {/* Guardian Details */}
          <fieldset className="border p-4 rounded">
            <legend className="font-semibold text-xl">
              Guardian Details
              <span className="text-red-500">*</span>
            </legend>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                required
                placeholder="Full Name"
                value={formData.guardian.fullName}
                onChange={(e) => handleChange(e, "guardian.fullName")}
                className="block w-full p-2 border rounded"
              />
              <input
                type="text"
                required
                placeholder="Relationship"
                value={formData.guardian.relationship}
                onChange={(e) => handleChange(e, "guardian.relationship")}
                className="block w-full p-2 border rounded"
              />
              <input
                type="tel"
                required
                placeholder="Contact Number"
                value={formData.guardian.contactNumber}
                onChange={(e) => handleChange(e, "guardian.contactNumber")}
                className="block w-full p-2 border rounded"
              />
              <textarea
                placeholder="Address"
                required
                value={formData.guardian.address}
                onChange={(e) => handleChange(e, "guardian.address")}
                className="block w-full p-2 border rounded col-span-2"
              />
            </div>
          </fieldset>

          {/* Current School Information */}
          <fieldset className="border p-4 rounded">
            <legend className="font-semibold text-xl">
              School Information
              <span className="text-red-500">*</span>
            </legend>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                required
                placeholder="School Name"
                value={formData.currentSchool.name}
                onChange={(e) => handleChange(e, "currentSchool.name")}
                className="block w-full p-2 border rounded"
              />
              <textarea
                placeholder="School Address"
                value={formData.currentSchool.address}
                onChange={(e) => handleChange(e, "currentSchool.address")}
                className="block w-full p-2 border rounded"
              />
              <input
                type="text"
                required
                placeholder="Grade Last Attended"
                value={formData.currentSchool.gradeLastAttended}
                onChange={(e) =>
                  handleChange(e, "currentSchool.gradeLastAttended")
                }
                className="block w-full p-2 border rounded"
              />
              <input
                type="text"
                required
                placeholder="Reason for Leaving"
                value={formData.currentSchool.reasonForLeaving}
                onChange={(e) =>
                  handleChange(e, "currentSchool.reasonForLeaving")
                }
                className="block w-full p-2 border rounded"
              />
            </div>
          </fieldset>

          {/* Academic and Additional Information */}
          <fieldset className="border p-4 rounded">
            <legend className="font-semibold text-xl">
              Additional Information
              <span className="text-red-500">*</span>
            </legend>
            <div className="grid grid-cols-2 gap-4">
              <textarea
                required
                placeholder="Academic Achievements"
                value={formData.academicAchievements}
                onChange={(e) => handleChange(e, "academicAchievements")}
                className="block w-full p-2 border rounded"
              />
              <textarea
                required
                placeholder="Extracurricular Achievements"
                value={formData.extracurricularAchievements}
                onChange={(e) => handleChange(e, "extracurricularAchievements")}
                className="block w-full p-2 border rounded"
              />
              <input
                type="text"
                required
                placeholder="Applying for Grade"
                value={formData.applyingGrade}
                onChange={(e) => handleChange(e, "applyingGrade")}
                className="block w-full p-2 border rounded"
              />
              <select
                value={formData.transportationMode}
                required
                onChange={(e) => handleChange(e, "transportationMode")}
                className="block w-full p-2 border rounded"
              >
                <option value="">Select Transportation Mode</option>
                <option value="school-bus">School Bus</option>
                <option value="private-vehicle">Private Vehicle</option>
                <option value="public-transport">Public Transport</option>
                <option value="walking">Walking</option>
              </select>
              <input
                type="text"
                required
                placeholder="Bus Village Name"
                value={formData.busVillageName}
                onChange={(e) => handleChange(e, "busVillageName")}
                className="block w-full p-2 border rounded"
              />
              <input
                type="text"
                required
                placeholder="Languages Spoken"
                value={formData.languagesSpoken}
                onChange={(e) => handleChange(e, "languagesSpoken")}
                className="block w-full p-2 border rounded"
              />
              <input
                type="text"
                required
                placeholder="Special Needs (if any)"
                value={formData.specialNeeds}
                onChange={(e) => handleChange(e, "specialNeeds")}
                className="block w-full p-2 border rounded col-span-2"
              />
            </div>
          </fieldset>

          {/* Medical Information */}
          <fieldset className="border p-4 rounded">
            <legend className="font-semibold text-xl">
              Medical Information
              <span className="text-red-500">*</span>
            </legend>
            <div className="grid grid-cols-2 gap-4">
              <textarea
                required
                placeholder="Medical Conditions"
                value={formData.medical.conditions}
                onChange={(e) => handleChange(e, "medical.conditions")}
                className="block w-full p-2 border rounded col-span-2"
              />

              {/* Emergency Contact */}
              <input
                type="text"
                required
                placeholder="Emergency Contact Name"
                value={formData.medical.emergencyContact.name}
                onChange={(e) =>
                  handleChange(e, "medical.emergencyContact.name")
                }
                className="block w-full p-2 border rounded"
              />
              <input
                type="text"
                required
                placeholder="Emergency Contact Relationship"
                value={formData.medical.emergencyContact.relationship}
                onChange={(e) =>
                  handleChange(e, "medical.emergencyContact.relationship")
                }
                className="block w-full p-2 border rounded"
              />
              <input
                type="tel"
                required
                placeholder="Emergency Contact Number"
                value={formData.medical.emergencyContact.number}
                onChange={(e) =>
                  handleChange(e, "medical.emergencyContact.number")
                }
                className="block w-full p-2 border rounded"
              />

              {/* Family Doctor */}
              <input
                type="text"
                required
                placeholder="Family Doctor Name"
                value={formData.medical.familyDoctor.name}
                onChange={(e) => handleChange(e, "medical.familyDoctor.name")}
                className="block w-full p-2 border rounded"
              />
              <input
                type="tel"
                required
                placeholder="Family Doctor Number"
                value={formData.medical.familyDoctor.number}
                onChange={(e) => handleChange(e, "medical.familyDoctor.number")}
                className="block w-full p-2 border rounded"
              />
            </div>
          </fieldset>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Registration;
