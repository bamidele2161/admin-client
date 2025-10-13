import React from "react";
import Navbar from "../../../components/Navbar/Navbar";
import ActivityLogsTable from "../../../components/AdminComponent/activity/ActivityLogsTable";

const ActivityLogsManagement: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        title="Activity Logs"
        subtitle="Monitor system activities and audit trail"
      />

      <div className="p-6">
        {/* Activity Logs Table Section */}
        <section>
          <ActivityLogsTable />
        </section>
      </div>
    </div>
  );
};

export default ActivityLogsManagement;