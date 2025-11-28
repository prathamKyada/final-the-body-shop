import express from 'express'
const contact_us_router = express.Router();
import contactController from '../Controller/contactus.controller.js'
// const  = require("../controllers/contactController");

// Route to submit a contact form
contact_us_router.post("/contact", contactController.submitContactForm);

// Route to fetch all messages (admin use)
contact_us_router.get("/get-all-messages", contactController.getAllMessages);

contact_us_router.delete('/delete-contact/:contactId', contactController.deleteContact)

contact_us_router.put('/update-contact/:contactId', contactController.updateUserContactusById)

export default contact_us_router;
