import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

function Dashboard() {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({
    courseName: "",
    courseDescription: "",
    instructor: "",
  });

  const navigate = useNavigate();

  const fetchCourses = async () => {
    const { data } = await API.get("/courses");
    setCourses(data);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    await API.post("/courses", form);
    fetchCourses();
  };

  const handleDelete = async (id) => {
    await API.delete(`/courses/${id}`);
    fetchCourses();
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <button onClick={logout}>Logout</button>

      <h3>Create Course</h3>
      <form onSubmit={handleCreate}>
        <input
          placeholder="Course Name"
          onChange={(e) =>
            setForm({ ...form, courseName: e.target.value })
          }
        />
        <br />
        <input
          placeholder="Description"
          onChange={(e) =>
            setForm({ ...form, courseDescription: e.target.value })
          }
        />
        <br />
        <input
          placeholder="Instructor"
          onChange={(e) =>
            setForm({ ...form, instructor: e.target.value })
          }
        />
        <br />
        <button type="submit">Add Course</button>
      </form>

      <h3>All Courses</h3>
      {courses.map((course) => (
        <div key={course._id}>
          <p>
            {course.courseName} - {course.instructor}
          </p>
          <button onClick={() => handleDelete(course._id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;