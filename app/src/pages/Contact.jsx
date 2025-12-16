import React from "react";

import img from "../assets/logo.png"; // Replace with your image

function Contact() {
  return (
    <div className="min-h-screen shadow-2xl flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl w-full flex flex-col lg:flex-row items-stretch gap-8">
        {/* Left: Form */}
        <div className="flex-1  p-8 rounded-lg shadow-lg ">
          <h2 className="text-4xl font-bold mb-4">Contact Sales</h2>
          <p className="mb-6 text-black">
            Fill out the form and our team will get back to you shortly.
          </p>

          <form className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="First Name"
                className="w-full px-3 py-2 rounded-md  placeholder-gray-800 ring-green-800 border-green-200  focus:outline-none focus:ring-2 focus:ring-green-950"
              />
              <input
                type="text"
                placeholder="Last Name"
                className="w-full px-3 py-2 rounded-md  placeholder-gray-800 ring-green-800 border-green-200  focus:outline-none focus:ring-2 focus:ring-green-950"
              />
            </div>
            <input
              type="text"
              placeholder="Company"
              className="w-full px-3 py-2 rounded-md  placeholder-gray-800 ring-green-800 border-green-200  focus:outline-none focus:ring-2 focus:ring-green-950"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full px-3 py-2 rounded-md  placeholder-gray-800 ring-green-800 border-green-200  focus:outline-none focus:ring-2 focus:ring-green-950"
            />
            <input
              type="text"
              placeholder="Phone Number"
              className="w-full px-3 py-2 rounded-md  placeholder-gray-800 ring-green-800 border-green-200  focus:outline-none focus:ring-2 focus:ring-green-950"
            />
            <textarea
              rows="4"
              placeholder="Message"
              className="w-full px-3 py-2 rounded-md  placeholder-gray-800 ring-green-800 border-green-800  focus:outline-none focus:ring-2 focus:ring-green-950"
            />
            <div className="flex items-center gap-2">
              <input type="checkbox" className="h-4 w-4 accent-indigo-500" />
              <label className="text-gray-400 text-sm">
                I agree to the{" "}
                <a href="#" className="text-green-800 underline">
                  privacy policy
                </a>
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-[#006400] hover:bg-green-800 text-white font-semibold py-2 px-4 rounded-md shadow"
            >
              Submit
            </button>
          </form>
        </div>

        {/* Right: Image */}
        <div className="flex-1">
          <img
            src={img}
            alt="Contact Illustration"
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}

export default Contact;
