var commAdTemplate =
'{{#each commAd}}'+
'<a class="ads" target="_blank" href="{{bannerUrl}}">'+
    '<img src="https://zilahouse.com/{{bannerPath}}" alt="HDFC Bank">'+
'</a>'+
'{{/each}}';

Handlebars.registerPartial(
    "commAd",
    commAdTemplate
)

