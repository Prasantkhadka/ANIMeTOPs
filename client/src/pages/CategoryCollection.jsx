import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Title from "../components/Title.jsx";
import { ShopContext } from "../context/ShopContext.jsx";
import Item from "../components/Item.jsx";

const CategoryCollection = () => {
  const { category } = useParams(); // category from the URL (e.g. /category/Hoodies)
  const { products } = useContext(ShopContext);
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    if (products.length > 0) {
      const filtered = products.filter(
        (product) =>
          product.category?.toLowerCase() === category.toLowerCase() &&
          product.inStock
      );
      setCategoryProducts(filtered);
      setCurrentPage(1);
    }
  }, [category, products]);

  const totalPages = Math.ceil(categoryProducts.length / itemsPerPage);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  return (
    <section className="max-padd-container py-16 pt-28 bg-primary">
      <Title
        title1={category}
        title2={"Collection"}
        titleStyles={"pb-10 capitalize"}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {categoryProducts.length > 0 ? (
          categoryProducts
            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
            .map((product) => <Item key={product._id} product={product} />)
        ) : (
          <p className="h4 text-center col-span-full text-red-500">
            No products found in this category.
          </p>
        )}
      </div>

      {/* Pagination */}
      <div className="flexCenter flex-wrap gap-2 sm:gap-4 mt-14 mb-10">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`${
            currentPage === 1 && "opacity-50 cursor-not-allowed"
          } btn-dark !py-1 !px-3 mr-2`}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            onClick={() => setCurrentPage(index + 1)}
            key={index + 1}
            className={`${
              currentPage === index + 1 && "!bg-tertiary !text-white"
            } btn-white !py-1 !px-3`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage === totalPages}
          className={`${
            currentPage === totalPages && "opacity-50 cursor-not-allowed"
          } btn-dark !py-1 !px-3`}
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default CategoryCollection;
