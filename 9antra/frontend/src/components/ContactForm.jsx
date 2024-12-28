import React, { useState } from "react";

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <div className="bg-[#FDB347]  rounded-[40px]  p-8">
        <h2 className="text-center text-black text-2xl font-bold mb-6">
          Contact Us
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 text-black">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-sm font-semibold uppercase">
              NAME
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Jiara Martins"
              className="p-3 rounded-full bg-[#FEE7CE] border-none outline-none placeholder-gray-500"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-semibold uppercase">
              EMAIL
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="hello@reallygreatsite.com"
              className="p-3 rounded-full bg-[#FEE7CE] border-none outline-none placeholder-gray-500"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="message"
              className="text-sm font-semibold uppercase"
            >
              MESSAGE
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Write your message here"
              rows="4"
              className="p-2 rounded-2xl bg-[#FEE7CE] border-none outline-none placeholder-gray-500 resize-none"
            />
          </div>

          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="bg-[#B4325C] text-white px-6 py-2  hover:bg-[#963050] transition-colors"
            >
              Send the message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ContactForm;
