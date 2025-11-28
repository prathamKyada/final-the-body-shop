// import { useState } from "react";
// import { FaTrash, FaEdit, FaSearch } from "react-icons/fa";

// const ContactUs = ({ contacts, setContacts }) => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [editingContact, setEditingContact] = useState(null);
//   const [editedData, setEditedData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     message: "",
//   });

//   // Handle Search Filter
//   const filteredContacts = contacts.filter((contact) => {
//     const query = searchQuery.toLowerCase();
//     return (
//       contact.firstName.toLowerCase().includes(query) ||
//       contact.lastName.toLowerCase().includes(query) ||
//       contact.email.toLowerCase().includes(query) ||
//       contact.message.toLowerCase().includes(query)
//     );
//   });

//   // Delete Contact
//   const handleDelete = (id) => {
//     setContacts(contacts.filter((contact) => contact._id !== id));
//   };

//   // Open Edit Mode
//   const handleEdit = (contact) => {
//     setEditingContact(contact._id);
//     setEditedData({
//       firstName: contact.firstName,
//       lastName: contact.lastName,
//       email: contact.email,
//       message: contact.message,
//     });
//   };

//   // Handle Input Change
//   const handleChange = (e) => {
//     setEditedData({ ...editedData, [e.target.name]: e.target.value });
//   };

//   // Save Updated Contact
//   const handleSave = () => {
//     setContacts(
//       contacts.map((contact) =>
//         contact._id === editingContact ? { ...contact, ...editedData } : contact
//       )
//     );
//     setEditingContact(null);
//   };

//   return (
//     <div className="p-6">
//       {/* Search Bar */}
//       <div className="bg-white/80 backdrop-blur-md shadow-lg rounded-lg p-4 flex flex-col md:flex-row justify-between items-center">
//         <h2 className="text-xl font-semibold text-gray-800 mb-4 md:mb-0">Contact Us Messages</h2>
//         <div className="relative w-full md:w-1/3">
//           <input
//             type="text"
//             placeholder="Search Messages..."
//             className="p-3 pl-10 border rounded-lg w-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//           <FaSearch className="absolute left-3 top-4 text-gray-500" />
//         </div>
//       </div>

//       {/* Contacts List */}
//       <div className="grid grid-cols-1 mt-4 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredContacts.length > 0 ? (
//           filteredContacts.map((contact) => (
//             <div
//               key={contact._id}
//               className="bg-white shadow-lg rounded-lg p-6 transition duration-300 hover:shadow-xl flex flex-col justify-between"
//             >
//               {editingContact === contact._id ? (
//                 <>
//                   {/* Edit Form */}
//                   <input
//                     type="text"
//                     name="firstName"
//                     value={editedData.firstName}
//                     onChange={handleChange}
//                     className="w-full p-2 border rounded mb-2"
//                   />
//                   <input
//                     type="text"
//                     name="lastName"
//                     value={editedData.lastName}
//                     onChange={handleChange}
//                     className="w-full p-2 border rounded mb-2"
//                   />
//                   <input
//                     type="email"
//                     name="email"
//                     value={editedData.email}
//                     onChange={handleChange}
//                     className="w-full p-2 border rounded mb-2"
//                   />
//                   <textarea
//                     name="message"
//                     value={editedData.message}
//                     onChange={handleChange}
//                     className="w-full p-2 border rounded mb-2"
//                   ></textarea>
//                   {/* Save Button */}
//                   <button
//                     onClick={handleSave}
//                     className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition duration-300 w-full"
//                   >
//                     Save
//                   </button>
//                 </>
//               ) : (
//                 <>
//                   {/* Contact Details */}
//                   <h3 className="font-semibold text-lg text-gray-800">
//                     {contact.firstName} {contact.lastName}
//                   </h3>
//                   <h6 className="text-gray-500 break-all text-sm">{contact.email}</h6>
//                   <p className="text-gray-600 text-sm mt-4">{contact.message}</p>

//                   {/* Action Buttons */}
//                   <div className="flex flex-wrap justify-between mt-4">
//                     <button
//                       className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-300 w-full sm:w-auto mb-2 sm:mb-0"
//                       onClick={() => handleEdit(contact)}
//                     >
//                       <FaEdit className="mr-2" /> Update
//                     </button>
//                     <button
//                       className="flex items-center bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition duration-300 w-full sm:w-auto"
//                       onClick={() => handleDelete(contact._id)}
//                     >
//                       <FaTrash className="mr-2" /> Delete
//                     </button>
//                   </div>
//                 </>
//               )}
//             </div>
//           ))
//         ) : (
//           <p className="text-center col-span-full text-gray-500">No messages found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ContactUs;




