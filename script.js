document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive elements
    initFloatingHearts();
    initThemeToggle();
    initCountdown();
    initQuotes();
    initReasonCards();
    initMusicPlayer();
    initGalleryLightbox();
    initVirtualGifts();
    initLetterReadAloud();
    initLoveNotes();
    initEncouragementMessages();
    initSectionAnimations();
    initSurpriseButton();
    init3DHeartAnimation();
});

// Floating Hearts Animation
function initFloatingHearts() {
    const heartsContainer = document.querySelector('.floating-hearts');
    
    // Create 20 hearts with random properties
    for (let i = 0; i < 20; i++) {
        createHeart(heartsContainer);
    }
    
    // Create a new heart every 3 seconds
    setInterval(() => {
        createHeart(heartsContainer);
    }, 3000);
}

function createHeart(container) {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '<i class="fas fa-heart"></i>';
    
    // Random position, size, and animation duration
    const left = Math.random() * 100;
    const size = Math.random() * 1 + 0.5; // 0.5 to 1.5
    const duration = Math.random() * 10 + 10; // 10 to 20 seconds
    const delay = Math.random() * 5;
    
    heart.style.left = `${left}vw`;
    heart.style.fontSize = `${size}rem`;
    heart.style.animationDuration = `${duration}s`;
    heart.style.animationDelay = `${delay}s`;
    
    container.appendChild(heart);
    
    // Remove heart after animation completes
    setTimeout(() => {
        heart.remove();
    }, (duration + delay) * 1000);
}

// Theme Toggle
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return; // Exit if theme toggle doesn't exist
    
    const themeIcon = themeToggle.querySelector('i');
    const storedTheme = localStorage.getItem('theme');
    
    // Function to set dark theme
    function setDarkTheme() {
        document.body.classList.add('dark-theme');
        if (themeIcon) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
        localStorage.setItem('theme', 'dark');
    }
    
    // Function to set light theme
    function setLightTheme() {
        document.body.classList.remove('dark-theme');
        if (themeIcon) {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
        localStorage.setItem('theme', 'light');
    }
    
    // Apply stored theme if available
    if (storedTheme === 'dark') {
        setDarkTheme();
    }
    
    // Toggle theme on click
    themeToggle.addEventListener('click', () => {
        if (document.body.classList.contains('dark-theme')) {
            setLightTheme();
        } else {
            setDarkTheme();
        }
    });
    
    // Also check for system preference if no stored theme
    if (!storedTheme) {
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        if (prefersDarkScheme.matches) {
            setDarkTheme();
        }
        
        // Listen for changes in system preference
        prefersDarkScheme.addEventListener('change', (e) => {
            if (e.matches) {
                setDarkTheme();
            } else {
                setLightTheme();
            }
        });
    }
}

// Countdown Timer
function initCountdown() {
    // Set the date for next Sunday (target date)
    function getNextSunday() {
        const now = new Date();
        const daysUntilSunday = 7 - now.getDay();
        const nextSunday = new Date();
        
        // If today is Sunday, set to next Sunday
        if (daysUntilSunday === 7) {
            nextSunday.setDate(now.getDate() + 7);
        } else {
            nextSunday.setDate(now.getDate() + daysUntilSunday);
        }
        
        // Set to midnight
        nextSunday.setHours(0, 0, 0, 0);
        return nextSunday;
    }

    const targetDate = getNextSunday();
    
    function updateCountdown() {
        const now = new Date();
        const difference = targetDate - now;
        
        // If the target date has passed, reset to next Sunday
        if (difference < 0) {
            const newTargetDate = getNextSunday();
            targetDate.setTime(newTargetDate.getTime());
            updateCountdown();
            return;
        }
        
        // Calculate time units
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        // Update the DOM
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    }
    
    // Initial update
    updateCountdown();
    
    // Update every second
    setInterval(updateCountdown, 1000);
}

