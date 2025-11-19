document.addEventListener('DOMContentLoaded', () => {
    
    // Initialize all carousels
    const carousels = document.querySelectorAll('.carousel-container');

    carousels.forEach(carousel => {
        initCarousel(carousel);
    });

    function initCarousel(carousel) {
        const slides = carousel.querySelectorAll('.carousel-slide');
        const prevBtn = carousel.querySelector('.prev-btn');
        const nextBtn = carousel.querySelector('.next-btn');
        const currentCountEl = carousel.querySelector('.current-count');
        const totalCountEl = carousel.querySelector('.total-count');
        const thumbRow = carousel.querySelector('.thumbnail-row');
        
        let currentIndex = 0;
        const totalSlides = slides.length;

        // Set total count
        totalCountEl.textContent = totalSlides;

        // Generate Thumbnails
        // We generate specific markup to match the "3 visible, center big" requirement logic
        // But since this is simple JS, we will re-render the "look" of thumbnails on change.
        // First, populate the thumbnail container with buttons for each slide.
        slides.forEach((slide, index) => {
            const src = slide.src;
            const btn = document.createElement('div');
            btn.className = `cursor-pointer transition-all duration-300 transform`;
            btn.dataset.index = index;
            
            // Inner image container
            const imgContainer = document.createElement('div');
            imgContainer.className = 'border border-gray-600 overflow-hidden';
            // Dimensions will be set by updateThumbnails function
            
            const img = document.createElement('img');
            img.src = src;
            img.className = 'w-full h-full object-cover';
            
            imgContainer.appendChild(img);
            btn.appendChild(imgContainer);
            
            // Add click event
            btn.addEventListener('click', () => goToSlide(index));
            
            thumbRow.appendChild(btn);
        });

        const thumbs = thumbRow.querySelectorAll('div[data-index]');

        function updateVisuals() {
            // Update Main Slides
            slides.forEach((slide, index) => {
                if (index === currentIndex) {
                    slide.classList.remove('hidden');
                } else {
                    slide.classList.add('hidden');
                }
            });

            // Update Counter
            currentCountEl.textContent = currentIndex + 1;

            // Update Thumbnails (The tricky 3-picker logic)
            thumbs.forEach((thumb, index) => {
                const imgBox = thumb.querySelector('div');
                const img = thumb.querySelector('img');
                
                // Reset classes
                thumb.className = 'cursor-pointer transition-all duration-300 transform';
                imgBox.className = 'border-gray-600 border overflow-hidden';
                img.className = 'w-full h-full object-cover grayscale opacity-50 hover:opacity-100 hover:grayscale-0';
                
                // Logic for "Current", "Previous", "Next" visual hierarchy
                
                // 1. The Current Slide (Big, Opaque, White Border)
                if (index === currentIndex) {
                    thumb.className = 'relative z-10 transform scale-110';
                    imgBox.className = 'w-12 h-8 md:w-16 md:h-10 border-2 border-white bg-black p-0.5 shadow-[0_0_10px_rgba(255,255,255,0.1)]';
                    img.className = 'w-full h-full object-cover'; // No grayscale
                    
                    // Triangle Indicator (optional, append if not exists)
                    if (!thumb.querySelector('.triangle')) {
                        const tri = document.createElement('div');
                        tri.className = 'triangle absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] border-t-white';
                        thumb.appendChild(tri);
                    }
                } 
                // 2. The Neighbors (Previous and Next)
                else if (index === (currentIndex - 1 + totalSlides) % totalSlides || index === (currentIndex + 1) % totalSlides) {
                   // Neighbors are visible and slightly styled
                   thumb.className = 'cursor-pointer transition-all duration-300 transform hover:scale-105 opacity-100';
                   imgBox.className = 'w-8 h-6 md:w-12 md:h-8 border border-gray-600';
                   // Remove triangle if exists
                   const tri = thumb.querySelector('.triangle');
                   if(tri) tri.remove();
                }
                // 3. Others (Hidden or very small?)
                // The prompt asked for "maybe 3 visible". simpler to just show all but highlight center.
                // But strictly implementing "3 visible" requires hiding others.
                else {
                    // If total slides > 3, hide the ones that aren't prev, current, next.
                    if(totalSlides > 3) {
                        thumb.style.display = 'none';
                    } else {
                        // If 3 or less, show as small
                        thumb.className = 'cursor-pointer transition-all duration-300 transform opacity-50 hover:opacity-100';
                        imgBox.className = 'w-6 h-4 md:w-8 md:h-6 border border-gray-800';
                         const tri = thumb.querySelector('.triangle');
                        if(tri) tri.remove();
                    }
                }
                
                // Ensure display block if it was hidden previously (for the neighbor check)
                if (index === (currentIndex - 1 + totalSlides) % totalSlides || index === (currentIndex + 1) % totalSlides || index === currentIndex) {
                    thumb.style.display = 'block';
                }
            });
        }

        function goToSlide(index) {
            currentIndex = index;
            updateVisuals();
        }

        function nextSlide() {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateVisuals();
        }

        function prevSlide() {
            currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
            updateVisuals();
        }

        // Event Listeners
        nextBtn.addEventListener('click', (e) => {
            e.preventDefault(); // prevent scrolling if button is weird
            nextSlide();
        });

        prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            prevSlide();
        });

        // Initial render
        updateVisuals();
    }
});
