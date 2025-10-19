import React, { useEffect } from "react";
import Title from "../components/Title.jsx";
import { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext.jsx";
import Item from "../components/Item.jsx";

const Collection = () => {
  const { products, searchQuery } = useContext(ShopContext);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    if (searchQuery.length > 0) {
      setFilteredProducts(
        products.filter((product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredProducts(products);
    }
    setCurrentPage(1); // Reset to first page on new search
  }, [products, searchQuery]);

  const totalPages = Math.ceil(
    filteredProducts.filter((product) => product.inStock).length / itemsPerPage
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  return (
    <section className="max-padd-container py-16 pt-28 bg-primary">
      <Title title1={"All"} title2={"Products"} titleStyles={"pb-10"} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts
            .filter((product) => product.inStock)
            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
            .map((product) => <Item key={product._id} product={product} />)
        ) : (
          <p className=" h4 text-center col-span-full text-red-500">
            No products found.
          </p>
        )}
      </div>
      {/* Pagination Controls */}
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

export default Collection;
