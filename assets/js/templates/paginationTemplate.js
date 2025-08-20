var paginationTemplate =
'<ul class="pagination m-0">'+
    '<li class="page-item prev-page-btn">'+
        '<a href="#" class="page-link">Prev</a>'+
    '</li>'+
    '<div class="page-item-cont">'+
        '{{#each page}}'+
        '<li id="page{{this}}" class="page-item">'+
            '<a href="#page{{this}}" class="page-link" data-page="{{this}}">{{this}}</a>'+
        '</li>'+
        '{{/each}}'+
    '</div>'+
    '<li class="page-item next-page-btn">'+
        '<a href="#" class="page-link">Next</a>'+
    '</li>'+
'</ul>';

Handlebars.registerPartial(
    "pagination",
    paginationTemplate
);