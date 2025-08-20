var propertyTemplate =
  "{{#each property}}" +
  '<div class="swiper-slide property">' +
  '<div class="property-head">' +
  '<div class="author-profile-box">' +
  '<div class="author-img img-cont" style="background-image: url(' +
  "{{#if requesterImgUrl}}" +
  "{{requesterImgUrl}}" +
  "{{else}}" +
  "assets/images/icons/user.png" +
  "{{/if}}" +
  ');"></div>' +
  '<div class="author-details">' +
  '<div class="post-date">posted on {{postedDate}} by' +
  "</div>" +
  '<div class="author-name">{{requesterName}} <small>({{requesterUserType}})</small></div>' +
  "</div>" +
  "</div>" +
  '<div class="ctas-cont">' +
  '<span style="margin-right: 12px; margin-top:4px"><a class="share-btn" data-url="https://zilahouse.com/r/{{estateId}}"><i class="fa-duotone fa-solid fa-share"></i></a></span>' +
  '<a href="/r/{{estateId}}" class="cta-transparent cta-filled-sm">' +
  "View More" +
  "</a>" +
  '<a class="cta-filled cta-filled-sm view-contact" data-id="{{estateId}}">' +
  "View Contact" +
  "</a>" +
  "</div>" +
  "</div>" +
  '<div class="property-body">' +
  '<div class="property-img-cont swiper-container swiper3" data-id="{{estateId}}">' +
  '<div class="swiper-wrapper">' +
  "{{#each estatePictures}}" +
  '<div class="swiper-slide img-cont property-img" style="background-image: url(https://zilahouse.com{{picturePath}})">' +
  "</div>" +
  "{{/each}}" +
  "</div>" +
  '<div class="swiper-pagination swiper-pagination3"></div>' +
  "</div>" +
  '<div class="property-details-cont">' +
  '<h3 class="property-name">' +
  '<!--marquee id="propTitleMarquee" onMouseOver="this.start()" onMouseOut="this.stop()" behavior=scroll direction="left" scrollamount="5"-->' +
  "{{estateTitle}}" +
  "<!--/marquee-->" +
  "</h3>" +
  '<div class="property-details-body">' +
  '<div class="features-box">' +
  "{{#each mainFeatures}}" +
  '<div class="feature">' +
  '<div class="feature-name">' +
  "{{@key}}" +
  "</div>" +
  '<div class="feature-value">' +
  "{{this}}" +
  "</div>" +
  "</div>" +
  "{{/each}}" +
  "</div>" +
  '<div class="price-box">' +
  "{{#each charges}}" +
  '<div class="price">' +
  '<div class="price-name">' +
  "{{@key}}" +
  "</div>" +
  '<div class="price-value">' +
  "{{this}}" +
  "</div>" +
  "</div>" +
  "{{/each}}" +
  "</div>" +
  "</div>" +
  "</div>" +
  "</div>" +
  "</div>" +
  "{{/each}}";

Handlebars.registerPartial("property", propertyTemplate);
