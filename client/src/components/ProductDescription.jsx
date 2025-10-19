import React, { useState } from "react";

const ProductDescription = () => {
  const [activeTab, setActiveTab] = useState("description");

  const tabStyles = (tab) =>
    `px-4 py-2 text-sm font-medium border-b-2 transition-colors duration-200 ${
      activeTab === tab
        ? "border-secondary text-secondary"
        : "border-transparent text-gray-500 hover:text-secondary hover:border-secondary/60"
    }`;

  return (
    <div className="max-padd-container bg-white rounded-2xl shadow-sm p-6 max-w-5xl mx-auto">
      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-4 justify-center flex-wrap gap-2">
        <button
          onClick={() => setActiveTab("description")}
          className={tabStyles("description")}
        >
          Product Description
        </button>
        <button
          onClick={() => setActiveTab("color")}
          className={tabStyles("color")}
        >
          Color Guide
        </button>
        <button
          onClick={() => setActiveTab("size")}
          className={tabStyles("size")}
        >
          Size Guide
        </button>
      </div>

      {/* Content */}
      <div className="text-gray-700 text-sm leading-relaxed mt-4">
        {activeTab === "description" && (
          <div className="space-y-6">
            {/* Product Overview */}
            <div className="space-y-3">
              <p>
                Our products are crafted with premium materials, offering
                unmatched comfort and lasting durability. Whether you’re looking
                for something casual or refined, this piece complements any
                occasion with ease and elegance.
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Soft and breathable fabric for all-day comfort.</li>
                <li>Made from 100% sustainable and eco-friendly materials.</li>
                <li>Machine washable and fade-resistant for long-term use.</li>
                <li>
                  Designed to deliver a perfect blend of comfort and style.
                </li>
              </ul>
            </div>

            {/* Product Benefits */}
            <div className="pt-4 border-t border-gray-200">
              <h3 className="text-base font-semibold text-gray-800 mb-2">
                Product Benefits
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-secondary font-semibold">✔</span>
                  <span>
                    <strong>Comfort First:</strong> Crafted with ultra-soft
                    materials that feel gentle against your skin.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary font-semibold">✔</span>
                  <span>
                    <strong>Eco-Conscious:</strong> Made using ethical
                    production methods and recyclable packaging.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary font-semibold">✔</span>
                  <span>
                    <strong>Breathable Design:</strong> Keeps you cool and
                    comfortable in every season.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary font-semibold">✔</span>
                  <span>
                    <strong>Long-Lasting Quality:</strong> Designed to maintain
                    its shape and color after every wash.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === "color" && (
          <div className="space-y-3">
            <p>
              The color of your item may vary slightly depending on your screen
              brightness and display settings. Below is a quick guide to help
              you understand our color references:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                <span className="font-semibold">Classic Black:</span> Timeless
                and versatile, suitable for any outfit.
              </li>
              <li>
                <span className="font-semibold">Ivory White:</span> Clean and
                elegant, pairs well with soft tones.
              </li>
              <li>
                <span className="font-semibold">Ocean Blue:</span> Calm and
                refreshing, inspired by coastal living.
              </li>
              <li>
                <span className="font-semibold">Forest Green:</span> A rich tone
                for natural and earthy looks.
              </li>
            </ul>
            <p className="text-xs text-gray-500 italic">
              *Tip: Lighting conditions may cause slight color differences in
              product images.
            </p>
          </div>
        )}

        {activeTab === "size" && (
          <div className="space-y-4">
            <p>
              Use the following chart as a reference to find your perfect fit.
              Measurements are approximate and can vary slightly between styles.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-gray-200 rounded-lg">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="p-2 border">Size</th>
                    <th className="p-2 border">Chest (in)</th>
                    <th className="p-2 border">Waist (in)</th>
                    <th className="p-2 border">Length (in)</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600">
                  <tr>
                    <td className="p-2 border text-center">S</td>
                    <td className="p-2 border text-center">34–36</td>
                    <td className="p-2 border text-center">28–30</td>
                    <td className="p-2 border text-center">26</td>
                  </tr>
                  <tr>
                    <td className="p-2 border text-center">M</td>
                    <td className="p-2 border text-center">38–40</td>
                    <td className="p-2 border text-center">32–34</td>
                    <td className="p-2 border text-center">27</td>
                  </tr>
                  <tr>
                    <td className="p-2 border text-center">L</td>
                    <td className="p-2 border text-center">42–44</td>
                    <td className="p-2 border text-center">36–38</td>
                    <td className="p-2 border text-center">28</td>
                  </tr>
                  <tr>
                    <td className="p-2 border text-center">XL</td>
                    <td className="p-2 border text-center">46–48</td>
                    <td className="p-2 border text-center">40–42</td>
                    <td className="p-2 border text-center">29</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-500 italic">
              *If you’re between sizes, we recommend choosing the larger size
              for a relaxed fit.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDescription;
