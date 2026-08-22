import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import CartSidebar from './components/layout/CartSidebar';
import HomePage from './pages/HomePage';
import RestaurantPage from './pages/RestaurantPage';
import CheckoutPage from './pages/CheckoutPage';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background">
        {/* Global Navbar */}
        <Navbar />

        {/* Cart Sidebar - global, overlays all pages */}
        <CartSidebar />

        {/* Main Content - offset for fixed navbar */}
        <main className="pt-20">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/restaurant/:id" element={<RestaurantPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            {/* 404 fallback */}
            <Route
              path="*"
              element={
                <div className="flex items-center justify-center min-h-[60vh] flex-col gap-4">
                  <span className="text-6xl">😕</span>
                  <h2 className="text-headline-md font-semibold text-on-surface">Page not found</h2>
                  <a href="/" className="btn-primary inline-flex">Go Home</a>
                </div>
              }
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
