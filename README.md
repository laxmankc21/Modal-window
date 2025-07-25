# NepalCuts - Professional Barber Service Platform

A comprehensive web application for managing barber services across Nepal, featuring appointment booking, queue management, home service scheduling, and AI assistance.

## 🌟 Features

### 📅 Smart Booking System
- **Multi-step booking process** with intuitive UI
- **Salon visits** and **home service** options
- **8 major cities** coverage across Nepal
- **Real-time service selection** with dynamic pricing
- **Date and time scheduling** with availability checking

### 🏪 City Coverage
- **Kathmandu** (Salon + Home Service)
- **Pokhara** (Salon + Home Service)
- **Chitwan** (Salon + Home Service)
- **Butwal** (Salon + Home Service)
- **Biratnagar** (Salon + Home Service)
- **Dharan** (Salon + Home Service)
- **Janakpur** (Salon Only)
- **Nepalgunj** (Salon Only)

### 💇‍♂️ Services Offered
- **Classic Haircut** - Rs. 500
- **Beard Trim** - Rs. 300
- **Hair Wash & Style** - Rs. 400
- **Home Service** - Additional Rs. 300

### 📊 Queue Management
- **Real-time queue tracking**
- **Live wait time estimates**
- **Position tracking** for customers
- **Automatic queue updates**
- **Service status monitoring**

### 🤖 AI Assistant
- **Intelligent chatbot** for customer support
- **Service information** and pricing queries
- **Booking assistance** and guidance
- **Queue status** real-time updates
- **Location information** for all cities

### 📱 Modern UI/UX
- **Responsive design** for all devices
- **Mobile-first approach**
- **Smooth animations** and transitions
- **Intuitive navigation**
- **Professional branding**

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No server setup required - runs on static hosting

### Installation
1. Clone or download the repository
2. Open `index.html` in your web browser
3. The application will load with all features ready to use

### File Structure
```
nepalcuts/
├── index.html          # Main application file
├── style.css           # Complete styling and responsive design
├── script.js           # Full application logic and functionality
├── README.md           # Documentation
└── .prettierrc         # Code formatting configuration
```

## 💻 Usage Guide

### Booking an Appointment

1. **Choose Service Type**
   - Click "Book Appointment" from the hero section
   - Select either "Salon Visit" or "Home Service"

2. **Select City**
   - Choose from 8 available cities
   - Home service availability varies by city

3. **Choose Services**
   - Select one or more services
   - See real-time price calculation
   - Home service fee added automatically for home bookings

4. **Schedule Date & Time**
   - Pick available date (next day onwards)
   - Choose from available time slots (9 AM - 6 PM)

5. **Provide Contact Information**
   - Enter name and phone number
   - Add address for home service
   - Review total cost

6. **Confirmation**
   - Receive booking confirmation with details
   - Get unique booking ID
   - Automatic queue addition for same-day appointments

### Queue Management

- **Check Current Queue**: View real-time queue status
- **Wait Time Estimation**: See estimated wait time based on queue length
- **Position Tracking**: Monitor your position if you're in the queue
- **Live Updates**: Queue automatically updates every 30 seconds

### AI Assistant Usage

1. Click the floating AI chat button (bottom right)
2. Ask questions about:
   - Service pricing and information
   - Booking assistance
   - Queue status
   - City availability
   - General inquiries

### Mobile Experience

- Fully responsive design
- Touch-friendly interface
- Optimized for mobile booking
- Easy navigation and form filling

## 🛠️ Technical Features

### Frontend Technologies
- **HTML5** - Semantic markup and accessibility
- **CSS3** - Modern styling with Grid and Flexbox
- **Vanilla JavaScript** - No external dependencies
- **Font Awesome** - Professional icons
- **Local Storage** - Persistent data storage

### Key Functionalities
- **State Management** - Centralized application state
- **Form Validation** - Multi-step form with validation
- **Real-time Updates** - Live queue and data updates
- **Responsive Design** - Mobile-first approach
- **Progressive Enhancement** - Works without JavaScript

### Browser Compatibility
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🎨 Design Features

### Color Scheme
- **Primary**: #e74c3c (Red) - Call-to-action elements
- **Secondary**: #667eea (Blue) - Headers and gradients
- **Accent**: #2c3e50 (Dark Blue) - Text and navigation
- **Background**: #f8f9fa (Light Gray) - Section backgrounds

### Typography
- **Font Family**: Segoe UI, Tahoma, Geneva, Verdana, sans-serif
- **Responsive**: 62.5% base font size with rem units
- **Hierarchy**: Clear heading and text size differentiation

### UI Components
- **Cards**: Modern card design with shadows and hover effects
- **Buttons**: Rounded buttons with hover animations
- **Forms**: Clean form design with focus states
- **Modals**: Backdrop blur with smooth animations

## 📊 Data Management

### Local Storage
- **Appointments**: Persistent booking storage
- **User Preferences**: Remember user choices
- **Queue State**: Maintain queue information

### Real-time Features
- **Queue Updates**: Automatic queue progression simulation
- **Time Synchronization**: Real-time clock integration
- **Status Tracking**: Live appointment and queue status

## 🔧 Customization

### Adding New Cities
1. Update `CityData` object in `script.js`
2. Add city card in HTML city grid
3. Specify home service availability

### Modifying Services
1. Update service prices in `ServicePrices` object
2. Modify service cards in HTML
3. Adjust pricing display

### Styling Changes
1. Update CSS custom properties for colors
2. Modify component styles in respective sections
3. Ensure responsive design maintenance

## 🚀 Deployment

### Static Hosting
- **GitHub Pages**: Direct repository hosting
- **Netlify**: Drag and drop deployment
- **Vercel**: Git integration deployment
- **Firebase Hosting**: Google cloud hosting

### Domain Setup
1. Purchase domain name
2. Configure DNS settings
3. Deploy to chosen hosting platform
4. Set up SSL certificate (usually automatic)

## 📈 Future Enhancements

### Planned Features
- **User Accounts**: Customer login and booking history
- **Payment Integration**: Online payment processing
- **SMS Notifications**: Appointment reminders
- **Staff Dashboard**: Barber management interface
- **Review System**: Customer feedback and ratings
- **Advanced AI**: Enhanced chatbot capabilities

### Technical Improvements
- **PWA Support**: Progressive Web App features
- **Offline Mode**: Service worker implementation
- **API Integration**: Backend service connection
- **Real-time Chat**: Live customer support
- **Analytics**: Usage tracking and insights

## 🤝 Contributing

### Development Guidelines
1. Follow existing code structure and naming conventions
2. Maintain responsive design principles
3. Test across different browsers and devices
4. Update documentation for new features

### Code Style
- Use meaningful variable and function names
- Comment complex logic sections
- Follow consistent indentation (2 spaces)
- Use modern JavaScript features appropriately

## 📞 Support

### For Users
- Use the AI assistant for immediate help
- Check the queue status for current information
- Contact support through the application

### For Developers
- Review code comments for implementation details
- Test thoroughly before deploying changes
- Maintain backward compatibility

## 📄 License

This project is open source and available under the MIT License.

## 🎯 Project Goals

NepalCuts aims to revolutionize the barber service industry in Nepal by:
- **Digitizing** traditional barbershop operations
- **Improving** customer experience through technology
- **Expanding** service reach with home service options
- **Modernizing** appointment booking and queue management
- **Providing** intelligent assistance through AI integration

---

**Built with ❤️ for the people of Nepal**