import { useState } from "react";
import { FaTrash, FaEdit, FaSearch } from "react-icons/fa";

const ContactUs = ({ contacts, setContacts }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [editingContact, setEditingContact] = useState(null);
  const [editedData, setEditedData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  // Handle Search Filter
  const filteredContacts = contacts.filter((contact) => {
    const query = searchQuery.toLowerCase();
    return (
      contact.firstName.toLowerCase().includes(query) ||
      contact.lastName.toLowerCase().includes(query) ||
      contact.email.toLowerCase().includes(query) ||
      contact.message.toLowerCase().includes(query)
    );
  });

  // Delete Contact with Confirmation
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this contact?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:4001/api/contact-us/delete-contact/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setContacts(contacts.filter((contact) => contact._id !== id));
      } else {
        alert("Failed to delete contact.");
      }
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  // Open Edit Mode
  const handleEdit = (contact) => {
    setEditingContact(contact._id);
    setEditedData({
      firstName: contact.firstName,
      lastName: contact.lastName,
      email: contact.email,
      message: contact.message,
    });
  };

  // Handle Input Change
  const handleChange = (e) => {
    setEditedData({ ...editedData, [e.target.name]: e.target.value });
  };

  // Save Updated Contact with API
  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:4001/api/contact-us/update-contact/${editingContact}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editedData),
      });

      console.log("id > ", editingContact)
      if (response.ok) {
        setContacts(
          contacts.map((contact) =>
            contact._id === editingContact ? { ...contact, ...editedData } : contact
          )
        );
        setEditingContact(null);
      } else {
        alert("Failed to update contact.");
      }
    } catch (error) {
      console.error("Error updating contact:", error);
    }
  };

  return (
    <div className="p-6">
      {/* Search Bar */}
      <div className="bg-white/80 backdrop-blur-md shadow-lg rounded-lg p-4 flex flex-col md:flex-row justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 md:mb-0">Contact Us Messages</h2>
        <div className="relative w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search Messages..."
            className="p-3 pl-10 border rounded-lg w-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FaSearch className="absolute left-3 top-4 text-gray-500" />
        </div>
      </div>

      {/* Contacts List */}
      <div className="grid grid-cols-1 mt-4 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredContacts.length > 0 ? (
          filteredContacts.map((contact) => (
            <div
              key={contact._id}
              className="bg-white shadow-lg rounded-lg p-6 transition duration-300 hover:shadow-xl flex flex-col justify-between"
            >
              {editingContact === contact._id ? (
                <>
                  {/* Edit Form */}
                  <input
                    type="text"
                    name="firstName"
                    value={editedData.firstName}
                    onChange={handleChange}
                    className="w-full p-2 border rounded mb-2"
                  />
                  <input
                    type="text"
                    name="lastName"
                    value={editedData.lastName}
                    onChange={handleChange}
                    className="w-full p-2 border rounded mb-2"
                  />
                  <input
                    type="email"
                    name="email"
                    value={editedData.email}
                    onChange={handleChange}
                    className="w-full p-2 border rounded mb-2"
                  />
                  <textarea
                    name="message"
                    value={editedData.message}
                    onChange={handleChange}
                    className="w-full p-2 border rounded mb-2"
                  ></textarea>
                  {/* Save Button */}
                  <button
                    onClick={handleSave}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition duration-300 w-full"
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  {/* Contact Details */}
                  <h3 className="font-semibold text-lg text-gray-800">
                    {contact.firstName} {contact.lastName}
                  </h3>
                  <h6 className="text-gray-500 break-all text-sm">{contact.email}</h6>
                  <p className="text-gray-600 text-sm mt-4">{contact.message}</p>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap justify-between mt-4">
                    <button
                      className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-300 w-full sm:w-auto mb-2 sm:mb-0"
                      onClick={() => handleEdit(contact)}
                    >
                      <FaEdit className="mr-2" /> Update
                    </button>
                    <button
                      className="flex items-center bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition duration-300 w-full sm:w-auto"
                      onClick={() => handleDelete(contact._id)}
                    >
                      <FaTrash className="mr-2" /> Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">No messages found.</p>
        )}
      </div>
    </div>
  );
};

export default ContactUs;
