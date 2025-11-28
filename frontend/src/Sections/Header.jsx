// import React, { useState, useEffect } from "react";
// import { ShoppingCart, User, Menu, X, EyeOff, Eye } from "lucide-react";
// import { Link, useLocation } from "react-router-dom";
// import Logo from "../assets/img/logo2.png";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const Header = ({ cartCount }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [showLogin, setShowLogin] = useState(false);
//   const [isRegister, setIsRegister] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const location = useLocation();
//   const [formData, setFormData] = useState({
//     fullName: "",
//     emailId: "",
//     contactNumber: "",
//     password: "",
//     confirmPassword: "",
//   });
//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     const handleScroll = () => setIsScrolled(window.scrollY > 50);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const validateForm = () => {
//     let newErrors = {};

//     if (
//       isRegister &&
//       (!formData.fullName.trim().includes(" ") ||
//         formData.fullName.trim().split(" ").length < 2)
//     ) {
//       newErrors.fullName = "Full Name must be at least two words.";
//     }

//     const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//     if (!emailRegex.test(formData.emailId)) {
//       newErrors.emailId = "Enter a valid email address.";
//     }

//     if (isRegister && !/^[0-9]{10}$/.test(formData.contactNumber)) {
//       newErrors.contactNumber = "Enter a valid 10-digit mobile number.";
//     }

//     if (formData.password.trim() === "") {
//       newErrors.password = "Password is required.";
//     }

//     if (isRegister && formData.password !== formData.confirmPassword) {
//       newErrors.confirmPassword = "Passwords do not match.";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   if (!validateForm()) return; // Stop if validation fails

//   //   setLoading(true);
//   //   setMessage("");

//   //   const endpoint = isRegister
//   //     ? "http://localhost:4001/api/auth/register"
//   //     : "http://localhost:4001/api/auth/login";

//   //   try {
//   //     console.log("formdata ? ", formData)
//   //     const response = await fetch(endpoint, {
//   //       method: "POST",
//   //       headers: { "Content-Type": "application/json" },
//   //       body: JSON.stringify(formData),
//   //     });

//   //     const result = await response.json();

//   //     if (response.ok) {
//   //       toast.success(
//   //         isRegister ? "Registration Successful!" : "Login Successful!",
//   //         {
//   //           position: "top-right",
//   //           autoClose: 3000,
//   //           hideProgressBar: false,
//   //           closeOnClick: true,
//   //           pauseOnHover: true,
//   //           draggable: true,
//   //         }
//   //       );

//   //       setFormData({
//   //         fullName: "",
//   //         emailId: "",
//   //         contactNumber: "",
//   //         password: "",
//   //         confirmPassword: "",
//   //       });
//   //       setShowLogin(false);
//   //     } else {
//   //       setMessage(result.message || "Something went wrong. ❌");
//   //     }
//   //   } catch (error) {
//   //     setMessage("Network error. Please try again later. 🔄");
//   //   }

//   //   setLoading(false);
//   // };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return; // Stop if validation fails
  
//     setLoading(true);
//     setMessage("");
  
//     const endpoint = isRegister
//       ? "http://localhost:4001/api/auth/register"
//       : "http://localhost:4001/api/auth/login";
  
//     try {
//       const response = await fetch(endpoint, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });
  
//       const result = await response.json();
  
//       if (response.ok) {
//         toast.success(
//           isRegister ? "Registration Successful!" : "Login Successful!",
//           {
//             position: "top-right",
//             autoClose: 3000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//           }
//         );
  
//         setFormData({
//           fullName: "",
//           emailId: "",
//           contactNumber: "",
//           password: "",
//           confirmPassword: "",
//         });
//         setShowLogin(false);
//       } else {
//         toast.error(result.message || "User not found! ❌", {
//           position: "top-right",
//           autoClose: 3000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//         });
//       }
//     } catch (error) {
//       toast.error("Network error. Please try again later. 🔄", {
//         position: "top-right",
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//       });
//     }
  
//     setLoading(false);
//   };
  
//   const headerBgClass = ["/shop", "/about", "/contact"].includes(
//     location.pathname
//   )
//     ? "bg-[#044236]"
//     : isScrolled
//     ? "bg-white shadow-md"
//     : "bg-transparent";

//   const textColorClass = ["/shop", "/about", "/contact"].includes(
//     location.pathname
//   )
//     ? "text-white"
//     : isScrolled
//     ? "text-[#044236]"
//     : "text-white";

