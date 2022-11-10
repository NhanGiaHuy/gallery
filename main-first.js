const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

var imgList = [
  {
    id: "1",
    src: "./src/city-1.jpeg",
    category: "city",
  },
  {
    id: "2",
    src: "./src/city-2.jpeg",
    category: "city",
  },
  {
    id: "3",
    src: "./src/city-3.jpeg",
    category: "city",
  },
  {
    id: "4",
    src: "./src/city-4.jpeg",
    category: "city",
  },
  {
    id: "5",
    src: "./src/city-5.jpeg",
    category: "city",
  },
  {
    id: "6",
    src: "./src/nature-1.jpeg",
    category: "nature",
  },
  {
    id: "7",
    src: "./src/nature-2.jpeg",
    category: "nature",
  },
  {
    id: "8",
    src: "./src/nature-3.jpeg",
    category: "nature",
  },
];

const citySection = $(".city .img-container");
const natureSection = $(".nature .img-container");
const modal = $(".modal");
const displayedImg = $(".img-display img");
const slideImgs = $(".slide-imgs");
const closeBtn = $(".close-btn");
const nextBtn = $(".next-btn");
const prevBtn = $(".prev-btn");
var currentIndex = 0;

function render() {
  let cityImagePosition = 0;
  let htmlCityImg = imgList.map((img, index) => {
    if (img.category === "city") {
      cityImagePosition++;
      // return `<div class="img ${img.category}" style="left:${cityImagePosition*31}rem"><img src="${img.src}" alt=""></div>`;
      return `<div class="img ${img.category}"><img class="${img.category}" id="${cityImagePosition}" src="${img.src}" alt=""></div>`;
    }
  });
  let natureImagePosition = 0;
  let htmlNatureImg = imgList.map((img, index) => {
    if (img.category === "nature") {
      natureImagePosition++;
      // return `<div class="img ${img.category}" style="left:${cityNaturePosition*31}rem"><img src="${img.src}" alt=""></div>`;
      return `<div class="img ${img.category}"><img class="${img.category}" id="${natureImagePosition}" src="${img.src}" alt=""></div>`;
    }
  });
  citySection.innerHTML = htmlCityImg.join("");
  natureSection.innerHTML = htmlNatureImg.join("");
}

function openImg() {
  const imgs = $$(".img img");

  imgs.forEach((img, index) => {
    img.onclick = () => {
      displayedImg.src = img.src;
      modal.classList.add("opened");
      displayImgSubList(img);
      currentIndex = img.id;
      viewNextImage(currentIndex - 1);
      viewPrevImage(currentIndex - 1);
    };
  });
}

function closeViewImg() {
  closeBtn.onclick = () => {
    modal.classList.remove("opened");
  };
}

//function name: displayImgSubList
//purpose will display a small list of imgs below the main image which has the same category as the main img
//parameter: image (HTML object)
function displayImgSubList(image) {
  if (image.classList.contains("city")) {
    let cityImagePosition = 0;
    let htmlCityImg = imgList.map((img, index) => {
      if (img.category === "city") {
        cityImagePosition++;
        if (img.src === image.attributes.src.textContent) {
          return `<div><img id="${cityImagePosition}" class="selected" src="${img.src}" alt="" onclick="viewImgFromSublist('${img.src}')"></div>`;
        } else {
          return `<div><img id="${cityImagePosition}" src="${img.src}" alt="" onclick="viewImgFromSublist('${img.src}')"></div>`;
        }
      }
    });
    slideImgs.innerHTML = htmlCityImg.join("");
  } else {
    let natureImagePosition = 0;
    let htmlNatureImg = imgList.map((img, index) => {
      if (img.category === "nature") {
        natureImagePosition++;
        if (img.src === image.attributes.src.textContent) {
          return `<div><img id="${natureImagePosition}" class="selected" src="${img.src}" alt="" onclick="viewImgFromSublist('${img.src}')"></div>`;
        } else {
          return `<div><img id="${natureImagePosition}" src="${img.src}" alt="" onclick="viewImgFromSublist('${img.src}')"></div>`;
        }
      }
    });
    slideImgs.innerHTML = htmlNatureImg.join("");
  }
}

function viewImgFromSublist(imgURL) {
  displayedImg.src = imgURL;
  const subListImg = $$(".slide-imgs img");
  subListImg.forEach((img) => {
    if (img.classList.contains("selected")) {
      img.classList.remove("selected");
    } else {
      console.log(img.src, imgURL);
      if (img.attributes.src.textContent == imgURL) {
        img.classList.add("selected");
      }
    }
  });
}

function viewNextImage(currentIndex) {
  nextBtn.onclick = () => {
    const subListImg = $$(".slide-imgs img");
    currentIndex++;
    subListImg.forEach((img) => {
      if (currentIndex > subListImg.length - 1) {
        currentIndex = 0;
        subListImg[subListImg.length - 1].classList.remove("selected");
        subListImg[currentIndex].classList.add("selected");
      }
      if (img.id == currentIndex + 1) {
        displayedImg.src = img.attributes.src.textContent;
        if (currentIndex == 0) {
          subListImg[currentIndex].classList.add("selected");
          subListImg[subListImg.length - 1].classList.remove("selected");
        } else {
          subListImg[currentIndex].classList.add("selected");
          subListImg[currentIndex - 1].classList.remove("selected");
        }
      }
    });
  };
}

function viewPrevImage(currentIndex) {
  prevBtn.onclick = () => {
    const subListImg = $$(".slide-imgs img");
    currentIndex--;
    subListImg.forEach((img) => {
      if (currentIndex < 0) {
        currentIndex = subListImg.length - 1;
        subListImg[0].classList.remove("selected");
        subListImg[currentIndex].classList.add("selected");
      }
      if (img.id == currentIndex + 1) {
        displayedImg.src = img.attributes.src.textContent;
        if (currentIndex == 0) {
          subListImg[currentIndex].classList.remove("selected");
          subListImg[subListImg.length - 1].classList.add("selected");
        } else {
          subListImg[currentIndex].classList.remove("selected");
          subListImg[currentIndex - 1].classList.add("selected");
        }
      }
    });
  };
}

function start() {
  render();
  openImg();
  closeViewImg();
}

start();
