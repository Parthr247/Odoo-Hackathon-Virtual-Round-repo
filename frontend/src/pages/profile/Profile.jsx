import { useContext, useState } from "react";
import Navbar from "../../components/common/Navbar";
import Sidebar from "../../components/common/Sidebar";
import { AuthContext } from "../../context/AuthContext";
import "./Profile.css";

const Profile = () => {
  const { user } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: user.name || "",
    email: user.email || "",
    department: user.department || "",
    designation: user.designation || "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // API call will go here
      // await updateProfile(formData);

      setMessage("Profile updated successfully");
    } catch (err) {
      setMessage("Failed to update profile");
    }
  };

  return (
    <div className="profile-container">
      <Navbar />

      <div className="profile-body">
        <Sidebar />

        <main className="profile-content">
          <h1>My Profile</h1>
          <p className="profile-subtitle">
            View and update your personal information
          </p>

          <form className="profile-form" onSubmit={handleSubmit}>
            {message && <p className="profile-message">{message}</p>}

            <div className="profile-field">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="profile-field">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                disabled
              />
            </div>

            <div className="profile-field">
              <label>Department</label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
              />
            </div>

            <div className="profile-field">
              <label>Designation</label>
              <input
                type="text"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
              />
            </div>

            <button type="submit">Save Changes</button>
          </form>
        </main>
      </div>
    </div>
  );
};

export default Profile;
