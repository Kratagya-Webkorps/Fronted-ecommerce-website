import { Route, Routes } from "react-router-dom";
import LoginForm from "./components/_auth/forms/LoginForm";
import SignupForm from "./components/_auth/forms/SignupForm";
import Navbar from "./components/layout/Navbar";
import AddProduct from "./components/_root/pages/admin/AddProducts";

function App() {
  return (
    <main className="h-screen">
      <Navbar />
      <div className="pt-16"> {/* Add padding to avoid content being hidden behind the fixed Navbar */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm  role = "user"/>} />
          <Route path="/login-admin" element={<LoginForm role="admin" />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/addproducts" element={<AddProduct />} />

          
        </Routes>
      </div>
    </main>
  );
}

const Home = () => {
  return (
    <div>
      <h1>Welcome to Home</h1>
    </div>
  );
};

export default App;
