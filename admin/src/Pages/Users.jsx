import { useState } from "react";
import { FaTrash, FaEdit, FaSearch, FaSave, FaTimes } from "react-icons/fa";

const Users = ({ users, setUsers }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [editingUser, setEditingUser] = useState(null);
  const [updatedUser, setUpdatedUser] = useState({
    fullName: "",
    emailId: "",
    contactNumber: "",
  });

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://localhost:4001/api/auth/delete-user/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete user.");
      }

      alert("User deleted successfully!");
      setUsers(users.filter((user) => user._id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Error deleting user. Please try again.");
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user._id);
    setUpdatedUser(user);
  };

  // const handleUpdate = () => {
  //   setUsers(users.map((user) => (user._id === editingUser ? updatedUser : user)));
  //   setEditingUser(null);
  // };

  const handleUpdate = async () => {
    if (!editingUser) return;

    // Validation Rules
    const nameRegex = /^[A-Za-z]+ [A-Za-z]+$/; // Full name must have two words
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Valid email format
    const contactRegex = /^[0-9]{10}$/; // Exactly 10 digits, no alphabets

    // Destructuring updated user fields
    const { fullName, emailId, contactNumber } = updatedUser;

    // Perform Validations
    if (!nameRegex.test(fullName)) {
      alert(
        "Full Name should contain exactly two words (First and Last name)."
      );
      return;
    }

    if (!emailRegex.test(emailId)) {
      alert("Invalid Email format. Please enter a valid email.");
      return;
    }

    if (!contactRegex.test(contactNumber)) {
      alert(
        "Contact Number must be exactly 10 digits and contain only numbers."
      );
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:4001/api/auth/update-details/${editingUser}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUser),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update user.");
      }

      alert("User updated successfully!");

      setUsers(
        users.map((user) => (user._id === editingUser ? updatedUser : user))
      );
      setEditingUser(null);
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Error updating user. Please try again.");
    }
  };

  const handleCancel = () => {
    setEditingUser(null);
  };

  const filteredUsers = users.filter((user) => {
    if (!user.fullName || !user.emailId || !user.contactNumber) return false;
    
    const lowerCaseQuery = searchQuery.toLowerCase();
    const contactStr = String(user.contactNumber);
  
    return (
      user.fullName.toLowerCase().includes(lowerCaseQuery) ||
      user.emailId.toLowerCase().includes(lowerCaseQuery) ||
      contactStr.includes(searchQuery)
    );
  });
  
  console.log("Filtered Users:", filteredUsers);
  

  return (
    <div className="p-6">
      {/* Search Bar */}
      <div className="bg-white/80 backdrop-blur-md shadow-lg rounded-lg p-4 flex flex-col md:flex-row justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 md:mb-0">
          Users List
        </h2>
        <div className="relative w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search Users..."
            className="p-3 pl-10 border rounded-lg w-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FaSearch className="absolute left-3 top-4 text-gray-500" />
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white/80 backdrop-blur-md shadow-lg rounded-lg p-4 overflow-x-auto mt-4">
        <table className="w-full border-collapse hidden md:table">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="p-3 text-left">Profile</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr
                  key={user._id}
                  className="border-t transition hover:bg-gray-100"
                >
                  {editingUser === user._id ? (
                    <>
                      {/* Editable Inputs */}
                      <td className="p-3">
                        <img
                          src={user.profileImage}
                          alt="Profile"
                          className="w-10 h-10 rounded-full"
                        />
                      </td>
                      <td className="p-3">
                        <input
                          type="text"
                          value={updatedUser.fullName}
                          onChange={(e) =>
                            setUpdatedUser({
                              ...updatedUser,
                              fullName: e.target.value,
                            })
                          }
                          className="border p-2 w-full rounded"
                        />
                      </td>
                      <td className="p-3">
                        <input
                          type="email"
                          value={updatedUser.email}
                          onChange={(e) =>
                            setUpdatedUser({
                              ...updatedUser,
                              emailId: e.target.value,
                            })
                          }
                          className="border p-2 w-full rounded"
                        />
                      </td>
                      <td className="p-3">
                        <input
                          type="text"
                          value={updatedUser.contactNumber}
                          onChange={(e) =>
                            setUpdatedUser({
                              ...updatedUser,
                              contactNumber: e.target.value,
                            })
                          }
                          className="border p-2 w-full rounded"
                        />
                      </td>
                      <td className="p-3 flex gap-2 justify-center">
                        <button
                          onClick={handleUpdate}
                          className="flex items-center bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition duration-300"
                        >
                          <FaSave className="mr-2" /> Save
                        </button>
                        <button
                          onClick={handleCancel}
                          className="flex items-center bg-gray-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-600 transition duration-300"
                        >
                          <FaTimes className="mr-2" /> Cancel
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      {/* Displaying Data */}
                      <td className="p-3">
                        <img
                          src={user.profileImage}
                          alt="Profile"
                          className="w-10 h-10 rounded-full"
                        />
                      </td>
                      <td className="p-3 text-gray-800">{user.fullName}</td>
                      <td className="p-3 text-gray-600 break-all">
                        {user.emailId}
                      </td>
                      <td className="p-3">{user.contactNumber}</td>
                      <td className="p-3 flex gap-2 justify-center">
                        <button
                          onClick={() => handleEdit(user)}
                          className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
                        >
                          <FaEdit className="mr-2" /> Update
                        </button>
                        <button
                          onClick={() => handleDelete(user._id)}
                          className="flex items-center bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition duration-300"
                        >
                          <FaTrash className="mr-2" /> Delete
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="text-center p-3 text-gray-500 italic"
                >
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Mobile View */}
        <div className="md:hidden">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <div
                key={user._id}
                className="bg-white shadow-md rounded-lg p-4 mb-4"
              >
                <img
                  src={user.profileImage}
                  alt="Profile"
                  className="w-14 h-14 rounded-full mx-auto mb-2"
                />
                <p className="text-lg font-semibold text-gray-800">
                  {user.fullName}
                </p>
                <p className="text-gray-600 break-all">{user.emailId}</p>
                <p className="text-gray-500">{user.contactNumber}</p>
                <div className="flex flex-wrap text-center justify-between mt-4">
                  <button
                    onClick={() => handleEdit(user)}
                    className="flex justify-center items-center bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-300 w-full sm:w-auto"
                  >
                    <FaEdit className="mr-2" /> Update
                  </button>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="flex justify-center items-center bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition duration-300 w-full sm:w-auto"
                  >
                    <FaTrash className="mr-2" /> Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 italic">No users found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Users;
