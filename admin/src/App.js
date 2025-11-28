import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./Sections/Admin-Header";
import Dashboard from "./Pages/Dashboard";
import Users from "./Pages/Users";
import Contacts from "./Pages/Contacts";
import axios from "axios";

function App() {
  const [activePage, setActivePage] = useState("dashboard");
  const [users, setUsers] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginData, setLoginData] = useState({ username: "", password: "" });

  useEffect(() => {
    if (isAuthenticated) {
      const fetchUsers = async () => {
        try {
          const response = await axios.get("http://localhost:4001/api/auth/all-user-data");
          setUsers(response.data.userData);
        } catch (error) {
          console.error("Failed to fetch users:", error);
        }
      };

      const fetchContacts = async () => {
        try {
          const response = await axios.get("http://localhost:4001/api/contact-us/get-all-messages");
          setContacts(response.data);
        } catch (error) {
          console.error("Failed to fetch contacts:", error);
        }
      };

      fetchUsers();
      fetchContacts();
    }
  }, [isAuthenticated]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginData.username === "admin" && loginData.password === "admin") {
      setIsAuthenticated(true);
    } else {
      alert("Invalid Credentials");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setLoginData({ username: "", password: "" });
  };

  if (!isAuthenticated) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-200">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <h2 className="text-xl font-bold mb-4 text-center">Admin Login</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-gray-700">Username:</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={loginData.username}
                onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Password:</label>
              <input
                type="password"
                className="w-full p-2 border rounded"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                required
              />
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">Login</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar setActivePage={setActivePage} />
      <div className="flex-1">
        <Header />
        {/* Logout Button */}
        <div className="flex justify-end p-4">
          <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
            Logout
          </button>
        </div>
        <div className="p-6">
          {loading && <p>Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {!loading && !error && (
            <>
              {activePage === "dashboard" && <Dashboard users={users} contacts={contacts} />}
              {activePage === "users" && <Users users={users} setUsers={setUsers} />}
              {activePage === "contacts" && <Contacts contacts={contacts} setContacts={setContacts} />}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