//   return (
//     <>
//       <header
//         className={`fixed top-0 w-full py-6 z-50 transition-all duration-300 ${headerBgClass} ${
//           isScrolled ? " shadow-md py-4" : ""
//         }`}
//       >
//         <div className="container max-w-header px-10 md:px-16">
//           <div className="header-wrap flex justify-between items-center w-full">
//             {/* Logo */}
//             <div className="logo">
//               <Link to="/">
//                 <img src={Logo} alt="Logo" className="w-16 h-16" />
//               </Link>
//             </div>

//             {/* Desktop Navigation */}
//             <nav className="hidden xl:flex flex-grow justify-center space-x-8">
//               <ul className="flex list-none gap-14 items-center">
//                 {[
//                   { name: "Home", path: "/" },
//                   { name: "Shop", path: "/shop" },
//                   { name: "About", path: "/about" },
//                   { name: "Contact Us", path: "/contact" },
//                 ].map((item, index) => (
//                   <li key={index}>
//                     <Link
//                       to={item.path}
//                       className={`relative group transition-colors duration-300 ${textColorClass} hover:text-emerald-500`}
//                     >
//                       {item.name}
//                       <span className="absolute -bottom-4 left-0 w-0 h-1 bg-gradient-to-b from-[#05a88d] to-[#037f66] transition-all group-hover:w-full"></span>
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </nav>

//             {/* Right Icons */}
//             <div className="flex items-center space-x-4">
//               {/* User Button (Opens Login Modal) */}
//               <button
//                 onClick={() => {
//                   setShowLogin(true);
//                   setIsRegister(false);
//                 }}
//                 className={`hidden lg:block p-3 rounded-full transition duration-200 ${textColorClass} hover:bg-secondary/80`}
//                 aria-label="Account"
//               >
//                 <User className="w-6 h-6" />
//               </button>

//               {/* Shopping Cart */}
//               <Link
//                 to="/cart"
//                 className={`hidden lg:block p-3 relative rounded-full transition duration-200 ${textColorClass} hover:bg-secondary/80`}
//                 aria-label="Cart"
//               >
//                 <ShoppingCart className="w-6 h-6" />
//                 {cartCount > 0 && (
//                   <span className="absolute -top-3 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
//                     {cartCount}
//                   </span>
//                 )}
//               </Link>

//               {/* Mobile Menu Button */}
//               <button
//                 className={`p-3 xl:hidden rounded-full transition duration-200 ${textColorClass} hover:bg-secondary/80`}
//                 aria-label="Open Menu"
//                 onClick={() => setIsOpen(true)}
//               >
//                 <Menu className="w-6 h-6" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </header>

//       <ToastContainer />
//       {/* Login/Register Modal */}
//       {showLogin && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//           <div className="bg-white rounded-lg shadow-lg p-6 w-96 relative">
//             <button
//               onClick={() => setShowLogin(false)}
//               className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
//             >
//               <X className="w-5 h-5" />
//             </button>

//             <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
//               {isRegister ? "Register" : "Login"}
//             </h2>

//             <form className="space-y-4" onSubmit={handleSubmit}>
//               {isRegister && (
//                 <div>
//                   <label className="block text-gray-700">Full Name</label>
//                   <input
//                     type="text"
//                     className="w-full px-4 py-2 border rounded-lg"
//                     value={formData.fullName}
//                     onChange={(e) =>
//                       setFormData({ ...formData, fullName: e.target.value })
//                     }
//                   />
//                   {errors.fullName && (
//                     <p className="text-red-500 text-sm">{errors.fullName}</p>
//                   )}
//                 </div>
//               )}

//               <div>
//                 <label className="block text-gray-700">emailId</label>
//                 <input
//                   type="email"
//                   className="w-full px-4 py-2 border rounded-lg"
//                   value={formData.emailId}
//                   onChange={(e) =>
//                     setFormData({ ...formData, emailId: e.target.value })
//                   }
//                 />
//                 {errors.emailId && (
//                   <p className="text-red-500 text-sm">{errors.emailId}</p>
//                 )}
//               </div>

//               {isRegister && (
//                 <div>
//                   <label className="block text-gray-700">Mobile Number</label>
//                   <input
//                     type="text"
//                     maxLength={10}
//                     className="w-full px-4 py-2 border rounded-lg"
//                     value={formData.contactNumber}
//                     onChange={(e) =>
//                       setFormData({ ...formData, contactNumber: e.target.value })
//                     }
//                   />
//                   {errors.contactNumber && (
//                     <p className="text-red-500 text-sm">{errors.contactNumber}</p>
//                   )}
//                 </div>
//               )}

