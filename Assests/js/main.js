// iframe YT code start
          
let ashInterval;
let count1 = 0;
//QbBpo1zv3TM
const players = [
    { id: 'player1', videoId: 'JFtMkRVQ-fo', player: null },
    { id: 'player2', videoId: '1ZV4k1_kAek', player: null },
    { id: 'player3', videoId: '79annCWsSdU', player: null },
    { id: 'player4', videoId: 'WNxRRzslAVE', player: null },
    { id: 'player5', videoId: 'cld4S71OAfw', player: null },
    { id: 'player6', videoId: 'QSUYiF8xrNM', player: null }

    
];

function onYouTubeIframeAPIReady() {
    players.forEach(item => {
        item.player = new YT.Player(item.id, {
            height: '315',
            width: '560',
            videoId: item.videoId,
            events: {
                'onReady': onPlayerReady
            }
        });
    });
}


function onPlayerReady(event) {
    const player = event.target;
    player.mute();
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            const playerId = entry.target.id;
            const playerData = players.find(item => item.id === playerId);

            if (entry.isIntersecting && playerData) {
                playerData.player.playVideo();
                ashInterval = setInterval(()=>{
                    if ( checkElement(document.getElementById(playerData.id)) ) {
                        playerData.player.unMute();
                        playerData.player.playVideo();
                        if (playerData.player.getPlayerState() == 1) {
                            count1++;
                            if(count1 == 5) {
                                clearInterval(ashInterval);
                                count1 = 1 ;
                            }
                        }
                    } 
                },1000);
            } else {
                playerData.player.pauseVideo();
            }
        });
    }, { threshold: 0.5, passive: true });
    observer.observe(player.getIframe());
}


function checkElement(el) {
  var top = el.offsetTop;
  var left = el.offsetLeft;
  var width = el.offsetWidth;
  var height = el.offsetHeight;

  while(el.offsetParent) {
    el = el.offsetParent;
    top += el.offsetTop;
    left += el.offsetLeft;
  }

  return (
    top >= window.pageYOffset &&
    left >= window.pageXOffset &&
    (top + height) <= (window.pageYOffset + window.innerHeight) &&
    (left + width) <= (window.pageXOffset + window.innerWidth)
  );
}

// iframe YT code end




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


const initialItemNumberValue = itemNumberValue || defaultItemNumber;
let itemNumber = calculatePercentItemNumber(initialItemNumberValue);
resetItems(itemNumber);


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

const sliderItems = document.querySelectorAll(".slider__item");
sliderItems.forEach((item) =>
item.querySelector(".slider__content").classList.remove("active")
);


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






//    2nd slider

// const arrowRight2 = document.getElementById("arrowRight2");
// const arrowLeft2 = document.getElementById("arrowLeft2");
// const list2 = document.getElementById("list2");
// const valueItemNumber2 = document.getElementById("itemNumber2");
// const valueItemNumberMax2 = valueItemNumber2.ariaValueMax;
// const defaultItemNumber2 = 3;
// const initialNumberItems2 = list2.children.length;
// const itemNumberMess2 = document.getElementById("itemNumberMess2");
// const wrapper2 = document.querySelector(".slider__wrapper2");
// const wrapperWidth2 = wrapper2.offsetWidth;
// const numVisibleItems2 = 3;
// let centralItem2 = 2;
// let itemNumberValue2 = parseInt(valueItemNumber2.value);


// const initialItemNumberValue2 = itemNumberValue2 || defaultItemNumber2;
// let itemNumber2 = calculatePercentItemNumber(initialItemNumberValue2);
// resetItems(itemNumber2);


// function calculatePercentItemNumber(num) {
// return num ? 100 / num : 100 / defaultItemNumber2;
// }

// function listNumber(inputNumber2) {
// const message2 =
// inputNumber2 >= 6
// ? "You reached the maximum number of items"
// : `Changed to ${inputNumber2}`;
// itemNumberMess2.textContent = message2;
// }

// function resetItems(number2) {
// const sliderItems2 = document.querySelectorAll(".slider__item2");
// sliderItems2.forEach((item) => (item.style.width = `${number2}%`));
// itemNumber2 = number2;
// }

// function calculateCentralItem(numVisibleItems2) {
// const centralItem2 = Math.ceil(numVisibleItems2 / 2);
// return centralItem2;
// }

// function addActiveElement(centralItem2, totalVisibleItems2) {

// const sliderItems2 = document.querySelectorAll(".slider__item2");
// sliderItems2.forEach((item) =>
// item.querySelector(".slider__content2").classList.remove("active")
// );


// const central2 = sliderItems2[Math.floor(centralItem2)];
// central2.querySelector(".slider__content2").classList.add("active");

// if (totalVisibleItems % 2 === 0) {
// const central2 = sliderItems2[Math.floor(centralItem2) + 1];
// central2.querySelector(".slider__content2").classList.add("active");

// if (totalVisibleItems2 == 2) {
// const central3 = sliderItems2[Math.floor(centralItem) - 1];
// central3.querySelector(".slider__content2").classList.add("active");
// }
// }
// }


// valueItemNumber.addEventListener("input", function () {
// itemNumberValue = parseInt(valueItemNumber.value);
// listNumber(itemNumberValue);
// const newPercentage = calculatePercentItemNumber(itemNumberValue);
// resetItems(newPercentage);
// centralItem = calculateCentralItem(itemNumberValue);
// addActiveElement(centralItem - 1, itemNumberValue);
// });

// arrowRight.addEventListener("click", moveFirstToEnd);
// arrowLeft.addEventListener("click", moveLastToStart);

// function moveFirstToEnd() {
// const firstItem = list.firstElementChild;
// firstItem.style.marginLeft = `calc(-${itemNumber}%)`;

// if (firstItem) {
// setTimeout(() => {
// firstItem.style.marginLeft = "";
// list.appendChild(firstItem);
// }, 300);
// }
// addActiveElement(centralItem, itemNumberValue);
// }

// function moveLastToStart() {
// const lastItem = list.lastElementChild;
// list.removeChild(lastItem);
// list.insertBefore(lastItem, list.firstElementChild);
// const newFirstItem = list.firstElementChild;

// if (newFirstItem) {
// newFirstItem.style.marginLeft = `calc(-${itemNumber}%)`;
// setTimeout(() => {
// newFirstItem.style.marginLeft = "";
// }, 1);
// }

// addActiveElement(centralItem - 1, itemNumberValue);
// }






        document.querySelectorAll('.scrollButton').forEach(button => {
    button.addEventListener('click', function() {
        document.getElementById(this.getAttribute('data-target')).scrollIntoView({ behavior: 'smooth' });
        document.querySelectorAll('.scrollButton').forEach(btn => btn.classList.remove('clicked'));
        this.classList.add('clicked');
    });
});


