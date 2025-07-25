// Application State
let appState = {
    bookings: [],
    barbers: [],
    queues: {
        kathmandu: 3,
        pokhara: 1,
        lalitpur: 2,
        bhaktapur: 0,
        biratnagar: 1,
        chitwan: 2
    },
    barberCounts: {
        kathmandu: 15,
        pokhara: 8,
        lalitpur: 10,
        bhaktapur: 6,
        biratnagar: 5,
        chitwan: 4
    },
    currentBarber: null,
    aiRecommendations: []
};

// Sample barber data
const sampleBarbers = [
    { id: 'B001', name: 'Ramesh Shrestha', city: 'kathmandu', status: 'available', earnings: 2500 },
    { id: 'B002', name: 'Suresh Tamang', city: 'pokhara', status: 'available', earnings: 1800 },
    { id: 'B003', name: 'Dinesh Gurung', city: 'lalitpur', status: 'busy', earnings: 2100 }
];

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    updateQueueDisplays();
    setMinDate();
});

// Initialize application data
function initializeApp() {
    // Load data from localStorage if available
    const savedBookings = localStorage.getItem('nepalcutsBookings');
    const savedQueues = localStorage.getItem('nepalcutsQueues');
    
    if (savedBookings) {
        appState.bookings = JSON.parse(savedBookings);
    }
    
    if (savedQueues) {
        appState.queues = JSON.parse(savedQueues);
    }
    
    appState.barbers = sampleBarbers;
    
    // Update statistics
    updateStatistics();
}

// Setup event listeners
function setupEventListeners() {
    // Navigation
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }
    
    // Barber login link
    const barberLoginLink = document.querySelector('.barber-login');
    if (barberLoginLink) {
        barberLoginLink.addEventListener('click', (e) => {
            e.preventDefault();
            showBarberModal();
        });
    }
    
    // City cards click events
    const cityCards = document.querySelectorAll('.city-card');
    cityCards.forEach(card => {
        card.addEventListener('click', () => {
            const city = card.dataset.city;
            showBookingModal(city);
        });
    });
    
    // Upload area click
    const uploadArea = document.getElementById('uploadArea');
    if (uploadArea) {
        uploadArea.addEventListener('click', () => {
            document.getElementById('photoUpload').click();
        });
    }
    
    // Photo upload change
    const photoUpload = document.getElementById('photoUpload');
    if (photoUpload) {
        photoUpload.addEventListener('change', handlePhotoUpload);
    }
    
    // AI photo upload change
    const aiPhotoUpload = document.getElementById('aiPhotoUpload');
    if (aiPhotoUpload) {
        aiPhotoUpload.addEventListener('change', handleAIPhotoUpload);
    }
    
    // Form submissions
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', handleBookingSubmission);
    }
    
    const barberLoginForm = document.getElementById('barberLoginForm');
    if (barberLoginForm) {
        barberLoginForm.addEventListener('submit', handleBarberLogin);
    }
    
    // City selection change
    const customerCity = document.getElementById('customerCity');
    if (customerCity) {
        customerCity.addEventListener('change', updateQueueInfo);
    }
    
    // Close modals on overlay click
    const overlay = document.getElementById('overlay');
    if (overlay) {
        overlay.addEventListener('click', closeAllModals);
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Modal functions
function showBookingModal(selectedCity = '') {
    const modal = document.getElementById('bookingModal');
    const overlay = document.getElementById('overlay');
    
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
    
    if (selectedCity) {
        document.getElementById('customerCity').value = selectedCity;
        updateQueueInfo();
    }
}

function closeBookingModal() {
    document.getElementById('bookingModal').classList.add('hidden');
    document.getElementById('overlay').classList.add('hidden');
}

function showAIModal() {
    const modal = document.getElementById('aiModal');
    const overlay = document.getElementById('overlay');
    
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
}

function closeAIModal() {
    document.getElementById('aiModal').classList.add('hidden');
    document.getElementById('overlay').classList.add('hidden');
}

function showBarberModal() {
    const modal = document.getElementById('barberModal');
    const overlay = document.getElementById('overlay');
    
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
}

function closeBarberModal() {
    document.getElementById('barberModal').classList.add('hidden');
    document.getElementById('overlay').classList.add('hidden');
    
    // Reset barber dashboard
    document.getElementById('barberLogin').classList.remove('hidden');
    document.getElementById('barberDashboard').classList.add('hidden');
}

function closeAllModals() {
    const modals = document.querySelectorAll('.modal');
    const overlay = document.getElementById('overlay');
    
    modals.forEach(modal => modal.classList.add('hidden'));
    overlay.classList.add('hidden');
}

// Photo upload handlers
function handlePhotoUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const uploadArea = document.getElementById('uploadArea');
            uploadArea.innerHTML = `
                <img src="${e.target.result}" alt="Uploaded photo" style="max-width: 200px; border-radius: 10px;">
                <p>Photo uploaded successfully!</p>
            `;
            
            // Simulate AI analysis
            setTimeout(() => {
                showAIResults();
            }, 2000);
        };
        reader.readAsDataURL(file);
    }
}

function handleAIPhotoUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const preview = document.getElementById('uploadPreview');
            preview.innerHTML = `
                <img src="${e.target.result}" alt="Uploaded photo" style="max-width: 200px; border-radius: 10px;">
                <p style="margin-top: 1rem; color: #28a745;">Photo uploaded successfully!</p>
            `;
        };
        reader.readAsDataURL(file);
    }
}

// AI Analysis
function analyzeWithAI() {
    const photoUpload = document.getElementById('aiPhotoUpload');
    const hairLength = document.querySelector('input[name="hairLength"]:checked');
    const styleType = document.querySelector('input[name="styleType"]:checked');
    
    if (!photoUpload.files[0]) {
        showMessage('Please upload a photo first!', 'error');
        return;
    }
    
    if (!hairLength || !styleType) {
        showMessage('Please select your preferences!', 'error');
        return;
    }
    
    // Show loading state
    const analyzeBtn = document.querySelector('.ai-analyze-button');
    const originalText = analyzeBtn.innerHTML;
    analyzeBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analyzing...';
    analyzeBtn.disabled = true;
    
    // Simulate AI analysis
    setTimeout(() => {
        generateAIRecommendations(hairLength.value, styleType.value);
        analyzeBtn.innerHTML = originalText;
        analyzeBtn.disabled = false;
    }, 3000);
}

function generateAIRecommendations(hairLength, styleType) {
    const recommendations = [
        {
            style: 'Modern Fade',
            confidence: 95,
            description: 'Based on your face shape and preferences, a modern fade would complement your features perfectly.',
            price: 'NPR 600-750'
        },
        {
            style: 'Classic Undercut',
            confidence: 88,
            description: 'A timeless style that works well with your hair type and facial structure.',
            price: 'NPR 550-700'
        },
        {
            style: 'Textured Quiff',
            confidence: 82,
            description: 'For a more contemporary look, this style adds volume and character.',
            price: 'NPR 650-800'
        }
    ];
    
    displayAIRecommendations(recommendations);
}

function displayAIRecommendations(recommendations) {
    const display = document.getElementById('aiRecommendationsDisplay');
    
    let html = '<h3 style="color: #2c5530; margin-bottom: 2rem;">AI Style Recommendations</h3>';
    
    recommendations.forEach((rec, index) => {
        html += `
            <div class="style-recommendation">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                    <h4 style="color: #ff6b35;">${rec.style}</h4>
                    <span style="background: #28a745; color: white; padding: 0.5rem 1rem; border-radius: 20px; font-size: 1.2rem;">
                        ${rec.confidence}% Match
                    </span>
                </div>
                <p style="margin-bottom: 1rem; color: #666;">${rec.description}</p>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-weight: 600; color: #ff6b35;">${rec.price}</span>
                    <button onclick="bookRecommendedStyle('${rec.style}')" style="background: #667eea; color: white; border: none; padding: 0.8rem 1.5rem; border-radius: 5px; cursor: pointer;">
                        Book This Style
                    </button>
                </div>
            </div>
        `;
    });
    
    display.innerHTML = html;
}

