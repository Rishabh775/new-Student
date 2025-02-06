import { BaseUrl } from "../Constants";
import { apiSlice } from "./ApiConfig";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    sendOtp: builder.mutation({
      query: (data) => ({
        url: `${BaseUrl}/register/student/otp`,
        method: "POST",
        body: data,
      }),
    }),

    verifyOtp: builder.mutation({
      query: (data) => ({
        url: `${BaseUrl}/register/student/verify/otp`,
        method: "POST",
        body: data,
      }),
    }),

    studentRegistration: builder.mutation({
      query: (data) => ({
        url: `${BaseUrl}/register/student`,
        method: "POST",
        body: data,
      }),
    }),

    getCourses: builder.mutation({
      query: ({ campus_id }) => ({
        url: `${BaseUrl}/user/courses?campus_id=${campus_id}`,
        method: "GET",
      }),
    }),

    getQuestions: builder.query({
      query: ({ for_class }) => ({
        url: `${BaseUrl}/register/student/entrance-exam?for_class=${for_class}`,
        method: "GET",
      }),
    }),

    getCampusesForOrganization: builder.query({
      query: (organization_id) => ({
        url: `${BaseUrl}/admin/campus/${organization_id}`,
        method: "GET",
      }),
    }),

    updateCourses: builder.mutation({
      query: (data) => ({
        url: `${BaseUrl}/register/student/courses`,
        method: "PATCH",
        body: data,
      }),
    }),

    studentScore: builder.mutation({
      query: (data) => ({
        url: `${BaseUrl}/register/student/entrance/score`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const {
  useSendOtpMutation,
  useVerifyOtpMutation,
  useStudentRegistrationMutation,
  useGetCoursesMutation,
  useUpdateCoursesMutation,
  useStudentScoreMutation,
  useLazyGetQuestionsQuery,
  useGetCampusesForOrganizationQuery,
} = userApiSlice;
