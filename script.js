document.addEventListener('DOMContentLoaded', () => {
    const mushuImage = document.getElementById('mushu-image');
    const snowQuestion = document.getElementById('snow-question');
    const response = document.getElementById('response');

    const responses = [
        "Mushu doesn't like snow.",
        "Mushu still doesn't like snow.",
        "NOPE. Mushu's not a fan of snow.",
        "Mushu hates snow more than Mondays.",
        "Snow? Mushu would rather not.",
        "Let's just say Mushu and snow aren't friends.",
        "Mushu's opinion on snow: hard pass.",
        "Snow is definitely not on Mushu's favorite things list.",
        "Snow? Mushu sees it and says, 'Do I look like Elsa to you?'",
        "Mushu would rather wrestle a dragon than step in snow.",
        "Snow makes Mushu want to hibernate...forever.",
        "Mushu thinks snow is nature's bad idea.",
        "If snow were a person, Mushu would block it on all social media.",
        "Mushu's official snow policy: Avoid at all costs.",
        "Mushu steps in snow, reconsiders all life choices.",
        "Snow and Mushu? Like oil and water, but grumpier.",
        "Snow makes Mushu question why he ever left his warm cave.",
        "If snow had a Yelp page, Mushu would leave a one-star review.",
        "Mushu's motto: Life's too short for cold feet.",
        "Snow tried to befriend Mushu. Mushu said, 'Not in this lifetime.'"
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

    function selectNewEmoji() {
        const currentIndex = emojis.indexOf(currentEmoji);
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * emojis.length);
        } while (newIndex === currentIndex);
        currentEmoji = emojis[newIndex];
    }

    function cycleMushuImage() {
        // Move to next image, loop back to start if at end
        currentImageIndex = (currentImageIndex + 1) % mushuImages.length;
        
        const newImage = new Image();
        newImage.onload = () => {
            mushuImage.src = newImage.src;
        };
        newImage.onerror = () => {
            console.error('Failed to load image:', mushuImages[currentImageIndex]);
            mushuImage.src = 'images/Mushu1.jpg';
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
        // Stop snowfall on first click
        if (snowflakeInterval) {
            clearInterval(snowflakeInterval);
            snowflakeInterval = null;
            // Remove any remaining snowflakes
            snowflakeContainer.innerHTML = '';
        }
        toggleZoom();
        showResponse();
        clickCount++;
        
        if (clickCount === 2) {
            selectNewEmoji();
        }
        
        if (clickCount >= 2) {
            selectNewEmoji();
            setInterval(createEmoji, 500);
        }
    });
}); 