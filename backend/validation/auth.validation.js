import { object, string } from "yup";

export const registerValidation = {
  schema: {
    body: object({
      fullName: string().required("Full name is required"),
      contactNumber: string()
        .matches(/^\d{10}$/, "Contact number must be exactly 10 digits")
        .required("Contact number is required"),
      emailId: string()
        .matches(
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
          "Invalid email format"
        )
        .required("Email is required"),
      password: string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
  },
};

export const loginValidation = {
  schema: {
    body: object({
      emailId: string().email("Invalid email").required("Email is required"),
      password: string().required("Password is required"),
    }),
  },
};
