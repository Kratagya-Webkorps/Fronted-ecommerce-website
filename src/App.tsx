import { Route, Routes } from "react-router-dom";
import LoginForm from "./components/_auth/forms/LoginForm";
import SignupForm from "./components/_auth/forms/SignupForm";
import Navbar from "./components/layout/Navbar";
import AddProduct from "./components/_root/pages/admin/AddProducts";
import CategorisedProduct from "./components/layout/CategorisedProduct";
import ProductList from "./components/_root/pages/productFields/ProductList";
import SingleProductView from "./components/_root/pages/productFields/SingleProductView";
import MainLayout from "./components/layout/MainLayout";
import Cart from "./components/_root/pages/productFields/Cart";
import Wishlist from "./components/_root/pages/productFields/Wishlist";
import NotFound from "./components/utils/NotFound";
import UserProfile from "./components/layout/UserProfile";
import EditProfile from "./components/layout/EditProfile";

function App() {
  return (
    <main className="h-screen">
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginForm role="user" />} />
        <Route path="/login-admin" element={<LoginForm role="admin" />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route element={<MainLayout />}>
          <Route path="/" element={<ProductList />} />
          <Route path="/products/:category/:productId" element={<SingleProductView />} />
          <Route path="/addproducts" element={<AddProduct />} />
          <Route path="/laptops" element={<CategorisedProduct category="laptop" />} />
          <Route path="/accessories" element={<CategorisedProduct category="accessories" />} />
          <Route path="/tvs" element={<CategorisedProduct category="tv" />} />
          <Route path="/mobiles" element={<CategorisedProduct category="phone" />} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/wishlist" element={<Wishlist/>} />
          <Route path="/:username" element={<UserProfile/>} />
          <Route path="/:username/editProfile" element={<EditProfile/>} />
          <Route path="*" element={<NotFound/>} />
        </Route>
      </Routes>
    </main>
  );
}

export default App;
