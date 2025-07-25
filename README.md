# NepalCuts - Premium Home Barber Service 🇳🇵✂️

A comprehensive web application for booking premium home barber services across major cities in Nepal, featuring AI-powered style recommendations and real-time queue management.

## 🌟 Features

### Customer Features
- **Home Service Booking**: Schedule professional haircuts and grooming services at your doorstep
- **Multi-City Coverage**: Available in Kathmandu, Pokhara, Lalitpur, Bhaktapur, Biratnagar, and Chitwan
- **AI Style Consultant**: Upload your photo and get personalized hairstyle recommendations
- **Real-time Queue Management**: See current queue status and estimated wait times
- **Service Variety**: Hair cuts, beard trims, face care, and premium packages
- **Mobile Responsive**: Optimized for all devices

### Barber Features
- **Dashboard Login**: Secure access for barbers (ID: B001, B002, B003 | Password: password123)
- **Appointment Management**: View upcoming bookings and customer details
- **Status Control**: Set availability status (Available/Busy/Offline)
- **Earnings Tracking**: Monitor daily earnings and booking statistics
- **Real-time Updates**: Get notified of new bookings instantly

### AI-Powered Features
- **Face Shape Analysis**: AI analyzes uploaded photos to recommend suitable styles
- **Style Matching**: Personalized recommendations based on preferences and facial features
- **Confidence Scoring**: AI provides confidence scores for each recommendation
- **Price Estimation**: Automatic price ranges for recommended styles

## 🏙️ Supported Cities

| City | Barbers Available | Current Queue |
|------|------------------|---------------|
| Kathmandu | 15 | Real-time updates |
| Pokhara | 8 | Real-time updates |
| Lalitpur | 10 | Real-time updates |
| Bhaktapur | 6 | Real-time updates |
| Biratnagar | 5 | Real-time updates |
| Chitwan | 4 | Real-time updates |

## 💰 Service Pricing

- **Hair Cut**: NPR 500-800
- **Beard Trim**: NPR 300-500
- **Face Care**: NPR 400-600
- **Premium Package**: NPR 1200-1800

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Node.js (optional, for development server)

### Installation

1. **Clone or Download**
   ```bash
   git clone https://github.com/nepalcuts/barber-service.git
   cd nepalcuts-barber-service
   ```

2. **Open in Browser**
   - Simply open `index.html` in your web browser
   - Or use a local server for better performance

3. **Development Server** (Optional)
   ```bash
   npm install
   npm start
   ```
   Visit `http://localhost:3000`

## 📱 How to Use

### For Customers

1. **Browse Services**: Explore available services and pricing
2. **Select City**: Choose your city from the available locations
3. **Book Appointment**: 
   - Click "Book Your Cut Now" or select a city card
   - Fill in your details (name, phone, address)
   - Choose service type and preferred time
   - Confirm booking
4. **AI Style Consultation**:
   - Click "Try AI Stylist"
   - Upload your photo
   - Select preferences (hair length, style type)
   - Get personalized recommendations
   - Book recommended style directly

### For Barbers

1. **Login**: Click "Barber Login" in navigation
2. **Enter Credentials**:
   - Barber ID: B001, B002, or B003
   - Password: password123
3. **Dashboard Access**:
   - View today's bookings and earnings
   - See current queue length
   - Manage upcoming appointments
   - Update availability status

## 🤖 AI Features

### Style Analysis
The AI system analyzes uploaded photos to:
- Detect face shape and features
- Match with suitable hairstyles
- Consider user preferences
- Provide confidence scores

### Recommendation Algorithm
- **Face Shape Detection**: Oval, round, square, heart-shaped faces
- **Hair Type Analysis**: Texture, thickness, natural growth patterns
- **Style Matching**: Modern, classic, trendy styles
- **Preference Integration**: User-selected length and style preferences

## 🔧 Technical Features

### Frontend Technologies
- **HTML5**: Semantic markup and modern features
- **CSS3**: Grid, Flexbox, animations, and responsive design
- **JavaScript ES6+**: Modern JavaScript with classes and modules
- **Font Awesome**: Icons and visual elements
- **Google Fonts**: Poppins font family

### Key Functionalities
- **Local Storage**: Persistent data storage for bookings and preferences
- **Real-time Updates**: Queue status updates every 30 seconds
- **Form Validation**: Client-side validation for all forms
- **Image Upload**: File handling for AI photo analysis
- **Responsive Design**: Mobile-first approach
- **Smooth Animations**: CSS transitions and JavaScript animations

### Browser Compatibility
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 📊 Data Management

### Local Storage
- Customer bookings
- Queue status
- User preferences
- Barber login sessions

### Sample Data
The application includes sample data for:
- 3 registered barbers
- Queue information for all cities
- Service pricing and availability

## 🎨 Design Features

### Modern UI/UX
- **Clean Design**: Minimalist and professional appearance
- **Color Scheme**: Nepal-inspired colors with modern gradients
- **Typography**: Readable fonts with proper hierarchy
- **Interactive Elements**: Hover effects and smooth transitions

### Responsive Layout
- **Mobile-First**: Optimized for mobile devices
- **Tablet Support**: Adapted layouts for medium screens
- **Desktop Enhanced**: Full features on large screens

## 🔒 Security Considerations

### Client-Side Security
- Input validation and sanitization
- XSS prevention measures
- Secure form handling

### Production Recommendations
- Implement server-side authentication
- Use HTTPS for all communications
- Add rate limiting for API calls
- Implement proper session management

## 🚀 Future Enhancements

### Technical Improvements
- [ ] Backend API integration
- [ ] Real-time notifications (WebSocket)
- [ ] Payment gateway integration
- [ ] GPS tracking for barbers
- [ ] Video consultation feature

### Business Features
- [ ] Customer reviews and ratings
- [ ] Loyalty program
- [ ] Promotional codes and discounts
- [ ] Multi-language support (Nepali)
- [ ] Advanced AI recommendations

### Scalability
- [ ] Database integration
- [ ] Cloud storage for images
- [ ] CDN for static assets
- [ ] Progressive Web App (PWA)

## 📞 Support

For technical support or business inquiries:
- Email: support@nepalcuts.com
- Phone: +977-1-XXXXXXX
- Website: https://nepalcuts.com

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 👥 Team

- **Frontend Development**: Modern web technologies
- **UI/UX Design**: User-centered design approach
- **AI Integration**: Machine learning for style recommendations
- **Business Logic**: Nepal market expertise

---

**Made with ❤️ for Nepal's grooming industry**