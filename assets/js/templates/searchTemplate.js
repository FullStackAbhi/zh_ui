var searchTemplate =
'<form class="search-form" action="explore.html" method="GET">'+
    '<div class="input-group">'+
    '<!-- Select Country -->'+
    '<div class="input-group-prepend">'+
        '<select id="country" name="country" class="form-control">'+
            '<option value="INDIA" selected>India</option>'+
            '<option value="US">US</option>'+
            '<option value="Europe">Europe</option>'+
        '</select>'+
    '</div>'+
        '<!-- Select Purpose -->'+
        '<div class="input-group-prepend">'+
            '<select id="purpose" name="purpose" class="form-control">'+
                '<option value="Sale" selected>Buy</option>'+
                '<option value="Rent">Rent</option>'+
                '<option value="Lease">Lease</option>'+
                '<option value="PG">PG</option>'+
            '</select>'+
        '</div>'+
        '<!-- Select Property-type -->'+
        '<div class="input-group-prepend">'+
            '<select id="type" name="property-type" class="form-control">'+
                '<option value="Apartment Flat">Apartment Flat</option>'+
                '<option value="Independent Floor">Independent Floor</option>'+
                '<option value="Plot">Plot</option>'+
                '<option value="Independent House">Independent House</option>'+
                '<option value="Farm House">Farm House</option>'+
                '<option value="Hostel">Hostel</option>'+
                '<option value="School">School</option>'+
                '<option value="College">College</option>'+
                '<option value="Hotel">Hotel</option>'+
                '<option value="Office">Office</option>'+
                '<option value="Penthouse">Penthouse</option>'+
                '<option value="Shop">Shop</option>'+
                '<option value="Villa">Villa</option>'+
                '<option value="Commercial Building">Commercial Building</option>'+
                '<option value="Resort">Resort</option>'+
            '</select>'+
        '</div>'+
        '<!-- Select BHK -->'+
        '<div class="input-group-prepend">'+
            '<select id="bhk" name="bhk" class="form-control">'+
                '<option value="1BHK">1BHK</option>'+
                '<option value="2BHK">2BHK</option>'+
                '<option value="3BHK">3BHK</option>'+
                '<option value="4BHK">4BHK</option>'+
                '<option value="5BHK">5BHK</option>'+
                '<option value="6BHK">6BHK</option>'+
                '<option value="6BHK">6BHK</option>'+
                '<option value="7BHK">7BHK</option>'+
                '<option value="8BHK">8BHK</option>'+
                 '<option value="1RK">1RK</option>'+
            '</select>'+
        '</div>'+
        '<!-- Search text -->'+
        '<input id="loc" type="text" list="location" name="location" class="form-control location-field" placeholder="Search eg. Dwarka, Delhi, India" autocomplete="off">'+
        '<datalist id="location">'+
        '</datalist>'+
        '<!-- Submit Button -->'+
        '<div class="input-group-append">'+
            '<button type="submit" class="form-control">'+
                '<ion-icon name="search"></ion-icon>'+
            '</button>'+
        '</div>'+
    '</div>'+
'</form>';


Handlebars.registerPartial(
    "searchBar",
    searchTemplate
);