//               <div className="relative">
//                 <label className="block text-gray-700">Password</label>
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   className="w-full px-4 py-2 border rounded-lg"
//                   value={formData.password}
//                   onChange={(e) =>
//                     setFormData({ ...formData, password: e.target.value })
//                   }
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute top-8 right-4 text-gray-500"
//                 >
//                   {showPassword ? (
//                     <EyeOff className="w-5 h-5" />
//                   ) : (
//                     <Eye className="w-5 h-5" />
//                   )}
//                 </button>
//                 {errors.password && (
//                   <p className="text-red-500 text-sm">{errors.password}</p>
//                 )}
//               </div>

//               {isRegister && (
//                 <div>
//                   <label className="block text-gray-700">
//                     Confirm Password
//                   </label>
//                   <input
//                     type="password"
//                     className="w-full px-4 py-2 border rounded-lg"
//                     value={formData.confirmPassword}
//                     onChange={(e) =>
//                       setFormData({
//                         ...formData,
//                         confirmPassword: e.target.value,
//                       })
//                     }
//                   />
//                   {errors.confirmPassword && (
//                     <p className="text-red-500 text-sm">
//                       {errors.confirmPassword}
//                     </p>
//                   )}
//                 </div>
//               )}

//               <button
//                 type="submit"
//                 className="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700"
//               >
//                 {isRegister ? "Register" : "Login"}
//               </button>
//             </form>

//             <p className="text-center mt-4">
//               {isRegister
//                 ? "Already have an account?"
//                 : "Don't have an account?"}{" "}
//               <button
//                 onClick={() => setIsRegister(!isRegister)}
//                 className="text-emerald-600 hover:underline"
//               >
//                 {isRegister ? "Login" : "Register"}
//               </button>
//             </p>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Header;



