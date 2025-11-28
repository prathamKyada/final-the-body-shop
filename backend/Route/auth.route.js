
import express from "express";
import registrationControllers from "../Controller/registration.controller.js";
import {
  registerValidation,
  loginValidation,
} from "../validation/auth.validation.js";
import validate from "../Middleware/validation.js"; // Import custom validation middleware
import upload from "../Config/multer.js";
const router = express.Router();

// Apply Custom Middleware Validation for Registration
router.post(
  "/register",
  upload.single("profileImage"),
  validate(registerValidation.schema.body),
  registrationControllers.userRegistration
);

// Apply Custom Middleware Validation for Login
router.post(
  "/login",
  validate(loginValidation.schema.body),
  registrationControllers.userLogin
);

router.put("/update-image/:userId", upload.single("profileImage"), registrationControllers.updateUserImageById)

router.get('/all-user-data', registrationControllers.getAllRegisteredUser)

router.put('/update-details/:userId', registrationControllers.updateUserDetailsById)

router.delete('/delete-user/:userId', registrationControllers.deleteUserDataById)


export default router;
