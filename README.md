# 🍽️ Zomato Desktop Redesign — React Frontend

A modern, high-performance, and responsive food delivery and restaurant discovery web application inspired by **Zomato's Desktop UI Redesign** (built on the *Epicurean Modern* design system).

Built with **React 19**, **Vite**, **TailwindCSS**, **React Router v7**, and **Zustand**.

---

## 📸 Overview & Features

### 🌟 Key Features
- **🏠 Home & Discovery Experience:**
  - Dynamic Hero search bar with interactive location selection & keyword search.
  - Multi-category filter bar with smooth carousel scrolling (*Pizza, Biryani, Burgers, Chinese, Sushi, etc.*).
  - Trending restaurants grid & full catalog view with real-time filtering (Pure Veg, Cuisine, Search query) and sorting (Rating, Delivery Time, Price).
  - Special offers promotional banners.

- **🍕 Restaurant & Menu Details (e.g. Nonna's Pizzeria):**
  - Rich header with backdrop cover, rating badge, review count, average delivery time, and distance.
  - Quick action toolbar (*Order Online, Directions, Bookmark, Share*).
  - Sticky sub-category navigation tabs with scroll-to-section.
  - Search within restaurant menu.
  - Interactive menu items with Veg/Non-Veg indicators, pricing, best-seller tags, and quantity counters.

- **🛒 Seamless Slide-out Cart Drawer:**
  - Real-time cart state with persistent item counting and badge indicators.
  - Increment/decrement/remove item controls with Veg/Non-Veg markers.
  - Coupon application support (*e.g. try `ZOMATO10`*).
  - Subtotal, delivery fee calculation (free delivery above threshold), taxes, and total cost breakdown.

- **💳 Comprehensive Checkout Flow:**
  - Multi-step address form with delivery instructions.
  - Payment method selector (*UPI/GPay, Credit/Debit Cards, Cash on Delivery, Zomato Wallet*).
  - Live order summary & receipt breakdown.
  - Interactive order placement simulation with order confirmation screen and tracking ID.

---

## 🎨 Design System & Aesthetics

Implemented following the **Epicurean Modern** design tokens:
- **Primary Brand:** `#E23744` (Iconic Zomato Red)
- **Rating / Success:** `#24963F` (Rating Green)
- **Accent / Gold:** `#E5C158` (Loyalty & Accolades)
- **Typography:** `Inter` (Display, Headlines, Body & Labels)
- **Elevation & Radius:** 12px card rounded corners, ambient shadows, and micro-animations for card hover zooms and drawer transitions.

---

## 📂 Project Architecture

```
my-react-app/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.jsx          # Top fixed navigation with location & search
│   │   │   └── CartSidebar.jsx     # Slide-over cart drawer with pricing breakdown
│   │   └── ui/
│   │       ├── MenuItemCard.jsx    # Menu item with +/- quantity selector
│   │       └── RestaurantCard.jsx  # Restaurant card with rating & tag pills
│   ├── data/
│   │   ├── restaurants.js          # Restaurant listings, categories & mock metadata
│   │   └── menu.js                 # Detailed categorized menus with items
│   ├── store/
│   │   ├── appStore.js             # App global UI state (search, filters, cart toggle)
│   │   └── cartStore.js            # Zustand cart store (addItem, removeItem, totals)
│   ├── pages/
│   │   ├── HomePage.jsx            # Landing discovery page
│   │   ├── RestaurantPage.jsx      # Restaurant menu & details page
│   │   └── CheckoutPage.jsx        # Order placement & payment page
│   ├── App.jsx                     # Route definitions & layout wrappers
│   ├── index.css                   # Tailwind base, utilities & Material Symbols
│   └── main.jsx                    # React root entry point
├── index.html
├── tailwind.config.js
├── vite.config.js
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm** or **yarn** / **pnpm**

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd zomoto-frontend-project/my-react-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Preview production build:**
   ```bash
   npm run preview
   ```

---

## 🐳 Docker Deployment

You can containerize and run the application in an isolated, production-ready **Nginx** environment using Docker.

### 1. Build the Docker Image

Run from the root directory (`zomoto-frontend-project/`):

```bash
docker build -t zomato-frontend:latest .
```

### 2. Run the Container

```bash
docker run -d -p 8080:80 --name zomato-frontend-container zomato-frontend:latest
```

Open [http://localhost:8080](http://localhost:8080) in your browser.

### 3. Stop and Remove the Container

```bash
docker stop zomato-frontend-container
docker rm zomato-frontend-container
```

---

## 🛠️ Tech Stack & Libraries

| Technology | Purpose |
|---|---|
| **React 19** | Core UI component framework |
| **Vite** | Next-generation frontend tooling and bundler |
| **React Router v7** | Declarative client-side routing |
| **TailwindCSS** | Utility-first CSS framework |
| **Zustand** | Lightweight, reactive state management |
| **Google Fonts (Inter)** | Typography |
| **Material Symbols** | Modern icon library |

---

## 💡 Quick Tips for Testing
- **Search:** Try typing *"Pizza"*, *"Burger"*, or restaurant names in the top search bar or hero input.
- **Cart & Checkout:** Click **ADD** on any menu item in Nonna's Pizzeria to automatically reveal the Cart Sidebar, then proceed to Checkout.
- **Promo Code:** In checkout, apply coupon `ZOMATO10` to get 10% off your total bill.

---

## 📄 Usage & License

This project is completely **free to use**. Anyone is welcome to use, study, fork, modify, and build upon this project for learning, personal, or commercial purposes. No attribution or special license required—feel free to use it however you need!

