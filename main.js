const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const citySection = $('.city .img-container');
const natureSection = $('.nature .img-container');
const modal = $('.modal');
const displayedImg = $('.img-display img');
const slideImgs = $('.slide-imgs');
const closeBtn = $('.close-btn');
const nextBtn = $('.next-btn');
const prevBtn = $('.prev-btn');

const app = {
    currentIndex : 0,
    categories : ['nature', 'city'],
    imgList : [
        {
            id:'1',
            src: './src/city-1.jpeg',
            category: 'city',
        },
        {
            id:'2',
            src: './src/city-2.jpeg',
            category: 'city',
        },
        {
            id:'3',
            src: './src/city-3.jpeg',
            category: 'city',
        },
        {
            id:'4',
            src: './src/city-4.jpeg',
            category: 'city',
        },
        {
            id:'5',
            src: './src/city-5.jpeg',
            category: 'city',
        },
        {
            id:'6',
            src: './src/nature-1.jpeg',
            category: 'nature',
        },
        {
            id:'7',
            src: './src/nature-2.jpeg',
            category: 'nature',
        },
        {
            id:'8',
            src: './src/nature-3.jpeg',
            category: 'nature',
        },
    ],
    render: function(){
        let cityImagePosition = 0;
        let htmlCityImg = this.imgList.map((img,index)=>{
        if(img.category === 'city'){
            cityImagePosition++;
            // return `<div class="img ${img.category}" style="left:${cityImagePosition*31}rem"><img src="${img.src}" alt=""></div>`;
            return `<div class="img ${img.category}"><img class="${img.category}" id="${cityImagePosition}" src="${img.src}" alt=""></div>`;
        }
        
        });
        let natureImagePosition = 0;
        let htmlNatureImg = this.imgList.map((img,index)=>{
            if(img.category === 'nature'){
                natureImagePosition++;
                // return `<div class="img ${img.category}" style="left:${cityNaturePosition*31}rem"><img src="${img.src}" alt=""></div>`;
                return `<div class="img ${img.category}"><img class="${img.category}" id="${natureImagePosition}" src="${img.src}" alt=""></div>`;
            }
        });
        citySection.innerHTML = htmlCityImg.join('');
        natureSection.innerHTML = htmlNatureImg.join('');
    },
    start: function() {
        this.render();
    }
}

app.start();