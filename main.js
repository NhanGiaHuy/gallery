const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const citySection = $(".city .img-container");
const natureSection = $(".nature .img-container");
const modal = $(".modal");
const displayedImg = $(".img-display img");
const slideImgs = $(".slide-imgs");
const closeBtn = $(".close-btn");
const nextBtn = $(".next-btn");
const prevBtn = $(".prev-btn");

const app = {
  cityCurrentIndex: 0,
  natureCurrentIndex: 0,
  imgList: [
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
  ],
  render: function () {
    let cityImagePosition = 0;
    let htmlCityImg = this.imgList.map((img, index) => {
      if (img.category === "city") {
        cityImagePosition++;
        return `<div class="img ${img.category}"><img class="${img.category}" id="${cityImagePosition}" src="${img.src}" alt=""></div>`;
      }
    });
    let natureImagePosition = 0;
    let htmlNatureImg = this.imgList.map((img, index) => {
      if (img.category === "nature") {
        natureImagePosition++;
        return `<div class="img ${img.category}"><img class="${img.category}" id="${natureImagePosition}" src="${img.src}" alt=""></div>`;
      }
    });
    citySection.innerHTML = htmlCityImg.join("");
    natureSection.innerHTML = htmlNatureImg.join("");
  },
  behaviourHandle: function () {
    const _this = this;
    const allImgs = $$(".img img");
    const natureImgs = $$(".img .nature");
    const cityImgs = $$(".img .city");
    //when user click to img => render the current img view and small list of img with same caterogy
    allImgs.forEach((img, index) => {
      img.onclick = () => {
        displayedImg.src = img.src;
        modal.classList.add("opened");
        if (img.classList.contains("nature")) {
          _this.natureCurrentIndex = index + 1;
          //render the small list of img for nature img
          _this.renderModalImgList(natureImgs, img);
          _this.viewImgFromSublist();
          nextBtn.onclick = () => {
            _this.nextImg();
          };
          prevBtn.onclick = () => {
            _this.prevImg();
          };
        } else {
          _this.cityCurrentIndex = index - $$(".img .nature").length + 1;
          //render the small list of img for city img
          _this.renderModalImgList(cityImgs, img);
          _this.viewImgFromSublist();
          nextBtn.onclick = () => {
            _this.nextImg();
          };
          prevBtn.onclick = () => {
            _this.prevImg();
          };
        }
      };
    });

    closeBtn.onclick = () => {
      modal.classList.remove("opened");
    };
  },
  //click into the img small list
  renderModalImgList: function (imgList, currentImg) {
    var htmlImgSmallList = [];
    if (currentImg.classList.contains("nature")) {
      imgList.forEach((natureImg, index) => {
        if (natureImg.id == this.natureCurrentIndex) {
          htmlImgSmallList.push(
            `<div><img id="${
              index + 1
            }" class="list-img nature selected" src="${
              natureImg.src
            }" alt="" onclick="viewImgFromSublist()"></div>`
          );
        } else {
          htmlImgSmallList.push(
            `<div><img id="${index + 1}" class="list-img nature" src="${
              natureImg.src
            }" alt="" onclick="viewImgFromSublist()"></div>`
          );
        }
      });
    } else {
      imgList.forEach((cityImg, index) => {
        if (cityImg.id == this.cityCurrentIndex) {
          htmlImgSmallList.push(
            `<div><img id="${index + 1}" class="list-img city selected" src="${
              cityImg.src
            }" alt="" onclick="viewImgFromSublist()"></div>`
          );
        } else {
          htmlImgSmallList.push(
            `<div><img id="${index + 1}" class="list-img city" src="${
              cityImg.src
            }" alt="" onclick="viewImgFromSublist()"></div>`
          );
        }
      });
    }
    slideImgs.innerHTML = htmlImgSmallList.join("");
  },
  viewImgFromSublist: function () {
    const modalImgList = $$(".list-img");
    modalImgList.forEach((img) => {
      img.onclick = () => {
        const currentImg = $(".list-img.selected");
        currentImg.classList.remove("selected");
        img.classList.add("selected");
        displayedImg.src = img.src;
        if (img.classList.contains("nature")) {
          app.natureCurrentIndex = img.id;
        } else {
          app.cityCurrentIndex = img.id;
        }
      };
    });
  },
  nextImg: function () {
    const modalImgList = $$(".list-img");
    const currentImg = $(".list-img.selected");
    if (currentImg.classList.contains("nature")) {
      this.natureCurrentIndex++;
      if (this.natureCurrentIndex > modalImgList.length) {
        this.natureCurrentIndex = 1;
        currentImg.classList.remove("selected");
        modalImgList[this.natureCurrentIndex - 1].classList.add("selected");
        displayedImg.src = modalImgList[this.natureCurrentIndex - 1].src;
      } else {
        currentImg.classList.remove("selected");
        modalImgList[this.natureCurrentIndex - 1].classList.add("selected");
        displayedImg.src = modalImgList[this.natureCurrentIndex - 1].src;
      }
    } else {
      this.cityCurrentIndex++;
      if (this.cityCurrentIndex > modalImgList.length) {
        this.cityCurrentIndex = 1;
        currentImg.classList.remove("selected");
        modalImgList[this.cityCurrentIndex - 1].classList.add("selected");
        displayedImg.src = modalImgList[this.cityCurrentIndex - 1].src;
      } else {
        currentImg.classList.remove("selected");
        modalImgList[this.cityCurrentIndex - 1].classList.add("selected");
        displayedImg.src = modalImgList[this.cityCurrentIndex - 1].src;
      }
    }
  },
  prevImg: function () {
    const modalImgList = $$(".list-img");
    const currentImg = $(".list-img.selected");
    if (currentImg.classList.contains("nature")) {
      this.natureCurrentIndex--;
      if (this.natureCurrentIndex == 0) {
        this.natureCurrentIndex = modalImgList.length;
        currentImg.classList.remove("selected");
        modalImgList[this.natureCurrentIndex - 1].classList.add("selected");
        displayedImg.src = modalImgList[this.natureCurrentIndex - 1].src;
      } else {
        currentImg.classList.remove("selected");
        modalImgList[this.natureCurrentIndex - 1].classList.add("selected");
        displayedImg.src = modalImgList[this.natureCurrentIndex - 1].src;
      }
    } else {
      this.cityCurrentIndex--;
      if (this.cityCurrentIndex == 0) {
        this.cityCurrentIndex = modalImgList.length;
        currentImg.classList.remove("selected");
        modalImgList[this.cityCurrentIndex - 1].classList.add("selected");
        displayedImg.src = modalImgList[this.cityCurrentIndex - 1].src;
      } else {
        currentImg.classList.remove("selected");
        modalImgList[this.cityCurrentIndex - 1].classList.add("selected");
        displayedImg.src = modalImgList[this.cityCurrentIndex - 1].src;
      }
    }
  },
  start: function () {
    this.render();
    this.behaviourHandle();
  },
};

app.start();
