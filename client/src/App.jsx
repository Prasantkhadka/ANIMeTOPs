import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header.jsx";
import Home from "./pages/Home.jsx";
import Collection from "./pages/Collection.jsx";
import CategoryCollection from "./pages/CategoryCollection.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import Footer from "./components/Footer.jsx";
import Testimonial from "./pages/Testimonial.jsx";
import Contact from "./pages/Contact.jsx";
import Cart from "./pages/Cart.jsx";
import MyOrders from "./pages/MyOrders.jsx";
import PlaceOrder from "./pages/PlaceOrder.jsx";
import Login from "./components/Login.jsx";
import { useContext } from "react";
import { ShopContext } from "./context/ShopContext.jsx";
import { Toaster } from "react-hot-toast";
import AdminLogin from "./components/admin/AdminLogin.jsx";
import Sidebar from "./components/admin/Sidebar.jsx";
import AddProduct from "./pages/admin/AddProduct.jsx";
import ListProduct from "./pages/admin/ListProduct.jsx";
import Orders from "./pages/admin/Orders.jsx";

export default function App() {
  const { showUserLogin, isAdmin } = useContext(ShopContext);
  const location = useLocation();
  const isAdminPath = location.pathname.includes("admin");

  return (
    <main className="overflow-hidden text-tertiary">
      {showUserLogin && <Login />}
      {!isAdminPath && <Header />}

      <Toaster position="bottom-right" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/collection/:category" element={<CategoryCollection />} />
        <Route path="/collection/:category/:id" element={<ProductDetails />} />
        <Route path="/testimonials" element={<Testimonial />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/admin" element={isAdmin ? <Sidebar /> : <AdminLogin />}>
          <Route index element={isAdmin ? <AddProduct /> : null} />
          <Route path="list-product" element={<ListProduct />} />
          <Route path="orders" element={<Orders />} />
        </Route>
      </Routes>
      {!isAdminPath && <Footer />}
    </main>
  );
}