// Love Quotes
function initQuotes() {
    const quotes = [
        {
            text: "In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine.",
            author: "Maya Angelou"
        },
        {
            text: "I love you not only for what you are, but for what I am when I am with you.",
            author: "Elizabeth Barrett Browning"
        },
        {
            text: "You are my today and all of my tomorrows.",
            author: "Leo Christopher"
        },
        {
            text: "I love you more than I have ever found a way to say to you.",
            author: "Ben Folds"
        },
        {
            text: "If I know what love is, it is because of you.",
            author: "Hermann Hesse"
        },
        {
            text: "You are the finest, loveliest, tenderest, and most beautiful person I have ever known—and even that is an understatement.",
            author: "F. Scott Fitzgerald"
        },
        {
            text: "I love you without knowing how, or when, or from where. I love you simply, without problems or pride.",
            author: "Pablo Neruda"
        },
        {
            text: "Every time I see you, I fall in love all over again.",
            author: "Anonymous"
        },
        {
            text: "To love and be loved is to feel the sun from both sides.",
            author: "David Viscott"
        },
        {
            text: "You are my heart, my life, my one and only thought.",
            author: "Arthur Conan Doyle"
        }
    ];
    
    const quoteDisplay = document.getElementById('quote-display');
    const newQuoteBtn = document.getElementById('new-quote-btn');
    let currentQuoteIndex = 0;
    
    function displayQuote(index) {
        const quote = quotes[index];
        quoteDisplay.innerHTML = `
            <p>"${quote.text}"</p>
            <span class="author">- ${quote.author}</span>
        `;
        
        // Add fade-in animation
        quoteDisplay.style.opacity = 0;
        setTimeout(() => {
            quoteDisplay.style.opacity = 1;
        }, 50);
    }
    
    function getRandomQuote() {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * quotes.length);
        } while (newIndex === currentQuoteIndex && quotes.length > 1);
        
        currentQuoteIndex = newIndex;
        displayQuote(currentQuoteIndex);
    }
    
    // Initial quote display
    displayQuote(currentQuoteIndex);
    
    // Event listener for new quote button
    newQuoteBtn.addEventListener('click', getRandomQuote);
    
    // Change quote automatically every 30 seconds
    setInterval(getRandomQuote, 30000);
}

// Encouragement Messages
function initEncouragementMessages() {
    const messages = [
        "You are stronger than you know, braver than you believe, and loved more than you can imagine.",
        "Every day may not be good, but there is something good in every day.",
        "The best is yet to come. Believe in yourself and all that you are.",
        "Your smile lights up my world. Never forget how special you are.",
        "You've got this! I believe in you completely.",
        "Take a deep breath. You're doing amazing and I'm so proud of you.",
        "Remember that even the hardest days only have 24 hours.",
        "You are capable of more than you know and braver than you think.",
        "Your strength and resilience inspire me every single day.",
        "When you feel overwhelmed, remember whose wife you are. I've got your back, always."
    ];
    
    const messageElement = document.getElementById('encouragement-message');
    const newMessageBtn = document.getElementById('new-encouragement-btn');
    let currentMessageIndex = 0;
    
    function displayMessage(index) {
        messageElement.textContent = `"${messages[index]}"`;
        
        // Add fade-in animation
        messageElement.style.opacity = 0;
        setTimeout(() => {
            messageElement.style.opacity = 1;
        }, 50);
    }
    
    function getRandomMessage() {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * messages.length);
        } while (newIndex === currentMessageIndex && messages.length > 1);
        
        currentMessageIndex = newIndex;
        displayMessage(currentMessageIndex);
    }
    
    // Initial message display
    displayMessage(currentMessageIndex);
    
    // Event listener for new message button
    newMessageBtn.addEventListener('click', getRandomMessage);
}

// Reason Cards
function initReasonCards() {
    const reasonCards = document.querySelectorAll('.reason-card');
    const addReasonBtn = document.getElementById('add-reason-btn');
    
    reasonCards.forEach(card => {
        card.addEventListener('click', () => {
            card.querySelector('.reason-card-inner').style.transform = 
                card.querySelector('.reason-card-inner').style.transform === 'rotateY(180deg)' 
                    ? 'rotateY(0deg)' 
                    : 'rotateY(180deg)';
        });
    });
    
    if (addReasonBtn) {
        addReasonBtn.addEventListener('click', () => {
            const reasonsContainer = document.querySelector('.reasons-container');
            const reasonCount = reasonsContainer.children.length + 1;
            
            const newReason = prompt('Add your own reason why you love Sakshi:');
            if (newReason && newReason.trim() !== '') {
                const reasonCard = document.createElement('div');
                reasonCard.className = 'reason-card';
                reasonCard.innerHTML = `
                    <div class="reason-card-inner">
                        <div class="reason-card-front">
                            <span class="reason-number">${reasonCount}</span>
                            <h3>Your Reason</h3>
                            <p>Click to read more</p>
                        </div>
                        <div class="reason-card-back">
                            <p>${newReason}</p>
                        </div>
                    </div>
                `;
                
                reasonsContainer.appendChild(reasonCard);
                
                // Add click event to the new card
                reasonCard.addEventListener('click', () => {
                    reasonCard.querySelector('.reason-card-inner').style.transform = 
                        reasonCard.querySelector('.reason-card-inner').style.transform === 'rotateY(180deg)' 
                            ? 'rotateY(0deg)' 
                            : 'rotateY(180deg)';
                });
            }
        });
    }
}

