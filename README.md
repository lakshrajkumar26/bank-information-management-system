# 🏦 Bank Information Management System

A comprehensive full-stack web application for managing bank account information with secure authentication, role-based access control, and real-time form validation.

## 🌐 Live Demo

**Frontend:** [https://bank-information-management-system.vercel.app](https://bank-information-management-system.vercel.app)

**Backend API:** [https://bank-information-management-system-oz4y.onrender.com](https://bank-information-management-system-oz4y.onrender.com)

## ✨ Features

### 🔐 Authentication & Security
- **Secure User Registration & Login** with JWT tokens
- **Role-based Access Control** (User, Manager, Admin)
- **Password Hashing** with bcrypt for enhanced security
- **Protected Routes** with authentication middleware
- **Real-time Form Validation** with immediate user feedback

### 🏦 Bank Account Management
- **Add New Bank Accounts** with comprehensive details
- **View All Bank Accounts** with filtering and search
- **Update Account Information** with validation
- **Delete Accounts** with confirmation
- **Account Details Display** with formatted information

### 👥 Multi-Role Dashboard
- **User Dashboard**: Manage personal bank accounts
- **Manager Dashboard**: Oversee user accounts with enhanced permissions
- **Admin Dashboard**: Complete system administration and user management

### 🎨 User Experience
- **Responsive Design** for all devices (mobile, tablet, desktop)
- **Material-UI Components** for professional appearance
- **Real-time Validation** with visual feedback (checkmarks/error icons)
- **Toast Notifications** for user actions and errors
- **Loading States** for better user experience

## 🛠️ Technology Stack

### Frontend
- **React.js** - Modern UI library with hooks
- **React Router** - Single-page application routing
- **Material-UI** - Professional UI components and icons
- **Axios** - HTTP client for API communication
- **Zod** - Schema validation for forms
- **React-Toastify** - User notifications
- **Vite** - Fast build tool and development server

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcrypt** - Password hashing
- **CORS** - Cross-origin resource sharing

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/bank-information-management-system.git
   cd bank-information-management-system
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Environment Setup**

   Create `.env` file in the backend directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   ```

5. **Start Development Servers**

   **Backend:**
   ```bash
   cd backend
   npm start
   ```

   **Frontend:**
   ```bash
   cd frontend
   npm run dev
   ```

6. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## 📋 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Bank Accounts
- `GET /api/bank-accounts` - Get all bank accounts
- `POST /api/bank-accounts` - Create new bank account
- `PUT /api/bank-accounts/:id` - Update bank account
- `DELETE /api/bank-accounts/:id` - Delete bank account

### Admin (Protected)
- `GET /api/admin/users` - Get all users
- `DELETE /api/admin/users/:id` - Delete user

## 🎯 Use Cases

### For Individual Users
- **Store Personal Bank Details**: Securely save multiple bank account information
- **Track Account Information**: Keep organized records of account numbers, balances, and bank details
- **Update Account Status**: Modify account information as needed
- **Secure Access**: Login with username/password to access personal data

### For Bank Managers
- **Oversee User Accounts**: Monitor and manage user bank account submissions
- **Enhanced Permissions**: Access to user account management features
- **Account Verification**: Review and validate user-submitted information

### For System Administrators
- **Complete System Control**: Full access to all features and user management
- **User Management**: Add, edit, or remove users from the system
- **System Monitoring**: Oversee all user activities and account management

## 🔒 Security Features

### Authentication & Authorization
- **JWT Token-based Authentication**: Secure session management
- **Role-based Access Control**: Different permissions for different user types
- **Password Hashing**: bcrypt encryption for password security
- **Protected Routes**: Middleware to secure API endpoints

### Data Validation
- **Real-time Form Validation**: Immediate feedback on user input
- **Server-side Validation**: Double validation for data integrity
- **Input Sanitization**: Prevent malicious input
- **Error Handling**: Comprehensive error management

## 📱 Responsive Design

The application is fully responsive and works seamlessly on:
- **Desktop Computers** (1920px and above)
- **Laptops** (1366px - 1920px)
- **Tablets** (768px - 1366px)
- **Mobile Phones** (320px - 768px)

## 🧪 Form Validation Rules

### Username
- Minimum 3 characters
- Maximum 20 characters
- Only letters, numbers, and underscores allowed

### Email
- Must be a valid email format
- Required field

### Password
- Minimum 6 characters
- Maximum 50 characters
- Must contain uppercase, lowercase, and number

## 🚀 Deployment

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. Deploy automatically on push to main branch

### Backend (Render)
1. Connect your GitHub repository to Render
2. Configure environment variables
3. Set build command: `npm install`
4. Set start command: `npm start`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)

## 🙏 Acknowledgments

- Material-UI for the beautiful component library
- React team for the amazing framework
- MongoDB for the flexible database solution
- All contributors and supporters

---

⭐ **Star this repository if you find it helpful!**
