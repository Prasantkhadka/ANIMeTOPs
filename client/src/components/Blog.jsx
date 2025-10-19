import React from "react";
import Title from "./Title.jsx";
import { blogs } from "../assets/data.js";

const Blog = () => {
  return (
    <section className="max-padd-container py-16">
      <Title
        title1={"Our Expert"}
        title2={"Blog"}
        titleStyles={"pb-10"}
        para={
          "Whether you’re a die-hard fan or a casual anime lover, our blog is your go-to space for fashion inspiration, styling ideas, and updates from the anime streetwear community. Let’s celebrate your favorite characters — in style."
        }
      />
      {/* Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {blogs.map((blog) => (
          <div
            key={blog.title}
            className="border-[11px] border-primary overflow-hidden relative"
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="object-cover w-full h-full hover:scale-110 transition-all duration-300"
            />
            {/*overlay*/}
            <div className="absolute top-0 left-0 w-full h-full bg-black/40">
              {/*info*/}
              <div className="absolute bottom-4 left-4 text-white text-[15px]">
                <h3 className="font-[600] text-[16px] pr-4 leading-5">
                  {blog.title}
                </h3>
                <h4 className="medium-14 pb-3 pt-1 text-white/80">
                  {blog.category}
                </h4>
                <button className="bg-white/30 py-0.5 p-5 medium-14">
                  continue reading
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Blog;
