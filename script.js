// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", () => {
    console.log("Game Hub is ready!");

    // Add dark mode toggle functionality
    initializeDarkMode();

    // Add category filter functionality
    addCategoryFiltering();
    
    // Automatically update meta description based on game title
    updateMetaDescription();
});

// Open Search Section
function openSearchSection() {
    const searchSection = document.getElementById("search-section");
    searchSection.style.display = "block"; // Show search overlay
    document.body.style.overflow = "hidden"; // Prevent background scroll
}

// Close Search Section
function closeSearchSection() {
    const searchSection = document.getElementById("search-section");
    searchSection.style.display = "none"; // Hide search overlay
    document.body.style.overflow = "auto"; // Restore background scroll
}

// Filter Games in Overlay (Real-Time Search)
function filterGamesOverlay() {
    const searchBar = document.getElementById("overlay-search-bar");
    const searchText = searchBar.value.toLowerCase();
    const gameCards = document.querySelectorAll(".game-grid .game-card");
    const searchResultsGrid = document.getElementById("search-results-grid");

    searchResultsGrid.innerHTML = ""; // Clear previous results

    let hasResults = false;

    gameCards.forEach((card) => {
        const title = card.querySelector(".game-title").textContent.toLowerCase();
        if (title.includes(searchText)) {
            const clonedCard = card.cloneNode(true); // Clone the matching game card
            searchResultsGrid.appendChild(clonedCard);
            hasResults = true;
        }
    });

    // Show "No Results Found" message if no matches
    if (!hasResults) {
        const noResultsMessage = document.createElement("p");
        noResultsMessage.id = "no-results";
        noResultsMessage.textContent = "No games found.";
        noResultsMessage.style.textAlign = "center";
        noResultsMessage.style.color = "red";
        searchResultsGrid.appendChild(noResultsMessage);
    }
}


// Dark Mode Toggle
function initializeDarkMode() {
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    darkModeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        localStorage.setItem(
            "darkMode",
            document.body.classList.contains("dark-mode")
        );
    });

    // Persist Dark Mode
    if (localStorage.getItem("darkMode") === "true") {
        document.body.classList.add("dark-mode");
    }
}

// Add Category Filtering
function addCategoryFiltering() {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const gameCards = document.querySelectorAll(".game-grid .game-card");

    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const category = button.getAttribute("data-category");

            gameCards.forEach((card) => {
                const cardCategories = card.dataset.category.split(" ");
                if (category === "all" || cardCategories.includes(category)) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });

            // Highlight active button
            filterButtons.forEach((btn) => btn.classList.remove("active"));
            button.classList.add("active");
        });
    });
}
// scroll continuity 
document.addEventListener("DOMContentLoaded", () => {
    const scrollingContainer = document.querySelector(".scrolling-container");
    const cards = [...document.querySelectorAll(".scrolling-game-card")];

    const cards = document.querySelectorAll('.card'); // 👈 Change '.card' if your cards use another class

if (cards.length > 0) {
    const cardWidth = cards[0].offsetWidth;
    const gap = 30;
    const totalWidth = (cardWidth + gap) * cards.length;

    let speed = 2;
    let isPaused = false;
    let isUserInteracting = false;
    let startX, scrollLeft;
    let interactionTimeout;
    let isMobile = "ontouchstart" in window || navigator.maxTouchPoints > 0;

    function loop() {
        if (!isPaused && !isUserInteracting) {
            cards.forEach((card) => {
                const currentLeft = parseFloat(card.style.left || card.offsetLeft);
                const newLeft = currentLeft - speed;

                if (newLeft + cardWidth < 0) {
                    // Your logic here (maybe reset card position)
                } else {
                    card.style.left = newLeft + "px";
                }
            });
        }
        requestAnimationFrame(loop);
    }

    loop(); // Start the animation
}

            scrollingGames.style.animationPlayState = "paused"; // Pause animation
        });

        scrollingGames.addEventListener("mouseleave", () => {
            scrollingGames.style.animationPlayState = "running"; // Resume animation
        });
    });