function bookRecommendedStyle(styleName) {
    closeAIModal();
    showBookingModal();
    showMessage(`${styleName} selected! Please complete your booking details.`, 'success');
}

function showAIResults() {
    const results = document.getElementById('aiResults');
    const suggestions = document.getElementById('styleSuggestions');
    
    suggestions.innerHTML = `
        <div class="style-suggestion">
            <h4>Recommended: Modern Fade</h4>
            <p>95% match based on face shape analysis</p>
        </div>
        <div class="style-suggestion">
            <h4>Alternative: Classic Cut</h4>
            <p>87% match for professional look</p>
        </div>
    `;
    
    results.style.display = 'block';
}

// Booking functions
function handleBookingSubmission(event) {
    event.preventDefault();
    
    const formData = {
        name: document.getElementById('customerName').value,
        phone: document.getElementById('customerPhone').value,
        city: document.getElementById('customerCity').value,
        address: document.getElementById('customerAddress').value,
        service: document.getElementById('serviceType').value,
        date: document.getElementById('preferredDate').value,
        time: document.getElementById('preferredTime').value,
        id: generateBookingId(),
        timestamp: new Date().toISOString(),
        status: 'confirmed'
    };
    
    // Add to bookings
    appState.bookings.push(formData);
    
    // Update queue
    appState.queues[formData.city] = (appState.queues[formData.city] || 0) + 1;
    
    // Save to localStorage
    localStorage.setItem('nepalcutsBookings', JSON.stringify(appState.bookings));
    localStorage.setItem('nepalcutsQueues', JSON.stringify(appState.queues));
    
    // Update displays
    updateQueueDisplays();
    updateStatistics();
    
    // Show success message
    showMessage(`Booking confirmed! Booking ID: ${formData.id}`, 'success');
    
    // Close modal and reset form
    closeBookingModal();
    document.getElementById('bookingForm').reset();
    
    // Send confirmation (simulate)
    sendBookingConfirmation(formData);
}

function generateBookingId() {
    return 'NC' + Date.now().toString().slice(-6);
}

function sendBookingConfirmation(booking) {
    // Simulate sending SMS/email confirmation
    console.log('Sending confirmation to:', booking.phone);
    
    setTimeout(() => {
        showMessage('Confirmation sent to your phone!', 'success');
    }, 1000);
}

// Queue management
function updateQueueInfo() {
    const selectedCity = document.getElementById('customerCity').value;
    
    if (selectedCity) {
        const queueCount = appState.queues[selectedCity] || 0;
        const position = queueCount + 1;
        const estimatedTime = position * 30; // 30 minutes per person
        
        document.getElementById('positionNumber').textContent = position;
        document.getElementById('estimatedTime').textContent = `Estimated wait: ${estimatedTime} minutes`;
    }
}

function updateQueueDisplays() {
    const cityCards = document.querySelectorAll('.city-card');
    
    cityCards.forEach(card => {
        const city = card.dataset.city;
        const queueElement = card.querySelector('.queue-count');
        const barberCountElement = card.querySelector('.barber-count');
        
        if (queueElement) {
            queueElement.textContent = appState.queues[city] || 0;
        }
        
        if (barberCountElement) {
            barberCountElement.textContent = appState.barberCounts[city] || 0;
        }
    });
}

// Barber functions
function handleBarberLogin(event) {
    event.preventDefault();
    
    const barberId = document.getElementById('barberId').value;
    const password = document.getElementById('barberPassword').value;
    
    // Simple authentication (in real app, this would be server-side)
    const barber = appState.barbers.find(b => b.id === barberId);
    
    if (barber && password === 'password123') {
        appState.currentBarber = barber;
        showBarberDashboard(barber);
        showMessage(`Welcome, ${barber.name}!`, 'success');
    } else {
        showMessage('Invalid credentials!', 'error');
    }
}

