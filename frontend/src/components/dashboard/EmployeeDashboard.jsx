import Navbar from "../common/Navbar";
import Sidebar from "../common/Sidebar";

export default function EmployeeDashboard() {
  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="p-6">
          <h1 className="text-2xl font-bold">Employee Dashboard</h1>
        </main>
      </div>
    </>
  );
}
