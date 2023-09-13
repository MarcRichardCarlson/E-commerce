import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer';
import { AuthContextProvider } from './context/AuthContext';
import LoginPage from './components/Login/Login';
import RegisterPage from './components/Register/Register';
import ProductPage from './Pages/Products/Products';
import { CartProvider } from './context/CartContext';
import DetailPage from './Pages/Details/Details';
import Cart from './components/Cart/Cart';


export default function App() {

  return (
    <div className='app-container'>
      <AuthContextProvider>
        <CartProvider>
        <Header/>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/products" element={<ProductPage/>} />
            <Route path="/signIn" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/details/:productId" element={<DetailPage/>} />
          </Routes>
          <Cart/>
        <Footer/>
        </CartProvider>
      </AuthContextProvider>
    </div>
  );
}
