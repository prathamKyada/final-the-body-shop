import { FaUsers, FaAddressBook } from "react-icons/fa";

const Dashboard = ({ users, contacts }) => {
  const lastMonthUsers = 3;
  const lastMonthContacts = 1;

  const userGrowth = ((users.length - lastMonthUsers) / lastMonthUsers) * 100;
  const contactGrowth = ((contacts.length - lastMonthContacts) / lastMonthContacts) * 100;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6">
      {/* Total Users Box */}
      <div className="bg-white shadow-md p-6 rounded-lg flex items-center justify-between transition-transform transform hover:scale-105">
        <div>
          <h3 className="text-lg font-semibold text-gray-700">Total Users</h3>
          <p className="text-3xl font-bold text-gray-900">{users.length}</p>
          <p className={`text-sm font-medium ${userGrowth >= 0 ? "text-green-500" : "text-red-500"}`}>
            {userGrowth >= 0 ? `▲ ${userGrowth.toFixed(1)}%` : `▼ ${Math.abs(userGrowth).toFixed(1)}%`} since last month
          </p>
        </div>
        <FaUsers className="text-5xl text-blue-500" />
      </div>

      {/* Total Contacts Box */}
      <div className="bg-white shadow-md p-6 rounded-lg flex items-center justify-between transition-transform transform hover:scale-105">
        <div>
          <h3 className="text-lg font-semibold text-gray-700">Total Contacts</h3>
          <p className="text-3xl font-bold text-gray-900">{contacts.length}</p>
          <p className={`text-sm font-medium ${contactGrowth >= 0 ? "text-green-500" : "text-red-500"}`}>
            {contactGrowth >= 0 ? `▲ ${contactGrowth.toFixed(1)}%` : `▼ ${Math.abs(contactGrowth).toFixed(1)}%`} since last month
          </p>
        </div>
        <FaAddressBook className="text-5xl text-yellow-500" />
      </div>
    </div>
  );
};

export default Dashboard;
