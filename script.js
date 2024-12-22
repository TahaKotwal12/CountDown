// Error handler for map loading
function mapError() {
    document.getElementById("map").innerHTML = `
        <div style="text-align: center; padding: 20px; background: #fff; border-radius: 10px;">
            <p style="color: #e74c3c; margin-bottom: 10px;">Unable to load the map</p>
            <p>Please check your internet connection and refresh the page.</p>
        </div>
    `;
}

// Set the date we're counting down to
const countDownDate = new Date("Dec 28, 2024 09:00:00").getTime();

// Update the countdown every 1 second
const x = setInterval(function() {
    // Get today's date and time
    const now = new Date().getTime();
    
    // Find the distance between now and the count down date
    const distance = countDownDate - now;
    
    // Time calculations for days, hours, minutes and seconds
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    // Display the results
    document.getElementById("days").textContent = String(days).padStart(2, '0');
    document.getElementById("hours").textContent = String(hours).padStart(2, '0');
    document.getElementById("minutes").textContent = String(minutes).padStart(2, '0');
    document.getElementById("seconds").textContent = String(seconds).padStart(2, '0');
    
    // If the countdown is finished, display message
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("countdown").innerHTML = "<h2>The wait is over! 🎉</h2>";
    }
}, 1000);

// Destinations data
const destinations = {
    mahabaleshwar: { lat: 17.9307, lng: 73.6477, title: "Mahabaleshwar" },
    tamhiniGhat: { lat: 18.4519, lng: 73.4246, title: "Tamhini Ghat" },
    pawnaLake: { lat: 18.6425, lng: 73.4877, title: "Pawna Lake" },
    bapdevGhat: { lat: 18.4167, lng: 73.4833, title: "Bapdev Ghat" },
    fcRoad: { lat: 18.5285, lng: 73.8414, title: "FC Road" },
    khadakwaslaDam: { lat: 18.4421, lng: 73.7710, title: "Khadakwasla Dam" },
    devkundWaterfall: { lat: 18.4157, lng: 73.4046, title: "Devkund Waterfall" },
    mulshiLake: { lat: 18.5291, lng: 73.5097, title: "Mulshi Lake" }
};

// Restaurants data
const restaurants = {
    krishnaPureVeg: { lat: 18.5245, lng: 73.8416, title: "Krishna Pure Veg" },
    jyotiRestaurant: { lat: 18.5195, lng: 73.8553, title: "Jyoti Restaurant" },
    shivSagarMulshi: { lat: 18.5291, lng: 73.5097, title: "Shiv Sagar Mulshi" },
    mangoanHotel: { lat: 18.5285, lng: 73.8744, title: "Mangoan Hotel" },
    hotelAgra: { lat: 18.5285, lng: 73.8744, title: "Hotel Agra" },
    arabianBytes: { lat: 18.5285, lng: 73.8744, title: "Arabian Bytes" },
    sweetzoo: { lat: 18.5285, lng: 73.8744, title: "Sweetzoo" },
    iraniCafe: { lat: 18.5285, lng: 73.8744, title: "Irani Cafe" },
    cafeLoveBite: { lat: 18.5285, lng: 73.8744, title: "Cafe Love Bite" }
};

