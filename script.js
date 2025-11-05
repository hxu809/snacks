// Snack items in each bag
const snackBags = [
    {
        id: 0,
        name: 'Chips Bag',
        items: ['🥔', '🥔', '🥔', '🥔', '🥔'],
        currentIndex: 0,
        isOpen: false
    },
    {
        id: 1,
        name: 'Candy Bag',
        items: ['🍬', '🍭', '🍫', '🍩', '🍪'],
        currentIndex: 0,
        isOpen: false
    },
    {
        id: 2,
        name: 'Fries Bag',
        items: ['🍟', '🍟', '🍟', '🍟', '🍟'],
        currentIndex: 0,
        isOpen: false
    }
];

// Get all snack bag elements
const bagElements = document.querySelectorAll('.snack-bag');

// Add click event to each snack bag
bagElements.forEach((bagElement) => {
    bagElement.addEventListener('click', () => {
        const bagId = parseInt(bagElement.dataset.bagId);
        handleBagClick(bagId, bagElement);
    });
});

/**
 * Handle snack bag click event
 * @param {number} bagId - The ID of the clicked bag
 * @param {HTMLElement} bagElement - The clicked bag element
 */
function handleBagClick(bagId, bagElement) {
    const bag = snackBags[bagId];

    // If this bag is already open, take out a snack
    if (bag.isOpen) {
        takeOutItem(bagId);
    } else {
        // Close all other bags
        closeAllBags();

        // Open this bag
        openBag(bagId, bagElement);
    }
}

/**
 * Open the specified snack bag
 * @param {number} bagId - The ID of the bag to open
 * @param {HTMLElement} bagElement - The bag element
 */
function openBag(bagId, bagElement) {
    const bag = snackBags[bagId];

    // Mark as open
    bag.isOpen = true;
    bagElement.classList.add('open');

    console.log(`${bag.name} is opened! Click again to take out snacks.`);
}

/**
 * Close all snack bags
 */
function closeAllBags() {
    snackBags.forEach((bag) => {
        bag.isOpen = false;
    });

    bagElements.forEach((element) => {
        element.classList.remove('open');
    });
}

/**
 * Take out an item from the opened bag
 * @param {number} bagId - The bag ID
 */
function takeOutItem(bagId) {
    const bag = snackBags[bagId];

    // Check if there are still snacks
    if (bag.currentIndex >= bag.items.length) {
        alert(`${bag.name} is empty!`);
        return;
    }

    // Take out current snack
    const item = bag.items[bag.currentIndex];
    bag.currentIndex++;

    // Display snack
    displayItem(bagId, item);

    console.log(`Took out from ${bag.name}: ${item}`);
}

/**
 * Display the taken out snack
 * @param {number} bagId - The bag ID
 * @param {string} item - The snack emoji
 */
function displayItem(bagId, item) {
    const itemsContainer = document.getElementById(`items-${bagId}`);

    // Create snack element
    const itemElement = document.createElement('div');
    itemElement.className = 'item';
    itemElement.textContent = item;

    // Add to container
    itemsContainer.appendChild(itemElement);
}

// Add keyboard shortcut support
document.addEventListener('keydown', (e) => {
    // Press 1, 2, 3 to open corresponding bags
    if (e.key === '1' || e.key === '2' || e.key === '3') {
        const bagId = parseInt(e.key) - 1;
        const bagElement = document.querySelector(`[data-bag-id="${bagId}"]`);
        if (bagElement) {
            handleBagClick(bagId, bagElement);
        }
    }

    // Press Escape to close all bags
    if (e.key === 'Escape') {
        closeAllBags();
    }
});

// Initialization message
console.log('Welcome to Interactive Snack Bags!');
console.log('Click any snack bag to open it, then click again to take out snacks.');
console.log('Shortcuts: 1/2/3 to open bags, Esc to close all bags');
