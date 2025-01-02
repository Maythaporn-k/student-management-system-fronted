export default function HomePage() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold text-gray-800 mb-4">
        Welcome to the Student Dashboard
      </h2>
      <p className="text-gray-600">
        This is your home dashboard where you can manage your data, view
        reports, and access key insights.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="bg-blue-50 p-4 rounded-lg border">
          <h3 className="text-lg font-medium text-blue-700">Reports</h3>
          <p className="text-sm text-gray-600 mt-2">
            View detailed reports and analytics for your account.
          </p>
        </div>

        <div className="bg-green-50 p-4 rounded-lg border">
          <h3 className="text-lg font-medium text-green-700">Tasks</h3>
          <p className="text-sm text-gray-600 mt-2">
            Manage your tasks and stay productive.
          </p>
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg border">
          <h3 className="text-lg font-medium text-yellow-700">Settings</h3>
          <p className="text-sm text-gray-600 mt-2">
            Update your preferences and account settings.
          </p>
        </div>
      </div>
    </div>
  );
}
