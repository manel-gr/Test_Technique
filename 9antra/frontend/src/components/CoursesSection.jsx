import React, { useState, useEffect } from "react";
import axios from 'axios';

const Button = ({ children, className, ...props }) => (
  <button className={`px-4 py-2 rounded-md ${className}`} {...props}>
    {children}
  </button>
);

const Card = ({ children, className, ...props }) => (
  <div
    className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}
    {...props}
  >
    {children}
  </div>
);

function CoursesSection() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/courses');
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="flex items-center justify-between p-8 mb-8">
        <h2 className="text-3xl text-black font-bold">Discover Our Courses</h2>
        <button className="btn bg-custom-pink border-none rounded-full py-2 px-10 hover:bg-pink-700 text-white">
          View More
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Card key={course._id}>
            <div className="relative h-48 w-full">
              <img
                src={`http://localhost:5000/uploads/${course.image}`}
                alt={course.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-xl text-black font-bold mb-2">{course.title}</h3>
              <p className="text-rose-600 font-semibold">{course.price} DT/Month</p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}

export default CoursesSection;

