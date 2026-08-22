import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useCartStore from '../store/cartStore';
import useAppStore from '../store/appStore';

const PAYMENT_METHODS = [
  { id: 'upi', label: 'UPI / GPay', icon: 'account_balance', desc: 'Pay directly via UPI or Google Pay' },
  { id: 'card', label: 'Credit / Debit Card', icon: 'credit_card', desc: 'Visa, Mastercard, Amex, RuPay' },
  { id: 'cod', label: 'Cash on Delivery', icon: 'payments', desc: 'Pay when food arrives' },
  { id: 'wallet', label: 'Zomato Wallet', icon: 'account_balance_wallet', desc: 'Balance: $12.50' },
];

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { items, clearCart, restaurantName } = useCartStore();
  const { setOrderPlaced } = useAppStore();

  const [selectedPayment, setSelectedPayment] = useState('upi');
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [address, setAddress] = useState({
    name: 'John Doe',
    phone: '+1 555 0123',
    flat: 'Apt 4B, 123 Main Street',
    area: 'Lower Manhattan, New York City',
    pincode: '10004',
  });
  const [placing, setPlacing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const deliveryFee = subtotal > 0 ? (subtotal > 30 ? 0 : 2.99) : 0;
  const taxes = subtotal * 0.08;
  const discount = couponApplied ? subtotal * 0.1 : 0;
  const total = subtotal + deliveryFee + taxes - discount;

  const applyCoupon = () => {
    if (couponCode.trim().toUpperCase() === 'ZOMATO10') {
      setCouponApplied(true);
    }
  };

  const placeOrder = async () => {
    setPlacing(true);
    await new Promise((r) => setTimeout(r, 1800));
    setOrderSuccess(true);
    setPlacing(false);
    clearCart();
  };

  if (items.length === 0 && !orderSuccess) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <span className="text-6xl mb-4 block">🛒</span>
          <h2 className="text-headline-md font-semibold text-on-surface mb-2">Your cart is empty</h2>
          <p className="text-body-md text-on-surface-variant mb-6">Add items from a restaurant to continue</p>
          <Link to="/" className="btn-primary inline-flex">
            <span className="material-symbols-outlined text-[18px]">home</span>
            Browse Restaurants
          </Link>
        </div>
      </div>
    );
  }

  if (orderSuccess) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-card">
            <span className="material-symbols-outlined text-[48px] text-rating fill">check_circle</span>
          </div>
          <h2 className="text-headline-lg font-bold text-on-surface mb-2">Order Placed! 🎉</h2>
          <p className="text-body-md text-on-surface-variant mb-2">
            Your order from <span className="font-semibold text-on-surface">{restaurantName || 'the restaurant'}</span> has been confirmed.
          </p>
          <p className="text-body-sm text-on-surface-variant mb-8">
            Estimated delivery: <span className="font-semibold text-primary">35–45 min</span>
          </p>

          {/* Order ID */}
          <div className="bg-surface-alt border border-surface-variant rounded-lg p-4 mb-6 text-left">
            <p className="text-label-sm text-on-surface-variant mb-1">Order ID</p>
            <p className="text-label-lg font-bold text-on-surface">#ZMT{Math.floor(Math.random() * 900000 + 100000)}</p>
          </div>

          {/* Track Order */}
          <div className="flex flex-col gap-2">
            <button className="btn-primary justify-center">
              <span className="material-symbols-outlined text-[18px]">location_on</span>
              Track Your Order
            </button>
            <Link to="/" className="btn-secondary justify-center">
              Order More Food
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-16">
      {/* Page Header */}
      <div className="bg-white border-b border-surface-variant shadow-nav">
        <div className="max-w-container mx-auto px-10 py-4 flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 rounded-full hover:bg-surface-container flex items-center justify-center text-on-surface-variant transition-colors"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <div>
            <h1 className="text-title-lg font-bold text-on-surface">Checkout</h1>
            <p className="text-body-sm text-on-surface-variant">
              {restaurantName || 'Your Order'} • {items.reduce((s, i) => s + i.quantity, 0)} items
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-container mx-auto px-10 py-8">
        <div className="grid grid-cols-5 gap-8">

          {/* ===== LEFT PANEL: Delivery + Payment ===== */}
          <div className="col-span-3 space-y-6">

            {/* Delivery Address */}
            <section className="bg-white rounded-card shadow-card border border-surface-variant p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-title-lg font-bold text-on-surface flex items-center gap-2">
                  <span className="w-7 h-7 bg-primary text-white rounded-full flex items-center justify-center text-label-sm font-bold">1</span>
                  Delivery Address
                </h2>
                <span className="text-label-lg text-primary font-semibold cursor-pointer hover:underline">Change</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-label-sm text-on-surface-variant block mb-1.5">Full Name</label>
                  <input
                    type="text"
                    value={address.name}
                    onChange={(e) => setAddress({ ...address, name: e.target.value })}
                    className="w-full px-3 py-2.5 border border-surface-variant rounded-chip text-body-sm text-on-surface focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all"
                  />
                </div>
                <div>
                  <label className="text-label-sm text-on-surface-variant block mb-1.5">Phone Number</label>
                  <input
                    type="tel"
                    value={address.phone}
                    onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                    className="w-full px-3 py-2.5 border border-surface-variant rounded-chip text-body-sm text-on-surface focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all"
                  />
                </div>
                <div className="col-span-2">
                  <label className="text-label-sm text-on-surface-variant block mb-1.5">Flat / House No., Building</label>
                  <input
                    type="text"
                    value={address.flat}
                    onChange={(e) => setAddress({ ...address, flat: e.target.value })}
                    className="w-full px-3 py-2.5 border border-surface-variant rounded-chip text-body-sm text-on-surface focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all"
                  />
                </div>
                <div>
                  <label className="text-label-sm text-on-surface-variant block mb-1.5">Area / Locality</label>
                  <input
                    type="text"
                    value={address.area}
                    onChange={(e) => setAddress({ ...address, area: e.target.value })}
                    className="w-full px-3 py-2.5 border border-surface-variant rounded-chip text-body-sm text-on-surface focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all"
                  />
                </div>
                <div>
                  <label className="text-label-sm text-on-surface-variant block mb-1.5">Pincode</label>
                  <input
                    type="text"
                    value={address.pincode}
                    onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                    className="w-full px-3 py-2.5 border border-surface-variant rounded-chip text-body-sm text-on-surface focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all"
                  />
                </div>
              </div>

              {/* Delivery Instructions */}
              <div className="mt-4">
                <label className="text-label-sm text-on-surface-variant block mb-1.5">Delivery Instructions (Optional)</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Ring doorbell twice, leave at door..."
                  className="w-full px-3 py-2.5 border border-surface-variant rounded-chip text-body-sm placeholder:text-on-surface-variant focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all resize-none"
                />
              </div>
            </section>

            {/* Coupon */}
            <section className="bg-white rounded-card shadow-card border border-surface-variant p-6">
              <h2 className="text-title-lg font-bold text-on-surface mb-4 flex items-center gap-2">
                <span className="w-7 h-7 bg-primary text-white rounded-full flex items-center justify-center text-label-sm font-bold">2</span>
                Coupon &amp; Offers
              </h2>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  placeholder="Enter coupon code (try ZOMATO10)"
                  className="flex-1 px-3 py-2.5 border border-surface-variant rounded-chip text-body-sm placeholder:text-on-surface-variant focus:outline-none transition-all"
                />
                <button
                  onClick={applyCoupon}
                  disabled={couponApplied}
                  className={`px-5 py-2.5 rounded-chip font-semibold text-label-lg transition-all ${
                    couponApplied
                      ? 'bg-green-50 text-rating border border-rating cursor-not-allowed'
                      : 'bg-primary text-white hover:bg-primary-dark'
                  }`}
                >
                  {couponApplied ? '✓ Applied' : 'Apply'}
                </button>
              </div>
              {couponApplied && (
                <p className="text-rating text-label-sm mt-2 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">check_circle</span>
                  10% discount applied! You save ${discount.toFixed(2)}
                </p>
              )}
            </section>

            {/* Payment Method */}
            <section className="bg-white rounded-card shadow-card border border-surface-variant p-6">
              <h2 className="text-title-lg font-bold text-on-surface mb-5 flex items-center gap-2">
                <span className="w-7 h-7 bg-primary text-white rounded-full flex items-center justify-center text-label-sm font-bold">3</span>
                Payment Method
              </h2>
              <div className="space-y-3">
                {PAYMENT_METHODS.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setSelectedPayment(method.id)}
                    className={`w-full flex items-center gap-4 p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                      selectedPayment === method.id
                        ? 'border-primary bg-primary-light shadow-focus-red'
                        : 'border-surface-variant hover:border-outline-variant bg-white'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      selectedPayment === method.id ? 'bg-primary text-white' : 'bg-surface-container text-on-surface-variant'
                    }`}>
                      <span className="material-symbols-outlined text-[20px]">{method.icon}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-label-lg font-semibold text-on-surface">{method.label}</p>
                      <p className="text-label-sm text-on-surface-variant">{method.desc}</p>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      selectedPayment === method.id ? 'border-primary' : 'border-outline'
                    }`}>
                      {selectedPayment === method.id && (
                        <div className="w-2.5 h-2.5 bg-primary rounded-full" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </section>

          </div>

          {/* ===== RIGHT PANEL: Order Summary ===== */}
          <div className="col-span-2">
            <div className="sticky top-25">
              <div className="bg-white rounded-card shadow-card border border-surface-variant p-6">
                <h2 className="text-title-lg font-bold text-on-surface mb-5">Order Summary</h2>

                {/* Items List */}
                <div className="space-y-3 mb-5 max-h-64 overflow-y-auto pr-1">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-start gap-3">
                      <div className={`w-4 h-4 border-2 rounded-sm flex items-center justify-center shrink-0 mt-0.5 ${item.isVeg ? 'border-rating' : 'border-red-600'}`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${item.isVeg ? 'bg-rating' : 'bg-red-600'}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-label-lg text-on-surface truncate">{item.name}</p>
                        <p className="text-label-sm text-on-surface-variant">×{item.quantity}</p>
                      </div>
                      <p className="text-label-lg font-semibold text-on-surface shrink-0">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Price Breakdown */}
                <div className="border-t border-surface-container pt-4 space-y-2.5">
                  <div className="flex justify-between text-body-sm text-on-surface-variant">
                    <span>Item Total</span>
                    <span className="font-medium text-on-surface">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-body-sm text-on-surface-variant">
                    <span>Delivery Fee</span>
                    <span className={deliveryFee === 0 ? 'text-rating font-semibold' : 'font-medium text-on-surface'}>
                      {deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-body-sm text-on-surface-variant">
                    <span>Taxes &amp; Charges</span>
                    <span className="font-medium text-on-surface">${taxes.toFixed(2)}</span>
                  </div>
                  {couponApplied && (
                    <div className="flex justify-between text-body-sm text-rating font-semibold">
                      <span>Coupon Discount (ZOMATO10)</span>
                      <span>−${discount.toFixed(2)}</span>
                    </div>
                  )}
                  {subtotal >= 30 && deliveryFee === 0 && (
                    <div className="flex items-center gap-1.5 bg-green-50 border border-green-200 rounded-chip px-3 py-2 text-label-sm text-rating">
                      <span className="material-symbols-outlined text-[14px]">local_shipping</span>
                      You saved on delivery! Orders above $30 ship free
                    </div>
                  )}
                  <div className="flex justify-between text-title-lg font-bold text-on-surface pt-3 border-t border-surface-container">
                    <span>Grand Total</span>
                    <span className="text-primary">${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Delivery ETA */}
                <div className="mt-4 flex items-center gap-2 text-body-sm text-on-surface-variant bg-surface-alt rounded-lg p-3">
                  <span className="material-symbols-outlined text-primary text-[18px]">delivery_dining</span>
                  Estimated delivery: <span className="font-semibold text-on-surface">35–45 min</span>
                </div>

                {/* Place Order Button */}
                <button
                  onClick={placeOrder}
                  disabled={placing}
                  className={`w-full mt-5 py-4 rounded-btn font-bold text-base flex items-center justify-center gap-2 transition-all duration-200 ${
                    placing
                      ? 'bg-on-surface-variant text-white cursor-not-allowed'
                      : 'bg-primary text-white hover:bg-primary-dark active:scale-95 shadow-focus-red'
                  }`}
                >
                  {placing ? (
                    <>
                      <svg className="animate-spin w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Placing your order...
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
                      Place Order · ${total.toFixed(2)}
                    </>
                  )}
                </button>

                {/* Trust Badges */}
                <div className="mt-4 flex items-center justify-center gap-4 text-label-sm text-on-surface-variant">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px] text-rating">lock</span>
                    Secure Payment
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px] text-rating">verified</span>
                    100% Safe
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
