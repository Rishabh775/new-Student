export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface RegistrationData {
  mobile: string;
  otp: string;
  fullName: string;
  email: string;
  dateOfBirth: string;
  education: string;
  address: string;
}