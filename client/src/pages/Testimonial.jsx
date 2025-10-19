import React, { useContext, useState } from "react";
import Title from "../components/Title.jsx";
import { testimonials } from "../assets/data.js";
import { FaStar } from "react-icons/fa";
import { ShopContext } from "../context/ShopContext.jsx";

const Testimonial = () => {
  const { user } = useContext(ShopContext);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!feedback.trim() || rating === 0)
      return alert("Please rate and add feedback.");
    // Later you can send this to backend:
    // await postReview({ name: user.name, rating, feedback, date: new Date() });
    setSubmitted(true);
    setFeedback("");
    setRating(0);
  };

  return (
    <section className="max-padd-container py-16 pt-28 bg-primary">
      <Title
        title1={"People"}
        title2={"Says"}
        titleStyles={"pb-10"}
        para={
          "Real stories from our happy customers sharing their experience, style inspiration, and trusted on what they love."
        }
      />

      {/* Display Existing Testimonials */}
      <div className="flex flex-wrap gap-6 pb-12 justify-center">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-white w-full max-w-[422px] space-y-4 p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 text-gray-700 rounded-2xl"
          >
            <div className="flex justify-between items-center">
              <div className="flex gap-1">
                {[...Array(5)].map((_, starIndex) => (
                  <FaStar
                    key={starIndex}
                    className={`${
                      starIndex < 5 ? "text-[#ff532e]" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <p className="text-xs text-gray-500">{testimonial.date}</p>
            </div>

            <p className="text-sm leading-relaxed">{testimonial.feedback}</p>

            <div className="flex items-center gap-3">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="h-10 w-10 rounded-full object-cover"
              />
              <p className="font-medium text-gray-800">{testimonial.name}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Conditional Review Form */}
      {user ? (
        <div className="max-w-lg mx-auto bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-3 text-gray-800">
            Share Your Experience
          </h3>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Rating stars */}
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((num) => (
                  <FaStar
                    key={num}
                    onClick={() => setRating(num)}
                    className={`cursor-pointer text-2xl ${
                      num <= rating ? "text-[#ff532e]" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>

              <textarea
                className="w-full border border-gray-300 rounded-lg p-3 text-sm outline-none focus:ring-2 focus:ring-[#ff532e]"
                rows="4"
                placeholder="Share your feedback..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              />

              <button
                type="submit"
                className="bg-[#ff532e] hover:bg-[#e24b27] text-white py-2 px-6 rounded-lg text-sm font-medium transition-colors duration-200"
              >
                Submit Review
              </button>
            </form>
          ) : (
            <p className="text-green-600 font-medium">
              ✅ Thank you for sharing your experience!
            </p>
          )}
        </div>
      ) : (
        <p className="text-center text-gray-600 mt-6">
          🔒 Please log in to share your experience.
        </p>
      )}
    </section>
  );
};

export default Testimonial;
