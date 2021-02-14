const imagesArea = document.querySelector('.images');
const gallery = document.querySelector('.gallery');
const galleryHeader = document.querySelector('.gallery-header');
const searchBtn = document.getElementById('search-btn');
const sliderBtn = document.getElementById('create-slider');
const sliderContainer = document.getElementById('sliders');
// selected image 
let sliders = [];


// If this key doesn't work
// Find the name in the url and go to their website
// to create your own api key
// KEY = '20269465-79ecc13d3fc801f5d8bc88cb0';
// show images 
const showImages = (images) => {
  displaySpinner ()
  imagesArea.style.display = 'block';
  gallery.innerHTML = '';
  // show gallery title
  galleryHeader.style.display = 'flex';
  images.forEach(image => {
    let div = document.createElement('div');
    div.className = 'col-lg-3 col-md-4 col-xs-6 img-item mb-2';
    div.innerHTML = ` <img class="img-fluid img-thumbnail" onclick=selectItem(event,"${image.webformatURL}") src="${image.webformatURL}" alt="${image.tags}">`;
    gallery.appendChild(div)
  })

}

const getImages = (query) => {
  displaySpinner ()

  setTimeout(()=>{
  const url = (`https://pixabay.com/api/?key=20269465-79ecc13d3fc801f5d8bc88cb0&q=${query}&image_type=photo&pretty=true`)
  console.log(url)
  fetch(url)
  .then(response => response.json())
  .then(data => {
  console.log(data.hits)
  showImages(data.hits)})
  .catch(err => console.log(err))
}, 1000)
}

let slideIndex = 0;
const selectItem = (event, img) => {
  let element = event.target;
  element.classList.toggle('added');
 
  let item = sliders.indexOf(img);
  if (item === -1) {
    sliders.push(img);
  } 
  else {
    sliders.splice(item, 1)
  }
}
var timer
const createSlider = () => {
  // check slider image length
  if (sliders.length < 2) {
    alert('Select at least 2 image.')
    return;
  }
  // crate slider previous next area
  sliderContainer.innerHTML = ' ';
  const prevNext = document.createElement('div');
  prevNext.className = "prev-next d-flex w-100 justify-content-between align-items-center";
  prevNext.innerHTML = ` 
  <span class="prev" onclick="changeItem(-1)"><i class="fas fa-chevron-left"></i></span>
  <span class="next" onclick="changeItem(1)"><i class="fas fa-chevron-right"></i></span>
  `;

  sliderContainer.appendChild(prevNext)
  document.querySelector('.main').style.display = 'block';
  // hide image aria
  imagesArea.style.display = 'none';
  sliders.forEach(slide => {
    let item = document.createElement('div')
    item.className = "slider-item";
    item.innerHTML = `<img class="w-100"
    src="${slide}"
    alt="">`;
    sliderContainer.appendChild(item)
  })
  const duration = document.getElementById('duration').value || 1000;
  if(duration>=0){
    changeSlide(0)
    timer = setInterval(function () {
      slideIndex++;
      changeSlide(slideIndex);
    },
     duration
    );
  }
  else{
    alert("Slider Change duration Can't be negative")
  }
}


// change slider index 
const changeItem = index => {
  changeSlide(slideIndex += index);
}

// change slide item
const changeSlide = (index) => {

  const items = document.querySelectorAll('.slider-item');
  if (index < 0) {
    slideIndex = items.length - 1
    index = slideIndex;
  };

  if (index >= items.length) {
    index = 0;
    slideIndex = 0;
  }

  items.forEach(item => {
    item.style.display = "none"
  })

  items[index].style.display = "block"
}

searchBtn.addEventListener('click', function () {
  document.querySelector('.main').style.display = 'none';
  clearInterval(timer);
  const search = document.getElementById('search');
  if(search.value<1){
    alert("Please input some text")
  }
  else{
    getImages(search.value)
  sliders.length = 0;
  }
});

document.getElementById('search').addEventListener("keypress", function(event){
  if(event.key === "Enter"){
    document.getElementById('search-btn').click();
  }
});


sliderBtn.addEventListener('click', function () {
  createSlider()
})

const displaySpinner = () =>{
const spinner = document.getElementById("spinner")
const image = document.getElementById("image")
spinner.classList.toggle("d-none")
image.classList.toggle("d-none")
}