// Initialize the map
function initMap() {
    try {
        // Pune, India coordinates
        const hometown = { lat: 18.5285, lng: 73.8744 };
        
        const map = new google.maps.Map(document.getElementById("map"), {
            zoom: 10,
            center: hometown,
            mapTypeId: 'terrain',
            styles: [
                {
                    featureType: "all",
                    elementType: "geometry",
                    stylers: [{ color: "#e3f2fd" }]
                },
                {
                    featureType: "water",
                    elementType: "geometry",
                    stylers: [{ color: "#bbdefb" }]
                },
                {
                    featureType: "landscape",
                    elementType: "geometry",
                    stylers: [{ color: "#e3f2fd" }]
                }
            ]
        });

        // Create marker groups
        const destinationMarkers = [];
        const restaurantMarkers = [];
        
        // Add main meeting point marker (heart shape)
        const meetingPoint = new google.maps.Marker({
            position: hometown,
            map: map,
            title: "Meeting Point ❤️",
            animation: google.maps.Animation.BOUNCE,
            icon: {
                path: 'M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z',
                fillColor: '#e74c3c',
                fillOpacity: 1,
                strokeColor: '#fff',
                strokeWeight: 2,
                scale: 1.5
            }
        });

        // Add destination markers with custom icons
        Object.entries(destinations).forEach(([name, location], index) => {
            setTimeout(() => {
                const marker = new google.maps.Marker({
                    position: location,
                    map: map,
                    title: location.title,
                    animation: google.maps.Animation.DROP,
                    icon: {
                        path: google.maps.SymbolPath.CIRCLE,
                        scale: 8,
                        fillColor: "#2196f3",
                        fillOpacity: 0.9,
                        strokeWeight: 2,
                        strokeColor: "#fff"
                    }
                });
                
                destinationMarkers.push(marker);
                
                const infoWindow = new google.maps.InfoWindow({
                    content: `
                        <div style='padding: 10px; max-width: 200px; text-align: center;'>
                            <h3 style='color: #2196f3; margin-bottom: 5px; font-family: Arial;'>${location.title}</h3>
                            <p style='color: #34495e;'>Can't wait to explore with you! 🌟</p>
                        </div>
                    `
                });
                
                marker.addListener("click", () => {
                    infoWindow.open(map, marker);
                });
            }, index * 200);
        });

        // Add restaurant markers with custom icons
        Object.entries(restaurants).forEach(([name, location], index) => {
            setTimeout(() => {
                const marker = new google.maps.Marker({
                    position: location,
                    map: map,
                    title: location.title,
                    animation: google.maps.Animation.DROP,
                    icon: {
                        path: google.maps.SymbolPath.CIRCLE,
                        scale: 6,
                        fillColor: "#e74c3c",
                        fillOpacity: 0.9,
                        strokeWeight: 2,
                        strokeColor: "#fff"
                    }
                });
                
                restaurantMarkers.push(marker);
                
                const infoWindow = new google.maps.InfoWindow({
                    content: `
                        <div style='padding: 10px; max-width: 200px; text-align: center;'>
                            <h3 style='color: #e74c3c; margin-bottom: 5px; font-family: Arial;'>${location.title}</h3>
                            <p style='color: #34495e;'>Let's enjoy a meal together! 🍽️</p>
                        </div>
                    `
                });
                
                marker.addListener("click", () => {
                    infoWindow.open(map, marker);
                });
            }, (index + Object.keys(destinations).length) * 200);
        });

        // Create paths between destinations
        const destinationPath = new google.maps.Polyline({
            path: [hometown, ...Object.values(destinations).map(d => ({ lat: d.lat, lng: d.lng }))],
            geodesic: true,
            strokeColor: "#2196f3",
            strokeOpacity: 0.8,
            strokeWeight: 2
        });
        destinationPath.setMap(map);

        // Fit map to show all markers
        const bounds = new google.maps.LatLngBounds();
        [...destinationMarkers, ...restaurantMarkers, meetingPoint].forEach(marker => {
            if (marker && marker.getPosition) {
                bounds.extend(marker.getPosition());
            }
        });
        map.fitBounds(bounds);

        // Add legend to map
        const legend = document.createElement('div');
        legend.style.cssText = `
            background: white;
            padding: 10px;
            margin: 10px;
            border-radius: 5px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
            font-family: Arial, sans-serif;
            font-size: 12px;
        `;
        legend.innerHTML = `
            <div style="margin-bottom: 5px;">
                <span style="display: inline-block; width: 10px; height: 10px; background: #e74c3c; border-radius: 50%; margin-right: 5px;"></span>
                Restaurants
            </div>
            <div>
                <span style="display: inline-block; width: 10px; height: 10px; background: #2196f3; border-radius: 50%; margin-right: 5px;"></span>
                Destinations
            </div>
        `;
        map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(legend);

    } catch (error) {
        console.error("Map loading error:", error);
        mapError();
    }
}

// Load saved wishes from localStorage
function loadSavedWishes() {
    const savedWishes = JSON.parse(localStorage.getItem('wishes') || '{}');
    const checkboxes = document.querySelectorAll('.wish-item input[type="checkbox"]');
    
    checkboxes.forEach(checkbox => {
        if (savedWishes[checkbox.id]) {
            checkbox.checked = true;
            updateWishItemStyle(checkbox);
        }
    });
}

// Save wish state to localStorage
function saveWishState(wishId, checked) {
    const savedWishes = JSON.parse(localStorage.getItem('wishes') || '{}');
    savedWishes[wishId] = checked;
    localStorage.setItem('wishes', JSON.stringify(savedWishes));
}

// Update wish item style based on checkbox state
function updateWishItemStyle(checkbox) {
    const label = checkbox.nextElementSibling;
    if (checkbox.checked) {
        label.style.textDecoration = 'line-through';
        label.style.color = '#95a5a6';
    } else {
        label.style.textDecoration = 'none';
        label.style.color = '#34495e';
    }
}

