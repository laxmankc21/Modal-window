// Global State Management
const AppState = {
    currentStep: 1,
    bookingType: null,
    selectedCity: null,
    selectedServices: [],
    totalCost: 0,
    appointments: JSON.parse(localStorage.getItem('appointments') || '[]'),
    queue: [
        { name: 'Being Served', service: 'Haircut + Beard', status: 'active' },
        { name: 'Ram B.', service: 'Haircut', status: 'waiting' },
        { name: 'Shyam K.', service: 'Beard Trim', status: 'waiting' }
    ]
};

// Service prices
const ServicePrices = {
    haircut: 500,
    beard: 300,
    wash: 400,
    homeService: 300
};

// City data
const CityData = {
    kathmandu: { name: 'Kathmandu', homeServiceAvailable: true },
    pokhara: { name: 'Pokhara', homeServiceAvailable: true },
    chitwan: { name: 'Chitwan', homeServiceAvailable: true },
    butwal: { name: 'Butwal', homeServiceAvailable: true },
    biratnagar: { name: 'Biratnagar', homeServiceAvailable: true },
    dharan: { name: 'Dharan', homeServiceAvailable: true },
    janakpur: { name: 'Janakpur', homeServiceAvailable: false },
    nepalgunj: { name: 'Nepalgunj', homeServiceAvailable: false }
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    updateQueueDisplay();
    setMinDate();
});

function initializeApp() {
    // Update queue count in hero
    updateQueueCount();
    
    // Initialize smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function setupEventListeners() {
    // Booking form submission
    document.getElementById('bookingForm').addEventListener('submit', handleBookingSubmission);
    
    // Service selection change
    document.querySelectorAll('.service-option input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', updateTotalCost);
    });
    
    // AI Chat input
    document.getElementById('chatInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Close modals on overlay click
    document.getElementById('overlay').addEventListener('click', function() {
        closeAllModals();
    });
    
    // Mobile navigation
    document.querySelector('.hamburger').addEventListener('click', toggleMobileMenu);
}

// Navigation Functions
function showBookingModal() {
    document.getElementById('bookingModal').classList.remove('hidden');
    document.getElementById('overlay').classList.remove('hidden');
    resetBookingForm();
}

function closeBookingModal() {
    document.getElementById('bookingModal').classList.add('hidden');
    document.getElementById('overlay').classList.add('hidden');
}

function showQueueStatus() {
    document.querySelector('#queue').scrollIntoView({
        behavior: 'smooth'
    });
}

function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('active');
}

// Booking System Functions
function selectBookingType(type) {
    AppState.bookingType = type;
    const modalTitle = document.getElementById('modalTitle');
    
    if (type === 'salon') {
        modalTitle.textContent = 'Book Salon Appointment';
        document.getElementById('homeServiceOption').style.display = 'none';
        document.getElementById('addressGroup').style.display = 'none';
    } else {
        modalTitle.textContent = 'Book Home Service';
        document.getElementById('homeServiceOption').style.display = 'block';
        document.getElementById('addressGroup').style.display = 'block';
        // Auto-check home service fee
        document.getElementById('homeServiceCheckbox').checked = true;
    }
    
    showBookingModal();
}

function selectCity(cityKey) {
    AppState.selectedCity = cityKey;
    
    // Remove previous selections
    document.querySelectorAll('.city-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // Add selection to clicked city
    event.target.closest('.city-card').classList.add('selected');
    
    // Check if home service is available for this city
    if (AppState.bookingType === 'home' && !CityData[cityKey].homeServiceAvailable) {
        alert(`Sorry, home service is not available in ${CityData[cityKey].name} yet. Please select a different city or choose salon visit.`);
        AppState.selectedCity = null;
        event.target.closest('.city-card').classList.remove('selected');
        return;
    }
    
    // Enable next button
    document.getElementById('nextBtn').disabled = false;
}

function nextStep() {
    if (!validateCurrentStep()) {
        return;
    }
    
    AppState.currentStep++;
    updateStepDisplay();
    updateNavigationButtons();
}

function previousStep() {
    AppState.currentStep--;
    updateStepDisplay();
    updateNavigationButtons();
}

function updateStepDisplay() {
    // Hide all steps
    document.querySelectorAll('.form-step').forEach(step => {
        step.classList.add('hidden');
    });
    
    // Show current step
    document.getElementById(`step${AppState.currentStep}`).classList.remove('hidden');
}

function updateNavigationButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    
    // Show/hide previous button
    prevBtn.style.display = AppState.currentStep > 1 ? 'block' : 'none';
    
    // Show/hide next vs submit button
    if (AppState.currentStep === 4) {
        nextBtn.style.display = 'none';
        submitBtn.style.display = 'block';
    } else {
        nextBtn.style.display = 'block';
        submitBtn.style.display = 'none';
    }
}

