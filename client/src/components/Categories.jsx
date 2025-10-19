import React from "react";
import Title from "./Title.jsx";
import { categories } from "../assets/data.js";
import { Link } from "react-router-dom";

const Categories = () => {
  return (
    <section className="max-padd-container pt-16">
      <Title
        title1={"Category"}
        title2={"List"}
        titleStyles={"pb-10"}
        paraStyles={"hidden"}
      />

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
        {/* Categories List */}
        {categories.map((category) => (
          <Link
            key={category.name}
            to={`/collection/${category.name.toLowerCase()}`}
            className="flexCenter flex-col cursor-pointer group"
          >
            <div className="bg-primary group-hover:bg-primaryDeep transition-colors duration-300 rounded-lg overflow-hidden">
              <img
                src={category.image}
                alt={category.name}
                height={201}
                width={201}
                className="object-cover"
              />
            </div>
            <h5 className="h5 uppercase mt-6 text-center">{category.name}</h5>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Categories;
