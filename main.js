const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

var imgList = [
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
];

const citySection = $('.city .img-container');
const natureSection = $('.nature .img-container');
const modal = $('.modal');
const displayedImg = $('.img-display img');
const slideImgs = $('.slide-imgs');
const closeBtn = $('.close-btn');
const nextBtn = $('next-btn');
const prevBtn = $('prev-btn');

function render() {
    let cityImagePosition = -1;
    let htmlCityImg = imgList.map((img,index)=>{
        if(img.category === 'city'){
            cityImagePosition++;
            // return `<div class="img ${img.category}" style="left:${cityImagePosition*31}rem"><img src="${img.src}" alt=""></div>`;
            return `<div class="img ${img.category}"><img class="${img.category}" src="${img.src}" alt=""></div>`;
 
        }
        
    });
    let cityNaturePosition = -1;
    let htmlNatureImg = imgList.map((img,index)=>{
        if(img.category === 'nature'){
            cityNaturePosition++;
            // return `<div class="img ${img.category}" style="left:${cityNaturePosition*31}rem"><img src="${img.src}" alt=""></div>`;
            return `<div class="img ${img.category}"><img class="${img.category}" src="${img.src}" alt=""></div>`;
        }
        
    });
    citySection.innerHTML = htmlCityImg.join('');
    natureSection.innerHTML = htmlNatureImg.join('');
}

function openImg() {
    const imgs = $$('.img img');
    imgs.forEach((img,index) => {
        img.onclick = () => {
            displayedImg.src = img.src;  
            modal.classList.add('opened');
            if(img.classList.contains('city')){
                console.log('city');
                let cityImagePosition = -1;
                let htmlCityImg = imgList.map((img,index)=>{
                    if(img.category === 'city'){
                        cityImagePosition++;
                        return `<div><img src="${img.src}" alt=""></div>`;
                    }
                });
                slideImgs.innerHTML = htmlCityImg.join('');
            }else{
                console.log('nature');
                let natureImagePosition = -1;
                let htmlNatureImg = imgList.map((img,index)=>{
                    if(img.category === 'nature'){
                        natureImagePosition++;
                        return `<div><img src="${img.src}" alt=""></div>`;
                    }
                });
                slideImgs.innerHTML = htmlNatureImg.join('');
            }
        }
    });
    
    closeViewImg();
}

function closeViewImg(){
    closeBtn.onclick = () =>{
        modal.classList.remove('opened');
    }
}



function start() {
    render();
    openImg();
}

start()
