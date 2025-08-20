let url = window.location.href;

if(url.includes("admin")) {
    var headerTemplate = 
    '<div class="container">'+
        '<a class="navbar-brand" href="../index.html">'+
            '<svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 216 83.495">'+
                '<g id="Logo" transform="translate(1)">'+
                    '<text id="ZILAHOUSE" transform="translate(107 75.495)" font-size="32" font-family="Montserrat-ExtraBold, Montserrat" letter-spacing="0.065em"><tspan x="-107.184" y="0">ZILAHOUSE</tspan></text>'+
                    '<text id="_.com" data-name=".com" transform="translate(186 45.247)" font-size="20" font-family="Montserrat-ExtraBold, Montserrat" letter-spacing="0.065em"><tspan x="-27.83" y="0">.com</tspan></text>'+
                    '<g id="Layer_1" data-name="Layer 1" transform="translate(-1.514 -15)">'+
                    '<path id="Path_1008" data-name="Path 1008" d="M37.647,35.49h3.985V31.466H37.647Zm6.694,0H48.4V31.466H44.34Zm47.184,9.005L74.307,27.539V10.127l-8.29-8.27V19.346L49.573,3.153,46.352,0,43.131,3.173,1.18,44.495l45.172-31.3ZM46.468,3.463v6.771L17.982,30.876ZM37.647,29.154h3.985v-4H37.647Zm6.694,0H48.4v-4H44.34Zm6.694,0h4.024v-4H51.034Zm0,6.336h4.024V31.466H51.034Z" transform="translate(0.334 15)"/>'+
                    '</g>'+
                '</g>'+
            '</svg>'+
        '</a>'+

        '<div class="d-flex order-2 order-lg-3">'+
            '<ul class="navbar-nav flex-row align-items-center">'+
                '{{#if userData.user}}'+
                '<li class="nav-item ml-2 notif-icon-cont">'+
                    '<a href="notifications.html" class="position-relative">'+
                        '{{#if count.notificationsCount}}'+
                        '<span class="my-wl-count badge badge-danger position-absolute" style="top: -8px; left: -8px; z-index: 4; font-size: 12px;">{{count.notificationsCount}}</span>'+
                        '{{/if}}'+
                        '<ion-icon name="notifications" class="d-flex notif-icon"></ion-icon>'+
                    '</a>'+
                '</li>'+
                '{{/if}}'+
                '<li class="nav-item ml-lg-3 ml-md-2 ml-sm-2 ml-2">'+
                    '{{#if userData.user}}'+
                    '<a class="nav-link special" href="post-free-ad.html">Free Ad</a>'+
                    '{{else}}'+
                    '<a href="javascript:void(0)" class="nav-link pfa-button special">Free Ad</a>'+
                    '{{/if}}'+
                '</li>'+
            '</ul>'+
            '<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">'+
                '{{#if userData.user}}'+
                '<div class="img-cont thumbnail" style="background-image: url('+
                    '{{#if userData.user.profileImgUrl}}'+
                        '{{userData.user.profileImgUrl}}'+
                    '{{else}}'+
                        '../assets/images/icons/user.png'+
                    '{{/if}}'+
                ');"></div>'+
                '{{else}}'+
                '<ion-icon name="menu"></ion-icon>'+
                '{{/if}}'+
            '</button>'+
        '</div>'+

        '<div class="collapse navbar-collapse order-3 order-lg-2 justify-content-end" id="collapsibleNavbar">'+
            '<ul class="navbar-nav align-items-lg-center">'+
                '<li class="nav-item">'+
                    '<a class="nav-link" href="../explore.html?country=INDIA&purpose=Sale&property-type=Apartment+Flat&bhk=1BHK&location=Delhi">Explore</a>'+
                '</li>'+
                '{{#if userData.user}}'+
                '<li class="nav-item dropdown">'+
                    '<a href="#" class="nav-link dropdown-toggle position-relative" id="profileNavbarDrop" data-toggle="dropdown">'+
                        '<span class="my-wl-count badge badge-success position-absolute" style="top: -2px; left: -2px">{{count.myOptedWishlistsCount}}</span>'+
                        '<div class="img-cont thumbnail" style="background-image: url('+
                        '{{#if userData.user.profileImgUrl}}'+
                            '{{userData.user.profileImgUrl}}'+
                        '{{else}}'+
                            '../assets/images/icons/user.png'+
                        '{{/if}}'+
                        ');"></div>'+
                        '<span>{{userData.user.displayName}}</span>'+
                        '<ion-icon name="chevron-down-outline" class="ml-1"></ion-icon>'+
                    '</a>'+
                    '<div class="dropdown-menu">'+
                        '<a href="dashboard.html" class="dropdown-item">'+
                            '<ion-icon name="apps"></ion-icon>'+
                            '<span>Dashboard</span>'+
                        '</a>'+
                        '<a href="my-properties.html" class="dropdown-item">'+
                            '<ion-icon name="home"></ion-icon>'+
                            '<span>'+
                                'My Properties <span class="badge badge-danger ml-2">{{count.myAllPropertiesCount}}</span>'+
                            '</span>'+
                        '</a>'+
                        '<a href="my-wishlists.html" class="dropdown-item">'+
                            '<ion-icon name="star"></ion-icon>'+
                            '<span>My Wishlists <span class="badge badge-success ml-2">{{count.myOptedWishlistsCount}}</span></span>'+
                        '</a>'+
                        '{{#ifEquals userData.user.userType "admin"}}'+
                        '<a href="manage-users.html" class="dropdown-item">'+
                            '<ion-icon name="people"></ion-icon>'+
                            '<span>Manage Users  <span class="badge badge-danger ml-2">{{count.allUsersCount}}</span></span>'+
                        '</a>'+
                        '<a href="manage-properties.html" class="dropdown-item">'+
                            '<ion-icon name="folder-open"></ion-icon>'+
                            '<span>Manage Properties  <span class="badge badge-danger ml-2">{{count.allPropertiesCount}}</span></span>'+
                        '</a>'+
                        '<a href="manage-wishlists.html" class="dropdown-item">'+
                            '<ion-icon name="list"></ion-icon>'+
                            '<span>Manage Wishlists <span class="badge badge-danger ml-2">{{count.allWishlistsCount}}</span></span>'+
                        '</a>'+
                        '<a href="manage-comm-ads.html" class="dropdown-item">'+
                            '<ion-icon name="reader"></ion-icon>'+
                            '<span>Manage Comm Ads <span class="badge badge-danger ml-2">{{count.allCommercialAdsCount}}</span></span>'+
                        '</a>'+
                        '{{/ifEquals}}'+
                        '<a href="my-profile.html" class="dropdown-item">'+
                            '<ion-icon name="person"></ion-icon>'+
                            '<span>My Profile</span>'+
                        '</a>'+
                        '<a href="javascript:void(0)" class="logout-btn text-danger dropdown-item">'+
                            '<ion-icon name="close-circle"></ion-icon>'+
                            '<span>Logout</span>'+
                        '</a>'+
                    '</div>'+
                '</li>'+
                '{{else}}'+
                '<li class="nav-item">'+
                    '<a href="javascript:void(0)" class="nav-link apply-signin-temp">Sign In</a>'+
                '</li>'+
                '<li class="nav-item">'+
                    '<a href="javascript:void(0)" class="nav-link apply-signup-temp">Sign Up</a>'+
                '</li>'+
                '{{/if}}'+
            '</ul>'+
        '</div>'+
    '</div>';
} else {
    var headerTemplate = 
    '<div class="container">'+
        '<a class="navbar-brand" href="index.html">'+
            '<svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 216 83.495">'+
                '<g id="Logo" transform="translate(1)">'+
                    '<text id="ZILAHOUSE" transform="translate(107 75.495)" font-size="32" font-family="Montserrat-ExtraBold, Montserrat" letter-spacing="0.065em"><tspan x="-107.184" y="0">ZILAHOUSE</tspan></text>'+
                    '<text id="_.com" data-name=".com" transform="translate(186 45.247)" font-size="20" font-family="Montserrat-ExtraBold, Montserrat" letter-spacing="0.065em"><tspan x="-27.83" y="0">.com</tspan></text>'+
                    '<g id="Layer_1" data-name="Layer 1" transform="translate(-1.514 -15)">'+
                    '<path id="Path_1008" data-name="Path 1008" d="M37.647,35.49h3.985V31.466H37.647Zm6.694,0H48.4V31.466H44.34Zm47.184,9.005L74.307,27.539V10.127l-8.29-8.27V19.346L49.573,3.153,46.352,0,43.131,3.173,1.18,44.495l45.172-31.3ZM46.468,3.463v6.771L17.982,30.876ZM37.647,29.154h3.985v-4H37.647Zm6.694,0H48.4v-4H44.34Zm6.694,0h4.024v-4H51.034Zm0,6.336h4.024V31.466H51.034Z" transform="translate(0.334 15)"/>'+
                    '</g>'+
                '</g>'+
            '</svg>'+
        '</a>'+

        '<div class="d-flex order-2 order-lg-3">'+
            '<ul class="navbar-nav flex-row align-items-center">'+
                '{{#if userData.user}}'+
                '<li class="nav-item ml-2">'+
                    '<a href="admin/notifications.html" class="position-relative">'+
                        '{{#if count.notificationsCount}}'+
                        '<span class="my-wl-count badge badge-danger position-absolute" style="top: -8px; left: -8px; z-index: 4; font-size: 12px;">{{count.notificationsCount}}</span>'+
                        '{{/if}}'+
                        '<ion-icon name="notifications" class="d-flex notif-icon"></ion-icon>'+
                    '</a>'+
                '</li>'+
                '{{/if}}'+
                '<li class="nav-item ml-lg-3 ml-md-2 ml-sm-2 ml-2">'+
                    '{{#if userData.user}}'+
                    '<a class="nav-link special" href="admin/post-free-ad.html">Free Ad</a>'+
                    '{{else}}'+
                    '<a href="javascript:void(0)" class="nav-link pfa-button special">Free Ad</a>'+
                    '{{/if}}'+
                '</li>'+
            '</ul>'+
            '<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">'+
                '{{#if userData.user}}'+
                '<div class="img-cont thumbnail" style="background-image: url('+
                    '{{#if userData.user.profileImgUrl}}'+
                        '{{userData.user.profileImgUrl}}'+
                    '{{else}}'+
                        'assets/images/icons/user.png'+
                    '{{/if}}'+
                ');"></div>'+
                '{{else}}'+
                '<ion-icon name="menu"></ion-icon>'+
                '{{/if}}'+
            '</button>'+
        '</div>'+

        '<div class="collapse navbar-collapse order-3 order-lg-2 justify-content-end" id="collapsibleNavbar">'+
            '<ul class="navbar-nav align-items-lg-center">'+
                '<li class="nav-item">'+
                    '<a class="nav-link" href="explore.html?country=INDIA&purpose=Sale&property-type=Apartment+Flat&bhk=1BHK&location=Delhi">Explore</a>'+
                '</li>'+
                '{{#if userData.user}}'+
                '<li class="nav-item dropdown">'+
                    '<a href="#" class="nav-link dropdown-toggle" id="profileNavbarDrop" data-toggle="dropdown">'+
                        '<span class="my-wl-count badge badge-success position-absolute" style="top: -2px; left: -2px">{{count.myOptedWishlistsCount}}</span>'+
                        '<div class="img-cont thumbnail" style="background-image: url('+
                            '{{#if userData.user.profileImgUrl}}'+
                                '{{userData.user.profileImgUrl}}'+
                            '{{else}}'+
                                'assets/images/icons/user.png'+
                            '{{/if}}'+
                        ');"></div>'+
                        '<span>{{userData.user.displayName}}</span>'+
                        '<ion-icon name="chevron-down-outline" class="ml-1"></ion-icon>'+
                    '</a>'+
                    '<div class="dropdown-menu">'+
                        '<a href="admin/dashboard.html" class="dropdown-item">'+
                            '<ion-icon name="apps"></ion-icon>'+
                            '<span>Dashboard</span>'+
                        '</a>'+
                        '<a href="admin/my-properties.html" class="dropdown-item">'+
                            '<ion-icon name="home"></ion-icon>'+
                            '<span>My Properties <span class="badge badge-danger ml-2">{{count.myAllPropertiesCount}}</span></span>'+
                        '</a>'+
                        '<a href="admin/my-wishlists.html" class="dropdown-item">'+
                            '<ion-icon name="star"></ion-icon>'+
                            '<span>My Wishlists <span class="badge badge-success ml-2">{{count.myOptedWishlistsCount}}</span></span>'+
                        '</a>'+
                        '{{#ifEquals userData.user.userType "admin"}}'+
                        '<a href="admin/manage-users.html" class="dropdown-item">'+
                            '<ion-icon name="people"></ion-icon>'+
                            '<span>Manage Users <span class="badge badge-danger ml-2">{{count.allUsersCount}}</span></span>'+
                        '</a>'+
                        '<a href="admin/manage-properties.html" class="dropdown-item">'+
                            '<ion-icon name="folder-open"></ion-icon>'+
                            '<span>Manage Properties <span class="badge badge-danger ml-2">{{count.allPropertiesCount}}</span></span>'+
                        '</a>'+
                        '<a href="admin/manage-wishlists.html" class="dropdown-item">'+
                            '<ion-icon name="list"></ion-icon>'+
                            '<span>Manage Wishlists <span class="badge badge-danger ml-2">{{count.allWishlistsCount}}</span></span>'+
                        '</a>'+
                        '<a href="admin/manage-comm-ads.html" class="dropdown-item">'+
                            '<ion-icon name="reader"></ion-icon>'+
                            '<span>Manage Comm Ads <span class="badge badge-danger ml-2">{{count.allCommercialAdsCount}}</span></span>'+
                        '</a>'+
                        '{{/ifEquals}}'+
                        '<a href="admin/my-profile.html" class="dropdown-item">'+
                            '<ion-icon name="person"></ion-icon>'+
                            '<span>My Profile</span>'+
                        '</a>'+
                        '<a href="javascript:void(0)" class="logout-btn text-danger dropdown-item">'+
                            '<ion-icon name="close-circle"></ion-icon>'+
                            '<span>Logout</span>'+
                        '</a>'+
                    '</div>'+
                '</li>'+
                '{{else}}'+
                '<li class="nav-item">'+
                    '<a href="javascript:void(0)" class="nav-link apply-signin-temp">Sign In</a>'+
                '</li>'+
                '<li class="nav-item">'+
                    '<a href="javascript:void(0)" class="nav-link apply-signup-temp">Sign Up</a>'+
                '</li>'+
                '{{/if}}'+
            '</ul>'+
        '</div>'+
    '</div>';
}

Handlebars.registerPartial(
    "header",
    headerTemplate
);

Handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
    return (arg1.toLowerCase() == arg2.toLowerCase()) ? options.fn(this) : options.inverse(this);
});