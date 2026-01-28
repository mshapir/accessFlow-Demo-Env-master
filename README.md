# AccessFlow Demo - Product Catalog

A modern, fully-featured React e-commerce demo application with multiple user workflows and journeys. Built with React, Vite, and configured for automatic deployment to GitHub Pages.

## Features

### Pages
- **Home** - Landing page with featured products and key features
- **Products** - Product catalog with search, filtering, and sorting
- **Product Details** - Individual product view with add to cart
- **Cart** - Shopping cart with quantity management
- **Checkout** - Complete checkout flow with form validation
- **Login/Register** - User authentication system
- **Profile** - User profile management with order history
- **Checkout Success** - Order confirmation page

### User Workflows

#### 1. Authentication Flow
- User registration with validation
- Login with stored credentials
- Protected routes for authenticated users
- Logout functionality

#### 2. Product Browsing & Search
- Browse all products with pagination-ready design
- Search products by name or description
- Filter by category (Electronics, Accessories, Home)
- Filter by price range
- Sort by name, price, or rating

#### 3. Shopping Cart Journey
- Add products to cart from product listing or details page
- Update quantities in cart
- Remove items from cart
- View cart total with tax and shipping calculations
- Persistent cart (localStorage)
- Proceed to checkout

#### 4. Checkout Process
- Review cart items
- Fill out shipping information with validation
- Enter payment information (demo mode)
- Form validation for all fields
- Order confirmation

#### 5. Profile Management (CRUD Operations)
- **Create**: Register new account
- **Read**: View profile information and order history
- **Update**: Edit profile information
- **Delete**: Delete account

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router v6** - Client-side routing
- **Context API** - State management (Auth & Cart)
- **CSS3** - Styling with CSS custom properties
- **LocalStorage** - Data persistence

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/accessFlow-Demo-Env-master.git
cd accessFlow-Demo-Env-master
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

Build the application:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## GitHub Pages Deployment

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

### Setup Instructions

1. **Enable GitHub Pages**:
   - Go to your repository settings
   - Navigate to "Pages" section
   - Under "Build and deployment", select "GitHub Actions" as the source

2. **Update Base Path** (if needed):
   - If your repository name is different, update the `base` path in `vite.config.js`
   - Update the `basename` in `src/App.jsx` to match your repository name

3. **Push to Main/Master Branch**:
   - The workflow automatically triggers on push to `main` or `master` branch
   - Build and deployment happen automatically
   - Site will be available at: `https://yourusername.github.io/accessFlow-Demo-Env-master/`

### Manual Deployment

If you prefer manual deployment:

1. Build the project:
```bash
npm run build
```

2. Deploy the `dist` folder to your hosting service

## Project Structure

```
accessFlow-Demo-Env-master/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions workflow
├── src/
│   ├── components/            # Reusable components
│   │   ├── Header.jsx
│   │   ├── ProductCard.jsx
│   │   ├── SearchBar.jsx
│   │   ├── FilterPanel.jsx
│   │   ├── ProtectedRoute.jsx
│   │   └── FormInput.jsx
│   ├── contexts/              # Context providers
│   │   ├── AuthContext.jsx
│   │   └── CartContext.jsx
│   ├── pages/                 # Page components
│   │   ├── Home.jsx
│   │   ├── Products.jsx
│   │   ├── ProductDetails.jsx
│   │   ├── Cart.jsx
│   │   ├── Checkout.jsx
│   │   ├── CheckoutSuccess.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   └── Profile.jsx
│   ├── utils/                 # Utilities
│   │   ├── mockData.js
│   │   └── validation.js
│   ├── App.jsx               # Main app component
│   ├── main.jsx              # Entry point
│   └── index.css             # Global styles
├── index.html                # HTML template
├── vite.config.js           # Vite configuration
├── package.json             # Dependencies
└── README.md               # This file
```

## Demo Features

### Mock Data
- 15 sample products across multiple categories
- Product images from Unsplash
- Realistic pricing and ratings

### Form Validation
- Email validation
- Password strength requirements (6+ characters)
- Required field validation
- Phone number format validation
- Zip code validation
- Confirm password matching

### Responsive Design
- Mobile-friendly interface
- Tablet and desktop layouts
- Touch-friendly UI elements

## Usage Guide

### Creating an Account
1. Click "Login" in the header
2. Click "Sign up" link
3. Fill in the registration form
4. You'll be automatically logged in

### Shopping
1. Browse products on the Products page
2. Use search to find specific items
3. Apply filters for category and price range
4. Click on a product to view details
5. Add items to cart
6. Review cart and proceed to checkout

### Managing Profile
1. Click "Profile" in the header (when logged in)
2. View your profile information
3. Click "Edit Profile" to update details
4. View your order history
5. Delete account if needed (in Danger Zone)

## Development Notes

- All authentication is mock-based using localStorage
- No backend server required
- Data persists in browser localStorage
- Perfect for demos and prototyping

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This is a demo project for educational purposes.

## Contributing

This is a demo project, but feel free to fork and customize it for your needs!

## Contact

For questions or feedback, please open an issue on GitHub.
