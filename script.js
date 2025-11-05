// 每个袋子里的零食
const snackBags = [
    {
        id: 0,
        name: '红色零食袋',
        items: ['🍪', '🍫', '🍬', '🍭', '🍩'],
        currentIndex: 0,
        isOpen: false
    },
    {
        id: 1,
        name: '蓝色零食袋',
        items: ['🍿', '🥨', '🍰', '🧁', '🍦'],
        currentIndex: 0,
        isOpen: false
    },
    {
        id: 2,
        name: '绿色零食袋',
        items: ['🍎', '🍊', '🍋', '🍉', '🍇'],
        currentIndex: 0,
        isOpen: false
    }
];

// 获取所有零食袋元素
const bagElements = document.querySelectorAll('.snack-bag');

// 为每个零食袋添加点击事件
bagElements.forEach((bagElement) => {
    bagElement.addEventListener('click', () => {
        const bagId = parseInt(bagElement.dataset.bagId);
        handleBagClick(bagId, bagElement);
    });
});

/**
 * 处理零食袋点击事件
 * @param {number} bagId - 被点击的袋子ID
 * @param {HTMLElement} bagElement - 被点击的袋子元素
 */
function handleBagClick(bagId, bagElement) {
    const bag = snackBags[bagId];

    // 如果这个袋子已经打开，取出一个零食
    if (bag.isOpen) {
        takeOutItem(bagId);
    } else {
        // 关闭所有其他袋子
        closeAllBags();

        // 打开这个袋子
        openBag(bagId, bagElement);
    }
}

/**
 * 打开指定的零食袋
 * @param {number} bagId - 要打开的袋子ID
 * @param {HTMLElement} bagElement - 袋子元素
 */
function openBag(bagId, bagElement) {
    const bag = snackBags[bagId];

    // 标记为打开状态
    bag.isOpen = true;
    bagElement.classList.add('open');

    console.log(`${bag.name}已打开！点击再次取出零食。`);
}

/**
 * 关闭所有零食袋
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
 * 从打开的袋子中取出一个零食
 * @param {number} bagId - 袋子ID
 */
function takeOutItem(bagId) {
    const bag = snackBags[bagId];

    // 检查是否还有零食
    if (bag.currentIndex >= bag.items.length) {
        alert(`${bag.name}已经空了！`);
        return;
    }

    // 取出当前零食
    const item = bag.items[bag.currentIndex];
    bag.currentIndex++;

    // 显示零食
    displayItem(bagId, item);

    console.log(`从${bag.name}取出：${item}`);
}

/**
 * 显示取出的零食
 * @param {number} bagId - 袋子ID
 * @param {string} item - 零食表情符号
 */
function displayItem(bagId, item) {
    const itemsContainer = document.getElementById(`items-${bagId}`);

    // 创建零食元素
    const itemElement = document.createElement('div');
    itemElement.className = 'item';
    itemElement.textContent = item;

    // 添加到容器
    itemsContainer.appendChild(itemElement);
}

// 添加键盘快捷键支持
document.addEventListener('keydown', (e) => {
    // 按数字键 1, 2, 3 打开对应的袋子
    if (e.key === '1' || e.key === '2' || e.key === '3') {
        const bagId = parseInt(e.key) - 1;
        const bagElement = document.querySelector(`[data-bag-id="${bagId}"]`);
        if (bagElement) {
            handleBagClick(bagId, bagElement);
        }
    }

    // 按 Escape 关闭所有袋子
    if (e.key === 'Escape') {
        closeAllBags();
    }
});

// 初始化提示
console.log('欢迎来到互动零食袋！');
console.log('点击任意零食袋打开它，然后再次点击取出零食。');
console.log('快捷键：1/2/3 打开对应袋子，Esc 关闭所有袋子');
