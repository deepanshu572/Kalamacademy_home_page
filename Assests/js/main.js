
// Element references
const arrowRight = document.getElementById("arrowRight");
const arrowLeft = document.getElementById("arrowLeft");
const list = document.getElementById("list");
const valueItemNumber = document.getElementById("itemNumber");
const valueItemNumberMax = valueItemNumber.ariaValueMax;
const defaultItemNumber = 3;
const initialNumberItems = list.children.length;
const itemNumberMess = document.getElementById("itemNumberMess");
const wrapper = document.querySelector(".slider__wrapper");
const wrapperWidth = wrapper.offsetWidth;
const numVisibleItems = 3;
let centralItem = 2;
let itemNumberValue = parseInt(valueItemNumber.value);

// Initialize item number and set width of items
const initialItemNumberValue = itemNumberValue || defaultItemNumber;
let itemNumber = calculatePercentItemNumber(initialItemNumberValue);
resetItems(itemNumber);

// Utility functions
function calculatePercentItemNumber(num) {
return num ? 100 / num : 100 / defaultItemNumber;
}

function listNumber(inputNumber) {
const message =
inputNumber >= 6
? "You reached the maximum number of items"
: `Changed to ${inputNumber}`;
itemNumberMess.textContent = message;
}

function resetItems(number) {
const sliderItems = document.querySelectorAll(".slider__item");
sliderItems.forEach((item) => (item.style.width = `${number}%`));
itemNumber = number;
}

function calculateCentralItem(numVisibleItems) {
const centralItem = Math.ceil(numVisibleItems / 2);
return centralItem;
}

function addActiveElement(centralItem, totalVisibleItems) {
// Clear active class
const sliderItems = document.querySelectorAll(".slider__item");
sliderItems.forEach((item) =>
item.querySelector(".slider__content").classList.remove("active")
);

// Set active class to central element(s)
const central = sliderItems[Math.floor(centralItem)];
central.querySelector(".slider__content").classList.add("active");

if (totalVisibleItems % 2 === 0) {
const central2 = sliderItems[Math.floor(centralItem) + 1];
central2.querySelector(".slider__content").classList.add("active");

if (totalVisibleItems == 2) {
const central3 = sliderItems[Math.floor(centralItem) - 1];
central3.querySelector(".slider__content").classList.add("active");
}
}
}

// Event listeners
valueItemNumber.addEventListener("input", function () {
itemNumberValue = parseInt(valueItemNumber.value);
listNumber(itemNumberValue);
const newPercentage = calculatePercentItemNumber(itemNumberValue);
resetItems(newPercentage);
centralItem = calculateCentralItem(itemNumberValue);
addActiveElement(centralItem - 1, itemNumberValue);
});

arrowRight.addEventListener("click", moveFirstToEnd);
arrowLeft.addEventListener("click", moveLastToStart);

function moveFirstToEnd() {
const firstItem = list.firstElementChild;
firstItem.style.marginLeft = `calc(-${itemNumber}%)`;

if (firstItem) {
setTimeout(() => {
firstItem.style.marginLeft = "";
list.appendChild(firstItem);
}, 300);
}
addActiveElement(centralItem, itemNumberValue);
}

function moveLastToStart() {
const lastItem = list.lastElementChild;
list.removeChild(lastItem);
list.insertBefore(lastItem, list.firstElementChild);
const newFirstItem = list.firstElementChild;

if (newFirstItem) {
newFirstItem.style.marginLeft = `calc(-${itemNumber}%)`;
setTimeout(() => {
newFirstItem.style.marginLeft = "";
}, 1);
}

addActiveElement(centralItem - 1, itemNumberValue);
}

