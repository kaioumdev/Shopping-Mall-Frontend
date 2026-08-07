# Lebaba Shopping Mall — Frontend

<div align="center">

![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-2.2-764ABC?style=for-the-badge&logo=redux&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind%20CSS-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Stripe](https://img.shields.io/badge/Stripe-Payments-635BFF?style=for-the-badge&logo=stripe&logoColor=white)
![React Router](https://img.shields.io/badge/React%20Router-6.26-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white)

**A modern, dark-themed shopping mall experience built with React 18**

[Live Demo](#) · [Features](#features) · [Quick Start](#quick-start) · [Project Structure](#project-structure) · [Screenshots](#screenshots)

</div>

---

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Pages & Routes](#pages--routes)
- [State Management](#state-management)
- [Authentication Flow](#authentication-flow)
- [Stripe Payment Flow](#stripe-payment-flow)
- [Dashboard Guide](#dashboard-guide)
- [Component Library](#component-library)
- [Deployment](#deployment)
- [Contributing](#contributing)

---

## Project Overview

**Lebaba Shopping Mall** is a full-featured, production-ready e-commerce frontend built with React 18 and Vite. It delivers a cinematic, dark-themed shopping experience inspired by luxury retail — complete with a video intro animation, multi-floor mall directory, real-time cart management, Stripe-powered checkout, and dual-role dashboards for customers and administrators.

The application is built to real-world production standards:
- **Role-based access control** with route-level guards
- **Optimistic UI** with Redux Toolkit + RTK Query
- **Persistent sessions** via localStorage
- **Stripe Checkout** integration with payment confirmation
- **Admin CMS** for product, order, and user management

---

## Features

### 🏬 Shopping Experience

- **Video Intro** — Cinematic mall entrance animation plays on first visit with smooth fade-in
- **Mall Directory** — Four-floor outlet navigator linking to category pages (Fashion, Jewels, Beauty, Accessories)
- **Hero Carousel** — Auto-rotating 3-slide banner with animated accent blobs and live statistics
- **Category Browsing** — Full-bleed image category cards with hover zoom and explore CTA
- **Trend Showcase** — Seasonal trend cards with color-coded season badges
- **Deals Section** — Live countdown timer ticking down to end of month
- **Responsive Grid** — Fluid product grid adapting from 2 to 4 columns

### 🛍️ Product Catalog

- **Advanced Filtering** — Filter by category, color, and price range simultaneously
- **Pagination** — Smart pagination with ellipsis for large catalogs, smooth scroll-to-top
- **Product Detail** — Full product page with image, specs, trust badges, and reviews
- **Rating System** — 5-star rating display with aggregate score
- **Mobile Filter Toggle** — Collapsible sidebar for mobile with active-filter indicator

### 🛒 Cart & Checkout

- **Slide-in Cart Drawer** — Glass-morphism cart panel with scroll lock and Escape key close
- **Quantity Management** — Increment/decrement per item with real-time total recalculation
- **Order Summary** — Itemized breakdown with savings row, free shipping badge, and total
- **Stripe Checkout** — Full hosted Stripe payment page with card support
- **Payment Confirmation** — Post-payment session confirmation and order creation
- **Success Page** — Post-checkout confirmation landing

### 👤 User Account

- **Registration & Login** — Clean auth pages with form validation
- **Persistent Sessions** — Auth state persisted to `localStorage`, survives page refresh
- **Profile Editor** — Update username, avatar URL, bio, and profession via modal
- **Order History** — Full order table with status badges and detail view
- **Order Timeline** — Visual progress tracker (Pending → Processing → Shipped → Delivered)
- **Payment History** — Itemized payment list with total spent summary card
- **Review Management** — View all submitted reviews with star ratings

### 🔐 Admin Dashboard

- **Overview Analytics** — 4 KPI cards (earnings, orders, users, products) + pie/line charts
- **Product Management** — Paginated product table with image preview, edit and delete
- **Add Product** — Rich form with Cloudinary image upload, category/color selectors
- **Update Product** — Pre-populated edit form
- **Order Management** — Full order table with inline status update modal
- **User Management** — User table with role badge, role updater modal, delete

### 📬 Contact

- **Contact Form** — Validated form with subject dropdown, real-time error messages
- **Quick Help Links** — Shortcut links to orders, payments, reviews, returns
- **Social Links** — Instagram, Facebook, Twitter, YouTube panel

---

## Tech Stack

| Category | Technology | Version | Purpose |
|----------|-----------|---------|---------|
| Framework | React | 18.3 | UI component library |
| Build Tool | Vite | 5.4 | Lightning-fast dev server + bundler |
| Styling | Tailwind CSS | 3.4 | Utility-first CSS |
| State | Redux Toolkit | 2.2 | Global state management |
| Data Fetching | RTK Query | 2.2 | Server state, caching, mutations |
| Routing | React Router DOM | 6.26 | Client-side navigation |
| Forms | React Hook Form | 7.53 | Performant form validation |
| Payments | @stripe/stripe-js | 4.5 | Stripe Checkout redirect |
| HTTP | Axios | 1.7 | HTTP client for non-RTK calls |
| Charts | Chart.js + react-chartjs-2 | 4.4 | Admin analytics charts |
| Icons | Remixicon | 4.3 | 2000+ icon set via CSS classes |
| Alerts | SweetAlert2 | 11 | Beautiful alert dialogs |
| Cookies | js-cookie | 3.0 | Cookie utility |

---

## Prerequisites

- **Node.js** ≥ 18.0 — [Download](https://nodejs.org/)
- **yarn** ≥ 1.22 or **npm** ≥ 9
- The **backend API** running locally or deployed — [Backend README](../backend/README.md)
- A **Stripe publishable key** (test mode is fine for development)

---

## Quick Start

### 1. Clone and navigate

```bash
git clone https://github.com/your-username/shopping-mall.git
cd shopping-mall/frontend
```

### 2. Install dependencies

```bash
# Using yarn (recommended)
yarn install

# Or using npm
npm install
```

### 3. Configure environment variables

```bash
cp .env.local.example .env.local
```

Add your Stripe publishable key — see [Environment Variables](#environment-variables).

### 4. Ensure backend is running

```bash
# In a separate terminal, start the backend
cd ../backend
yarn dev
```

The backend must be running at `http://localhost:5000`.

### 5. Start the development server

```bash
yarn dev
```

The app will open at **`http://localhost:5173`**

### 6. Build for production

```bash
yarn build
yarn preview   # Preview the production build locally
```

---

## Environment Variables

Create `.env.local` in the `/frontend` root:

```env
# ─── Stripe ────────────────────────────────────────────────
# Stripe publishable key (starts with pk_test_ for development)
# Get from: Stripe Dashboard > Developers > API Keys
VITE_STRIPE_PK=pk_test_51PaxS2...
```

> The `VITE_` prefix is required by Vite to expose variables to the browser bundle.

### Backend URL

The API base URL is configured in `src/utils/getBaseUrl.js`:

```javascript
// src/utils/getBaseUrl.js
export const getBaseUrl = () => {
  return "http://localhost:5000";  // Change for production
}
```

Update this to your deployed backend URL before building for production.

---

## Project Structure

```
frontend/
├── index.html                      # Vite HTML entry point
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── eslint.config.js
├── package.json
├── .env.local                      # Environment variables (not committed)
│
├── public/
│   ├── favicon.svg
│   └── icons.svg
│
└── src/
    ├── main.jsx                    # React entry — Redux Provider + RouterProvider
    ├── App.jsx                     # Root layout: Navbar + <Outlet> + Footer
    ├── App.css                     # Global styles + CSS custom properties
    ├── index.css                   # Tailwind directives
    │
    ├── assets/                     # Static images (hero, categories, cards, instagram)
    │
    ├── components/                 # Shared, reusable components
    │   ├── Navbar.jsx              # Glassmorphism navbar with cart badge + user dropdown
    │   ├── Footer.jsx              # Dark footer with instagram grid + social links
    │   ├── Loading.jsx             # Spinner component
    │   ├── ErrorPage.jsx           # 404 / error boundary page
    │   ├── Login.jsx               # Standalone login page
    │   ├── Register.jsx            # Standalone register page
    │   ├── PaymentSuccess.jsx      # Post-Stripe redirect page
    │   ├── RatingStars.jsx         # 1–5 star display component
    │   └── TimelineStep.jsx        # Order progress timeline step
    │
    ├── pages/
    │   ├── home/                   # Landing page sections
    │   │   ├── Home.jsx            # Composer: VideoIntro + all sections
    │   │   ├── VideoIntro.jsx      # Full-screen mall entrance animation
    │   │   ├── Banner.jsx          # Auto-rotating hero carousel (3 slides)
    │   │   ├── MallOutlets.jsx     # Four-floor mall directory cards
    │   │   ├── Categories.jsx      # Portrait category image grid
    │   │   ├── Trends.jsx          # Trend showcase cards
    │   │   ├── TrendingProducts.jsx # Live API products grid with load more
    │   │   ├── DealsSection.jsx    # Live countdown deals banner
    │   │   └── Features.jsx        # USP feature strip (delivery, returns, support)
    │   │
    │   ├── shop/                   # Shop & product pages
    │   │   ├── ShopPage.jsx        # Filter sidebar + paginated product grid
    │   │   ├── ShopFiltering.jsx   # Accordion filter sidebar (category/color/price)
    │   │   ├── ProductCards.jsx    # Reusable product card grid
    │   │   ├── CartModal.jsx       # Slide-in cart drawer
    │   │   ├── OrderSummary.jsx    # Cart total + Stripe checkout button
    │   │   ├── productDetails/
    │   │   │   └── SingleProduct.jsx  # Full product detail page
    │   │   └── reviews/
    │   │       ├── ReviewsCard.jsx    # Review list component
    │   │       └── PostAReview.jsx    # Review submission modal
    │   │
    │   ├── category/
    │   │   └── CategoryPage.jsx    # Products filtered by category slug
    │   │
    │   ├── blogs/
    │   │   └── Blogs.jsx           # Blog post card grid
    │   │
    │   ├── contact/
    │   │   └── ContactPage.jsx     # Contact form + quick help + social links
    │   │
    │   └── dashboard/
    │       ├── DashboardLayout.jsx   # Sidebar + <Outlet> layout wrapper
    │       ├── AdminDashboard.jsx    # Admin sidebar navigation
    │       ├── UserDashboard.jsx     # User sidebar navigation
    │       │
    │       ├── admin/
    │       │   ├── dashboard/
    │       │   │   ├── AdminDMain.jsx       # Admin overview page
    │       │   │   ├── AdminStats.jsx       # 4 KPI stat cards
    │       │   │   └── AdminStatsChart.jsx  # Pie + Line charts
    │       │   ├── addProduct/
    │       │   │   ├── AddProduct.jsx       # Add product form
    │       │   │   ├── TextInput.jsx        # Dark-themed text input
    │       │   │   ├── SelectInput.jsx      # Dark-themed select
    │       │   │   └── UploadImage.jsx      # Cloudinary upload widget
    │       │   ├── manageProduct/
    │       │   │   ├── ManageProducts.jsx   # Product table with pagination
    │       │   │   └── UpdateProduct.jsx    # Edit product form
    │       │   ├── orders/
    │       │   │   ├── ManageOrders.jsx     # Order table
    │       │   │   └── UpdateOrderModal.jsx # Status update modal
    │       │   └── users/
    │       │       ├── ManageUsers.jsx      # User table
    │       │       └── UpdateUserModal.jsx  # Role update modal
    │       │
    │       └── user/
    │           ├── dashboard/
    │           │   ├── UserDMain.jsx        # User overview page
    │           │   └── UserStats.jsx        # 3 KPI stat cards
    │           ├── orders/
    │           │   ├── UserOrders.jsx       # Order history table
    │           │   └── OrderDetail.jsx      # Order detail + timeline
    │           ├── payments/
    │           │   └── UserPayments.jsx     # Payment history
    │           ├── profile/
    │           │   └── UserProfile.jsx      # Profile view + edit modal
    │           └── reviews/
    │               └── UserReviews.jsx      # Review history grid
    │
    ├── redux/
    │   ├── store.js                # Redux store configuration
    │   └── features/
    │       ├── auth/
    │       │   ├── authApi.js      # RTK Query: register, login, logout, CRUD users
    │       │   └── authSlice.js    # Auth state: user object + localStorage persistence
    │       ├── products/
    │       │   └── productsApi.js  # RTK Query: fetch all, fetch by id, CRUD
    │       ├── orders/
    │       │   └── orderApi.js     # RTK Query: checkout, confirm, CRUD orders
    │       ├── reviews/
    │       │   └── reviewsApi.js   # RTK Query: post review, get by user
    │       ├── stats/
    │       │   └── statsApi.js     # RTK Query: user stats, admin stats
    │       └── cart/
    │           └── cartSlice.js    # Cart state: products, quantities, totals
    │
    ├── routes/
    │   ├── router.jsx              # createBrowserRouter — all route definitions
    │   └── PrivateRoute.jsx        # Auth + role guard HOC
    │
    └── utils/
        └── getBaseUrl.js           # API base URL helper
```

---

## Pages & Routes

### Public Routes

| Path | Component | Description |
|------|-----------|-------------|
| `/` | `Home` | Landing page with all sections |
| `/shop` | `ShopPage` | Full product catalog with filters |
| `/shop/:id` | `SingleProduct` | Product detail page |
| `/categories/:categoryName` | `CategoryPage` | Category-filtered products |
| `/contact` | `ContactPage` | Contact form page |
| `/success` | `PaymentSuccess` | Post-Stripe redirect |
| `/orders/:orderId` | `OrderDetail` | Order tracking (public by ID) |

### Auth Routes (standalone, no Navbar)

| Path | Component |
|------|-----------|
| `/login` | `Login` |
| `/register` | `Register` |

### Protected User Dashboard Routes

All require a valid auth session. Redirect to `/login` if not authenticated.

| Path | Component |
|------|-----------|
| `/dashboard` | `UserDMain` — overview + charts |
| `/dashboard/orders` | `UserOrders` — order history |
| `/dashboard/payments` | `UserPayments` — payment history |
| `/dashboard/profile` | `UserProfile` — profile editor |
| `/dashboard/reviews` | `UserReviews` — review history |

### Protected Admin Dashboard Routes

All require `role: "admin"` in addition to auth.

| Path | Component |
|------|-----------|
| `/dashboard/admin` | `AdminDMain` — analytics overview |
| `/dashboard/add-product` | `AddProduct` |
| `/dashboard/manage-products` | `ManageProducts` |
| `/dashboard/update-product/:id` | `UpdateProduct` |
| `/dashboard/manage-orders` | `ManageOrders` |
| `/dashboard/users` | `ManageUsers` |

---

## State Management

The application uses **Redux Toolkit** with two complementary state patterns:

### RTK Query (Server State)

Handles all API communication with automatic caching, loading states, and cache invalidation.

```javascript
// Example: fetching products with filters
const { data, isLoading, error } = useFetchAllProdutsQuery({
  category: 'jewellery',
  color: 'gold',
  minPrice: 50,
  maxPrice: 200,
  page: 1,
  limit: 8,
});
```

**API slices:**

| Slice | Hooks provided |
|-------|---------------|
| `authApi` | `useRegisterUserMutation`, `useLoginUserMutation`, `useLogoutUserMutation`, `useGetUsersQuery`, `useDeleteUserMutation`, `useUpdateUserRoleMutation`, `useEditProfileMutation` |
| `productsApi` | `useFetchAllProdutsQuery`, `useFetchProductbyIdQuery`, `useAddProductMutation`, `useUpdateProductMutation`, `useDeleteProductMutation` |
| `orderApi` | `useGetOrdersByEmailQuery`, `useGetOrdersByIdQuery`, `useGetAllOrdersQuery`, `useUpdateOrderStatusMutation`, `useDeleteOrderbyIdMutation` |
| `reviewsApi` | `usePostAReviewMutation`, `useGetReviewByUserIdQuery` |
| `statsApi` | `useGetUserStatsQuery`, `useGetAdminStatsQuery` |

### Redux Slices (Client State)

**`authSlice`** — Persisted user object:
```javascript
{
  user: { _id, username, email, role, profileImage, bio, profession } | null
}
// Persisted to localStorage on every change
```

**`cartSlice`** — Shopping cart (in-memory):
```javascript
{
  products: [{ ...product, quantity }],
  selectedItems: 3,        // total item count
  totalPrice: 329.97       // running total
}
```

---

## Authentication Flow

```
┌─────────────────────────────────────────────────────────┐
│                    Login Form                           │
│   email + password → POST /api/auth/login              │
└────────────────────────┬────────────────────────────────┘
                         │ Response: { user, token }
                         ▼
┌─────────────────────────────────────────────────────────┐
│  dispatch(setUser({ user }))                            │
│  → localStorage.setItem('user', JSON.stringify(user))  │
│  → Cookie 'token' set by server (HTTP-only)            │
└────────────────────────┬────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────┐
│  PrivateRoute checks state.auth.user                    │
│  → null   → redirect to /login                         │
│  → exists → render protected component                 │
│  → role !== 'admin' → block admin routes               │
└─────────────────────────────────────────────────────────┘
```

### Session Persistence

On app load, `authSlice` reads from `localStorage`:
```javascript
const loadUserFromLocalStorage = () => {
  const serialized = localStorage.getItem('user');
  return serialized ? { user: JSON.parse(serialized) } : { user: null };
};
```

This means users stay logged in across browser sessions until they explicitly log out or the JWT expires.

---

## Stripe Payment Flow

```
1. User clicks "Proceed to Checkout" in CartModal
   └─→ POST /api/orders/create-checkout-session
       Body: { products: [...], userId }

2. Backend creates Stripe session, returns { id: "cs_test_..." }

3. Frontend calls: stripe.redirectToCheckout({ sessionId: id })
   └─→ User is taken to Stripe's hosted payment page

4. User completes payment on Stripe

5. Stripe redirects to: /success?session_id=cs_test_...

6. PaymentSuccess component reads session_id from URL
   └─→ POST /api/orders/confirm-payment { session_id }

7. Backend confirms payment, creates Order in MongoDB
   └─→ Returns { order } with status: "pending"

8. Cart is cleared via dispatch(clearCart())
```

**Test card numbers (Stripe test mode):**

| Card | Number | Use |
|------|--------|-----|
| Visa | `4242 4242 4242 4242` | Success |
| Declined | `4000 0000 0000 0002` | Decline |
| Auth required | `4000 0025 0000 3155` | 3D Secure |

Use any future expiry date, any 3-digit CVC, and any 5-digit ZIP.

---

## Dashboard Guide

### Accessing the Dashboard

1. Register or login at `/login`
2. You are automatically redirected to `/dashboard`
3. Sidebar navigation changes based on your role

### User Dashboard Features

| Section | What you can do |
|---------|----------------|
| **Overview** | See total payments, review count, purchased products, activity bar chart |
| **My Orders** | View all past orders with status, click "View" for timeline detail |
| **Payments** | See itemized payment history and total spent |
| **Profile** | Update username, avatar, bio, and profession |
| **My Reviews** | See all reviews you've submitted, add new ones |

### Admin Dashboard Features

| Section | What you can do |
|---------|----------------|
| **Overview** | KPI cards (earnings, orders, users, products), pie chart, monthly earnings line chart |
| **Add Product** | Upload image to Cloudinary, set name/category/color/price/description |
| **Manage Products** | Paginated product table, edit or delete any product |
| **All Users** | View all users, change roles, delete accounts |
| **Manage Orders** | View all orders, update status (pending → processing → shipped → completed), delete |

### Making a User an Admin

1. Login as an admin
2. Go to `/dashboard/users`
3. Click the edit icon next to the target user
4. Change role from `user` to `admin`
5. Click "Save Changes"

---

## Component Library

### Key Reusable Components

| Component | Props | Description |
|-----------|-------|-------------|
| `ProductCards` | `products[]` | Responsive grid of product cards with add-to-cart |
| `RatingStars` | `rating` | Renders 1–5 amber stars |
| `Loading` | — | Centered spinner with "Loading" label |
| `TimelineStep` | `step, order, isCompleted, isCurrent, isLastStep` | Order progress step |
| `CartModal` | `products, isOpen, onClose` | Full cart drawer with quantity controls |
| `OrderSummary` | — | Order total, savings, checkout button (reads from Redux) |
| `ShopFiltering` | `filters, filtersState, setFiltersState, clearFilters` | Filter sidebar |

### Design Tokens

The project uses a consistent dark design system:

```css
/* Background layers */
--bg-base:    #0d0d0d   /* Page background */
--bg-surface: #111111   /* Cards, sidebar */
--bg-card:    rgba(255,255,255,0.02)  /* Subtle card backgrounds */

/* Borders */
--border:     rgba(255,255,255,0.05)  /* Default border */
--border-hover: rgba(255,255,255,0.15)

/* Primary accent */
--primary:    #ed3849   /* Red — CTAs, active states, badges */
--primary-dark: #d23141

/* Text */
--text-primary: #ffffff
--text-muted:   rgba(255,255,255,0.40)
--text-faint:   rgba(255,255,255,0.20)

/* Fonts */
--font-heading: "Playfair Display", serif  /* Used for h1–h3 */
--font-body:    "Poppins", sans-serif
```

---

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import the project on [vercel.com](https://vercel.com)
3. Set **Root Directory** to `frontend`
4. Set **Build Command** to `yarn build`
5. Set **Output Directory** to `dist`
6. Add environment variables:
   ```
   VITE_STRIPE_PK=pk_live_...
   ```
7. Deploy

### Deploy to Netlify

1. Connect your GitHub repo on [netlify.com](https://netlify.com)
2. Set **Base directory** to `frontend`
3. Set **Build command** to `yarn build`
4. Set **Publish directory** to `frontend/dist`
5. Add environment variables in Site Settings
6. Add `_redirects` file to `/public`:
   ```
   /*    /index.html   200
   ```
   This ensures React Router works with direct URL access.

### Pre-deployment Checklist

- [ ] Update `src/utils/getBaseUrl.js` to point to your production backend URL
- [ ] Set `VITE_STRIPE_PK` to your **live** Stripe publishable key
- [ ] Test Stripe checkout with test cards before going live
- [ ] Ensure the backend `CORS` config allows your frontend domain
- [ ] Verify the backend `BASE_URL` in `src/utilis/baseURL.js` matches your frontend URL

---

## Scripts

```bash
yarn dev        # Start Vite dev server at http://localhost:5173
yarn build      # Production build → /dist
yarn preview    # Preview production build locally
yarn lint       # Run ESLint
```

---

## Browser Support

| Browser | Support |
|---------|---------|
| Chrome 90+ | ✅ Full |
| Firefox 88+ | ✅ Full |
| Safari 14+ | ✅ Full |
| Edge 90+ | ✅ Full |
| IE 11 | ❌ Not supported |

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-feature-name`
3. Make your changes following the existing code style
4. Run the linter: `yarn lint`
5. Commit with a conventional message: `git commit -m 'feat: add dark mode toggle'`
6. Push and open a Pull Request

### Commit Convention

```
feat:     New feature
fix:      Bug fix
style:    Styling changes (no logic)
refactor: Code refactor (no feature/fix)
docs:     Documentation updates
chore:    Build/config changes
```

---

## License

This project is licensed under the **MIT License**.

---

<div align="center">

Built with ❤️ using React 18, Vite, Tailwind CSS, Redux Toolkit & Stripe

</div>