// Add event listeners to checkboxes
function setupCheckboxListeners() {
    const checkboxes = document.querySelectorAll('.wish-item input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            updateWishItemStyle(this);
            saveWishState(this.id, this.checked);
        });
    });
}

// Wishlist functionality
function addWish() {
    const wishInput = document.getElementById("newWish");
    const wishText = wishInput.value.trim();
    
    if (wishText) {
        const wishlistContainer = document.querySelector(".wishlist-container");
        const wishCount = wishlistContainer.children.length + 1;
        
        const wishItem = document.createElement("div");
        wishItem.className = "wish-item";
        wishItem.innerHTML = `
            <input type="checkbox" id="wish${wishCount}">
            <label for="wish${wishCount}">${wishText}</label>
        `;
        
        wishlistContainer.appendChild(wishItem);
        wishInput.value = "";
        
        // Setup checkbox listener for new wish
        const checkbox = wishItem.querySelector('input[type="checkbox"]');
        checkbox.addEventListener('change', function() {
            updateWishItemStyle(this);
            saveWishState(this.id, this.checked);
        });
        
        // Add animation
        wishItem.style.opacity = "0";
        wishItem.style.transform = "translateX(-20px)";
        setTimeout(() => {
            wishItem.style.transition = "all 0.3s ease";
            wishItem.style.opacity = "1";
            wishItem.style.transform = "translateX(0)";
        }, 10);
    }
}

// Add enter key support for adding wishes
document.getElementById("newWish").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addWish();
    }
});

// Initialize map when the page loads
window.initMap = initMap;

// Initialize wishlist features when the page loads
document.addEventListener('DOMContentLoaded', () => {
    loadSavedWishes();
    setupCheckboxListeners();
});

// Add these functions to your existing script.js file

// Calendar Generation
function generateCalendar() {
    const currentDate = new Date();
    const targetDate = new Date("Dec 28, 2024 09:00:00");
    const calendarGrid = document.getElementById('calendarGrid');
    
    // Clear existing calendar
    calendarGrid.innerHTML = '';
    
    // Generate days from current date to target date
    let tempDate = new Date(currentDate);
    
    while (tempDate <= targetDate) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        
        // Check if it's the special day
        if (tempDate.getDate() === targetDate.getDate() && 
            tempDate.getMonth() === targetDate.getMonth() && 
            tempDate.getFullYear() === targetDate.getFullYear()) {
            dayElement.classList.add('special');
        }
        
        dayElement.textContent = tempDate.getDate();
        calendarGrid.appendChild(dayElement);
        
        tempDate.setDate(tempDate.getDate() + 1);
    }
}

// Love Notes Rotation
const loveNotes = [
    "Some notes for the pasandida Aurat",
    "Every second with you is a gift! 🎁",
    "Can't wait to see your beautiful smile! 😊",
    "You make my world brighter! ✨",
    "Counting down to our next adventure! 🌟",
    "You're the best part of my day! 💖",
    "Missing your sweet presence! 🌹",
    "Together is my favorite place to be! 🏡",
    "You're worth every second of waiting! ⌛",
];

let currentNoteIndex = 0;

function rotateLoveNotes() {
    const loveNoteElement = document.getElementById('loveNote');
    loveNoteElement.style.opacity = '0';
    
    setTimeout(() => {
        loveNoteElement.textContent = loveNotes[currentNoteIndex];
        loveNoteElement.style.opacity = '1';
        currentNoteIndex = (currentNoteIndex + 1) % loveNotes.length;
    }, 500);
}

// Surprise Feature
let surpriseShown = false;

function showSurprise() {
    const surpriseContent = document.getElementById('surpriseContent');
    const moodItems = document.querySelectorAll('.mood-item');
    
    if (!surpriseShown) {
        surpriseContent.classList.add('show');
        moodItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.transform = 'translateY(-5px)';
                item.style.opacity = '1';
            }, index * 200);
        });
        surpriseShown = true;
    } else {
        surpriseContent.classList.remove('show');
        moodItems.forEach(item => {
            item.style.transform = 'translateY(0)';
            item.style.opacity = '0';
        });
        surpriseShown = false;
    }
}

// Initialize new features
document.addEventListener('DOMContentLoaded', () => {
    generateCalendar();
    rotateLoveNotes();
    setInterval(rotateLoveNotes, 5000); // Rotate love notes every 5 seconds
});