function showBarberDashboard(barber) {
    document.getElementById('barberLogin').classList.add('hidden');
    document.getElementById('barberDashboard').classList.remove('hidden');
    document.getElementById('barberName').textContent = barber.name;
    
    // Update dashboard data
    updateBarberStats(barber);
    loadBarberAppointments(barber);
}

function updateBarberStats(barber) {
    const todayBookings = appState.bookings.filter(booking => 
        booking.city === barber.city && 
        booking.date === new Date().toISOString().split('T')[0]
    ).length;
    
    document.getElementById('todayBookings').textContent = todayBookings;
    document.getElementById('queueLength').textContent = appState.queues[barber.city] || 0;
    document.getElementById('todayEarnings').textContent = barber.earnings;
}

function loadBarberAppointments(barber) {
    const appointments = appState.bookings.filter(booking => 
        booking.city === barber.city && 
        new Date(booking.date) >= new Date()
    ).slice(0, 5);
    
    const container = document.getElementById('appointmentsList');
    
    if (appointments.length === 0) {
        container.innerHTML = '<p>No upcoming appointments</p>';
        return;
    }
    
    container.innerHTML = appointments.map(appointment => `
        <div class="appointment-item">
            <h5>${appointment.name}</h5>
            <p>Service: ${appointment.service}</p>
            <p>Date: ${new Date(appointment.date).toLocaleDateString()}</p>
            <p>Time: ${appointment.time}</p>
            <p>Phone: ${appointment.phone}</p>
            <p>Address: ${appointment.address}</p>
        </div>
    `).join('');
}

function setStatus(status) {
    if (appState.currentBarber) {
        appState.currentBarber.status = status;
        showMessage(`Status updated to: ${status}`, 'success');
        
        // Update button states
        document.querySelectorAll('.status-btn').forEach(btn => {
            btn.style.opacity = '0.6';
        });
        
        document.querySelector(`.status-btn.${status}`).style.opacity = '1';
    }
}

function logoutBarber() {
    appState.currentBarber = null;
    document.getElementById('barberLogin').classList.remove('hidden');
    document.getElementById('barberDashboard').classList.add('hidden');
    document.getElementById('barberLoginForm').reset();
    showMessage('Logged out successfully!', 'success');
}

// Utility functions
function setMinDate() {
    const dateInput = document.getElementById('preferredDate');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;
        dateInput.value = today;
    }
}

function updateStatistics() {
    const customerCount = document.getElementById('happy-customers');
    const barberCount = document.getElementById('expert-barbers');
    const cityCount = document.getElementById('cities-served');
    
    // Animate numbers
    if (customerCount) {
        animateNumber(customerCount, 1250 + appState.bookings.length);
    }
    
    if (barberCount) {
        animateNumber(barberCount, Object.values(appState.barberCounts).reduce((a, b) => a + b, 0));
    }
    
    if (cityCount) {
        animateNumber(cityCount, Object.keys(appState.barberCounts).length);
    }
}

function animateNumber(element, targetNumber) {
    const start = parseInt(element.textContent) || 0;
    const duration = 2000;
    const increment = (targetNumber - start) / (duration / 16);
    
    let current = start;
    const timer = setInterval(() => {
        current += increment;
        element.textContent = Math.floor(current) + '+';
        
        if (current >= targetNumber) {
            element.textContent = targetNumber + '+';
            clearInterval(timer);
        }
    }, 16);
}

function showMessage(message, type = 'success') {
    const container = document.getElementById('messageContainer');
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    
    container.appendChild(messageDiv);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

// Real-time updates (simulate)
function startRealTimeUpdates() {
    setInterval(() => {
        // Randomly update queue counts
        Object.keys(appState.queues).forEach(city => {
            if (Math.random() < 0.1) { // 10% chance to update
                const change = Math.random() < 0.5 ? -1 : 1;
                appState.queues[city] = Math.max(0, appState.queues[city] + change);
            }
        });
        
        updateQueueDisplays();
    }, 30000); // Update every 30 seconds
}

// Initialize real-time updates
setTimeout(startRealTimeUpdates, 5000);

// Service worker registration for offline support
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
