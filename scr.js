const Mediadata = [
  {
    id: 1,
    image:
      "https://www.kalamacademy.org/wp-content/uploads/2023/10/16114990_1203753539693685_5845316445179379012_n.jpg",
  },
  {
    id: 2,
    image:
      "https://www.kalamacademy.org/wp-content/uploads/2023/10/16114990_1203753539693685_5845316445179379012_n.jpg",
  },
  {
    id: 3,
    image:
      "https://www.kalamacademy.org/wp-content/uploads/2023/10/16114990_1203753539693685_5845316445179379012_n.jpg",
  },
  {
    id: 4,
    image:
      "https://www.kalamacademy.org/wp-content/uploads/2023/10/16114990_1203753539693685_5845316445179379012_n.jpg",
  },
  {
    id: 5,
    image:
      "https://www.kalamacademy.org/wp-content/uploads/2023/10/16114990_1203753539693685_5845316445179379012_n.jpg",
  },
];
var IdWrap = "";

Mediadata.map((item) => {
  IdWrap += ` <div class="media_coverage_box">
                  <img class="img_item" src="${item.image}" alt="">
              </div>`;
});
document.getElementById("mediaId").innerHTML = IdWrap;

var dataHolder = document.querySelectorAll(".media_coverage_box");
var modalId  = document.querySelector('#imgModal');
var modalWrap  = document.querySelector('.img_wrap');
var modalSvg  = document.querySelector('.svg_data');
var mainData = document.querySelector('.main')

dataHolder.forEach(function(item) {

    item.addEventListener('click', function() {
        const img = item.querySelector('img');
        modalWrap.style.display = 'block';


        if (img) {
            console.log(img.src);
            modalId.src = img.src;
        } 
       
    });


});

modalSvg.addEventListener('click', function() {
    modalWrap.style.display = 'none';
    document.body.style.overflow = 'unset';

});


console.log(dataHolder);

