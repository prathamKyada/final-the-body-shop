import express from 'express'
import cors from 'cors'
import 'dotenv/config.js'
import connectDb from './Database/dbConfig.js';
// import registrationControllers from './Controller/registration.controller.js'
import router from './Route/auth.route.js';
import contact_us_router from './Route/contactus.route.js';
// import connectCloudinary from './validation/cloundinary.js';
const app = express();
connectDb()
const port = process.env.PORT;
// connectCloudinary()

app.use(express.json());
app.use(cors());
// app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.get("/", (req, res) => {
  res.json("API Working");
});

app.use("/api/auth", router);
app.use("/api/contact-us", contact_us_router);

app.listen(port, () => {
  console.log(`server is running..... on ${port} `);
});