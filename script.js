document.addEventListener('DOMContentLoaded', () => {
    const mushuImage = document.getElementById('mushu-image');
    const snowQuestion = document.getElementById('snow-question');
    const response = document.getElementById('response');

    const responses = [
        "Snow? Mushu sees it and says, 'Do I look like Elsa to you?'",
        "If snow were a person, Mushu would block it on all social media.",
        "Mushu hates snow more than Mondays.",
        "Snow makes Mushu want to hibernate...forever.",
        "Mushu steps in snow, reconsiders all life choices.",
        "If snow had a Yelp page, Mushu would leave a one-star review.",
        "Snow and Mushu? Like oil and water, but grumpier.",
        "Snow makes Mushu question why he ever left his warm cave.",
        "Mushu's motto: Life's too short for cold feet.",
        "Snow tried to befriend Mushu. Mushu said, 'Not in this lifetime.'",
        "Mushu sees snow and thinks, 'Nope, not today, Satan.'",
        "Mushu would rather take a nap on a cactus than deal with snow.",
        "Snow? Mushu's idea of winter wonderland is a heated blanket.",
        "Mushu looks at snow and wonders if it's a personal attack.",
        "If Mushu had a snowball, he'd throw it... right at the sun.",
        "Mushu thinks snow is cute... but not as cute as being a lap potato for Daniel.",
        "Mushu doesn't mind snow... as long as it doesn't interfere with his professional lap-dog duties with Vanessa."
    ];

    const responseColors = [
        '#FF4B4B',  // Coral Red
        '#4B8B3B',  // Forest Green
        '#1E90FF',  // Dodger Blue
        '#9370DB',  // Medium Purple
        '#4B0082',  // Indigo
        '#8B008B',  // Dark Magenta
        '#CD853F',  // Peru
        '#2F4F4F'   // Dark Slate Gray
    ];

    let isZoomed = false;
    let lastResponseIndex = -1;
    let lastImageIndex = -1;
    let lastColorIndex = -1;
    let clickCount = 0;
    const emojiContainer = document.createElement('div');
    emojiContainer.className = 'emoji-container';
    document.body.appendChild(emojiContainer);

    const zoomSettings = {
        'Mushu1.jpg': { origin: '50% 75%', scale: 2 },
        'Mushu2.jpg': { origin: '50% 40%', scale: 1.8 },
        'Mushu3.jpg': { origin: '50% 55%', scale: 1.6 }
    };

    let currentImageIndex = 0;
    const mushuImages = ['Mushu1.jpg', 'Mushu2.jpg', 'Mushu3.jpg'];

    let currentEmoji = '';
    const emojis = ['😩', '😢', '😭', '😓'];

    let emojiInterval;

    function selectNewEmoji() {
        const currentIndex = emojis.indexOf(currentEmoji);
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * emojis.length);
        } while (newIndex === currentIndex);
        currentEmoji = emojis[newIndex];
    }

    function cycleMushuImage() {
        currentImageIndex = (currentImageIndex + 1) % mushuImages.length;
        
        const newImage = new Image();
        newImage.onload = () => {
            mushuImage.src = newImage.src;
            console.log('Successfully loaded:', mushuImages[currentImageIndex]);
        };
        newImage.onerror = () => {
            console.error('Failed to load image:', mushuImages[currentImageIndex]);
            // Instead of defaulting to Mushu1, try the next image
            currentImageIndex = (currentImageIndex + 1) % mushuImages.length;
            newImage.src = `images/${mushuImages[currentImageIndex]}`;
        };
        newImage.src = `images/${mushuImages[currentImageIndex]}`;
    }

    function getRandomResponse() {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * responses.length);
        } while (newIndex === lastResponseIndex);
        
        lastResponseIndex = newIndex;
        return responses[newIndex];
    }

    function getRandomColor() {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * responseColors.length);
        } while (newIndex === lastColorIndex);
        
        lastColorIndex = newIndex;
        return responseColors[newIndex];
    }

    function toggleZoom() {
        isZoomed = !isZoomed;
        const currentImage = mushuImage.src.split('/').pop().split('.')[0];
        const settings = zoomSettings[currentImage] || zoomSettings['Mushu1.jpg'];
        const loadingWheel = document.querySelector('.loading-wheel');
        
        if (isZoomed) {
            mushuImage.classList.add('zooming-in');
            mushuImage.style.transformOrigin = settings.origin;
            mushuImage.style.transform = `scale(${settings.scale})`;
        } else {
            mushuImage.classList.remove('zooming-in');
            mushuImage.classList.add('loading');
            mushuImage.style.transformOrigin = '50% 50%';
            mushuImage.style.transform = 'scale(1)';
            
            loadingWheel.classList.add('active');
            setTimeout(() => {
                cycleMushuImage();
                setTimeout(() => {
                    mushuImage.classList.remove('loading');
                    loadingWheel.classList.remove('active');
                    // Automatically zoom in after loading new image
                    isZoomed = true;
                    const newSettings = zoomSettings[mushuImage.src.split('/').pop().split('.')[0]] || zoomSettings['Mushu1.jpg'];
                    mushuImage.classList.add('zooming-in');
                    mushuImage.style.transformOrigin = newSettings.origin;
                    mushuImage.style.transform = `scale(${newSettings.scale})`;
                }, 50);
            }, 500);
        }
    }

    function showResponse() {
        if (!response.textContent) {
            response.style.display = 'block';
        }
        response.textContent = getRandomResponse();
        response.style.color = getRandomColor();
        response.classList.remove('visible');
        void response.offsetWidth;
        response.classList.add('visible');
    }

    function createEmoji() {
        const emoji = document.createElement('div');
        emoji.className = 'falling-emoji';
        emoji.textContent = currentEmoji;
        emoji.style.left = Math.random() * 100 + 'vw';
        emoji.style.animationDuration = (Math.random() * 2 + 3) + 's';
        emojiContainer.appendChild(emoji);
        
        emoji.addEventListener('animationend', () => {
            emoji.remove();
        });
    }

    // Remove any initial text content
    response.style.display = 'none';

    // Add after other constants
    const snowflakeContainer = document.createElement('div');
    snowflakeContainer.className = 'snowflake-container';
    document.body.appendChild(snowflakeContainer);
    let snowflakeInterval;

    function createSnowflake() {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        snowflake.textContent = '❄️';
        snowflake.style.left = Math.random() * 100 + 'vw';
        snowflake.style.animationDuration = (Math.random() * 2 + 3) + 's';
        snowflakeContainer.appendChild(snowflake);
        
        snowflake.addEventListener('animationend', () => {
            snowflake.remove();
        });
    }

    // Start snowfall immediately
    snowflakeInterval = setInterval(createSnowflake, 300);

    // Modify the click event listener
    snowQuestion.addEventListener('click', () => {
        if (snowflakeInterval) {
            clearInterval(snowflakeInterval);
            snowflakeInterval = null;
            snowflakeContainer.innerHTML = '';
        }
        toggleZoom();
        showResponse();
        clickCount++;
        
        if (clickCount === 2) {
            selectNewEmoji();
            if (!emojiInterval) {
                emojiInterval = setInterval(createEmoji, 500);
            }
        }
        
        if (clickCount > 2) {
            selectNewEmoji();
        }
    });
}); 