import { useState, useEffect } from "react";
import { FaUser, FaTable, FaEnvelope, FaBars } from "react-icons/fa";

const Sidebar = ({ setActivePage }) => {
  const [isCollapsed, setIsCollapsed] = useState(window.innerWidth <= 1024); // Auto collapse for lg screens

  // Handle window resize to auto-collapse on large screens
  useEffect(() => {
    const handleResize = () => {
      setIsCollapsed(window.innerWidth <= 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={` bg-white text-black transition-all duration-300 ${isCollapsed ? "w-20" : "w-64"} p-4 shadow-lg`}>
      {/* Toggle Button */}
      <button onClick={() => setIsCollapsed(!isCollapsed)} className="mb-10 flex items-center justify-between w-full">
        {!isCollapsed && <span className="text-prime text-xl">AdminPanel</span>}
        <FaBars size={24} />
      </button>

      {/* Sidebar Menu */}
      {!isCollapsed && <h3 className="text-gray-700 mb-3">Main Menu</h3>}
      <ul>
        <li onClick={() => setActivePage("dashboard")} className="flex items-center gap-3 p-3 hover:bg-prime hover:text-white cursor-pointer rounded">
          <FaTable /> {!isCollapsed && "Dashboard"}
        </li>
        <li onClick={() => setActivePage("users")} className="flex items-center gap-3 p-3 hover:bg-prime hover:text-white cursor-pointer rounded">
          <FaUser /> {!isCollapsed && "Users"}
        </li>
        <li onClick={() => setActivePage("contacts")} className="flex items-center gap-3 p-3 hover:bg-prime hover:text-white cursor-pointer rounded">
          <FaEnvelope /> {!isCollapsed && "Contact"}
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