import React, { useState, useEffect } from "react";
import { ShoppingCart, User, Menu, X, EyeOff, Eye } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/img/logo2.png";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Header = ({ cartCount }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track login state
  const location = useLocation();
  const [formData, setFormData] = useState({
    fullName: "",
    emailId: "",
    contactNumber: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const validateForm = () => {
    let newErrors = {};

    if (
      isRegister &&
      (!formData.fullName.trim().includes(" ") ||
        formData.fullName.trim().split(" ").length < 2)
    ) {
      newErrors.fullName = "Full Name must be at least two words.";
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.emailId)) {
      newErrors.emailId = "Enter a valid email address.";
    }

    if (isRegister && !/^[0-9]{10}$/.test(formData.contactNumber)) {
      newErrors.contactNumber = "Enter a valid 10-digit mobile number.";
    }

    if (formData.password.trim() === "") {
      newErrors.password = "Password is required.";
    }

    if (isRegister && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return; // Stop if validation fails
  
    setLoading(true);
    setMessage("");
  
    const endpoint = isRegister
      ? "http://localhost:4001/api/auth/register"
      : "http://localhost:4001/api/auth/login";
  
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        if (isRegister) {
          toast.success("Registration Successful! Please login.", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
  
          setIsRegister(false); // Switch to login form
        } else {
          setIsAuthenticated(true);
          setShowLogin(false); // Close modal after login
          toast.success("Login Successful!", {
            position: "top-right",
            autoClose: 3000,
          });
        }
  
        setFormData({
          fullName: "",
          emailId: "",
          contactNumber: "",
          password: "",
          confirmPassword: "",
        });
      } else {
        toast.error(result.message || "User not found! ❌", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      toast.error("Network error. Please try again later. 🔄", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  
    setLoading(false);
  };
  
  
  
  const handleLogout = () => {
    setIsAuthenticated(false); // Remove user authentication
    toast.success("Logout Successful!", {
      position: "top-right",
      autoClose: 3000,
    });
  };
  
  const headerBgClass = ["/shop", "/about", "/contact"].includes(
    location.pathname
  )
    ? "bg-[#044236]"
    : isScrolled
    ? "bg-white shadow-md"
    : "bg-transparent";

  const textColorClass = ["/shop", "/about", "/contact"].includes(
    location.pathname
  )
    ? "text-white"
    : isScrolled
    ? "text-[#044236]"
    : "text-white";

  return (
    <>
      <header
        className={`fixed top-0 w-full py-6 z-50 transition-all duration-300 ${headerBgClass} ${
          isScrolled ? " shadow-md py-4" : ""
        }`}
      >
        <div className="container max-w-header px-10 md:px-16">
          <div className="header-wrap flex justify-between items-center w-full">
            {/* Logo */}
            <div className="logo">
              <Link to="/">
                <img src={Logo} alt="Logo" className="w-16 h-16" />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden xl:flex flex-grow justify-center space-x-8">
              <ul className="flex list-none gap-14 items-center">
                {[
                  { name: "Home", path: "/" },
                  { name: "Shop", path: "/shop" },
                  { name: "About", path: "/about" },
                  { name: "Contact Us", path: "/contact" },
                ].map((item, index) => (
                  <li key={index}>
                    <Link
                      to={item.path}
                      className={`relative group transition-colors duration-300 ${textColorClass} hover:text-emerald-500`}
                    >
                      {item.name}
                      <span className="absolute -bottom-4 left-0 w-0 h-1 bg-gradient-to-b from-[#05a88d] to-[#037f66] transition-all group-hover:w-full"></span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Right Icons */}
            <div className="flex items-center space-x-4">
              {/* User Button (Opens Login Modal) */}
              {!isAuthenticated ? (
  <button
    onClick={() => {
      setShowLogin(true);
      setIsRegister(false);
    }}
    className={`lg:block p-3 rounded-full transition duration-200 ${textColorClass} hover:bg-secondary/80`}
    aria-label="Account"
  >
    <User className="w-6 h-6" />
  </button>
) : (
  <button
    onClick={handleLogout}
    className="hidden lg:block bg-red-500 text-white px-4 py-2 rounded-lg"
  >
    Logout
  </button>
)}

              {/* Shopping Cart */}
              <Link
                to="/cart"
                className={`hidden lg:block p-3 relative rounded-full transition duration-200 ${textColorClass} hover:bg-secondary/80`}
                aria-label="Cart"
              >
                <ShoppingCart className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-3 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Mobile Menu Button */}
              <button
                className={`p-3 xl:hidden rounded-full transition duration-200 ${textColorClass} hover:bg-secondary/80`}
                aria-label="Open Menu"
                onClick={() => setIsOpen(true)}
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <ToastContainer />
      {/* Login/Register Modal */}
      {showLogin && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96 relative">
            <button
              onClick={() => setShowLogin(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
              {isRegister ? "Register" : "Login"}
            </h2>

            <form className="space-y-4" onSubmit={handleSubmit}>
              {isRegister && (
                <div>
                  <label className="block text-gray-700">Full Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-sm">{errors.fullName}</p>
                  )}
                </div>
              )}

              <div>
                <label className="block text-gray-700">emailId</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border rounded-lg"
                  value={formData.emailId}
                  onChange={(e) =>
                    setFormData({ ...formData, emailId: e.target.value })
                  }
                />
                {errors.emailId && (
                  <p className="text-red-500 text-sm">{errors.emailId}</p>
                )}
              </div>

              {isRegister && (
                <div>
                  <label className="block text-gray-700">Mobile Number</label>
                  <input
                    type="text"
                    maxLength={10}
                    className="w-full px-4 py-2 border rounded-lg"
                    value={formData.contactNumber}
                    onChange={(e) =>
                      setFormData({ ...formData, contactNumber: e.target.value })
                    }
                  />
                  {errors.contactNumber && (
                    <p className="text-red-500 text-sm">{errors.contactNumber}</p>
                  )}
                </div>
              )}

              <div className="relative">
                <label className="block text-gray-700">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full px-4 py-2 border rounded-lg"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-8 right-4 text-gray-500"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password}</p>
                )}
              </div>

              {isRegister && (
                <div>
                  <label className="block text-gray-700">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className="w-full px-4 py-2 border rounded-lg"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        confirmPassword: e.target.value,
                      })
                    }
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700"
              >
                {isRegister ? "Register" : "Login"}
              </button>
            </form>

            <p className="text-center mt-4">
              {isRegister
                ? "Already have an account?"
                : "Don't have an account?"}{" "}
              <button
                onClick={() => setIsRegister(!isRegister)}
                className="text-emerald-600 hover:underline"
              >
                {isRegister ? "Login" : "Register"}
              </button>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
