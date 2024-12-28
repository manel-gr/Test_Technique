import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { DeleteDialog } from '../components/delete-dialog';

function AdminDashboard() {
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    image: null,
  });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/courses");
      setCourses(response.data);
    } catch (err) {
      console.error("Error fetching courses:", err);
      setError("Failed to fetch courses. Please try again.");
    }
  };

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    const data = new FormData();
    data.append("title", formData.title);
    data.append("price", formData.price);
    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/api/courses/${editingId}`, data);
        setSuccessMessage("Course updated successfully!");
      } else {
        await axios.post("http://localhost:5000/api/courses", data);
        setSuccessMessage("Course created successfully!");
      }
      fetchCourses();
      setFormData({ title: "", price: "", image: null });
      setEditingId(null);
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      console.error(
        "Error submitting form:",
        err.response ? err.response.data : err.message
      );
      setError(
        `Failed to submit form. Error: ${
          err.response ? err.response.data.message : err.message
        }`
      );
    }
  };

  const handleEdit = (course) => {
    setFormData({ title: course.title, price: course.price, image: null });
    setEditingId(course._id);
  };

  const handleDelete = (id) => {
    setCourseToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/courses/${courseToDelete}`);
      fetchCourses();
      setSuccessMessage("Course deleted successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      console.error("Error deleting course:", err);
      setError("Failed to delete course. Please try again.");
    } finally {
      setIsDeleteDialogOpen(false);
      setCourseToDelete(null);
    }
  };

  return (
    <>
      <div className="navbar border-b-2 bg-white p-2">
        <div className="navbar-start">
          <Link to="/">
            <img src="/LogoBridge.png" alt="Logo" className="cursor-pointer" />
          </Link>
        </div>

        <div className="navbar-end">
          <Link to="/">
            <button className="btn bg-custom-pink border-none rounded-full px-10 hover:bg-pink-700 text-white">
              Logout
            </button>
          </Link>
        </div>
      </div>
      <div className="bg-white mx-auto p-8">
        <h1 className="text-3xl font-bold text-black px-10 mb-8">
          Courses Management
        </h1>
        <form onSubmit={handleSubmit} className="container px-10 mb-8">
          <div className="mb-4">
            <label htmlFor="title" className="block text-black font-bold mb-2">
              Course Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 bg-white text-black font-semibold py-2 border rounded"
              placeholder="Add Course Title"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block font-bold text-black mb-2">
              Price DT/Month
            </label>
            <input
              type="text"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-white text-black font-semibold border rounded"
              placeholder="Add Price"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="block font-bold text-black mb-2">
              Course Image
            </label>
            <div className="relative">
              <label
                htmlFor="image"
                className="absolute left-2 top-1/2 -translate-y-1/2 text-pink-700 border-pink-700 border-2 px-4 py-1 cursor-pointer"
              >
                Choose Image
              </label>
              <input
                type="text"
                readOnly
                value={formData.image ? formData.image.name : ""}
                className="w-full px-3 py-2 pl-36 bg-white border rounded cursor-default"
                placeholder="No file chosen"
              />
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleChange}
                className="hidden"
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-custom-pink border-none rounded-full px-10 hover:bg-pink-700 text-white py-2 font-semibold"
          >
            {editingId ? "Update Course" : "Add New Course"}
          </button>
          {successMessage && (
            <div className="mt-4 p-2 bg-green-100 text-green-700 rounded">
              {successMessage}
            </div>
          )}
        </form>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 px-10 gap-6">
          {courses.map((course) => (
            <div key={course._id} className="bg-white rounded-lg shadow-lg overflow-hidden p-4">
              <img
                src={`http://localhost:5000/uploads/${course.image}`}
                alt={course.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h2 className="text-xl text-black font-bold">{course.title}</h2>
              <p className="text-pink-500 font-bold mb-4">
                {course.price} DT/Month
              </p>
              <button
                onClick={() => handleEdit(course)}
                className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(course._id)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
        <DeleteDialog
          isOpen={isDeleteDialogOpen}
          onClose={() => setIsDeleteDialogOpen(false)}
          onConfirm={confirmDelete}
        />
      </div>
    </>
  );
}

export default AdminDashboard;