function validateCurrentStep() {
    switch (AppState.currentStep) {
        case 1:
            if (!AppState.selectedCity) {
                alert('Please select a city.');
                return false;
            }
            break;
        case 2:
            const selectedServices = document.querySelectorAll('.service-option input[type="checkbox"]:checked');
            if (selectedServices.length === 0) {
                alert('Please select at least one service.');
                return false;
            }
            break;
        case 3:
            const date = document.getElementById('appointmentDate').value;
            const time = document.getElementById('appointmentTime').value;
            if (!date || !time) {
                alert('Please select both date and time.');
                return false;
            }
            break;
        case 4:
            const name = document.getElementById('customerName').value;
            const phone = document.getElementById('customerPhone').value;
            if (!name || !phone) {
                alert('Please fill in all required fields.');
                return false;
            }
            if (AppState.bookingType === 'home') {
                const address = document.getElementById('customerAddress').value;
                if (!address) {
                    alert('Please provide your address for home service.');
                    return false;
                }
            }
            break;
    }
    return true;
}

function updateTotalCost() {
    const selectedServices = document.querySelectorAll('.service-option input[type="checkbox"]:checked');
    let total = 0;
    
    AppState.selectedServices = [];
    
    selectedServices.forEach(service => {
        const price = parseInt(service.dataset.price);
        total += price;
        AppState.selectedServices.push({
            name: service.value,
            price: price
        });
    });
    
    AppState.totalCost = total;
    document.getElementById('totalCost').textContent = total;
}

function handleBookingSubmission(e) {
    e.preventDefault();
    
    if (!validateCurrentStep()) {
        return;
    }
    
    // Collect booking data
    const bookingData = {
        id: Date.now(),
        type: AppState.bookingType,
        city: AppState.selectedCity,
        services: AppState.selectedServices,
        date: document.getElementById('appointmentDate').value,
        time: document.getElementById('appointmentTime').value,
        name: document.getElementById('customerName').value,
        phone: document.getElementById('customerPhone').value,
        address: AppState.bookingType === 'home' ? document.getElementById('customerAddress').value : null,
        totalCost: AppState.totalCost,
        status: 'confirmed',
        createdAt: new Date().toISOString()
    };
    
    // Save booking
    AppState.appointments.push(bookingData);
    localStorage.setItem('appointments', JSON.stringify(AppState.appointments));
    
    // Add to queue if it's for today
    const today = new Date().toISOString().split('T')[0];
    if (bookingData.date === today) {
        addToQueue(bookingData);
    }
    
    // Show success modal
    showSuccessModal(bookingData);
    
    // Close booking modal
    closeBookingModal();
}

function addToQueue(appointment) {
    const queueItem = {
        name: appointment.name,
        service: appointment.services.map(s => s.name).join(' + '),
        status: 'waiting'
    };
    
    AppState.queue.push(queueItem);
    updateQueueDisplay();
}

function showSuccessModal(bookingData) {
    const successModal = document.getElementById('successModal');
    const bookingDetails = document.getElementById('bookingDetails');
    
    const serviceNames = bookingData.services.map(s => s.name).join(', ');
    const cityName = CityData[bookingData.city].name;
    
    bookingDetails.innerHTML = `
        <h4>Booking Details:</h4>
        <p><strong>Type:</strong> ${bookingData.type === 'home' ? 'Home Service' : 'Salon Visit'}</p>
        <p><strong>City:</strong> ${cityName}</p>
        <p><strong>Services:</strong> ${serviceNames}</p>
        <p><strong>Date:</strong> ${formatDate(bookingData.date)}</p>
        <p><strong>Time:</strong> ${formatTime(bookingData.time)}</p>
        <p><strong>Total Cost:</strong> Rs. ${bookingData.totalCost}</p>
        ${bookingData.address ? `<p><strong>Address:</strong> ${bookingData.address}</p>` : ''}
        <p><strong>Booking ID:</strong> ${bookingData.id}</p>
    `;
    
    successModal.classList.remove('hidden');
    document.getElementById('overlay').classList.remove('hidden');
}

function closeSuccessModal() {
    document.getElementById('successModal').classList.add('hidden');
    document.getElementById('overlay').classList.add('hidden');
}

function resetBookingForm() {
    AppState.currentStep = 1;
    AppState.selectedCity = null;
    AppState.selectedServices = [];
    AppState.totalCost = 0;
    
    // Reset form
    document.getElementById('bookingForm').reset();
    
    // Reset UI
    document.querySelectorAll('.city-card').forEach(card => card.classList.remove('selected'));
    document.querySelectorAll('.service-option input[type="checkbox"]').forEach(cb => cb.checked = false);
    document.getElementById('totalCost').textContent = '0';
    
    updateStepDisplay();
    updateNavigationButtons();
}

