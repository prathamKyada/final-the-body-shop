import axios from "axios";
import { Check, Contact, Mail } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";


const ContactPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:4001/api/contact-us/contact",
        formData
      );
      console.log("Response:", response.data);
      alert("Your message has been sent successfully!");
      setFormData({ firstName: "", lastName: "", email: "", message: "" }); // Clear form
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Something went wrong! Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <section className="py-[90px] lg:py-28 ">
      <div className="container">
        <div className="flex flex-col justify-center items-center">
          <div>
            <h2 className="blockSubTitle pSubTitle">Get in Touch With Us</h2>
          </div>
          <div className="contact-wrapper flex-col lg:flex-row">
            {/* Left Section */}
            <div className="contact-info p-5 lg:p-12 text-start">
              <h3>Contact Information</h3>
              <p>
                Fill up the form and our team will get back to you within 24
                hours.
              </p>
              <ul>
                <li>
                  <Link
                    href="tel:+919727652436"
                    target="/"
                    className="flex items-center gap-3"
                  >
                  <Contact />
                    +91 97276 52436
                  </Link>
                </li>
                <li>
                  <Link
                    href="mailto:thebodyshop@gmail.com "
                    target="/"
                    className="flex items-center gap-3"
                  >
                  <Mail/>
                    thebodyshop@gmail.com
                  </Link>
                </li>

              </ul>
              <span className="check-icon-p">
                We guarantee 100% security of your information. We will not
                share the details you provide above with anyone. Your email
                won&apos;t be used for spamming.
              </span>
            </div>

            {/* Right Section */}
            <div className="contact-form">
                <p className="py-14 md:pb-5 text-xl">How do we help?</p>

                {successMessage && (
                  <p className="text-green-500">{successMessage}</p>
                )}
                {errorMessage && <p className="text-red-500">{errorMessage}</p>}

                <form onSubmit={handleSubmit}>
                  <div className="form-row">
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-row">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-row">
                    <textarea
                      name="message"
                      placeholder="Message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>

                  <div className="form-row flex justify-between items-center">
                    <button
                      type="submit"
                      className="px-6 py-2 w-36 h-16 rounded-xl text-xl text-white bg-[#044236] disabled:bg-gray-500"
                      disabled={loading}
                    >
                      {loading ? "Submitting..." : "Submit"}
                    </button>
                  </div>
                </form>
              </div>
          </div>
        </div>
      </div>
    </section>
  </>
  );
};

export default ContactPage;
