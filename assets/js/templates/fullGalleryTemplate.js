var galleryTemplate = 
'<div class="container">'+
    '<ion-icon class="close-gallery close-icon" name="close-outline"></ion-icon>'+
'</div>'+
'<div class="container">'+
    '<div class="swiper-container gallery-top">'+
        '<div class="swiper-wrapper">'+
            '{{#each estatePictures}}'+
            '<div class="swiper-slide img-cont" style="background-image: url(https://zilahouse.com{{picturePath}});"></div>'+
            '{{/each}}'+
        '</div>'+
        '<div class="swiper-button-next swiper-button-white"></div>'+
        '<div class="swiper-button-prev swiper-button-white"></div>'+
    '</div>'+
    '<div class="swiper-container gallery-thumbs">'+
        '<div class="swiper-wrapper">'+
            '{{#each estatePictures}}'+
            '<div class="swiper-slide img-cont" style="background-image: url(https://zilahouse.com{{picturePath}});"></div>'+
            '{{/each}}'+
        '</div>'+
    '</div>'+
'</div>';

Handlebars.registerPartial(
    "gallery",
    galleryTemplate
);