// Queue Management Functions
function updateQueueDisplay() {
    const queueCount = document.getElementById('queueCount');
    const estimatedWait = document.getElementById('estimatedWait');
    const queueList = document.getElementById('queueList');
    const currentQueue = document.getElementById('currentQueue');
    
    const waitingCount = AppState.queue.filter(item => item.status === 'waiting').length;
    
    queueCount.textContent = waitingCount;
    currentQueue.textContent = waitingCount;
    estimatedWait.textContent = `${waitingCount * 15} minutes`;
    
    // Update queue list
    queueList.innerHTML = '';
    AppState.queue.forEach((item, index) => {
        const queueItem = document.createElement('div');
        queueItem.className = 'queue-item';
        queueItem.innerHTML = `
            <span class="queue-position">${index + 1}</span>
            <span class="queue-name">${item.name}</span>
            <span class="queue-service">${item.service}</span>
        `;
        queueList.appendChild(queueItem);
    });
}

function updateQueueCount() {
    const waitingCount = AppState.queue.filter(item => item.status === 'waiting').length;
    document.getElementById('currentQueue').textContent = waitingCount;
    document.getElementById('avgWaitTime').textContent = waitingCount * 15;
}

// AI Chat Functions
function toggleAIChat() {
    const aiChatModal = document.getElementById('aiChatModal');
    aiChatModal.classList.toggle('hidden');
}

function sendMessage() {
    const chatInput = document.getElementById('chatInput');
    const message = chatInput.value.trim();
    
    if (!message) return;
    
    // Add user message
    addChatMessage(message, 'user');
    
    // Clear input
    chatInput.value = '';
    
    // Generate AI response
    setTimeout(() => {
        const response = generateAIResponse(message);
        addChatMessage(response, 'ai');
    }, 1000);
}

function addChatMessage(message, type) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = type === 'user' ? 'user-message' : 'ai-message';
    messageDiv.innerHTML = `<p>${message}</p>`;
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function generateAIResponse(userMessage) {
    const message = userMessage.toLowerCase();
    
    // Simple AI responses based on keywords
    if (message.includes('price') || message.includes('cost')) {
        return `Our service prices are:
        • Haircut: Rs. 500
        • Beard Trim: Rs. 300
        • Hair Wash & Style: Rs. 400
        • Home Service (additional): Rs. 300
        
        Would you like to book an appointment?`;
    }
    
    if (message.includes('book') || message.includes('appointment')) {
        return `I can help you book an appointment! We offer:
        • Salon visits in all our locations
        • Home service in major cities
        
        Click the "Book Appointment" button to get started, or tell me what type of service you're looking for.`;
    }
    
    if (message.includes('queue') || message.includes('wait')) {
        const waitingCount = AppState.queue.filter(item => item.status === 'waiting').length;
        return `Currently there are ${waitingCount} people in the queue. Estimated wait time is ${waitingCount * 15} minutes.`;
    }
    
    if (message.includes('city') || message.includes('location')) {
        return `We serve these cities:
        • Kathmandu (Salon + Home Service)
        • Pokhara (Salon + Home Service)
        • Chitwan (Salon + Home Service)
        • Butwal (Salon + Home Service)
        • Biratnagar (Salon + Home Service)
        • Dharan (Salon + Home Service)
        • Janakpur (Salon only)
        • Nepalgunj (Salon only)
        
        Which city are you in?`;
    }
    
    if (message.includes('home service')) {
        return `Our home service is available in major cities including Kathmandu, Pokhara, Chitwan, Butwal, Biratnagar, and Dharan. There's an additional Rs. 300 fee for home service. Would you like to book a home service appointment?`;
    }
    
    if (message.includes('thank') || message.includes('thanks')) {
        return `You're welcome! If you need any other assistance with booking appointments or have questions about our services, feel free to ask. We're here to help! 😊`;
    }
    
    // Default responses
    const defaultResponses = [
        "I can help you with booking appointments, checking prices, queue status, and service information. What would you like to know?",
        "I'm here to assist you with NepalCuts services. You can ask me about pricing, booking, locations, or queue status.",
        "How can I help you today? I can provide information about our services, help you book appointments, or check current queue status."
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}

// Utility Functions
function setMinDate() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const dateInput = document.getElementById('appointmentDate');
    dateInput.min = tomorrow.toISOString().split('T')[0];
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function formatTime(timeString) {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
}

function closeAllModals() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.classList.add('hidden');
    });
    document.getElementById('overlay').classList.add('hidden');
}

// Simulate real-time queue updates
setInterval(() => {
    // Randomly advance queue (simulate completed services)
    if (Math.random() < 0.1 && AppState.queue.length > 1) {
        AppState.queue.shift(); // Remove first person
        updateQueueDisplay();
        updateQueueCount();
    }
    
    // Randomly add new people to queue
    if (Math.random() < 0.05) {
        const names = ['Bikash S.', 'Pradeep L.', 'Sanjay T.', 'Ravi M.', 'Krishna B.'];
        const services = ['Haircut', 'Beard Trim', 'Haircut + Beard', 'Hair Wash'];
        
        AppState.queue.push({
            name: names[Math.floor(Math.random() * names.length)],
            service: services[Math.floor(Math.random() * services.length)],
            status: 'waiting'
        });
        
        updateQueueDisplay();
        updateQueueCount();
    }
}, 30000); // Update every 30 seconds

// Handle page visibility for real-time updates
document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
        updateQueueDisplay();
        updateQueueCount();
    }
});