// Music Player
function initMusicPlayer() {
    const playPauseBtn = document.getElementById('play-pause');
    const prevBtn = document.getElementById('prev-song');
    const nextBtn = document.getElementById('next-song');
    const playlistItems = document.querySelectorAll('.playlist-item');
    const songTitle = document.getElementById('song-title');
    const songArtist = document.getElementById('song-artist');
    const songCover = document.querySelector('.song-cover');
    
    let isPlaying = false;
    let currentSongIndex = 0;
    let audioElement = null;
    
    if (!playPauseBtn) return; // Exit if music player elements don't exist
    
    // Create audio element
    audioElement = document.createElement('audio');
    audioElement.volume = 0.7;
    document.body.appendChild(audioElement);
    
    // Song data with direct MP3 URLs
    const songs = [
        {
            title: "Perfect",
            artist: "Ed Sheeran",
            previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/65/c6/15/65c61537-f4e6-17e5-d7ad-cast-your-fate-to-the-wind-vince-guaraldi-trio.mp3"
        },
        {
            title: "All of Me",
            artist: "John Legend",
            previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/2e/e0/87/2ee087e7-c2f1-9c79-7f6e-autumn-leaves-bill-evans-trio.mp3"
        },
        {
            title: "A Thousand Years",
            artist: "Christina Perri",
            previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/8e/63/27/8e6327f3-4e52-d88a-5bf6-9b2c6ac5c2a5/mzaf_6177412941829231432.plus.aac.p.m4a"
        },
        {
            title: "Can't Help Falling in Love",
            artist: "Elvis Presley",
            previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/f7/37/5d/f7375df9-fcf8-3cc8-9d77-5f2b1c30f3b4/mzaf_11979198102317051440.plus.aac.p.m4a"
        }
    ];
    
    function updateActiveSong(index) {
        playlistItems.forEach(item => item.classList.remove('active'));
        playlistItems[index].classList.add('active');
        
        songTitle.textContent = songs[index].title;
        songArtist.textContent = songs[index].artist;
        currentSongIndex = index;
        
        // Update audio source
        audioElement.src = songs[index].previewUrl;
        
        // Update cover animation
        if (isPlaying) {
            songCover.classList.add('pulse');
            
            // Play the audio with better error handling
            const playPromise = audioElement.play();
            
            if (playPromise !== undefined) {
                playPromise.then(_ => {
                    // Playback started successfully
                    console.log("Playing: " + songs[index].title);
                })
                .catch(error => {
                    console.log("Audio playback error:", error);
                    // Create a more user-friendly message
                    const messageDiv = document.createElement('div');
                    messageDiv.style.position = 'fixed';
                    messageDiv.style.top = '50%';
                    messageDiv.style.left = '50%';
                    messageDiv.style.transform = 'translate(-50%, -50%)';
                    messageDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
                    messageDiv.style.color = 'white';
                    messageDiv.style.padding = '20px';
                    messageDiv.style.borderRadius = '10px';
                    messageDiv.style.zIndex = '1000';
                    messageDiv.style.maxWidth = '80%';
                    messageDiv.style.textAlign = 'center';
                    
                    messageDiv.innerHTML = `
                        <p>Now playing: "${songs[index].title}" by ${songs[index].artist}</p>
                        <p style="font-size: 0.9rem; margin-top: 10px;">
                            (Audio preview may not be available in all browsers. 
                            The visual experience continues!)
                        </p>
                        <button style="
                            background-color: #e11d48;
                            border: none;
                            color: white;
                            padding: 8px 16px;
                            margin-top: 15px;
                            border-radius: 20px;
                            cursor: pointer;
                        ">OK</button>
                    `;
                    
                    document.body.appendChild(messageDiv);
                    
                    // Remove the message when the button is clicked
                    messageDiv.querySelector('button').addEventListener('click', () => {
                        document.body.removeChild(messageDiv);
                    });
                    
                    // Also remove after 5 seconds
                    setTimeout(() => {
                        if (document.body.contains(messageDiv)) {
                            document.body.removeChild(messageDiv);
                        }
                    }, 5000);
                });
            }
        } else {
            songCover.classList.remove('pulse');
        }
    }
    
    function togglePlayPause() {
        isPlaying = !isPlaying;
        
        if (isPlaying) {
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            songCover.classList.add('pulse');
            audioElement.play().catch(error => {
                console.log("Audio playback error:", error);
                // Show a message to the user
                alert("This is a demo player. In a real website, you would hear '" + songs[currentSongIndex].title + "' playing now.");
            });
        } else {
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
            songCover.classList.remove('pulse');
            audioElement.pause();
        }
    }
    
    // Add pulse animation to song cover
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        
        .song-cover.pulse {
            animation: pulse 1s infinite;
        }
    `;
    document.head.appendChild(style);
    
    playPauseBtn.addEventListener('click', togglePlayPause);
    
    prevBtn.addEventListener('click', () => {
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        updateActiveSong(currentSongIndex);
    });
    
    nextBtn.addEventListener('click', () => {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        updateActiveSong(currentSongIndex);
    });
    
    playlistItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            updateActiveSong(index);
            isPlaying = true;
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        });
    });
    
    // Set initial song
    updateActiveSong(currentSongIndex);
    
    // Handle audio ending
    audioElement.addEventListener('ended', () => {
        // Move to next song
        nextBtn.click();
    });
}

// Gallery Lightbox
function initGalleryLightbox() {
    const photos = document.querySelectorAll('.photo');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.querySelector('.lightbox-close');
    
    if (!lightbox) return; // Exit if lightbox doesn't exist
    
    photos.forEach(photo => {
        const expandBtn = photo.querySelector('.photo-expand');
        if (expandBtn) {
            expandBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent event bubbling
                
                const img = photo.querySelector('img');
                const caption = photo.querySelector('.photo-date').textContent;
                
                lightboxImg.src = img.src;
                lightboxCaption.textContent = caption;
                lightbox.style.display = 'flex';
                
                // Prevent scrolling when lightbox is open
                document.body.style.overflow = 'hidden';
            });
        }
    });
    
    if (lightboxClose) {
        lightboxClose.addEventListener('click', () => {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }
    
    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

// Virtual Gifts
function initVirtualGifts() {
    const giftBoxes = document.querySelectorAll('.gift-box');
    
    giftBoxes.forEach(box => {
        box.addEventListener('click', () => {
            box.classList.toggle('open');
            
            const label = box.parentElement.querySelector('.gift-label');
            if (box.classList.contains('open')) {
                label.textContent = 'Your gift is open!';
            } else {
                label.textContent = 'Click to open';
            }
        });
    });
}

// Letter Read Aloud
function initLetterReadAloud() {
    const readBtn = document.getElementById('letter-read-btn');
    const pauseBtn = document.getElementById('letter-pause-btn');
    const letterContent = document.getElementById('letter-content');
    
    if (!readBtn || !pauseBtn || !letterContent) return; // Exit if elements don't exist
    
    let utterance = null;
    let isPaused = false;
    
    readBtn.addEventListener('click', () => {
        if (utterance) {
            window.speechSynthesis.cancel();
        }
        
        const text = letterContent.textContent;
        utterance = new SpeechSynthesisUtterance(text);
        
        // Try to get a female voice
        const voices = window.speechSynthesis.getVoices();
        const femaleVoice = voices.find(voice => voice.name.includes('female') || voice.name.includes('Female'));
        if (femaleVoice) {
            utterance.voice = femaleVoice;
        }
        
        utterance.rate = 0.9; // Slightly slower
        utterance.pitch = 1.1; // Slightly higher pitch
        
        utterance.onend = () => {
            readBtn.disabled = false;
            pauseBtn.disabled = true;
        };
        
        window.speechSynthesis.speak(utterance);
        readBtn.disabled = true;
        pauseBtn.disabled = false;
    });
    
    pauseBtn.addEventListener('click', () => {
        if (!utterance) return;
        
        if (isPaused) {
            window.speechSynthesis.resume();
            pauseBtn.innerHTML = 'Pause <i class="fas fa-pause"></i>';
        } else {
            window.speechSynthesis.pause();
            pauseBtn.innerHTML = 'Resume <i class="fas fa-play"></i>';
        }
        
        isPaused = !isPaused;
    });
}

// Love Notes
function initLoveNotes() {
    const addNoteBtn = document.getElementById('add-note-btn');
    const noteInput = document.getElementById('love-note-input');
    const notesWall = document.getElementById('love-notes-wall');
    
    if (!addNoteBtn || !noteInput || !notesWall) return; // Exit if elements don't exist
    
    addNoteBtn.addEventListener('click', () => {
        const noteText = noteInput.value.trim();
        if (noteText === '') return;
        
        const today = new Date();
        const dateString = today.toLocaleDateString('en-US', { 
            month: 'long', 
            day: 'numeric', 
            year: 'numeric' 
        });
        
        const noteElement = document.createElement('div');
        noteElement.className = 'love-note';
        noteElement.innerHTML = `
            <p>${noteText}</p>
            <span class="love-note-date">${dateString}</span>
        `;
        
        // Random slight rotation
        const rotation = Math.random() * 6 - 3; // -3 to 3 degrees
        noteElement.style.transform = `rotate(${rotation}deg)`;
        
        notesWall.prepend(noteElement); // Add to the beginning
        noteInput.value = ''; // Clear input
    });
    
    // Allow submitting with Enter key
    noteInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            addNoteBtn.click();
        }
    });
}

// 3D Heart Animation
function init3DHeartAnimation() {
    const heart3d = document.getElementById('heart3d');
    const heartCenter = document.getElementById('heart-center');
    
    if (!heart3d) return; // Exit if heart doesn't exist
    
    // Add mouse movement effect
    document.addEventListener('mousemove', (e) => {
        if (heart3d.classList.contains('open')) return; // Skip if heart is open
        
        const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
        
        // Limit rotation to subtle movement
        const limitedX = Math.max(-10, Math.min(10, yAxis));
        const limitedY = Math.max(-10, Math.min(10, xAxis));
        
        // Apply rotation only if not in open state
        if (!heart3d.classList.contains('open')) {
            heart3d.style.transform = `rotateY(${limitedY}deg) rotateX(${limitedX}deg)`;
        }
    });
    
    // Reset rotation when mouse leaves
    document.addEventListener('mouseleave', () => {
        if (!heart3d.classList.contains('open')) {
            heart3d.style.transform = 'rotateY(0deg) rotateX(0deg)';
        }
    });
    
    // Toggle open state on click
    heart3d.addEventListener('click', () => {
        heart3d.classList.toggle('open');
        
        // Add special effects when opening
        if (heart3d.classList.contains('open')) {
            // Create floating hearts when opened
            createFloatingHeartsEffect(heart3d);
            
            // Play heartbeat sound (or show message if audio not supported)
            const heartbeatSound = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-human-single-heart-beat-490.mp3');
            heartbeatSound.volume = 0.3;
            
            heartbeatSound.play().catch(error => {
                console.log("Audio playback error:", error);
            });
            
            // Remove instruction text
            const instruction = document.querySelector('.heart-instruction');
            if (instruction) {
                instruction.style.opacity = '0';
            }
        } else {
            // Reset heart style when closed
            setTimeout(() => {
                heart3d.style.transform = 'rotateY(0deg) rotateX(0deg)';
                
                // Show instruction text again
                const instruction = document.querySelector('.heart-instruction');
                if (instruction) {
                    instruction.style.opacity = '0.8';
                }
            }, 1000);
        }
    });
    
    // Create initial sparkle effect
    createSparkleEffect(heart3d);
}

// Create floating hearts effect
function createFloatingHeartsEffect(parentElement) {
    const colors = ['#e11d48', '#1e3a8a', '#f9a8d4'];
    const heartsCount = 15;
    
    for (let i = 0; i < heartsCount; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '<i class="fas fa-heart"></i>';
        heart.style.position = 'absolute';
        heart.style.left = '50%';
        heart.style.top = '50%';
        heart.style.fontSize = `${Math.random() * 0.8 + 0.3}rem`;
        heart.style.color = colors[Math.floor(Math.random() * colors.length)];
        heart.style.opacity = '0';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '5';
        
        parentElement.appendChild(heart);
        
        // Animate the heart
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 100 + 50;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        
        // Use Web Animation API
        heart.animate([
            { transform: 'translate(-50%, -50%) scale(0)', opacity: 0 },
            { transform: 'translate(-50%, -50%) scale(1)', opacity: 1, offset: 0.1 },
            { transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(1)`, opacity: 0.7, offset: 0.7 },
            { transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(0)`, opacity: 0 }
        ], {
            duration: 2000,
            easing: 'cubic-bezier(0.21, 0.98, 0.6, 0.99)',
            fill: 'forwards'
        }).onfinish = () => heart.remove();
    }
}

// Create sparkle effect
function createSparkleEffect(element) {
    const sparkleContainer = document.createElement('div');
    sparkleContainer.style.position = 'absolute';
    sparkleContainer.style.top = '0';
    sparkleContainer.style.left = '0';
    sparkleContainer.style.width = '100%';
    sparkleContainer.style.height = '100%';
    sparkleContainer.style.pointerEvents = 'none';
    sparkleContainer.style.zIndex = '2';
    
    element.appendChild(sparkleContainer);
    
    // Create sparkles periodically
    setInterval(() => {
        if (element.classList.contains('open')) return; // Don't add sparkles when open
        
        const sparkle = document.createElement('div');
        sparkle.style.position = 'absolute';
        sparkle.style.width = '4px';
        sparkle.style.height = '4px';
        sparkle.style.borderRadius = '50%';
        sparkle.style.backgroundColor = 'white';
        
        // Random position on the heart
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        
        sparkle.style.left = `${x}%`;
        sparkle.style.top = `${y}%`;
        
        sparkleContainer.appendChild(sparkle);
        
        // Animate sparkle
        sparkle.animate([
            { opacity: 0, transform: 'scale(0)' },
            { opacity: 1, transform: 'scale(1.5)', offset: 0.5 },
            { opacity: 0, transform: 'scale(0)' }
        ], {
            duration: 1000,
            easing: 'ease-out',
            fill: 'forwards'
        }).onfinish = () => sparkle.remove();
    }, 300);
}

// Surprise Button
function initSurpriseButton() {
    const surpriseBtn = document.getElementById('surprise-btn');
    
    if (!surpriseBtn) return; // Exit if button doesn't exist
    
    surpriseBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Create heart explosion animation
        const heartsCount = 50;
        const colors = ['#e11d48', '#1e3a8a', '#f9a8d4'];
        
        for (let i = 0; i < heartsCount; i++) {
            const heart = document.createElement('div');
            heart.innerHTML = '<i class="fas fa-heart"></i>';
            heart.style.position = 'fixed';
            heart.style.left = '50%';
            heart.style.top = '50%';
            heart.style.fontSize = `${Math.random() * 1.5 + 0.5}rem`;
            heart.style.color = colors[Math.floor(Math.random() * colors.length)];
            heart.style.transform = 'translate(-50%, -50%)';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '9999';
            
            document.body.appendChild(heart);
            
            // Animate the heart
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 200 + 50;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;
            
            // Use Web Animation API
            heart.animate([
                { transform: 'translate(-50%, -50%) scale(0)', opacity: 1 },
                { transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(1)`, opacity: 1, offset: 0.7 },
                { transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(0)`, opacity: 0 }
            ], {
                duration: 1500,
                easing: 'cubic-bezier(0.21, 0.98, 0.6, 0.99)',
                fill: 'forwards'
            }).onfinish = () => heart.remove();
        }
        
        // Show a sweet message
        setTimeout(() => {
            alert('I love you more than words can express! ❤️');
        }, 500);
    });
}

// Section Animations
function initSectionAnimations() {
    const sections = document.querySelectorAll('section');
    
    // Check if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    sectionObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        sections.forEach(section => {
            section.style.opacity = 0;
            section.style.transform = 'translateY(20px)';
            section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            sectionObserver.observe(section);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        sections.forEach(section => {
            section.classList.add('visible');
        });
    }
    
    // Add visible class to show sections
    document.addEventListener('scroll', () => {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight * 0.9) {
                section.style.opacity = 1;
                section.style.transform = 'translateY(0)';
            }
        });
    }, { passive: true });
    
    // Trigger initial check
    setTimeout(() => {
        window.dispatchEvent(new Event('scroll'));
    }, 100);
}

// Share functionality
document.getElementById('share-btn')?.addEventListener('click', (e) => {
    e.preventDefault();
    
    if (navigator.share) {
        navigator.share({
            title: 'A Love Letter to Sakshi',
            text: 'A digital love letter from Taha to Sakshi',
            url: window.location.href
        })
        .catch(error => console.log('Error sharing:', error));
    } else {
        // Fallback
        prompt('Copy this link to share:', window.location.href);
    }
});

// Feedback functionality
document.getElementById('feedback-btn')?.addEventListener('click', (e) => {
    e.preventDefault();
    const feedback = prompt('What do you think of this digital love letter?');
    if (feedback) {
        alert('Thank you for your feedback! ❤️');
    }
});

// Add a small easter egg
console.log("❤️ A digital love letter from Taha to Sakshi ❤️");
console.log("Forever and always, I'll be by your side.");
