var year = new Date().getFullYear();
var footerTemplate = 
'<div class="container d-flex justify-content-between align-items-center">'+
    '<div class="footer-logo">'+
        '&copy; '+
        '<span class="currentYear">'+
            year
        +'</span> &bull; <a href="/" class="footer-link ml-0">ZilaHouse</a>'+
    '</div>'+
    '<div class="quick-links">'+
        '<a href="#" class="footer-link">About Us</a>'+
        '<a href="#" class="footer-link">Contact Us</a>'+
        '<a href="#" class="footer-link">Privacy &amp; Terms</a>'+
        '<a href="https://youtube.com/@zilahouse" target="_blank" class="footer-link">Youtube</a>'+
        '<a href="#" class="footer-link d-flex justify-content-center align-items-center">'+
            'Go to Top'+
        '</a>'+
    '</div>'+
'</div>';

Handlebars.registerPartial(
    "footer",
    footerTemplate
);
