import { Model } from "./model.js";
import * as views from "./view.js";

// Getting User Data
let userData = null;
if (sessionStorage.getItem("loggedInUser") !== null) {
  userData = JSON.parse(sessionStorage.getItem("loggedInUser"));
}
if (localStorage.getItem("loggedInUser") !== null) {
  userData = JSON.parse(localStorage.getItem("loggedInUser"));
}

// Getting current URL
let url = window.location.href;

// Applying Header and footer template everywhere except on welcome.html
if (!url.includes("welcome")) {
  let headerData = {
    userData: userData,
    count: Model.realData.countStats,
  };
  views.applyTemplates("header-content", "header-template", headerData);
  if (userData) {
    let mobile = userData.user.mobile;
    Model.getCountStats(mobile);
    window.addEventListener("count-stats-fetched", function () {
      let headerData = {
        userData: userData,
        count: Model.realData.countStats,
      };
      views.applyTemplates("header-content", "header-template", headerData);
      bindings();
    });
  } else {
    let headerData = {
      userData: userData,
      count: Model.realData.countStats,
    };
    views.applyTemplates("header-content", "header-template", headerData);
    bindings();
  }

  views.applyTemplates("footer-content", "footer-template");
}

// Applying search form template only on home and explore page
if (
  !url.includes("admin") &&
  !url.includes("estate") &&
  !url.includes("wishlist") &&
  !url.includes("welcome")
) {
  views.applyTemplates("search-form-cont", "search-template");
  $("#type").change(propertyTypeHandler);
}
function propertyTypeHandler() {
  let type = $("#type").val();
  if (type == "Apartment Flat" || type == "Independent Floor") {
    enableBhkField();
  } else {
    disableBhkField();
  }
}
function enableBhkField() {
  $("#bhk").prop("disabled", false);
}
function disableBhkField() {
  $("#bhk").prop("disabled", true);
}

function locSuggestionsHandler() {
  let locQuery = $(".location-field").val();
  let country = $("input[name='country']:checked").val();
  if (typeof country === "undefined" || country === null)
    country = $("#country").val();
  if (locQuery.length > 2) {
    Model.getLocSuggestions(country + ":" + locQuery);
  }
}

// Implementing Explore page functions
if (url.includes("explore")) {
  showCommAds();
  let searchParams = new URLSearchParams(window.location.search);

  let purpose = searchParams.get("purpose");
  let propertyType = searchParams.get("property-type");
  let bhk = searchParams.get("bhk");
  let estateArea = searchParams.get("estateArea");
  let loc = searchParams.get("location");

  if (purpose == null || purpose == "") {
    purpose = "sale";
  }
  if (propertyType == null || propertyType == "") {
    propertyType = "apartment flat";
  }
  if (bhk == null || bhk == "") {
    bhk = "";
  }
  if (loc == null || loc == "") {
    loc = "Delhi";
  }

  $("#type option[value='" + propertyType + "']").attr("selected", "selected");
  $("#purpose option[value='" + purpose + "']").attr("selected", "selected");
  $("#bhk option[value='" + bhk + "']").attr("selected", "selected");
  $("#loc").attr("value", loc);

  propertyTypeHandler();

  let propertyQuery = {
    estateName: purpose,
    estateType: propertyType,
    numOfBedrooms: bhk,
    location: loc,
  };

  $("#search-response-content").html(
    "<div class='d-flex align-items-center'><div class='spinner-border spinner-border-sm mr-2' style='border-width: 2px'></div>Loading...</div>"
  );
  Model.getPropertySearchResult(propertyQuery, purpose);
  window.addEventListener("search-properties-fetched", showSearchResponse);
  window.addEventListener(
    "search-properties-fetch-failed",
    showSearchResponseFailed
  );
}

function showSearchResponse() {
  let resultProps = Model.realData.searchResponseProps || [];
  let itemsPerPage = 10; // Number of items to display per page
  let currentPage = 1; // Initialize current page number

  function displayProperties(start, end) {
    let propertiesToDisplay = resultProps.slice(start, end);

    // Append the properties to the existing ones
    views.applyTemplates("search-response-content", "property-template", {
      property: propertiesToDisplay,
      append: true, // Ensure properties are appended
    });

    // Reinitialize Swipers
    initializeSwipers();

    // Scroll to the top of the new content
    setTimeout(() => {
      document
        .getElementById("search-response-content")
        .scrollIntoView({ behavior: "smooth" });
    }, 0);
  }

  function initializeSwipers() {
    // Swiper3
    var mySwiper3 = new Swiper(".swiper3", {
      effect: "fade",
      speed: 800,
      slidesPerView: 1,
      spaceBetween: 0,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".swiper-pagination3",
        clickable: true,
        type: "fraction",
      },
    });

    // Event handlers for other interactions
    $(".property-img-cont").unbind("click", openGallery);
    $(".property-img-cont").click(openGallery);
    $(".view-contact").unbind("click", showContactHandler);
    $(".view-contact").click(showContactHandler);
  }
  // console.log(resultProps.length);
  function handleLoadMore() {
    // Calculate new page and indices
    currentPage++;
    let start = (currentPage - 1) * itemsPerPage;
    let end = start + itemsPerPage;

    // Display properties for the new page
    displayProperties(start, end);

    // Check if there are more items to load
    if (end >= resultProps.length) {
      document.getElementById("load-more-search").style.display = "none"; // Hide "Load More" button if no more items
      document.getElementById("go-to-start-search").style.display = "block"; // Show "Go to Start" button
    }
  }

  function handleGoToStart() {
    currentPage = 1; // Reset to the first page
    let start = 0;
    let end = itemsPerPage;

    // Clear existing content and display the first page
    document.getElementById("search-response-content").innerHTML = "";
    displayProperties(start, end);

    // Hide "Go to Start" button and show "Load More" button
    document.getElementById("go-to-start-search").style.display = "none";
    document.getElementById("load-more-search").style.display =
      resultProps.length > itemsPerPage ? "block" : "none";

    // Scroll to the top of the page
    window.scrollTo(0, 0);
  }

  if (resultProps.length > 0) {
    // Display initial set of properties (first 10)
    displayProperties(0, itemsPerPage);

    // Show "Load More" button if there are more items than the initial 10
    if (resultProps.length > itemsPerPage) {
      document.getElementById("load-more-search").style.display = "block";
      document
        .getElementById("load-more-search")
        .addEventListener("click", handleLoadMore);
    } else {
      document.getElementById("load-more-search").style.display = "none";
    }

    // Show "Go to Start" button if there are more than the initial 10 items
    document.getElementById("go-to-start-search").style.display = "none";
    document
      .getElementById("go-to-start-search")
      .addEventListener("click", handleGoToStart);
  } else {
    $("#search-response-content").html("Oops! No properties found!");
    document.getElementById("load-more-search").style.display = "none";
    document.getElementById("go-to-start-search").style.display = "none";
  }
}

function showSearchResponseFailed() {
  $("#search-response-content").html("Something went wrong! Please try again.");
}

// Function to load and show comm ads
function showCommAds() {
  Model.getAllCommAds(2, 4);

  window.removeEventListener("comm-ads-fetched2", applyCommAdTemplate);
  window.addEventListener("comm-ads-fetched2", applyCommAdTemplate);
}
function applyCommAdTemplate() {
  let commAds = Model.realData.commAds;
  views.applyTemplates("ads-cont", "comm-ad-template", { commAd: commAds });
}

// Implementing wishlist page
if (url.includes("wishlist") && !url.includes("admin")) {
  showCommAds();
  let searchParams = new URLSearchParams(window.location.search);

  let id = searchParams.get("id");
  if (id == null || id == "") {
    window.location.href = "admin/my-wishlists.html";
  } else {
    $("#wishlist-properties-content").html(
      "<div class='d-flex align-items-center py-5 justify-content-center'><div class='spinner-border' style='opacity:0.5; border-width:3px;'></div></div>"
    );

    let oW = [];
    oW.push(id);
    Model.getAllWishlistsByIds(2, oW);

    window.removeEventListener(
      "all-wishlists-by-ids-fetched2",
      loadPostByAdIds
    );
    window.addEventListener("all-wishlists-by-ids-fetched2", loadPostByAdIds);
  }
}

function loadPostByAdIds() {
  let wl = Model.realData.wishlists[0];
  $(".w-name").html(wl.wishlistName);
  $(document).prop("title", wl.wishlistName);
  $("meta[property='og:title']").attr("content", wl.wishlistName);
  let adIds = wl.adIds.split(",");
  Model.getAllPostByIds(adIds);

  window.removeEventListener("posts-by-ids-fetched", fillWishlistPage);
  window.addEventListener("posts-by-ids-fetched", fillWishlistPage);
}

function fillWishlistPage() {
  let properties = Model.realData.properties || [];
  let itemsPerPage = 10; // Number of items to display initially
  let currentPage = 1; // To track the current page number
  let isAllLoaded = false; // To track if all items are loaded

  function displayProperties(start, end) {
    let propertiesToDisplay = properties.slice(start, end);

    // Append the properties to the existing ones
    views.applyTemplates("wishlist-properties-content", "property-template", {
      property: propertiesToDisplay,
    });

    // Reinitialize Swipers
    initializeSwipers();

    // Update the load more and go to start button
    if (end >= properties.length) {
      document.getElementById("load-more-wishlist").style.display = "none";
      document.getElementById("go-to-start-wishlist").style.display = "block";
      isAllLoaded = true; // All items are loaded
    } else {
      document.getElementById("load-more-wishlist").style.display = "block";
      document.getElementById("go-to-start-wishlist").style.display = "none";
      isAllLoaded = false;
    }
  }

  function initializeSwipers() {
    // Swiper3
    var mySwiper3 = new Swiper(".swiper3", {
      effect: "fade",
      speed: 800,
      slidesPerView: 1,
      spaceBetween: 0,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".swiper-pagination3",
        clickable: true,
        type: "fraction",
      },
    });

    // Event handlers for other interactions
    $(".property-img-cont").unbind("click", openGallery);
    $(".property-img-cont").click(openGallery);
    $(".view-contact").unbind("click", showContactHandler);
    $(".view-contact").click(showContactHandler);
  }

  // Display the initial 10 properties
  displayProperties(0, itemsPerPage);

  // Event listener for "Load More" button
  document
    .getElementById("load-more-wishlist")
    .addEventListener("click", function () {
      if (isAllLoaded) {
        return; // No more items to load
      }
      currentPage++;
      let start = (currentPage - 1) * itemsPerPage;
      let end = start + itemsPerPage;
      displayProperties(start, end);
      // Scroll to the top of the page when loading more
      window.scrollTo(0, 0);
    });

  // Event listener for "Go to Start" button
  document
    .getElementById("go-to-start-wishlist")
    .addEventListener("click", function () {
      currentPage = 1;
      displayProperties(0, itemsPerPage);
      document.getElementById("go-to-start-wishlist").style.display = "none";
      document.getElementById("load-more-wishlist").style.display = "block";
      // Scroll to the top of the page
      window.scrollTo(0, 0);
    });

  // If no properties are available
  if (properties.length === 0) {
    $("#wishlist-properties-content").html("No properties in this wishlist.");
    document.getElementById("load-more-wishlist").style.display = "none";
    document.getElementById("go-to-start-wishlist").style.display = "none";
  }
}

// Fetching recent properties on homepage estate page and explore page
if (
  !url.includes("admin") &&
  !url.includes("wishlist") &&
  !url.includes("welcome")
) {
  Model.getAllProperties(50);
}

// Implementing call function on property templates
function showContactHandler() {
  if (userData) {
    let attr = $(this).attr("href");
    if (!(typeof attr !== "undefined" && attr !== false)) {
      let id = $(this).attr("data-id");
      let prop = null;
      if (url.includes("explore")) {
        for (let i = 0; i < Model.realData.searchResponseProps.length; i++) {
          if (id == Model.realData.searchResponseProps[i].estateId) {
            prop = Model.realData.searchResponseProps[i];
            break;
          }
        }
        if (!prop) {
          for (let i = 0; i < Model.realData.properties.length; i++) {
            if (id == Model.realData.properties[i].estateId) {
              prop = Model.realData.properties[i];
              break;
            }
          }
        }
      } else {
        for (let i = 0; i < Model.realData.properties.length; i++) {
          if (id == Model.realData.properties[i].estateId) {
            prop = Model.realData.properties[i];
            break;
          }
        }
      }
      if (prop) {
        $(this).html(
          "<ion-icon name='call' class='mr-2'></ion-icon>" +
            prop.requesterMobile
        );
        $(this).attr("href", "tel:" + prop.requesterMobile);
        sendUserInterestHandler(prop);
      }
    }
  } else {
    let myData = {
      signInFormMsg: "Please Sign In to view contact!",
      otpSignInFormMsg: "Please Sign In via OTP to view contact!",
      signUpFormMsg: "Please Sign Up to view contact!",
      msgType: "alert-danger",
      formMsgVisibility: "",
      dataAction: "call",
    };
    $.ajax({
      url: views.applyTemplates(
        "signin-signup-wrapper-content",
        "signin-template",
        myData
      ),
      success: function () {
        authRegBindings();
        openSignIn();
      },
    });
  }
}

function sendUserInterestHandler(prop) {
  let interestInfo = {
    advertiserMobile: prop.requesterMobile,
    visitorId: userData.user.id,
    visitorMobile: userData.user.mobile,
    visitorName: userData.user.displayName,
    estateUrl: `https://zilahouse.com/r/` + prop.estateId,
  };
  Model.sendUserInterestOnProperty(interestInfo);
}

// AUTHORISATION AND REGISTRATION FUNCTIONS
// Logout Handler
function logoutHandler() {
  localStorage.clear();
  sessionStorage.clear();
  window.location.replace("/");
}
// Signin Handler
function signinHandler() {
  if ($(".signin-form")[0].checkValidity()) {
    $("#signin-form-msg span").html("");
    $("#signin-form-msg").addClass("disappear");
    $(".signin-submit").html(
      'Signing you in<div class="spinner-border ml-2 spinner-border-sm text-light"></div>'
    );
    let mob = $(".signin-form #mobile").val();
    let pwd = $(".signin-form #password").val();
    let afterSignIn = null;
    let dataAction = $(this).attr("data-action");
    if (dataAction) {
      if (dataAction == "open-pfa") {
        afterSignIn = {
          action: "openLink",
          destination: "admin/post-free-ad.html",
        };
      } else if (dataAction == "open-dashboard") {
        afterSignIn = {
          action: "openLink",
          destination: "admin/dashboard.html",
        };
      } else if (dataAction == "call") {
        afterSignIn = {
          action: "call",
        };
      } else if (dataAction == "save") {
        afterSignIn = {
          action: "save",
        };
      }
    }
    let rem = null;
    rem = $(".signin-form #remember").is(":checked") ? true : false;
    let userInfo = {
      mobile: mob,
      password: pwd,
      remember: rem,
    };
    Model.loggingIn(userInfo, afterSignIn);
  } else {
    $("#signin-form-msg").removeClass("disappear");
    $("#signin-form-msg .alert").addClass("alert-danger");
    $("#signin-form-msg span").html("Please fill the form properly!");
  }
}
// Otp Signin Handler
function otpSignInHandler() {
  if ($(".otp-signin-form")[0].checkValidity()) {
    if ($("#otp").attr("disabled")) {
      $("#otp-signin-form-msg span").html("");
      $("#otp-signin-form-msg").addClass("disappear");
      $(".otp-signin-submit").html(
        'Sending OTP<div class="spinner-border ml-2 spinner-border-sm text-light"></div>'
      );
      let guestUserInfo = {
        mobile: $("#otp-mobile").val(),
        displayName:
          $("#display-name").val() != "" ? $("#display-name").val() : "Guest",
      };
      Model.sendOtp(guestUserInfo);
    } else {
      $("#otp-signin-form-msg span").html("");
      $("#otp-signin-form-msg").addClass("disappear");
      $(".otp-signin-submit").html(
        'Signing you in<div class="spinner-border ml-2 spinner-border-sm text-light"></div>'
      );
      let afterSignIn = null;
      let dataAction = $(this).attr("data-action");
      if (dataAction) {
        if (dataAction == "open-pfa") {
          afterSignIn = {
            action: "openLink",
            destination: "admin/post-free-ad.html",
          };
        } else if (dataAction == "open-dashboard") {
          afterSignIn = {
            action: "openLink",
            destination: "admin/dashboard.html",
          };
        } else if (dataAction == "call") {
          afterSignIn = {
            action: "call",
          };
        } else if (dataAction == "save") {
          afterSignIn = {
            action: "save",
          };
        }
      }
      let guestUserInfo = {
        mobile: $("#otp-mobile").val(),
        smsPwd: $("#otp").val(),
        displayName:
          $("#display-name").val() != "" ? $("#display-name").val() : "Guest",
      };
      Model.loggingInViaOtp(guestUserInfo, afterSignIn);
    }
  } else {
    $("#otp-signin-form-msg").removeClass("disappear");
    $("#otp-signin-form-msg .alert").addClass("alert-danger");
    $("#otp-signin-form-msg span").html("Please fill the form properly!");
  }
}
// Signup Handler
function signupHandler() {
  if ($(".signup-form")[0].checkValidity()) {
    if ($("#signup-otp").attr("disabled")) {
      if (
        $(".signup-form #signup-pwd").val() ==
        $(".signup-form #confirm-pwd").val()
      ) {
        $("#signup-form-msg span").html("");
        $("#signup-form-msg").addClass("disappear");
        $(".signup-submit").html(
          'Sending OTP<div class="spinner-border ml-2 spinner-border-sm text-light"></div>'
        );
        let newUserInfo = {
          mobile: $(".signup-form #signup-mobile").val(),
        };
        Model.sendSignUpOtp(newUserInfo);
      } else {
        $("#signup-form-msg").removeClass("disappear");
        $("#signup-form-msg .alert").addClass("alert-danger");
        $("#signup-form-msg span").html(
          "Confirm password does not match! Try Again"
        );
        $(".signup-form #confirm-pwd").val("");
        $(".signup-form #confirm-pwd").focus();
      }
    } else {
      if ($("#signup-otp").val() == Model.realData.signUpOtp) {
        $("#signup-form-msg span").html("");
        $("#signup-form-msg").addClass("disappear");
        $(".signup-submit").html(
          'Signing you Up<div class="spinner-border ml-2 spinner-border-sm text-light"></div>'
        );
        let newUserInfo = {
          displayName: $(".signup-form #name").val(),
          emailId: $(".signup-form #email").val(),
          mobile: $(".signup-form #signup-mobile").val(),
          userType: $(".signup-form input[name=user-type]:checked").val(),
          password: $(".signup-form #signup-pwd").val(),
        };
        let afterSignUp = null;
        let dataAction = $(this).attr("data-action");
        if (dataAction) {
          if (dataAction == "open-pfa") {
            afterSignIn = {
              action: "openLink",
              destination: "admin/post-free-ad.html",
            };
          } else if (dataAction == "open-dashboard") {
            afterSignUp = {
              action: "openLink",
              destination: "admin/dashboard.html",
            };
          } else if (dataAction == "call") {
            afterSignUp = {
              action: "call",
            };
          } else if (dataAction == "save") {
            afterSignUp = {
              action: "save",
            };
          }
        }
        Model.signingUp(newUserInfo, afterSignUp);
      } else {
        $("#signup-form-msg").removeClass("disappear");
        $("#signup-form-msg .alert").removeClass("alert-warning alert-success");
        $("#signup-form-msg .alert").addClass("alert-danger");
        $("#signup-form-msg span").html("Incorrect OTP! Please try again.");
        $(".signup-form #signup-otp").focus();
      }
    }
  } else {
    $("#signup-form-msg").removeClass("disappear");
    $("#signup-form-msg .alert").addClass("alert-danger");
    $("#signup-form-msg span").html("Please fill the form properly!");
  }
}
// Pfa Handler
function pfaHandler() {
  let myData = {
    signInFormMsg:
      "Your contact information is safe with us. We'll share them only with property seeker(s) and it helps genuine responses to connect with you.",
    otpSignInFormMsg: "Please Sign In via OTP to add properties!",
    signUpFormMsg: "Please Sign Up to add properties!",
    msgType: "alert-danger",
    formMsgVisibility: "",
    dataAction: "open-pfa",
  };
  $.ajax({
    url: views.applyTemplates(
      "signin-signup-wrapper-content",
      "signin-template",
      myData
    ),
    success: function () {
      authRegBindings();
      openSignIn();
      // window.location.href = "#signin-attempt";
    },
  });
}
// Apply signin template
function applySignInTemp() {
  let myData = {
    signInFormMsg: "",
    otpSignInFormMsg: "",
    signUpFormMsg: "",
    msgType: "",
    formMsgVisibility: "disappear",
    dataAction: "open-dashboard",
  };
  $.ajax({
    url: views.applyTemplates(
      "signin-signup-wrapper-content",
      "signin-template",
      myData
    ),
    success: function () {
      authRegBindings();
      openSignIn();
    },
  });
}
// applySignInTemp();

// Apply signup template
function applySignUpTemp() {
  let myData = {
    signInFormMsg: "",
    otpSignInFormMsg: "",
    signUpFormMsg: "",
    msgType: "",
    formMsgVisibility: "disappear",
    dataAction: "open-dashboard",
  };
  $.ajax({
    url: views.applyTemplates(
      "signin-signup-wrapper-content",
      "signin-template",
      myData
    ),
    success: function () {
      authRegBindings();
      openSignUp();
    },
  });
}
function authRegBindings() {
  $(".signin-button").click(openSignIn);
  $(".close-signin").click(closeSignIn);

  $(".otp-signin-button").click(openOTPSignIn);
  $(".close-otp-signin").click(closeOTPSignIn);

  $(".signup-button").click(openSignUp);
  $(".close-signup").click(closeSignUp);

  $(".signin-submit").click(signinHandler);
  $(".otp-signin-submit").click(otpSignInHandler);
  $(".signup-submit").click(signupHandler);
}

// Welcome Login
if (url.includes("welcome")) {
  let searchParams = new URLSearchParams(window.location.search);

  let mobile = searchParams.get("mobile");
  let auth = searchParams.get("auth");

  if (mobile == null || mobile == "" || auth == null || auth == "") {
    $(".welcome-status").html("Invalid URL");
  } else {
    let user = {
      mobile: mobile,
      welcomePwd: auth,
    };
    $(".welcome-status").html("Logging you in...");
    Model.welcomeLogin(user);
  }
}
// AUTHORISATION AND REGISTRATION FUNCTIONS ENDS HERE

// Authorizing on Admin Pages
if (url.includes("admin")) {
  verifyToken();
}
function verifyToken() {
  if (!userData.user.token) {
    sessionStorage.removeItem("loggedInUser");
    window.location.href = "/";
  } else {
    Model.verifyToken();
  }
}

// POST FREE AD FUNCTIONS
// Implementing Post free ad page functions
if (url.includes("post-free-ad") || url.includes("edit-properties")) {
  $("input[name=estateName]").change(function () {
    if (this.value == "PG") {
      $(".dependent-PG").attr("disabled", true);
      $(".dependent-PG").prop("checked", false);
    } else {
      $(".dependent-PG").attr("disabled", false);
    }

    if (this.value == "Sale") {
      $(".dependent-Sell").attr("disabled", true);
      $(".dependent-r-l-pg input").attr("disabled", false);
      $(".dependent-Sell").prop("checked", false);
      $(".dependent-Sell").val("");
    } else {
      $(".dependent-Sell").attr("disabled", false);
      $(".dependent-r-l-pg input").attr("disabled", true);
      $(".dependent-r-l-pg input").prop("checked", false);
      $(".dependent-r-l-pg input[type=number]").val("");
    }
  });

  $("input[name=estateType]").change(function () {
    if (
      this.value == "Apartment Flat" ||
      this.value == "Independent Floor" ||
      this.value == "Hostel" ||
      this.value == "School" ||
      this.value == "College" ||
      this.value == "Hotel" ||
      this.value == "Office" ||
      this.value == "Penthouse" ||
      this.value == "Shop" ||
      this.value == "Plot" ||
      this.value == "Farm House" ||
      this.value == "Independent House" ||
      this.value == "Hospital" ||
      this.value == "Commercial Building" ||
      this.value == "Villa" ||
      this.value == "Mall" ||
      this.value == "Resort"
    ) {
      $(".dependent-p-fh-ih input").attr("disabled", false);
      $(".dependent-af-if input").attr("disabled", true);
      $(".dependent-af-if input").prop("checked", false);
      $(".dependent-af-if input").val("");
    } else {
      $(".dependent-p-fh-ih input").attr("disabled", true);
      $(".dependent-af-if input").attr("disabled", false);
      $(".dependent-p-fh-ih input").prop("checked", false);
      $(".dependent-p-fh-ih input[type=number]").val("");
    }

    if (this.value == "Plot") {
      $(".dependent-Plot input").attr("disabled", true);
      $(".dependent-Plot input").prop("checked", false);
      $(".dependent-Plot input[type=number]").val("");
    } else {
      $(".dependent-Plot input").attr("disabled", false);
    }

    if (
      this.value == "Plot" ||
      this.value == "Farm House" ||
      this.value == "Office" ||
      this.value == "Mall" ||
      this.value == "Hospital" ||
      this.value == "Commercial Building" ||
      this.value == "Shop"
    ) {
      $(".dependent-p-fh input").attr("disabled", true);
      $(".dependent-p-fh input").prop("checked", false);
      $(".dependent-p-fh input[type=number]").val("");
    } else {
      $(".dependent-p-fh input").attr("disabled", false);
    }
  });

  $("input[name=isBrokerage]").change(function () {
    if (this.value == "No") {
      $(".dependent-Brokerage-No").attr("disabled", true);
      $(".dependent-Brokerage-No").val("");
      $("#BrokerageAmount").siblings(".readableAmount").html("");
    } else {
      $(".dependent-Brokerage-No").attr("disabled", false);
    }
  });

  $("input[name=country]").change(function () {
    if (this.value == "US") {
      $(".dependent-country-US").attr("disabled", true);
      $(".dependent-country-US").val("");
    } else {
      $(".dependent-country-US").attr("disabled", false);
    }
  });

  $(".amount-box").unbind("keyup", showReadableAmount);
  $(".amount-box").keyup(showReadableAmount);

  $("#location-field").unbind("change", showAddress);
  $("#location-field").change(showAddress);
}
function showAddress() {
  let address = $("#location-field").val();
  let addressArr = address.split(",");

  if (
    addressArr[0] != "" &&
    addressArr[0] != undefined &&
    addressArr[0] != null
  ) {
    $("input[name=locality]").val(addressArr[0].trim());
  } else {
    $("input[name=locality]").val("");
    addressArr[0] = "";
  }

  if (
    addressArr[1] != "" &&
    addressArr[1] != undefined &&
    addressArr[1] != null
  ) {
    $("input[name=city]").val(addressArr[1].trim());
  } else {
    $("input[name=city]").val("");
    addressArr[1] = "";
  }

  if (
    addressArr[2] != "" &&
    addressArr[2] != undefined &&
    addressArr[2] != null
  ) {
    $("input[name=state]").val(addressArr[2].trim());
  } else {
    $("input[name=state]").val("");
    addressArr[2] = "";
  }

  $(".display-address").html(
    `<div class='mb-3'><b>Locality:</b> ` +
      addressArr[0] +
      ` &nbsp; <b>City:</b> ` +
      addressArr[1] +
      ` &nbsp; <b>State:</b> ` +
      addressArr[2] +
      `</div>`
  );
}

function showReadableAmount() {
  if ($(this).val() != "") {
    $(this)
      .siblings(".readableAmount")
      .html(
        toReadableAmountInrDollar(
          $(this).val(),
          $("input[name='currency']:checked").val()
        )
      );
  } else {
    $(this).siblings(".readableAmount").html("");
  }
}

// if(url.includes("post-free-ad")) {
//     FilePond.registerPlugin(FilePondPluginImagePreview, FilePondPluginFileValidateType, FilePondPluginImageCrop, FilePondPluginFileEncode);

//     const inputElement = document.querySelector('input[type="file"][name="adPhotos"]');

//     Window.pond = FilePond.create(inputElement, {
//         // files: [
//         //     "../assets/images/city-buildings.jpg",
//         //     "../assets/images/house-indoors.jpg",
//         //     "../assets/images/house-outdoors.jpg",
//         //     "../assets/images/house-indoors.jpg",
//         //     "../assets/images/city-buildings.jpg",
//         //     "../assets/images/house-outdoors.jpg",
//         // ],

//         acceptedFileTypes: [
//             "image/*",
//         ],
//         allowMultiple: true,
//         required: true,
//         allowReorder: true,
//         maxFiles: 10,
//         checkValidity: true,
//         dropOnPage: true,
//         dropValidation: true,
//         credits: false,
//         imagePreviewHeight: 120,
//         credits: false,

//         labelIdle: 'Drop images here or <span class="filepond--label-action">Browse</span> (max 10 images allowed)',

//         imageCropAspectRatio: '4:3',

//         // stylePanelAspectRatio: '2:3',
//         // stylePanelAspectRatio: '2:3',
//     });
// }

// Details Form Handler
function detailsFormHandler() {
  if ($(".details-form")[0].checkValidity()) {
    $(".form-message").html("");
    showLocationForm();
  } else {
    $(".form-message").html(
      '<p class="text-danger">Fields with * are required.</p>'
    );
  }
}

function flushCurrencyInfo() {
  $("input[name='monthlyRent']").val("");
  $("input[name='cost']").val("");
  $("input[name='securityDeposit']").val("");
  $("input[name='maintenanceCost']").val("");
  $("input[name='brokerageAmount']").val("");
  $(".readableAmount").html("");
}

// Location Form handler
function locationFormHandler() {
  if ($(".location-form")[0].checkValidity()) {
    if (
      $("input[name=locality]").val() != "" &&
      $("input[name=city]").val() != "" &&
      $("input[name=state]").val() != ""
    ) {
      $(".form-message").html("");
      showPhotosForm();
    } else {
      $(".display-address").html(
        "<div class='mb-3 text-danger'>*Please select full address</div>"
      );
    }
  } else {
    $(".form-message").html(
      '<p class="text-danger">Fields with * are required.</p>'
    );
  }
}
// Photos Form Handler
function photosFormHandler() {
  if (
    $(".photos-form")[0].checkValidity() &&
    $(".location-form")[0].checkValidity() &&
    $(".details-form")[0].checkValidity()
  ) {
    $(".form-message").html("");
    $(".ad-step-box:nth-child(5)").addClass("completed");
    $(".ad-form-cont .form").addClass("disappear");
    $(".waiting-frame img").attr("src", "../assets/images/gifs/loading.gif");
    $(".waiting-frame span").html("<div class='spinner-border mb-2'></div>");
    $(".waiting-frame h3").html("Sit back and relax...");
    $(".waiting-frame p").html(
      "We are submitting your property details on our server."
    );
    $(".waiting-frame").removeClass("disappear");
    prepareProperty();
  } else {
    $(".form-message").html(
      '<p class="text-danger">Fields with * are required.</p>'
    );
  }
}
// Show Details Form
function showDetailsForm() {
  $(".ad-step-box").removeClass("active completed");
  $(".step-line").removeClass("completed");
  $(".ad-step-box:nth-child(1)").addClass("active");

  $(".ad-form-cont .form").addClass("disappear");
  $(".ad-form-cont .details-form").removeClass("disappear");
}
// Show Location Form
function showLocationForm() {
  $(".ad-step-box").removeClass("active completed");
  $(".step-line").removeClass("completed");
  $(".ad-step-box:nth-child(1)").addClass("completed");
  $(".step-line:nth-child(2)").addClass("completed");
  $(".ad-step-box:nth-child(3)").addClass("active");

  $(".ad-form-cont .form").addClass("disappear");
  $(".ad-form-cont .location-form").removeClass("disappear");
  $("#location-field").focus();
}
// Show Photos Form
function showPhotosForm() {
  $(".ad-step-box").removeClass("active completed");
  $(".step-line").removeClass("completed");
  $(".ad-step-box:nth-child(1)").addClass("completed");
  $(".step-line:nth-child(2)").addClass("completed");
  $(".ad-step-box:nth-child(3)").addClass("completed");
  $(".step-line:nth-child(4)").addClass("completed");
  $(".ad-step-box:nth-child(5)").addClass("active");

  $(".ad-form-cont .form").addClass("disappear");
  $(".ad-form-cont .photos-form").removeClass("disappear");
}
// called when master location info is loaded
// window.addEventListener("master-locations-fetched", function () {
//     $(".location-loader").html("");
//     // Filling Countries
//     console.log(Model.realData.masterLocations);
//     let countries = Model.realData.masterLocations.countries;
//     views.applyTemplates("property-country-list", "country-ops-template", { country : countries });

//     // Filling States
//     let states = Model.realData.masterLocations.cities;
//     views.applyTemplates("property-state-list", "state-ops-template", { state : states });

//     $("#property-state-list").change(function() {
//         let selectedState = $("#property-state-list").val();
//         let cities = Model.realData.masterLocations.cityLocalities[selectedState];
//         views.applyTemplates("property-city-list", "city-ops-template", { city : cities });

//         let selectedCity = $("#property-city-list").val();
//         let localities = Model.realData.masterLocations.cityLocalities[selectedState][selectedCity];
//         views.applyTemplates("property-locality-list", "locality-ops-template", { locality : localities });
//     })

//     // Filling localities
//     $("#property-city-list").change(function() {
//         let selectedState = $("#property-state-list").val();
//         let selectedCity = $("#property-city-list").val();
//         let localities = Model.realData.masterLocations.cityLocalities[selectedState][selectedCity];
//         views.applyTemplates("property-locality-list", "locality-ops-template", { locality : localities });
//     })

//     let e = new CustomEvent("master-locations-applied");
//     window.dispatchEvent(e);
// })

// Property Photos Preview
function propertyPhotosPreview() {
  if (this.files) {
    var filesCount = this.files.length;

    if (filesCount > 10) {
      $(".form-message").html(
        "<p class='text-danger'>Max 10 images are allowed.</p>"
      );

      $(".custom-file-input").val(null);
    } else {
      $(".form-message").html("");
      var fileName = $(this).val().split("\\").pop();
      let filesCountText = null;
      if (filesCount == 0) {
        filesCountText =
          '<span class="text-danger">*</span>Choose Photos (max 10)';
        $(".form-message").html(
          "<p class='text-danger'>Fields with * are required.</p>"
        );
      } else if (filesCount == 1) {
        filesCountText = fileName;
      } else {
        filesCountText = fileName + " and " + (filesCount - 1) + " more";
      }
      $(".custom-file-label").html(filesCountText);

      $(".preview-gallery").html("");

      for (let i = 0; i < filesCount; i++) {
        var reader = new FileReader();
        var galleryHtml = null;
        reader.onload = function (e) {
          galleryHtml =
            '<div class="col-lg-2 col-md-3 col-sm-4 col-6 preview-img-cont">' +
            '<div class="preview-img img-cont" style="background-image: url(' +
            e.target.result +
            ')">' +
            "</div>" +
            "</div>";

          $(".preview-gallery").html(
            $(".preview-gallery").html() + galleryHtml
          );
        };

        reader.readAsDataURL(this.files[i]);
      }
    }
  } else {
    alert("Files not selected");
  }
}

// Youtube Url Preview
function youtubeUrlPreview() {
  $(".youtube-preview-frame").attr("src", "");
  $(".youtube-preview-frame").addClass("disappear");
  let ytUrl = $("#youtube-url").val();
  if (ytUrl != "") {
    if (ytUrl.includes("/shorts")) {
      ytUrl = ytUrl.replace("/shorts", "/embed");
    }
    let embedUrl = getEmbedUrl(ytUrl);
    if (embedUrl) {
      $(".youtube-preview-frame").attr("src", embedUrl);
      $(".youtube-preview-frame").removeClass("disappear");
    } else {
      $(".form-message").html(
        '<p class="text-danger">Please enter only youtube video url</p>'
      );
    }
  } else {
    $(".form-message").html(
      '<p class="text-danger">Please enter video url</p>'
    );
    $("#youtube-url").focus();
  }
}
// Get yt video id from yt video url
function getEmbedUrl(ytUrl) {
  let rx =
    /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
  let ytUrlSplits = ytUrl.match(rx);
  let ytVideoId = null;
  let embedUrl = "";
  if (ytUrlSplits) {
    ytVideoId = ytUrlSplits[1];
    embedUrl = "https://www.youtube.com/embed/" + ytVideoId + "?rel=0";
    return embedUrl;
  } else {
    return embedUrl;
  }
}
// Preparing property body to send on server
function prepareProperty() {
  var dF = $(".details-form")[0];
  var propertyFormData = new FormData(dF);

  let estateTitle = null;

  let localityPlace = $("input[name='localityPlace']").val();
  let numOfBedrooms = $("input[name='numOfBedrooms']:checked").val();
  let estateType = $("input[name='estateType']:checked").val();
  let locality = $("input[name='locality']").val();
  let city = $("input[name='city']").val();
  let state = $("input[name='state']").val();
  let country = $("input[name='country']:checked").val();
  let estateName = $("input[name='estateName']:checked").val();
  let monthlyRent = $("input[name='monthlyRent']").val();
  let cost = $("input[name='cost']").val();
  let currency = $("input[name='currency']:checked").val();

  if (
    numOfBedrooms == null ||
    numOfBedrooms == undefined ||
    numOfBedrooms == ""
  ) {
    numOfBedrooms = "";
  }

  if (localityPlace != "") {
    estateTitle =
      numOfBedrooms +
      " " +
      estateType +
      " in " +
      localityPlace +
      ", " +
      locality +
      ", " +
      city +
      ", " +
      state +
      ", " +
      country +
      " for " +
      estateName +
      " in just ";
  } else {
    estateTitle =
      numOfBedrooms +
      " " +
      estateType +
      " in " +
      locality +
      ", " +
      city +
      ", " +
      state +
      ", " +
      country +
      " for " +
      estateName +
      " in just ";
  }

  if (monthlyRent != "") {
    estateTitle += toReadableAmountInrDollar(monthlyRent, currency);
    propertyFormData.append(
      "displayMonthlyRent",
      toReadableAmountInrDollar(monthlyRent, currency)
    );
  }
  if (cost != "") {
    estateTitle += toReadableAmountInrDollar(cost, currency);
    propertyFormData.append(
      "displayCost",
      toReadableAmountInrDollar(cost, currency)
    );
  }

  propertyFormData.append("estateTitle", estateTitle);

  if ($("input[name=securityDeposit]").val() != "") {
    propertyFormData.append(
      "displaySecurityDeposit",
      toReadableAmountInrDollar(
        $("input[name=securityDeposit]").val(),
        $("input[name='currency']:checked").val()
      )
    );
  }
  if ($("input[name=maintenanceCost]").val() != "") {
    propertyFormData.append(
      "displayMaintenanceCost",
      toReadableAmountInrDollar(
        $("input[name=maintenanceCost]").val(),
        $("input[name='currency']:checked").val()
      )
    );
  }
  if ($("input[name=brokerageAmount]").val() != "") {
    propertyFormData.append(
      "displayBrokerageAmount",
      toReadableAmountInrDollar(
        $("input[name=brokerageAmount]").val(),
        $("input[name='currency']:checked").val()
      )
    );
  }

  propertyFormData.append("requesterName", userData.user.displayName);
  propertyFormData.append("requesterMobile", userData.user.mobile);
  propertyFormData.append("requesterUserType", userData.user.userType);

  var locationFormData = jQuery(
    document.forms["location-form"]
  ).serializeArray();
  for (let i = 0; i < locationFormData.length; i++) {
    propertyFormData.append(
      locationFormData[i].name,
      locationFormData[i].value
    );
  }

  // Appending property photos in propertyFormData
  var imgCount = $("input[name='adPhotos']")[0].files.length;
  for (let i = 0; i < imgCount; i++) {
    propertyFormData.append(
      "adPhotos",
      $("input[name='adPhotos']")[0].files[i]
    );
  }
  console.log(propertyFormData);
  propertyFormData.append("estateDescription", $("#estate-description").val());
  propertyFormData.append("youtubeUrl", getEmbedUrl($("#youtube-url").val()));

  propertyFormData.append("status", "Inactive");
  propertyFormData.append("reviewStatus", "Under Review");

  Model.postProperty(propertyFormData);
}
function toReadableAmount(value) {
  if (!isNaN(value)) {
    var currencySymbol = "₹ ";
    if (value == null) {
      return "";
    }
    var InrRSOut = value;
    InrRSOut = Math.round(InrRSOut);
    var RV = "";
    if (InrRSOut > 0 && InrRSOut < 1000) {
      RV = InrRSOut.toString();
    } else if (InrRSOut >= 1000 && InrRSOut < 10000) {
      RV = InrRSOut.toString();
    } else if (InrRSOut >= 10000 && InrRSOut < 100000) {
      var f1 = InrRSOut.toString().substring(0, 2);
      var f2 = InrRSOut.toString().substring(2, 5);
      RV = f1 + "," + f2;
    } else if (InrRSOut >= 100000 && InrRSOut < 1000000) {
      var f1 = InrRSOut.toString().substring(0, 1);
      var f2 = InrRSOut.toString().substring(1, 3);
      if (f2 == "00") {
        RV = f1 + " Lacs";
      } else {
        RV = f1 + "." + f2 + " Lacs";
      }
    } else if (InrRSOut >= 1000000 && InrRSOut < 10000000) {
      var f1 = InrRSOut.toString().substring(0, 2);
      var f2 = InrRSOut.toString().substring(2, 4);
      if (f2 == "00") {
        RV = f1 + " Lacs";
      } else {
        RV = f1 + "." + f2 + " Lacs";
      }
    } else if (InrRSOut >= 10000000 && InrRSOut < 100000000) {
      var f1 = InrRSOut.toString().substring(0, 1);
      var f2 = InrRSOut.toString().substring(1, 3);
      if (f2 == "00") {
        RV = f1 + " Cr";
      } else {
        RV = f1 + "." + f2 + " Cr";
      }
    } else if (InrRSOut >= 100000000 && InrRSOut < 1000000000) {
      var f1 = InrRSOut.toString().substring(0, 2);
      var f2 = InrRSOut.toString().substring(2, 4);
      if (f2 == "00") {
        RV = f1 + " Cr";
      } else {
        RV = f1 + "." + f2 + " Cr";
      }
    } else if (InrRSOut >= 1000000000 && InrRSOut < 10000000000) {
      var f1 = InrRSOut.toString().substring(0, 3);
      var f2 = InrRSOut.toString().substring(3, 5);
      if (f2 == "00") {
        RV = f1 + " Cr";
      } else {
        RV = f1 + "." + f2 + " Cr";
      }
    } else if (InrRSOut >= 10000000000) {
      var f1 = InrRSOut.toString().substring(0, 4);
      var f2 = InrRSOut.toString().substring(6, 8);
      if (f2 == "00") {
        RV = f1 + " Cr";
      } else {
        RV = f1 + "." + f2 + " Cr";
      }
    } else {
      RV = InrRSOut.toString();
    }
    return currencySymbol + RV;
  }
}

//console.log(toReadableAmount(1500000000,'DOLLAR'));
function toReadableAmountInrDollar(value, currency) {
  var currencySymbol = "₹ ";
  if (!isNaN(value)) {
    if (currency == "DOLLAR") currencySymbol = "$ ";
    if (value == null) {
      return "";
    }
    var InrRSOut = value;
    InrRSOut = Math.round(InrRSOut);
    var RV = "";
    if (InrRSOut > 0 && InrRSOut < 1000) {
      RV = InrRSOut.toString();
    } else if (InrRSOut >= 1000 && InrRSOut < 10000) {
      RV = InrRSOut.toString();
    } else if (InrRSOut >= 10000 && InrRSOut < 100000) {
      var f1 = InrRSOut.toString().substring(0, 2);
      var f2 = InrRSOut.toString().substring(2, 5);
      RV = f1 + "," + f2;
    } else if (InrRSOut >= 100000 && InrRSOut < 1000000) {
      var f1 = InrRSOut.toString().substring(0, 1);
      var f2 = InrRSOut.toString().substring(1, 3);
      if (f2 == "00") {
        if (currency == "DOLLAR")
          //less than 1 million
          RV = InrRSOut / 1000000 + " Million";
        else RV = f1 + " Lacs";
      } else {
        if (currency == "DOLLAR") RV = InrRSOut / 1000000 + " Million";
        else RV = f1 + "." + f2 + " Lacs";
      }
    } else if (InrRSOut >= 1000000 && InrRSOut < 10000000) {
      var f1 = InrRSOut.toString().substring(0, 2);
      var f2 = InrRSOut.toString().substring(2, 4);
      if (f2 == "00") {
        if (currency == "DOLLAR")
          //1m to less than 10 millions
          RV = InrRSOut / 1000000 + " Million";
        else RV = f1 + " Lacs";
      } else {
        if (currency == "DOLLAR") RV = InrRSOut / 1000000 + " Million";
        else RV = f1 + "." + f2 + " Lacs";
      }
    } else if (InrRSOut >= 10000000 && InrRSOut < 100000000) {
      var f1 = InrRSOut.toString().substring(0, 1);
      var f2 = InrRSOut.toString().substring(1, 3);
      if (f2 == "00") {
        if (currency == "US")
          //10m to less than 1 billion
          RV = InrRSOut / 10000000 + " Billion";
        else RV = f1 + " Cr";
      } else {
        if (currency == "DOLLAR") RV = InrRSOut / 10000000 + " Billion";
        else RV = f1 + "." + f2 + " Cr";
      }
    } else if (InrRSOut >= 100000000 && InrRSOut < 1000000000) {
      var f1 = InrRSOut.toString().substring(0, 2);
      var f2 = InrRSOut.toString().substring(2, 4);
      if (f2 == "00") {
        if (currency == "DOLLAR")
          //10b/1t to less than 10t/1qt
          RV = InrRSOut / 100000000 + " Trillion";
        else RV = f1 + " Cr";
      } else {
        if (currency == "DOLLAR") RV = InrRSOut / 100000000 + " Trillion";
        else RV = f1 + "." + f2 + " Cr";
      }
    } else if (InrRSOut >= 1000000000 && InrRSOut < 10000000000) {
      var f1 = InrRSOut.toString().substring(0, 3);
      var f2 = InrRSOut.toString().substring(3, 5);
      if (f2 == "00") {
        if (currency == "DOLLAR")
          //10t/qt1 to less than 10qt/1 quadrillion
          RV = InrRSOut / 1000000000 + " Quadrillion";
        else RV = f1 + " Cr";
      } else {
        if (currency == "DOLLAR") RV = InrRSOut / 1000000000 + " Quadrillion";
        else RV = f1 + "." + f2 + " Cr";
      }
    } else if (InrRSOut >= 10000000000) {
      var f1 = InrRSOut.toString().substring(0, 4);
      var f2 = InrRSOut.toString().substring(6, 8);
      if (f2 == "00") {
        if (currency == "DOLLAR")
          //10qt/1qut to less than 10qut/1 sextillion
          RV = InrRSOut / 10000000000 + " Sextillion";
        else RV = f1 + " Cr";
      } else {
        if (currency == "DOLLAR") RV = InrRSOut / 10000000000 + " Sextillion";
        else RV = f1 + "." + f2 + " Cr";
      }
    } else {
      RV = InrRSOut.toString();
    }
    return currencySymbol + RV;
  }
}
// EDIT PROPERTIES
if (url.includes("edit-properties")) {
  let searchParams = new URLSearchParams(window.location.search);
  let estateCode = null;
  let estateId = null;
  estateCode = searchParams.get("code");
  estateId = searchParams.get("id");
  if (estateCode == "" || estateCode == null) {
    window.location.href = "manage-properties.html";
  } else {
    let estate = {
      estateId: estateId,
      estateCode: estateCode,
    };
    Model.getEstate(estate);
    // On success estate-fetched event will be fired
    window.addEventListener("estate-fetched", fillEditForm);
    // On fail estate-failed event will be fired
  }

  $(".amount-box").unbind("keyup", showReadableAmount);
  $(".amount-box").keyup(showReadableAmount);
}

function fillEditForm() {
  let p = Model.realData.singleEstate;

  $("input[name=estateName][value='" + p.estateName + "']").attr(
    "checked",
    true
  );
  $("input[name=estateType][value='" + p.estateType + "']").attr(
    "checked",
    true
  );
  $("input[name=transactionType][value='" + p.transactionType + "']").attr(
    "checked",
    true
  );
  $(
    "input[name=constructionStatus][value='" + p.constructionStatus + "']"
  ).attr("checked", true);
  $("input[name=numOfBedrooms][value='" + p.numOfBedrooms + "']").attr(
    "checked",
    true
  );
  $("input[name=numOfBalconies][value='" + p.numOfBalconies + "']").attr(
    "checked",
    true
  );
  $("input[name=numOfBathrooms][value='" + p.numOfBathrooms + "']").attr(
    "checked",
    true
  );
  $("input[name=furnish][value='" + p.furnish + "']").attr("checked", true);
  $("input[name=floorAt]").val(p.floorAt);
  $("input[name=totalFloors]").val(p.totalFloors);
  $("input[name=lift][value='" + p.lift + "']").attr("checked", true);
  $(
    "input[name=numOfReserveParking][value='" + p.numOfReserveParking + "']"
  ).attr("checked", true);
  $("input[name=facing][value='" + p.facing + "']").attr("checked", true);
  $("input[name=superArea]").val(p.superArea);
  $("input[name=superAreaUnit][value='" + p.superAreaUnit + "']").attr(
    "checked",
    true
  );
  $("input[name=carpetArea]").val(p.carpetArea);
  $("input[name=carpetAreaUnit][value='" + p.carpetAreaUnit + "']").attr(
    "checked",
    true
  );
  $("input[name=dimLength]").val(p.dimLength);
  $("input[name=dimWidth]").val(p.dimWidth);
  $("input[name=dimAreaUnit][value='" + p.dimAreaUnit + "']").attr(
    "checked",
    true
  );

  $("input[name=currency][value='" + p.currency + "']").attr("checked", true);

  if (p.cost != "") {
    $("input[name=cost]").val(p.cost);
    $("input[name=cost]")
      .siblings(".readableAmount")
      .html(toReadableAmountInrDollar(p.cost, p.currency));
  }

  if (p.monthlyRent != "") {
    $("input[name=monthlyRent]").val(p.monthlyRent);
    $("input[name=monthlyRent]")
      .siblings(".readableAmount")
      .html(toReadableAmountInrDollar(p.monthlyRent, p.currency));
  }

  if (p.securityDeposit != "") {
    $("input[name=securityDeposit]").val(p.securityDeposit);
    $("input[name=securityDeposit]")
      .siblings(".readableAmount")
      .html(toReadableAmountInrDollar(p.securityDeposit, p.currency));
  }

  console.log(p);
  if (p.maintenanceCost != "") {
    $("input[name=maintenanceCost]").val(p.maintenanceCost);
    $("input[name=maintenanceCost]")
      .siblings(".readableAmount")
      .html(toReadableAmountInrDollar(p.maintenanceCost, p.currency));
  }

  $("input[name=isBrokerage][value='" + p.isBrokerage + "']").attr(
    "checked",
    true
  );
  if (p.brokerageAmount != "") {
    $("input[name=brokerageAmount]").val(p.brokerageAmount);
    $("input[name=brokerageAmount]")
      .siblings(".readableAmount")
      .html(toReadableAmountInrDollar(p.brokerageAmount, p.currency));
  }

  if (p.estateName == "PG") {
    $(".dependent-PG").attr("disabled", true);
    $(".dependent-PG").prop("checked", false);
  } else {
    $(".dependent-PG").attr("disabled", false);
  }

  if (p.estateName == "Sale") {
    $(".dependent-Sell").attr("disabled", true);
    $(".dependent-r-l-pg input").attr("disabled", false);
    $(".dependent-Sell").prop("checked", false);
    $(".dependent-Sell").val("");
  } else {
    $(".dependent-Sell").attr("disabled", false);
    $(".dependent-r-l-pg input").attr("disabled", true);
    $(".dependent-r-l-pg input").prop("checked", false);
    $(".dependent-r-l-pg input[type=number]").val("");
  }

  if (p.estateType == "Apartment-Flat" || p.estateType == "Independent Floor") {
    $(".dependent-p-fh-ih input").attr("disabled", false);
    $(".dependent-af-if input").attr("disabled", true);
    $(".dependent-af-if input").prop("checked", false);
  } else {
    $(".dependent-p-fh-ih input").attr("disabled", true);
    $(".dependent-af-if input").attr("disabled", false);
    $(".dependent-p-fh-ih input").prop("checked", false);
  }

  if (
    p.estateType == "Plot" ||
    p.estateType == "Farm House" ||
    p.estateType == "Office" ||
    p.estateType == "Mall" ||
    p.estateType == "Hospital" ||
    p.estateType == "Commercial Building" ||
    p.estateType == "Shop"
  ) {
    $(".dependent-Plot input").attr("disabled", true);
    $(".dependent-Plot input").prop("checked", false);
  } else {
    $(".dependent-Plot input").attr("disabled", false);
  }

  if (
    p.estateType == "Plot" ||
    p.estateType == "Farm House" ||
    p.estateType == "Office" ||
    p.estateType == "Mall" ||
    p.estateType == "Hospital" ||
    p.estateType == "Commercial Building" ||
    p.estateType == "Shop"
  ) {
    $(".dependent-p-fh input").attr("disabled", true);
    $(".dependent-p-fh input").prop("checked", false);
  } else {
    $(".dependent-p-fh input").attr("disabled", false);
  }

  if (p.isBrokerage == "No") {
    $(".dependent-Brokerage-No").attr("disabled", true);
    $(".dependent-Brokerage-No").val("");
    $("#BrokerageAmount").siblings(".readableAmount").html("");
  } else {
    $(".dependent-Brokerage-No").attr("disabled", false);
  }

  $("#location-field").val(p.locality + `, ` + p.city + ", " + p.state);
  showAddress();
  $("#locality-place").val(p.localityPlace);

  $("input[name=youtubeUrl]").val(p.youtubeUrl);
  $("textarea[name=estateDescription]").val(p.estateDescription);

  if (p.estatePictures && p.estatePictures.length > 0) {
    p.estatePictures.forEach((photo) => {
      if (photo.picturePath) {
        let photoHTML = `
  <div class="photo-container" style="
    display: inline-block; 
    margin: 5px; 
    
    border-radius: 5px; 
    overflow: hidden;
    width: 180px; 
    height: 100px; 
    text-align: center;
    position: relative;
  ">
    <img src="https://zilahouse.com${photo.picturePath}" alt="Estate Photo" class="existing-photo" style="
      width: 100%; 
      height: auto; 
      object-fit: cover; 
    " onerror="this.onerror=null; this.src='path/to/default/image.jpg';">
    <input type="hidden" name="existingPhotos[]" value="${photo.estatePictureId}">
    
  </div>`;
        $("#existing-photos").append(photoHTML);
      } else {
        console.error(
          `No picturePath found for photo ID: ${photo.estatePictureId}`
        );
      }
    });
  } else {
    console.log("No estate pictures available.");
  }

  $(".edit-submit-btn").click(editWholeEstate);
}

function editWholeEstate() {
  if (
    $(".photos-form")[0].checkValidity() &&
    $(".location-form")[0].checkValidity() &&
    $(".details-form")[0].checkValidity()
  ) {
    $(".form-message").html("");
    $(".ad-step-box:nth-child(5)").addClass("completed");
    $(".ad-form-cont .form").addClass("disappear");
    $(".waiting-frame img").attr("src", "../assets/images/gifs/loading.gif");
    $(".waiting-frame span").html("<div class='spinner-border mb-2'></div>");
    $(".waiting-frame h3").html("Sit back and relax...");
    $(".waiting-frame p").html(
      "We are updating your property details on our server."
    );
    $(".waiting-frame").removeClass("disappear");
    prepareEditProperty();
  } else {
    $(".form-message").html(
      '<p class="text-danger">Fields with * are required.</p>'
    );
  }
}

function prepareEditProperty() {
  let p = Model.realData.singleEstate;
  let currency = $("input[name='currency']:checked").val();
  let estateInfo = {
    estateId: p.estateId,
    estateName: $("input[name='estateName']:checked").val(),
    estateType: $("input[name='estateType']:checked").val(),
    transactionType: $("input[name='transactionType']:checked").val(),
    constructionStatus: $("input[name='constructionStatus']:checked").val(),
    numOfBedrooms: $("input[name='numOfBedrooms']:checked").val(),
    numOfBalconies: $("input[name='numOfBalconies']:checked").val(),
    numOfBathrooms: $("input[name='numOfBathrooms']:checked").val(),
    estateTitle: null,
    furnish: $("input[name='furnish']:checked").val(),
    floorAt: $("input[name='floorAt']").val(),
    totalFloors: $("input[name='totalFloors']").val(),
    lift: $("input[name='lift']:checked").val(),
    numOfReserveParking: $("input[name='numOfReserveParking']:checked").val(),
    facing: $("input[name='facing']:checked").val(),
    superArea: $("input[name='superArea']").val(),
    superAreaUnit: $("input[name='superAreaUnit']:checked").val(),
    carpetArea: $("input[name='carpetArea']").val(),
    carpetAreaUnit: $("input[name='carpetAreaUnit']:checked").val(),
    dimLength: $("input[name='dimLength']").val(),
    dimWidth: $("input[name='dimWidth']").val(),
    dimAreaUnit: $("input[name='dimAreaUnit']:checked").val(),
    cost: $("input[name='cost']").val(),
    displayCost: toReadableAmountInrDollar(
      $("input[name='cost']").val(),
      currency
    ),
    monthlyRent: $("input[name='monthlyRent']").val(),
    displayMonthlyRent: toReadableAmountInrDollar(
      $("input[name='monthlyRent']").val(),
      currency
    ),
    securityDeposit: $("input[name='securityDeposit']").val(),
    displaySecurityDeposit: toReadableAmountInrDollar(
      $("input[name='securityDeposit']").val(),
      currency
    ),
    maintenanceCost: $("input[name='maintenanceCost']").val(),
    displayMaintenanceCost: toReadableAmountInrDollar(
      $("input[name='maintenanceCost']").val(),
      currency
    ),
    isBrokerage: $("input[name='isBrokerage']:checked").val(),
    currency: $("input[name='currency']:checked").val(),
    brokerageAmount: $("input[name='brokerageAmount']").val(),
    displayBrokerageAmount: toReadableAmountInrDollar(
      $("input[name='brokerageAmount']").val(),
      currency
    ),
    country: $("input[name='country']:checked").val(),
    state: $("input[name='state']").val(),
    city: $("input[name='city']").val(),
    locality: $("input[name='locality']").val(),
    localityPlace: $("input[name='localityPlace']").val(),
    youtubeUrl: getEmbedUrl($("input[name='youtubeUrl']").val()),
    estateDescription: $("textarea[name='estateDescription']").val(),
    reviewStatus: "Under Review",
    adPhotos: [],
  };

  var imgCount = $("input[name='adPhotos']")[0].files.length;
  for (let i = 0; i < imgCount; i++) {
    estateInfo.adPhotos.push($("input[name='adPhotos']")[0].files[i]);
  }
  // let photoFiles = $("input[name='adPhotos']").get(0).files;
  // if (photoFiles.length > 0) {
  //   // Convert file list to array and push to adPhotos
  //   Array.from(photoFiles).forEach((file, index) => {
  //     estateInfo.adPhotos.push({
  //       estatePictureId: `${p.estatePictureId}`,
  //       picturePath: `/picStorage/${p.requesterMobile}/${p.estateId}/${p.estateId}_${index}.png`,
  //       pictureTag: "",
  //     });
  //   });
  // }
  console.log(estateInfo.adPhotos);

  let localityPlace = $("input[name='localityPlace']").val();
  let numOfBedrooms = $("input[name='numOfBedrooms']:checked").val();
  let estateType = $("input[name='estateType']:checked").val();
  let locality = $("input[name='locality']").val();
  let city = $("input[name='city']").val();
  let state = $("input[name='state']").val();
  let country = $("input[name='country']:checked").val();
  let estateName = $("input[name='estateName']:checked").val();
  let monthlyRent = $("input[name='monthlyRent']").val();
  let cost = $("input[name='cost']").val();

  if (
    numOfBedrooms == null ||
    numOfBedrooms == undefined ||
    numOfBedrooms == ""
  ) {
    numOfBedrooms = "";
  }

  let estateTitle = "";

  if (localityPlace != "") {
    estateTitle +=
      numOfBedrooms +
      " " +
      estateType +
      " in " +
      localityPlace +
      ", " +
      locality +
      ", " +
      city +
      ", " +
      state +
      ", " +
      country +
      " for " +
      estateName +
      " in just ";
  } else {
    estateTitle +=
      numOfBedrooms +
      " " +
      estateType +
      " in " +
      locality +
      ", " +
      city +
      ", " +
      state +
      ", " +
      country +
      " for " +
      estateName +
      " in just ";
  }

  if (monthlyRent != "") {
    estateTitle += toReadableAmountInrDollar(monthlyRent, currency);
  }
  if (cost != "") {
    estateTitle += toReadableAmountInrDollar(cost, currency);
  }
  estateInfo.estateTitle = estateTitle;

  Model.updatewholeProperty(estateInfo);
}

// ESTATE FUNCTIONS
// Implementing these only on estate page
if (url.includes("estate")) {
  showCommAds();
  let searchParams = new URLSearchParams(window.location.search);
  let estateCode = null;
  let estateId = null;
  estateCode = searchParams.get("code");
  estateId = searchParams.get("id");
  if (estateCode == "" || estateCode == null) {
    window.location.href =
      "/explore.html?country=INDIA&purpose=Sale&property-type=Apartment+Flat&bhk=1BHK&location=Delhi";
  } else {
    $("#estate-cont").html(
      '<div class="loader"><div class="spinner-border mb-2"></div>Loading Property...</div>'
    );
    let estate = {
      estateId: estateId,
      estateCode: estateCode,
    };
    Model.getEstate(estate);
    // On success estate-fetched event will be fired
    window.addEventListener("estate-fetched", applySingleEstate);
    // On fail estate-failed event will be fired
  }
}

function applySingleEstate() {
  let singleEstate = Model.realData.singleEstate;
  $(document).prop("title", singleEstate.estateTitle);
  $("meta[property='og:title']").attr("content", singleEstate.estateTitle);

  $.ajax({
    url: views.applyTemplates("estate-cont", "estate-template", singleEstate),
    success: function () {
      var mySwiper5 = new Swiper(".swiper5", {
        speed: 500,
        slidesPerView: 1,
        spaceBetween: 0,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false,
        },

        pagination: {
          el: ".swiper-pagination5",
          clickable: true,
          type: "fraction",
        },

        navigation: {
          nextEl: ".next-estate",
          prevEl: ".prev-estate",
        },

        keyboard: {
          enabled: true,
        },
      });
      $(".estate-pictures").unbind("click", openGallery);
      $(".estate-pictures").click(openGallery);
      $(".view-contact").unbind("click", showContactHandler);
      $(".view-contact").click(showContactHandler);
    },
  });
}

// when properties-fetched event will be fired this runs

window.addEventListener("properties-fetched", function (e) {
  e.preventDefault();
  let properties = Model.realData.properties;
  let itemsPerPage = 10; // Number of items to display at a time
  let currentIndex = 0; // To track the current position in the properties list

  function displayProperties(start, end) {
    let propertiesToDisplay = properties.slice(start, end);

    // Append the properties to the existing ones
    views.applyTemplates("recent-properties-content", "property-template", {
      property: propertiesToDisplay,
      append: true, // Ensure properties are appended
    });

    // Reinitialize Swipers
    initializeSwipers();

    // Update the progress text
    updateProgressText();
  }

  function initializeSwipers() {
    // Swiper2
    var mySwiper2 = new Swiper(".swiper2", {
      effect: "slide",
      speed: 600,
      slidesPerView: "auto",
      spaceBetween: 50,
      breakpoints: {
        768: {
          slidesPerView: "auto",
          spaceBetween: 30,
        },
        576: {
          slidesPerView: 1,
        },
      },
      navigation: {
        nextEl: ".next",
        prevEl: ".prev",
      },
      pagination: {
        el: ".swiper-pagination2",
        type: "fraction",
      },
      keyboard: {
        enabled: true,
      },
    });

    // Swiper3
    var mySwiper3 = new Swiper(".swiper3", {
      effect: "fade",
      speed: 800,
      slidesPerView: 1,
      spaceBetween: 0,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      longSwipes: false,
      pagination: {
        el: ".swiper-pagination3",
        clickable: true,
        type: "fraction",
      },
    });

    // Event handlers for other interactions
    $(".property-img-cont").unbind("click", openGallery);
    $(".property-img-cont").click(openGallery);
    $(".view-contact").unbind("click", showContactHandler);
    $(".view-contact").click(showContactHandler);
  }

  function handleLoadMore() {
    // Calculate new indices
    let start = currentIndex;
    let end = start + itemsPerPage;

    // Display the next set of properties
    displayProperties(start, end);

    // Update the current index
    currentIndex = end;

    // Update the visibility of "Load More" button
    if (currentIndex >= properties.length) {
      document.getElementById("load-more-recent").style.display = "none"; // Hide "Load More" button if no more items
    }
  }

  function updateProgressText() {
    let totalPages = Math.ceil(properties.length / itemsPerPage);
    let currentPage = Math.ceil(currentIndex / itemsPerPage);
    let progressText = `${currentPage}/${totalPages}`;
    // Assuming you have a progress text element or can use console.log for now
    console.log(progressText);
  }

  // Initial display setup
  if (properties.length > 0) {
    displayProperties(0, itemsPerPage);

    // Show "Load More" button if there are more items to load
    if (properties.length > itemsPerPage) {
      document.getElementById("load-more-recent").style.display = "block";
      document
        .getElementById("load-more-recent")
        .addEventListener("click", handleLoadMore);
    } else {
      document.getElementById("load-more-recent").style.display = "none";
    }
  } else {
    document.getElementById("recent-properties-content").innerHTML =
      "Oops! No properties found!";
    document.getElementById("load-more-recent").style.display = "none";
  }

  // Initial progress display
  updateProgressText();
});

// Swiper1

var mySwiper1 = new Swiper(".swiper1", {
  effect: "fade",
  loop: true,
  speed: 3000,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
});

//Open SignIn
function openSignIn() {
  $(".signin-box").addClass("open");
  $(".signin-form #mobile").focus();
  closeSignUp();
  closeGallery();
  closeOTPSignIn();
}
//Close signin
function closeSignIn() {
  $(".signin-box").removeClass("open");
}

//Open otp signin
function openOTPSignIn() {
  $(".otp-signin-box").addClass("open");
  $(".otp-signin-form #otp-mobile").focus();
  closeSignUp();
  closeGallery();
  closeSignIn();
}
//Close otp signin
function closeOTPSignIn() {
  $(".otp-signin-box").removeClass("open");
}

//Open signup
function openSignUp() {
  $(".signup-box").addClass("open");
  $(".signup-form #name").focus();
  closeSignIn();
  closeGallery();
  closeOTPSignIn();
}
// Close Signup
function closeSignUp() {
  $(".signup-box").removeClass("open");
}

//Open Gallery
function openGallery() {
  let propId = $(this).attr("data-id");
  let prop = null;
  if (Model.realData.singleEstate) {
    prop = Model.realData.singleEstate;
  } else {
    prop = Model.getFetchedPropertyById(propId);
  }
  views.applyTemplates("gallery-slideshow-cont", "full-gallery-template", prop);

  $(".close-gallery").unbind("click", closeGallery);
  $(".close-gallery").click(closeGallery);

  // galleryThumbs
  var galleryThumbs = new Swiper(".gallery-thumbs", {
    spaceBetween: 16,
    slidesPerView: 2,
    freeMode: true,
    breakpoints: {
      768: {
        slidesPerView: 6,
      },
      576: {
        slidesPerView: 3,
      },
    },
    // autoplay: {
    //     delay: 2500,
    //     disableOnInteraction: false,
    // },
    keyboard: {
      enabled: true,
    },
    watchSlidesVisibility: true,
    watchSlidesprogress: true,
  });

  // gallery top
  var galleryTop = new Swiper(".gallery-top", {
    slidesPerView: 1,
    spaceBetween: 10,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    thumbs: {
      swiper: galleryThumbs,
    },
    // autoplay: {
    //     delay: 2500,
    //     disableOnInteraction: false,
    // },
    keyboard: {
      enabled: true,
    },
  });

  $(".gallery-slideshow").addClass("open");
  closeSignUp();
  closeSignIn();
  closeOTPSignIn();
}
//Close Gallery
function closeGallery() {
  $(".gallery-slideshow").removeClass("open");
  $("#gallery-slideshow-cont").html("");
}

// Animating elements when they come in viewport
$(document).ready(function () {
  function isScrolledIntoView(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop - 10;

    return elemBottom <= docViewBottom && elemTop >= docViewTop;
  }

  $(window).scroll(function () {
    $(".animate-this-left").each(function () {
      if (isScrolledIntoView(this) === true) {
        $(this).addClass("animate__fadeInLeft");
      }
    });
    $(".animate-this-right").each(function () {
      if (isScrolledIntoView(this) === true) {
        $(this).addClass("animate__fadeInRight");
      }
    });
    $(".animate-this-up").each(function () {
      if (isScrolledIntoView(this) === true) {
        $(this).addClass("animate__fadeInUp");
      }
    });
    $(".animate-this-down").each(function () {
      if (isScrolledIntoView(this) === true) {
        $(this).addClass("animate__fadeInDown");
      }
    });
    $(".animate-this").each(function () {
      if (isScrolledIntoView(this) === true) {
        $(this).addClass("animate__fadeIn");
      }
    });
  });
});

// Disable form submissions if there are invalid fields
(function () {
  "use strict";
  window.addEventListener(
    "load",
    function () {
      // Get the forms we want to add validation styles to
      var forms = document.getElementsByClassName("needs-validation");
      // Loop over them and prevent submission
      var validation = Array.prototype.filter.call(forms, function (form) {
        form.addEventListener(
          "submit",
          function (event) {
            if (form.checkValidity() === false) {
              event.preventDefault();
              event.stopPropagation();
            }
            form.classList.add("was-validated");
          },
          false
        );
      });
    },
    false
  );
})();

// DASHBOARD FUNCTIONS
if (url.includes("dashboard")) {
  window.removeEventListener("count-stats-fetched", loadDashboard);
  window.addEventListener("count-stats-fetched", loadDashboard);
}

function loadDashboard() {
  let countStats = Model.realData.countStats;
  if (localStorage.getItem("loggedInUser")) {
    countStats.user = JSON.parse(localStorage.getItem("loggedInUser")).user;
  } else {
    countStats.user = JSON.parse(sessionStorage.getItem("loggedInUser")).user;
  }
  views.applyTemplates("dashboard-cont", "dashboard-template", countStats);
}

// NOTIFICATIONS PAGE
if (url.includes("admin/notifications")) {
  $("#notifications-wrapper").html(
    "<div class='text-center py-5'><div class='spinner-border'></div></div>"
  );

  let mobile = userData.user.mobile;
  Model.pullInterestsOnProperty(mobile);

  window.addEventListener("all-interests-fetched", allInterestsFetched);
  window.addEventListener(
    "all-interests-fetch-failed",
    allInterestsFetchFailed
  );
}
function allInterestsFetched() {
  let interests = Model.realData.interests;
  if (interests.length > 0) {
    views.applyTemplates("notifications-wrapper", "notification-template", {
      notification: interests,
    });
  } else {
    $("#notifications-wrapper").html(
      "<div class='text-center py-5 my-3'><img src='/assets/images/no_data_blue.svg' width='100px' class='d-block mx-auto mb-3' />No notifications to show up here.</div>"
    );
  }
}
function allInterestsFetchFailed() {
  $("#notifications-wrapper").html(
    "<div class='text-center py-5 my-3'><img src='/assets/images/no_data_blue.svg' width='100px' class='d-block mx-auto mb-3' />Something went wrong! Please refresh the page.</div>"
  );
}

// LEADS PAGE - STARTS
if (url.includes("admin/leads")) {
  $("#leads-wrapper").html(
    "<div class='text-center py-5'><div class='spinner-border'></div></div>"
  );

  //let mobile = userData.user.mobile;
  Model.pullLeads();

  window.addEventListener("all-leads-fetched", allLeadsFetched);
  window.addEventListener("all-leads-fetch-failed", allLeadsFetchedFailed);
}
function allLeadsFetched() {
  let leads = Model.realData.leads;
  if (leads.length > 0) {
    views.applyTemplates("leads-wrapper", "leads-template", {
      leads: leads,
    });
  } else {
    $("#leads-wrapper").html(
      "<div class='text-center py-5 my-3'><img src='/assets/images/no_data_blue.svg' width='100px' class='d-block mx-auto mb-3' />No leads to show up here.</div>"
    );
  }
}
function allLeadsFetchedFailed() {
  $("#leads-wrapper").html(
    "<div class='text-center py-5 my-3'><img src='/assets/images/no_data_blue.svg' width='100px' class='d-block mx-auto mb-3' />Something went wrong! No Leads! Please refresh the page.</div>"
  );
}
// LEADS PAGE - ENDS

// MANAGE PROPERTIES FUNCTIONS
var options = {
  pageMax: 10,
};
if (url.includes("manage-properties")) {
  mpBindings();

  // for local use
  // Model.realData.properties = Model.data.properties;

  // to be uncommented
  filterStatusHandler();

  // initPage(Model.realData.properties);
  $("#smart-search").focus();
}
window.addEventListener("propsFetchedByQuery", function () {
  initPage(Model.realData.properties);
});
function initPage(props) {
  enableStatusFilter();
  let pageMax = options.pageMax;
  let dataCount = props.length;
  let pageCount = Math.ceil(dataCount / pageMax);

  let slicedProps = [];
  if (dataCount > pageMax) {
    paginate(pageCount);
    let c = getCurrentPage(pageCount);
    slicedProps = props.slice((c - 1) * pageMax, c * pageMax);
    updatePagination(getCurrentPage(pageCount), pageCount);
    $(window).unbind("hashchange", pageChanged);
    $(window).on("hashchange", pageChanged);
  } else {
    slicedProps = props;
    $("#pagination-cont").html("");
  }
  loadProps(slicedProps);
}
function pageChanged() {
  let props = Model.realData.properties;
  let pageMax = options.pageMax;
  let dataCount = props.length;
  let pageCount = Math.ceil(dataCount / pageMax);
  let c = getCurrentPage(pageCount);
  updatePagination(c, pageCount);
  let slicedProps = props.slice((c - 1) * pageMax, c * pageMax);
  loadProps(slicedProps);
}
function paginate(pageCount) {
  let pages = [];
  for (let i = 0; i < pageCount; i++) {
    pages.push(i + 1);
  }

  views.applyTemplates("pagination-cont", "pagination-template", {
    page: pages,
  });
}
function loadProps(props) {
  if (props.length > 0) {
    $(".properties-table").show();
    views.applyTemplates("props-list-cont", "props-list-template", {
      property: props,
    });
    $(".loader-cont").html("");
    mpSpecialBindings();
  } else {
    $("#props-list-cont").html("");
    $(".properties-table").hide();
    $(".loader-cont").html("<div class='my-3'>No Data Available.</div>");
  }
}
function updatePagination(c, lastPage) {
  enableNextButton();
  enablePrevButton();
  if (c == 1) {
    disablePrevButton();
  } else if (c == lastPage) {
    disableNextButton();
  }
  $(".page-item").removeClass("active");
  $("#page" + c).addClass("active");
  let prevPage = +c - 1;
  let nextPage = +c + 1;
  $(".prev-page-btn a").attr("href", "#page" + prevPage);
  $(".next-page-btn a").attr("href", "#page" + nextPage);
  $(".prev-page-btn a").attr("data-page", prevPage);
  $(".next-page-btn a").attr("data-page", nextPage);
}
function getCurrentPage(pageCount) {
  let url = window.location.href;
  let from = url.indexOf("#page");
  if (from < 1) {
    window.location.href = "#page1";
    return 1;
  }
  let currentPage = url.substr(from + 5);
  if (currentPage < 1) {
    window.location.href = "#page" + 1;
    return 1;
  } else if (currentPage > pageCount) {
    window.location.href = "#page" + pageCount;
    return pageCount;
  } else {
    return currentPage;
  }
}

function filterStatusHandler() {
  let filterStatus = getFilterStatus();
  let filterStatusStr = "";
  let filterStrs = [];
  if (filterStatus == "All Properties") {
    filterStrs.push("Sold Out:reviewStatus");
    filterStrs.push("Reviewed:reviewStatus");
    filterStrs.push("Rejected:reviewStatus");
    filterStrs.push("Under Review:reviewStatus");
    console.log(filterStrs);
  } else {
    filterStatusStr = filterStatus + ":reviewStatus";
    filterStrs.push(filterStatusStr);
  }
  disableStatusFilter();
  $("#pagination-cont").html("");
  $("#props-list-cont").html("");
  $(".loader-cont").html(
    "<div class='spinner-border spinner-border-sm'></div> Loading Properties..."
  );
  Model.getPropsByQuery(filterStrs);
}
function getFilterStatus() {
  return $(".filter-status-field").val();
}

function isStateOrStatusChanged() {
  let estateId = $(this).attr("data-id");

  let originalState = null;
  let originalStatus = null;

  let property = Model.getFetchedPropertyById(estateId);

  originalState = property.status;
  originalStatus = property.reviewStatus;

  let state = $("#state" + estateId).is(":checked") ? "Active" : "Inactive";
  let status = $("#status" + estateId).val();

  if (state != originalState || status != originalStatus) {
    disableSaveButton(estateId);
    enableSaveButton(estateId);
  } else {
    disableSaveButton(estateId);
  }
}
function saveChangesHandler() {
  let id = $(this).attr("data-id");
  $("#save" + id).html(
    "<div class='spinner-border spinner-border-sm m-0'></div>"
  );
  disableSaveButton(id);

  let state = $("#state" + id).is(":checked") ? "Active" : "Inactive";
  let status = $("#status" + id).val();

  let estateInfo = {
    estateId: id,
    status: state,
    reviewStatus: status,
  };

  Model.updateProperty(estateInfo);
}
window.addEventListener("changesSaved", function () {
  initPage(Model.realData.properties);
});

let tempProps = [];
function smartSearchHandler() {
  let str = $("#smart-search").val().toLowerCase();
  let props = Model.realData.properties;

  tempProps = [];
  if (str == "") {
    $(window).unbind("hashchange", tempPageChanged);
    initPage(props);
  } else {
    for (let i = 0; i < props.length; i++) {
      let prop = props[i];
      if (prop.estateTitle.toLowerCase().includes(str)) {
        tempProps.push(prop);
      } else if (prop.estateId.toString().toLowerCase().includes(str)) {
        tempProps.push(prop);
      } else if (prop.status.toLowerCase().startsWith(str)) {
        tempProps.push(prop);
      } else if (prop.requesterMobile.toLowerCase().includes(str)) {
        tempProps.push(prop);
      } else if (prop.reviewStatus.toLowerCase().startsWith(str)) {
        tempProps.push(prop);
      }
    }

    initPage(tempProps);
    $("#smart-search").focus();
    $(window).unbind("hashchange", pageChanged);
    $(window).unbind("hashchange", tempPageChanged);
    $(window).on("hashchange", tempPageChanged);
  }
}
function tempPageChanged() {
  let props = tempProps;
  let pageMax = options.pageMax;
  let dataCount = props.length;
  let pageCount = Math.ceil(dataCount / pageMax);
  let c = getCurrentPage(pageCount);
  updatePagination(c, pageCount);
  let slicedProps = props.slice((c - 1) * pageMax, c * pageMax);
  loadProps(slicedProps);
}

function enablePrevButton() {
  $(".prev-page-btn").removeClass("disabled");
}
function disablePrevButton() {
  $(".prev-page-btn").addClass("disabled");
}
function enableNextButton() {
  $(".next-page-btn").removeClass("disabled");
}
function disableNextButton() {
  $(".next-page-btn").addClass("disabled");
}
function enableStatusFilter() {
  $(".filter-status-field").attr("disabled", false);
}
function disableStatusFilter() {
  $(".filter-status-field").attr("disabled", true);
}
function enableSaveButton(estateId) {
  $("#save" + estateId).html("Save");
  $("#save" + estateId).attr("disabled", false);
  $("#save" + estateId).click(saveChangesHandler);
}
function disableSaveButton(estateId) {
  $("#save" + estateId).attr("disabled", true);
  $("#save" + estateId).unbind("click", saveChangesHandler);
}

function mpSpecialBindings() {
  $(".state-field").change(isStateOrStatusChanged);
  $(".status-field").change(isStateOrStatusChanged);

  $(".myp-state-field").unbind("click", mypStateHandler);
  $(".myp-state-field").click(mypStateHandler);

  $(".myp-status-field").unbind("change", mypStatusHandler);
  $(".myp-status-field").change(mypStatusHandler);
}
function mpBindings() {
  $(".filter-status-field").change(filterStatusHandler);
  $("#smart-search").keyup(smartSearchHandler);
}

// MY PROPERTIES
if (url.includes("my-properties")) {
  mpBindings();
  loadMyProperties();
}
function loadMyProperties() {
  $("#pagination-cont").html("");
  $("#props-list-cont").html("");
  $(".loader-cont").html(
    "<div class='spinner-border spinner-border-sm'></div> Loading Properties..."
  );

  let mobile = null;
  if (localStorage.getItem("loggedInUser")) {
    mobile = JSON.parse(localStorage.getItem("loggedInUser")).user.mobile;
  } else {
    mobile = JSON.parse(sessionStorage.getItem("loggedInUser")).user.mobile;
  }
  let filterStr = mobile + ":requesterMobile";
  let filterStrs = [];
  filterStrs.push(filterStr);
  Model.getPropsByQuery(filterStrs);
}
function mypStateHandler() {
  Window.estateId = $(this).attr("data-id");
  let estateInfo = {
    estateId: Window.estateId,
    status:
      $("#state" + Window.estateId).prop("checked") == true
        ? "Active"
        : "Inactive",
  };
  $("label[for='state" + Window.estateId + "']").html("Wait...");
  Model.updateMyPState(estateInfo);
  window.removeEventListener("myp-state-updated", updateParticularState);
  window.addEventListener("myp-state-updated", updateParticularState);
}
function mypStatusHandler() {
  Window.sId = $(this).attr("data-id");
  if (
    confirm(
      "Once you mark Sold Out to this property, you cannot undo it. Do you want to continue?"
    )
  ) {
    let estateInfo = {
      estateId: Window.sId,
      reviewStatus: $("#status" + Window.sId).val(),
    };
    $("#status" + Window.sId + " option:selected").html("Wait...");
    Model.updateMyPStatus(estateInfo);
    window.removeEventListener("myp-status-updated", updateParticularStatus);
    window.addEventListener("myp-status-updated", updateParticularStatus);
  } else {
    $("#status" + Window.sId + " option:not(:selected)").prop("selected", true);
  }
}
function updateParticularState() {
  $("#estate-state" + Window.estateId).removeClass(
    "table-danger table-success"
  );
  if ($("#state" + Window.estateId).prop("checked") == true) {
    $("#estate-state" + Window.estateId).addClass("table-success");
    $("label[for='state" + Window.estateId + "']").html("Active");
    for (let i = 0; i < Model.realData.properties.length; i++) {
      if (Model.realData.properties[i].estateId == Window.estateId) {
        Model.realData.properties[i].status = "Active";
      }
    }
  } else {
    $("#estate-state" + Window.estateId).addClass("table-danger");
    $("label[for='state" + Window.estateId + "']").html("Inactive");
    for (let i = 0; i < Model.realData.properties.length; i++) {
      if (Model.realData.properties[i].estateId == Window.estateId) {
        Model.realData.properties[i].status = "Inactive";
      }
    }
  }
}
function updateParticularStatus() {
  for (let i = 0; i < Model.realData.properties.length; i++) {
    if (Model.realData.properties[i].estateId == Window.sId) {
      Model.realData.properties[i].reviewStatus = "Sold Out";
    }
  }
  $("#estate-status" + Window.sId).removeClass(
    "table-danger table-success table-warning table-secondary"
  );
  $("#estate-status" + Window.sId).addClass("table-secondary");
  $("#estate-status" + Window.sId).html(
    '<div class="mt-3 ml-3">Sold Out</div>'
  );
}

// Manage users
if (url.includes("manage-users")) {
  muBindings();
  loadUsersList();
}
function loadUsersList() {
  showLoading("#users-table-cont .loader-cont");
  Model.getAllUsers(2);
  window.removeEventListener("all-users-fetched2", prepareFillUsersListCont);
  window.addEventListener("all-users-fetched2", prepareFillUsersListCont);
}
function prepareFillUsersListCont() {
  let users = Model.realData.users;
  console.log(users);
  let pageMax = options.pageMax;
  let dataCount = users.length;
  let pageCount = Math.ceil(dataCount / pageMax);

  let slicedUsers = [];
  if (dataCount > pageMax) {
    paginate(pageCount);
    let c = getCurrentPage(pageCount);
    slicedUsers = users.slice((c - 1) * pageMax, c * pageMax);
    updatePagination(getCurrentPage(pageCount), pageCount);
    $(window).unbind("hashchange", userPageChanged);
    $(window).on("hashchange", userPageChanged);
  } else {
    slicedUsers = users;
    $("#pagination-cont").html("");
  }
  fillUsersListCont(slicedUsers);
}
function userPageChanged() {
  let users = Model.realData.users;
  let pageMax = options.pageMax;
  let dataCount = users.length;
  let pageCount = Math.ceil(dataCount / pageMax);
  let c = getCurrentPage(pageCount);
  updatePagination(c, pageCount);
  let slicedUsers = users.slice((c - 1) * pageMax, c * pageMax);
  fillUsersListCont(slicedUsers);
}
function fillUsersListCont(users) {
  if (users.length > 0) {
    $.ajax({
      url: views.applyTemplates("users-list-cont", "users-list-template", {
        user: users,
      }),
      success: function () {
        emptyLoading("#users-table-cont .loader-cont");
        $(".status-field").unbind("click", userStatusHandler);
        $(".status-field").click(userStatusHandler);
        $(".copy-url").unbind("click", copyWelcomeUrl);
        $(".copy-url").click(copyWelcomeUrl);
      },
    });
  } else {
    $("#users-list-cont").html("");
    $("#users-table-cont .loader-cont").html(
      "<div class='my-2'>No data available.</div>"
    );
  }
}
function userStatusHandler() {
  Window.userId = $(this).attr("data-id");
  $("#status" + Window.userId).unbind("click", userStatusHandler);
  $("#status" + Window.userId).attr("disabled", true);
  $("label[for='status" + Window.userId + "']").html("Wait...");
  let user = {
    id: Number(Window.userId),
    active:
      $("#status" + Window.userId).prop("checked") == true
        ? "Active"
        : "Inactive",
  };
  Model.updateUser(user, 1);
  window.removeEventListener("user-updated1", afterUserUpdated);
  window.addEventListener("user-updated1", afterUserUpdated);
}
function afterUserUpdated() {
  let users = Model.realData.users;
  $("#td-status" + Window.userId).removeClass("table-success table-danger");
  for (let i = 0; i < users.length; i++) {
    if (users[i].id == Window.userId) {
      if (users[i].active.toLowerCase() == "active") {
        users[i].active = "Inactive";
        $("label[for='status" + Window.userId + "']").html("Inactive");
        $("#td-status" + Window.userId).addClass("table-danger");
      } else {
        users[i].active = "Active";
        $("label[for='status" + Window.userId + "']").html("Active");
        $("#td-status" + Window.userId).addClass("table-success");
      }
      break;
    }
  }
  $("#status" + Window.userId).attr("disabled", false);
  $("#status" + Window.userId).click(userStatusHandler);
}
function directSignupHandler() {
  if ($(".direct-signup-form")[0].checkValidity()) {
    if (
      $(".direct-signup-form #signup-pwd").val() ==
      $(".direct-signup-form #confirm-pwd").val()
    ) {
      $("#direct-signup-form-msg span").html("");
      $("#direct-signup-form-msg").addClass("disappear");
      $(".direct-signup-submit").html(
        'Creating new user<div class="spinner-border ml-2 my-0 spinner-border-sm text-light"></div>'
      );
      let newUserInfo = {
        displayName: $(".direct-signup-form #name").val(),
        emailId: $(".direct-signup-form #email").val(),
        mobile: $(".direct-signup-form #signup-mobile").val(),
        userType: $(".direct-signup-form input[name=user-type]:checked").val(),
        password: $(".direct-signup-form #signup-pwd").val(),
      };
      Model.createNewUser(newUserInfo);
      window.removeEventListener("user-created", updateUserList);
      window.addEventListener("user-created", updateUserList);
    } else {
      $("#direct-signup-form-msg").removeClass("disappear");
      $("#direct-signup-form-msg .alert").addClass("alert-danger");
      $("#direct-signup-form-msg span").html(
        "Confirm password does not match! Try Again"
      );
      $(".direct-signup-form #confirm-pwd").val("");
      $(".direct-signup-form #confirm-pwd").focus();
    }
  } else {
    $("#direct-signup-form-msg").removeClass("disappear");
    $("#direct-signup-form-msg .alert").addClass("alert-danger");
    $("#direct-signup-form-msg span").html("Please fill the form properly!");
  }
}
function updateUserList() {
  setTimeout(function () {
    closeDirectSignupBox();
    loadUsersList();
  }, 600);
}
function openDirectSignupBox() {
  views.applyTemplates("direct-signup-cont", "direct-signup-template");
  $(".close-direct-signup").unbind("click", closeDirectSignupBox);
  $(".close-direct-signup").click(closeDirectSignupBox);
  $(".direct-signup-submit").unbind("click", directSignupHandler);
  $(".direct-signup-submit").click(directSignupHandler);
  $(".direct-signup-box").addClass("open");
}
function closeDirectSignupBox() {
  $(".direct-signup-box").removeClass("open");
  $("#direct-signup-cont").html("");
}
function copyWelcomeUrl() {
  let id = $(this).attr("data-id");

  var cb = new ClipboardJS(".copy-url");

  cb.on("success", function (e) {
    $("#copy-url" + id).addClass("bg-success");
    $("#copy-url" + id).html("Copied");
    setTimeout(function () {
      $("#copy-url" + id).html("Copy Url");
      $("#copy-url" + id).removeClass("bg-success");
    }, 4000);
  });

  cb.on("error", function (e) {
    alert("Error");
    $("#copy-url" + id).addClass("bg-danger");
    $("#copy-url" + id).html("Error");
    setTimeout(function () {
      $("#copy-url" + id).html("Copy Url");
      $("#copy-url" + id).removeClass("bg-danger");
    }, 2000);
  });
}
let tempUsers = [];
function smartUserSearchHandler() {
  let str = $("#smart-user-search").val().toLowerCase();
  let users = Model.realData.users;

  tempUsers = [];
  if (str == "") {
    $(window).unbind("hashchange", tempUserPageChanged);
    tempLoadUserListCont(users);
    window.location.href = "#page1";
    $("#smart-user-search").focus();
  } else {
    for (let i = 0; i < users.length; i++) {
      if (users[i].id.toString().toLowerCase().startsWith(str)) {
        tempUsers.push(users[i]);
        continue;
      } else if (users[i].displayName.toLowerCase().includes(str)) {
        tempUsers.push(users[i]);
        continue;
      } else if (users[i].mobile.includes(str)) {
        tempUsers.push(users[i]);
        continue;
      } else if (users[i].userType.toLowerCase().includes(str)) {
        tempUsers.push(users[i]);
        continue;
      } else if (users[i].active) {
        if (users[i].active.toLowerCase().startsWith(str)) {
          tempUsers.push(users[i]);
          continue;
        }
      }
    }

    tempLoadUserListCont(tempUsers);
    $("#smart-user-search").focus();
    $(window).unbind("hashchange", userPageChanged);
    $(window).unbind("hashchange", tempUserPageChanged);
    $(window).on("hashchange", tempUserPageChanged);
  }
}
function tempUserPageChanged() {
  let users = tempUsers;
  let pageMax = options.pageMax;
  let dataCount = users.length;
  let pageCount = Math.ceil(dataCount / pageMax);
  let c = getCurrentPage(pageCount);
  updatePagination(c, pageCount);
  let slicedUsers = users.slice((c - 1) * pageMax, c * pageMax);
  fillUsersListCont(slicedUsers);
}
function tempLoadUserListCont(users) {
  let pageMax = options.pageMax;
  let dataCount = users.length;
  let pageCount = Math.ceil(dataCount / pageMax);

  let slicedUsers = [];
  if (dataCount > pageMax) {
    paginate(pageCount);
    let c = getCurrentPage(pageCount);
    slicedUsers = users.slice((c - 1) * pageMax, c * pageMax);
    updatePagination(getCurrentPage(pageCount), pageCount);
    $(window).unbind("hashchange", userPageChanged);
    $(window).on("hashchange", userPageChanged);
  } else {
    slicedUsers = users;
    $("#pagination-cont").html("");
  }

  fillUsersListCont(slicedUsers);
}
function muBindings() {
  $(".create-new-user-btn").unbind("click", openDirectSignupBox);
  $(".create-new-user-btn").click(openDirectSignupBox);

  $("#smart-user-search").unbind("keyup", smartUserSearchHandler);
  $("#smart-user-search").keyup(smartUserSearchHandler);
}

// Manage wishlists
let wishlist = {
  wishlistId: null,
  wishlistName: null,
  adIds: null,
};
let adIds = [];
let UIds = [];
if (url.includes("manage-wishlists")) {
  mwBindings();
  loadWlList();

  window.removeEventListener(
    "wl-all-props-fetched",
    prepareFillWlPropsListCont
  );
  window.addEventListener("wl-all-props-fetched", prepareFillWlPropsListCont);

  window.removeEventListener("all-users-fetched1", prepareFillWlUsersListCont);
  window.addEventListener("all-users-fetched1", prepareFillWlUsersListCont);

  window.removeEventListener("wishlist-created", afterCreatingWishlist);
  window.addEventListener("wishlist-created", afterCreatingWishlist);
}
function loadWlList() {
  showLoading("#wishlist-table-cont .loader-cont");
  $("#smart-user-search").val("");
  Model.getAllWishlists(1);
  window.removeEventListener("all-wishlists-fetched1", prepareFillWlListCont);
  window.addEventListener("all-wishlists-fetched1", prepareFillWlListCont);
}
function prepareFillWlListCont() {
  emptyLoading("#wishlist-table-cont .loader-cont");
  let wls = Model.realData.wishlists;
  let pageMax = options.pageMax;
  let dataCount = wls.length;
  let pageCount = Math.ceil(dataCount / pageMax);

  let slicedWls = [];
  if (dataCount > pageMax) {
    paginate(pageCount);
    let c = getCurrentPage(pageCount);
    slicedWls = wls.slice((c - 1) * pageMax, c * pageMax);
    updatePagination(getCurrentPage(pageCount), pageCount);
    $(window).unbind("hashchange", wlPageChanged);
    $(window).on("hashchange", wlPageChanged);
  } else {
    slicedWls = wls;
    $("#pagination-cont").html("");
  }

  fillWlListCont(slicedWls);
}
function wlPageChanged() {
  let wls = Model.realData.wishlists;
  let pageMax = options.pageMax;
  let dataCount = wls.length;
  let pageCount = Math.ceil(dataCount / pageMax);
  let c = getCurrentPage(pageCount);
  updatePagination(c, pageCount);
  let slicedWls = wls.slice((c - 1) * pageMax, c * pageMax);
  fillWlListCont(slicedWls);
}
function prepareFillWlPropsListCont() {
  fillWlPropsListCont(Model.realData.properties);
}
function prepareFillWlUsersListCont() {
  fillWlUsersListCont(Model.realData.users);
}
function createWishlistHandler() {
  if ($(".wl-name-field").val() != "") {
    wishlist.wishlistName = $(".wl-name-field").val();
    if (adIds.length > 0) {
      $(".create-wl-submit").html("Creating...");
      wishlist.adIds = adIds.toString();
      Model.createWishlist(wishlist);
    } else {
      alert("Please select atleast one property");
    }
  } else {
    alert("Wishlist name can't be empty");
  }
}
function afterCreatingWishlist() {
  $(".create-wl-submit").html("Created");
  setTimeout(function () {
    closeWishlistBox();
    loadWlList();
  }, 600);
}
function toggleSelectProp() {
  let adId = $(this).attr("data-id");
  if ($("#toggle-select-prop" + adId).hasClass("selected-prop")) {
    let i = adIds.indexOf(adId);
    if (i > -1) {
      adIds.splice(i, 1);
    }
    $("#toggle-select-prop" + adId).removeClass("selected-prop bg-danger");
    $("#toggle-select-prop" + adId).addClass("bg-primary");
    $("#toggle-select-prop" + adId).html("Select");
  } else {
    adIds.push(adId);
    $("#toggle-select-prop" + adId).removeClass("bg-primary");
    $("#toggle-select-prop" + adId).addClass("selected-prop bg-danger");
    $("#toggle-select-prop" + adId).html("Remove");
  }
}
function toggleSelectUser() {
  let userId = $(this).attr("data-id");
  if ($("#toggle-select-user" + userId).hasClass("selected-user")) {
    let i = UIds.indexOf(Number(userId));
    if (i > -1) {
      UIds.splice(i, 1);
      UIds.push(Number(userId) * -1);
    }
    $("#toggle-select-user" + userId).removeClass("selected-user bg-danger");
    $("#toggle-select-user" + userId).addClass("bg-primary");
    $("#toggle-select-user" + userId).html("Select");
  } else {
    let i = UIds.indexOf(Number(userId) * -1);
    if (i > -1) {
      UIds.splice(i, 1);
    }
    UIds.push(Number(userId));
    $("#toggle-select-user" + userId).removeClass("bg-primary");
    $("#toggle-select-user" + userId).addClass("selected-user bg-danger");
    $("#toggle-select-user" + userId).html("Remove");
  }
  console.log(UIds);
}
function editWishlistHandler() {
  Window.wlId = $(this).attr("data-id");
  openWishlistBox();
  wishlist.wishlistId = Window.wlId;
  let wl = getWishlistById(Window.wlId);

  $(".create-wl-cont h4").html("Edit Wishlist");
  $(".wl-name-field").val(wl.wishlistName);
  $(".create-wl-submit").html("Update");
  $(".create-wl-submit").addClass("edit-wl-submit");
  $(".create-wl-submit").removeClass("create-wl-submit");

  window.addEventListener("wl-props-filled", findSelectedProps);

  $(".edit-wl-submit").unbind("click", editWishlistSubmitHandler);
  $(".edit-wl-submit").click(editWishlistSubmitHandler);
}
function findSelectedProps() {
  let wl = getWishlistById(Window.wlId);

  let propIds = wl.adIds.split(",");
  let props = Model.realData.properties;

  for (let i = 0; i < props.length; i++) {
    for (let j = 0; j < propIds.length; j++) {
      if (props[i].estateId == propIds[j]) {
        $("#toggle-select-prop" + propIds[j]).removeClass("bg-primary");
        $("#toggle-select-prop" + propIds[j]).addClass(
          "selected-prop bg-danger"
        );
        $("#toggle-select-prop" + propIds[j]).html("Remove");

        adIds.push(propIds[j]);
        break;
      }
    }
  }
  window.removeEventListener("wl-props-filled", findSelectedProps);
}
function editWishlistSubmitHandler() {
  if ($(".wl-name-field").val() != "") {
    wishlist.wishlistName = $(".wl-name-field").val();
    if (adIds.length > 0) {
      $(".edit-wl-submit").html("Updating...");
      wishlist.adIds = adIds.toString();
      Model.updateWishlist(wishlist);
      window.removeEventListener("wishlist-updated", afterUpdatingWishlist);
      window.addEventListener("wishlist-updated", afterUpdatingWishlist);
    } else {
      alert("Please select atleast one property");
    }
  } else {
    alert("Wishlist name can't be empty");
  }
}
function afterUpdatingWishlist() {
  $(".edit-wl-submit").html("Updated");
  $(".assign-wl-submit").html("Assigned");
  setTimeout(function () {
    closeWishlistBox();
    loadWlList();
  }, 600);
}
function assignWishlistHandler() {
  Window.wlId = $(this).attr("data-id");
  let wl = getWishlistById(Window.wlId);
  wishlist.wishlistId = Window.wlId;
  openAssignWishlistBox(wl);

  window.addEventListener("wl-users-filled", findSelectedUsers);

  $(".assign-wl-submit").unbind("click", editWishlistSubmitHandler);
  $(".assign-wl-submit").click(assignWishlistSubmitHandler);
}
function findSelectedUsers() {
  let wl = getWishlistById(Window.wlId);

  let users = Model.realData.users;
  if (wl.assignedUsers) {
    let userIds = wl.assignedUsers.split(",");
    for (let i = 0; i < users.length; i++) {
      for (let j = 0; j < userIds.length; j++) {
        if (users[i].id == userIds[j]) {
          $("#toggle-select-user" + userIds[j]).removeClass("bg-primary");
          $("#toggle-select-user" + userIds[j]).addClass(
            "selected-user bg-danger"
          );
          $("#toggle-select-user" + userIds[j]).html("Remove");

          UIds.push(Number(userIds[j]));
          break;
        }
      }
    }
  }
  window.removeEventListener("wl-users-filled", findSelectedUsers);
}
function assignWishlistSubmitHandler() {
  if (UIds.length > 0) {
    $(".assign-wl-submit").html("Assigning...");
    let wl = {
      wishlistId: Number(Window.wlId),
      userIds: UIds,
    };
    console.log(wl);
    Model.assignUsers(wl);
    window.removeEventListener("users-assigned", afterUpdatingWishlist);
    window.addEventListener("users-assigned", afterUpdatingWishlist);
  } else {
    alert("Please select atleast one user");
  }
}
function getWishlistById(wlId) {
  let wls = Model.realData.wishlists;
  for (let i = 0; i < wls.length; i++) {
    if (wls[i].wishlistId == wlId) {
      return wls[i];
    }
  }
}
function fillWlListCont(wishlists) {
  if (wishlists.length > 0) {
    $("#wishlist-table-cont .loader-cont").html("");
    views.applyTemplates("wishlists-list-cont", "wishlists-list-template", {
      wl: wishlists,
    });
  } else {
    $("#wishlists-list-cont").html("");
    $("#wishlist-table-cont .loader-cont").html(
      "<div class='my-2'>No data available.</div>"
    );
  }
  mwBindings();
}
function fillWlPropsListCont(props) {
  if (props.length > 0) {
    $.ajax({
      url: views.applyTemplates("wl-props-list-cont", "props-list-template", {
        prop: props,
      }),
      success: function () {
        emptyLoading(".wl-props-cont .loader-cont");
        let event = new CustomEvent("wl-props-filled");
        window.dispatchEvent(event);
      },
    });
  } else {
    $(".wl-props-cont .loader-cont").html(
      "<div class='my-2'>No data available.</div>"
    );
  }
  mwBindings();
}
function fillWlUsersListCont(users) {
  if (users.length > 0) {
    console.log(users);
    $.ajax({
      url: views.applyTemplates("wl-users-list-cont", "users-list-template", {
        user: users,
      }),
      success: function () {
        emptyLoading(".wl-users-cont .loader-cont");
        let event = new CustomEvent("wl-users-filled");
        window.dispatchEvent(event);
      },
    });
  } else {
    $(".wl-users-cont .loader-cont").html(
      "<div class='my-2'>No data available.</div>"
    );
  }
  mwBindings();
}
function searchWlPropTable() {
  searchTable("#wl-props-list-cont", "#search-prop-input");
}
function searchWlUserTable() {
  searchTable("#wl-users-list-cont", "#search-user-input");
}
function searchTable(tableid, inputid) {
  let txt;
  let strQuery = $(inputid).val().toLowerCase();
  let tr = $(tableid + " tr");
  for (let i = 0; i < tr.length; i++) {
    txt = tr[i].innerHTML;
    if (txt.toLowerCase().includes(strQuery)) {
      tr[i].style.display = "";
      continue;
    } else {
      tr[i].style.display = "none";
      continue;
    }
  }
}
function openWishlistBox() {
  $.ajax({
    url: views.applyTemplates("create-wl-box", "create-wl-template"),
    success: function () {
      showLoading(".wl-props-cont .loader-cont");
      Model.getWlAllProps();
      $(".create-wl-box").addClass("open");
      mwBindings();
    },
  });
}
function closeWishlistBox() {
  adIds = [];
  UIds = [];
  wishlist.wishlistId = null;
  wishlist.wishlistName = null;
  wishlist.adIds = null;
  $(".create-wl-box").removeClass("open");
  $(".create-wl-box").html("");
}
function openAssignWishlistBox(wl) {
  $.ajax({
    url: views.applyTemplates("create-wl-box", "assign-wl-template", wl),
    success: function () {
      showLoading(".wl-users-cont .loader-cont");
      Model.getAllUsers(1);
      window.removeEventListener(
        "all-users-fetched1",
        prepareFillWlUsersListCont
      );
      window.addEventListener("all-users-fetched1", prepareFillWlUsersListCont);
      $(".create-wl-box").addClass("open");
      mwBindings();
    },
  });
}
function showLoading(target) {
  let html =
    "Loading <div class='ml-3 spinner-border spinner-border-sm'></div>";
  $(target).html(html);
}
function emptyLoading(target) {
  $(target).html("");
}
function selectedPropOnlyCBHandler() {
  if ($(this).prop("checked") == true) {
    $("#search-prop-input").val("selected");
  } else {
    $("#search-prop-input").val("");
  }
  searchWlPropTable();
}
function selectedUserOnlyCBHandler() {
  if ($(this).prop("checked") == true) {
    $("#search-user-input").val("selected");
  } else {
    $("#search-user-input").val("");
  }
  searchWlUserTable();
}
let tempWls = [];
function smartWlSearchHandler() {
  let str = $("#smart-wl-search").val().toLowerCase();
  let wls = Model.realData.wishlists;

  tempWls = [];
  if (str == "") {
    $(window).unbind("hashchange", tempWlPageChanged);
    tempLoadWlListCont(wls);
    window.location.href = "#page1";
    $("#smart-wl-search").focus();
  } else {
    for (let i = 0; i < wls.length; i++) {
      let wl = wls[i];
      if (wl.wishlistId.toString().toLowerCase().startsWith(str)) {
        tempWls.push(wl);
      } else if (wl.wishlistName.toLowerCase().includes(str)) {
        tempWls.push(wl);
      }
    }

    tempLoadWlListCont(tempWls);
    $("#smart-wl-search").focus();
    $(window).unbind("hashchange", wlPageChanged);
    $(window).unbind("hashchange", tempWlPageChanged);
    $(window).on("hashchange", tempWlPageChanged);
  }
}
function tempWlPageChanged() {
  let wls = tempWls;
  let pageMax = options.pageMax;
  let dataCount = wls.length;
  let pageCount = Math.ceil(dataCount / pageMax);
  let c = getCurrentPage(pageCount);
  updatePagination(c, pageCount);
  let slicedWls = wls.slice((c - 1) * pageMax, c * pageMax);
  fillWlListCont(slicedWls);
}
function tempLoadWlListCont(wls) {
  let pageMax = options.pageMax;
  let dataCount = wls.length;
  let pageCount = Math.ceil(dataCount / pageMax);

  let slicedWls = [];
  if (dataCount > pageMax) {
    paginate(pageCount);
    let c = getCurrentPage(pageCount);
    slicedWls = wls.slice((c - 1) * pageMax, c * pageMax);
    updatePagination(getCurrentPage(pageCount), pageCount);
    $(window).unbind("hashchange", wlPageChanged);
    $(window).on("hashchange", wlPageChanged);
  } else {
    slicedWls = wls;
    $("#pagination-cont").html("");
  }

  fillWlListCont(slicedWls);
}
function mwBindings() {
  $(".create-new-wl-btn").unbind("click", openWishlistBox);
  $(".close-wl-box").unbind("click", closeWishlistBox);
  $(".create-new-wl-btn").click(openWishlistBox);
  $(".close-wl-box").click(closeWishlistBox);
  $(".edit-wl").unbind("click", editWishlistHandler);
  $(".edit-wl").click(editWishlistHandler);
  $(".assign-wl").unbind("click", assignWishlistHandler);
  $(".assign-wl").click(assignWishlistHandler);

  $("#smart-wl-search").unbind("keyup", smartWlSearchHandler);
  $("#smart-wl-search").keyup(smartWlSearchHandler);

  $("#search-prop-input").unbind("keyup", searchWlPropTable);
  $("#search-prop-input").keyup(searchWlPropTable);

  $("#search-user-input").unbind("keyup", searchWlUserTable);
  $("#search-user-input").keyup(searchWlUserTable);

  $(".create-wl-submit").unbind("click", createWishlistHandler);
  $(".create-wl-submit").click(createWishlistHandler);

  $(".toggle-select-prop").unbind("click", toggleSelectProp);
  $(".toggle-select-prop").click(toggleSelectProp);

  $(".toggle-select-user").unbind("click", toggleSelectUser);
  $(".toggle-select-user").click(toggleSelectUser);

  $("#selected-props-only").unbind("change", selectedPropOnlyCBHandler);
  $("#selected-props-only").change(selectedPropOnlyCBHandler);

  $("#selected-users-only").unbind("change", selectedUserOnlyCBHandler);
  $("#selected-users-only").change(selectedUserOnlyCBHandler);
}

// My Wishlists
if (url.includes("my-wishlists")) {
  mywBindings();
  loadMyWishlists();
}
function loadMyWishlists() {
  $("#pagination-cont").html("");
  $("#wishlists-list-cont").html("");
  $(".loader-cont").html(
    "<div class='spinner-border spinner-border-sm'></div> Loading Wishlists..."
  );

  let optedWishlist = "";
  let mobile = null;
  if (localStorage.getItem("loggedInUser")) {
    mobile = JSON.parse(localStorage.getItem("loggedInUser")).user.mobile;
  } else {
    mobile = JSON.parse(sessionStorage.getItem("loggedInUser")).user.mobile;
  }

  Model.getUserByMobile({
    mobile: mobile,
  });

  window.addEventListener("user-by-id-fetched", function () {
    let user = Model.realData.user;
    if (user.optedWishlist || user.optedWishlist != "") {
      optedWishlist = user.optedWishlist.substr(1);
    } else {
      $("#wishlists-list-cont").html("");
      $("#wishlist-table-cont .loader-cont").html(
        "<div class='my-2'>You have no wishlists.</div>"
      );
    }
    let oW = [];
    if (optedWishlist != "") {
      oW = optedWishlist.split(",");
    }
    if (oW.length > 0) {
      Model.getAllWishlistsByIds(1, oW);

      window.removeEventListener(
        "all-wishlists-by-ids-fetched1",
        prepareFillWlListCont
      );
      window.addEventListener(
        "all-wishlists-by-ids-fetched1",
        prepareFillWlListCont
      );
    }
  });
}
function mywBindings() {
  $("#smart-wl-search").unbind("keyup", smartWlSearchHandler);
  $("#smart-wl-search").keyup(smartWlSearchHandler);
}

// Manage Commercial Ads
if (url.includes("manage-comm-ads")) {
  mcaBindings();
  // openCommAdBox();
  loadCommAdsList();
}
function loadCommAdsList() {
  showLoading("#comm-ads-table-cont .loader-cont");
  Model.getAllCommAds(1, 0);
  window.removeEventListener("comm-ads-fetched1", prepareFillCommAdsListCont);
  window.addEventListener("comm-ads-fetched1", prepareFillCommAdsListCont);

  window.removeEventListener("comm-ads-fetch-failed1", commAdsFetchFailed);
  window.addEventListener("comm-ads-fetch-failed1", commAdsFetchFailed);
}
function commAdsFetchFailed() {
  $(".loader-cont").html(
    "<div class='my-3'>Failed to load ads. Please refresh the page.</div>"
  );
}
function prepareFillCommAdsListCont() {
  let commAds = Model.realData.commAds;
  let pageMax = options.pageMax;
  let dataCount = commAds.length;
  let pageCount = Math.ceil(dataCount / pageMax);

  let slicedCommAds = [];
  if (dataCount > pageMax) {
    paginate(pageCount);
    let c = getCurrentPage(pageCount);
    slicedCommAds = commAds.slice((c - 1) * pageMax, c * pageMax);
    updatePagination(getCurrentPage(pageCount), pageCount);
    $(window).unbind("hashchange", commAdsPageChanged);
    $(window).on("hashchange", commAdsPageChanged);
  } else {
    slicedCommAds = commAds;
    $("#pagination-cont").html("");
  }
  fillCommAdsListCont(slicedCommAds);
}
function commAdsPageChanged() {
  let commAds = Model.realData.commAds;
  let pageMax = options.pageMax;
  let dataCount = commAds.length;
  let pageCount = Math.ceil(dataCount / pageMax);
  let c = getCurrentPage(pageCount);
  updatePagination(c, pageCount);
  let slicedCommAds = commAds.slice((c - 1) * pageMax, c * pageMax);
  fillCommAdsListCont(slicedCommAds);
}
function fillCommAdsListCont(commAds) {
  if (commAds.length > 0) {
    $.ajax({
      url: views.applyTemplates(
        "comm-ads-list-cont",
        "comm-ads-list-template",
        { commAd: commAds }
      ),
      success: function () {
        emptyLoading("#comm-ads-table-cont .loader-cont");
        $(".status-field").unbind("click", commAdsStatusHandler);
        $(".status-field").click(commAdsStatusHandler);

        $(".edit-comm-ad").unbind("click", editCommAdsHandler);
        $(".edit-comm-ad").click(editCommAdsHandler);
      },
    });
  } else {
    $("#comm-ads-list-cont").html("");
    $("#comm-ads-table-cont .loader-cont").html(
      "<div class='my-2'>No data available.</div>"
    );
  }
}

function editCommAdsHandler() {
  Window.commAdId = $(this).attr("data-id");
  openEditCommAdBox(Window.commAdId);
}
function openEditCommAdBox(id) {
  let commAds = Model.realData.commAds;
  let commAd = null;
  for (let i = 0; i < commAds.length; i++) {
    if (commAds[i].id == id) {
      commAd = commAds[i];
      break;
    }
  }

  // Applying form template and changing bindings
  views.applyTemplates("create-comm-ad-cont", "create-comm-ad-template");
  initAdBannerFilePond();
  $("#title").focus();
  $(".close-create-comm-ad").unbind("click", closeCommAdBox);
  $(".close-create-comm-ad").click(closeCommAdBox);
  $(".create-comm-ad-submit").unbind("click", updateCommAd);
  $(".create-comm-ad-submit").click(updateCommAd);
  $(".create-comm-ad-cont .headline").html("Edit Comm Ad");
  $(".create-comm-ad-submit").html("Update Comm Ad");

  $(".create-comm-ad-box").addClass("open");

  $("#title").val(commAd.title);
  $("#ad-url").val(commAd.bannerUrl);
  $("#entity-name").val(commAd.entityName);
  $("#entity-mobile").val(commAd.entityMobile);
  $("#entity-type").val(commAd.entityType);
  $("#entity-address").html(commAd.entityAddress);
  Window.pond.files = [Model.api.domain + commAd.bannerPath];
}
function updateCommAd() {
  if ($(".comm-ad-form")[0].checkValidity()) {
    $("#comm-ad-form-msg span").html("");
    $("#comm-ad-form-msg").addClass("disappear");
    $(".create-comm-ad-submit").html(
      'Updating... <div class="spinner-border ml-2 my-0 spinner-border-sm text-light"></div>'
    );
    let commAd = {
      id: Number(Window.commAdId),
      title: $(".comm-ad-form #title").val(),
      bannerUrl: $(".comm-ad-form #ad-url").val(),
      entityName: $(".comm-ad-form #entity-name").val(),
      entityMobile: $(".comm-ad-form #entity-mobile").val(),
      entityType: $(".comm-ad-form #entity-type").val(),
      entityAddress: $(".comm-ad-form #entity-address").val(),
      entityType: $(".comm-ad-form #entity-type").val(),
      adBannerData: JSON.parse($(".comm-ad-form input[name=ad-banner]").val()),
    };

    Model.updateCommAd(2, commAd);
    window.removeEventListener("comm-ad-updated2", afterUpdateCommAd);
    window.addEventListener("comm-ad-updated2", afterUpdateCommAd);

    window.removeEventListener("comm-ad-update-failed2", updateCommAdFailed);
    window.addEventListener("comm-ad-update-failed2", updateCommAdFailed);
  } else {
    $("#comm-ad-form-msg").removeClass("disappear");
    $("#comm-ad-form-msg .alert").addClass("alert-danger");
    $("#comm-ad-form-msg span").html("Please fill the form properly!");
  }
}
function afterUpdateCommAd() {
  $(".create-comm-ad-submit").html("Updated");
  $(".create-comm-ad-submit").addClass("bg-success");
  loadCommAdsList();
  setTimeout(function () {
    closeCommAdBox();
  }, 300);
}
function updateCommAdFailed() {
  $(".create-comm-ad-submit").html("Failed");
  $(".create-comm-ad-submit").addClass("bg-danger");
  setTimeout(function () {
    $(".create-comm-ad-submit").html("Update");
    $(".create-comm-ad-submit").removeClass("bg-danger");
  }, 2000);
}

function commAdsStatusHandler() {
  Window.commAdId = $(this).attr("data-id");
  $("#status" + Window.commAdId).unbind("click", commAdsStatusHandler);
  $("#status" + Window.commAdId).attr("disabled", true);
  $("label[for='status" + Window.commAdId + "']").html("Wait...");
  let commAd = {
    id: Number(Window.commAdId),
    status:
      $("#status" + Window.commAdId).prop("checked") == true
        ? "Active"
        : "Inactive",
  };
  Model.updateCommAd(1, commAd);
  window.removeEventListener("comm-ad-updated1", afterCommAdUpdated);
  window.addEventListener("comm-ad-updated1", afterCommAdUpdated);

  window.removeEventListener("comm-ad-update-failed1", commAdUpdateFailed);
  window.addEventListener("comm-ad-update-failed1", commAdUpdateFailed);
}
function afterCommAdUpdated() {
  let commAds = Model.realData.commAds;
  $("#td-status" + Window.commAdId).removeClass("table-success table-danger");
  for (let i = 0; i < commAds.length; i++) {
    if (commAds[i].id == Window.commAdId) {
      if (commAds[i].status.toLowerCase() == "active") {
        commAds[i].status = "Inactive";
        $("label[for='status" + Window.commAdId + "']").html("Inactive");
        $("#td-status" + Window.commAdId).addClass("table-danger");
      } else {
        commAds[i].status = "Active";
        $("label[for='status" + Window.commAdId + "']").html("Active");
        $("#td-status" + Window.commAdId).addClass("table-success");
      }
      break;
    }
  }
  $("#status" + Window.commAdId).attr("disabled", false);
  $("#status" + Window.commAdId).click(commAdsStatusHandler);
  Window.commAdId = undefined;
}
function commAdUpdateFailed() {
  alert("Failed");
  if ($("#status" + Window.commAdId).prop("checked") == true) {
    $("label[for='status" + Window.commAdId + "']").html("Inactive");
    $("#status" + Window.commAdId).prop("checked", false);
  } else {
    $("label[for='status" + Window.commAdId + "']").html("Active");
    $("#status" + Window.commAdId).prop("checked", true);
  }
  $("#status" + Window.commAdId).attr("disabled", false);
  $("#status" + Window.commAdId).click(commAdsStatusHandler);
  Window.commAdId = undefined;
}

function createCommAdHandler() {
  if ($(".comm-ad-form")[0].checkValidity()) {
    $("#comm-ad-form-msg span").html("");
    $("#comm-ad-form-msg").addClass("disappear");
    $(".create-comm-ad-submit").html(
      'Creating... <div class="spinner-border ml-2 my-0 spinner-border-sm text-light"></div>'
    );
    let commAdObj = {
      title: $(".comm-ad-form #title").val(),
      bannerUrl: $(".comm-ad-form #ad-url").val(),
      entityName: $(".comm-ad-form #entity-name").val(),
      entityMobile: $(".comm-ad-form #entity-mobile").val(),
      entityType: $(".comm-ad-form #entity-type").val(),
      entityAddress: $(".comm-ad-form #entity-address").val(),
      entityType: $(".comm-ad-form #entity-type").val(),
      adBannerData: JSON.parse($(".comm-ad-form input[name=ad-banner]").val()),
    };
    console.log(commAdObj);

    Model.createCommAd(commAdObj);
    window.removeEventListener("comm-ad-created", updateCommAdList);
    window.addEventListener("comm-ad-created", updateCommAdList);

    window.removeEventListener("comm-ad-create-failed", commAdCreateFailed);
    window.addEventListener("comm-ad-create-failed", commAdCreateFailed);
  } else {
    $("#comm-ad-form-msg").removeClass("disappear");
    $("#comm-ad-form-msg .alert").addClass("alert-danger");
    $("#comm-ad-form-msg span").html("Please fill the form properly!");
  }
}
function updateCommAdList() {
  $(".create-comm-ad-submit").html("Created");
  $(".create-comm-ad-submit").addClass("bg-success");
  loadCommAdsList();
  setTimeout(function () {
    closeCommAdBox();
  }, 300);
}
function commAdCreateFailed() {
  $(".create-comm-ad-submit").html("Failed");
  $(".create-comm-ad-submit").addClass("bg-danger");
  setTimeout(function () {
    $(".create-comm-ad-submit").html("Create");
    $(".create-comm-ad-submit").removeClass("bg-danger");
  }, 2000);
}
function openCommAdBox() {
  views.applyTemplates("create-comm-ad-cont", "create-comm-ad-template");
  initAdBannerFilePond();
  $("#title").focus();
  $(".close-create-comm-ad").unbind("click", closeCommAdBox);
  $(".close-create-comm-ad").click(closeCommAdBox);
  $(".create-comm-ad-submit").unbind("click", createCommAdHandler);
  $(".create-comm-ad-submit").click(createCommAdHandler);
  $(".create-comm-ad-box").addClass("open");
}
function closeCommAdBox() {
  $(".create-comm-ad-box").removeClass("open");
  $("#create-comm-ad-cont").html("");
}

//Manage Leads Starts

if (url.includes("manage-leads")) {
  leadsBindings();
  // openCommAdBox();
  loadLeadsList();
}
function loadLeadsList() {
  showLoading("#leads-table-cont .loader-cont");
  Model.getAllLeads(1, 0);
  window.removeEventListener("leads-fetched1", prepareFillLeadsListCont);
  window.addEventListener("leads-fetched1", prepareFillLeadsListCont);

  window.removeEventListener("leads-fetch-failed1", leadsFetchFailed);
  window.addEventListener("leads-fetch-failed1", leadsFetchFailed);
}
function leadsFetchFailed() {
  $(".loader-cont").html(
    "<div class='my-3'>Failed to load leads. Please refresh the page.</div>"
  );
}
function prepareFillLeadsListCont() {
  let leads = Model.realData.leads;
  let pageMax = options.pageMax;
  let dataCount = leads.length;
  let pageCount = Math.ceil(dataCount / pageMax);

  let slicedLeads = [];
  if (dataCount > pageMax) {
    paginate(pageCount);
    let c = getCurrentPage(pageCount);
    slicedLeads = leads.slice((c - 1) * pageMax, c * pageMax);
    updatePagination(getCurrentPage(pageCount), pageCount);
    $(window).unbind("hashchange", leadsPageChanged);
    $(window).on("hashchange", leadsPageChanged);
  } else {
    slicedLeads = leads;
    $("#pagination-cont").html("");
  }
  fillLeadsListCont(slicedLeads);
}
function leadsPageChanged() {
  let leads = Model.realData.leads;
  let pageMax = options.pageMax;
  let dataCount = leads.length;
  let pageCount = Math.ceil(dataCount / pageMax);
  let c = getCurrentPage(pageCount);
  updatePagination(c, pageCount);
  let slicedLeads = leads.slice((c - 1) * pageMax, c * pageMax);
  fillLeadsListCont(slicedLeads);
}
function fillLeadsListCont(leads) {
  if (leads.length > 0) {
    $.ajax({
      url: views.applyTemplates("leads-list-cont", "leads-list-template", {
        leads: leads,
      }),
      success: function () {
        emptyLoading("#leads-table-cont .loader-cont");
        $(".status-field").unbind("click", leadsStatusHandler);
        $(".status-field").click(leadsStatusHandler);

        $(".edit-leads").unbind("click", editLeadsHandler);
        $(".edit-leads").click(editLeadsHandler);
      },
    });
  } else {
    $("#leads-list-cont").html("");
    $("#leads-table-cont .loader-cont").html(
      "<div class='my-2'>No Lead data available.</div>"
    );
  }
}

function editLeadsHandler() {
  Window.leadsId = $(this).attr("data-id");
  openEditLeadsBox(Window.leadsId);
}
function openEditLeadsBox(id) {
  let leads = Model.realData.leads;
  let lead = null;
  for (let i = 0; i < leads.length; i++) {
    if (leads[i].id == id) {
      lead = leads[i];
      break;
    }
  }

  // Applying form template and changing bindings
  views.applyTemplates("create-leads-cont", "create-leads-template");
  //initAdBannerFilePond();
  $("#title").focus();
  $(".close-create-leads").unbind("click", closeLeadsBox);
  $(".close-create-leads").click(closeLeadsBox);
  $(".create-leads-submit").unbind("click", updateLeads);
  $(".create-leads-submit").click(updateLeads);
  $(".create-leads-cont .headline").html("Edit Lead");
  $(".create-leads-submit").html("Update Lead");

  $(".create-leads-box").addClass("open");

  $("#title").val(lead.title);
  $("#entity-name").val(lead.clientName);
  $("#entity-mobile").val(lead.clientMobile);
  $("#entity-type").val(lead.leadType);
  $("#entity-active").val(lead.active);
  $("#entity-details").html(lead.description);
}
function updateLeads() {
  if ($(".leads-form")[0].checkValidity()) {
    $("#leads-form-msg span").html("");
    $("#leads-form-msg").addClass("disappear");
    $(".create-leads-submit").html(
      'Updating... <div class="spinner-border ml-2 my-0 spinner-border-sm text-light"></div>'
    );
    let lead = {
      id: Number(Window.leadsId),
      title: $(".leads-form #title").val(),
      clientName: $(".leads-form #entity-name").val(),
      clientMobile: $(".leads-form #entity-mobile").val(),
      leadType: $(".leads-form #entity-type").val(),
      active: $(".leads-form #entity-active").val(),
      description: $(".leads-form #entity-details").val(),
      // adBannerData: JSON.parse($(".leads-form input[name=ad-banner]").val()),
    };

    Model.updateLeads(2, lead);
    window.removeEventListener("leads-updated2", afterUpdateLeads);
    window.addEventListener("leads-updated2", afterUpdateLeads);

    window.removeEventListener("leads-update-failed2", updateLeadsFailed);
    window.addEventListener("leads-update-failed2", updateLeadsFailed);
  } else {
    $("#leads-form-msg").removeClass("disappear");
    $("#leads-form-msg .alert").addClass("alert-danger");
    $("#leads-form-msg span").html("Please fill the form properly!");
  }
}
function afterUpdateLeads() {
  $(".create-leads-submit").html("Updated");
  $(".create-leads-submit").addClass("bg-success");
  loadLeadsList();
  setTimeout(function () {
    closeLeadsBox();
  }, 300);
}
function updateLeadsFailed() {
  $(".create-leads-submit").html("Failed");
  $(".create-leads-submit").addClass("bg-danger");
  setTimeout(function () {
    $(".create-leads-submit").html("Update");
    $(".create-leads-submit").removeClass("bg-danger");
  }, 2000);
}

function leadsStatusHandler() {
  Window.leadId = $(this).attr("data-id");
  $("#status" + Window.leadId).unbind("click", leadsStatusHandler);
  $("#status" + Window.leadId).attr("disabled", true);
  $("label[for='status" + Window.leadId + "']").html("Wait...");
  let lead = {
    id: Number(Window.leadId),
    status:
      $("#status" + Window.leadId).prop("checked") == true
        ? "Active"
        : "Inactive",
  };
  Model.updateLeads(1, lead);
  window.removeEventListener("leads-updated1", afterLeadsUpdated);
  window.addEventListener("leads-updated1", afterLeadsUpdated);

  window.removeEventListener("leads-update-failed1", leadsUpdateFailed);
  window.addEventListener("leads-update-failed1", leadsUpdateFailed);
}
function afterLeadsUpdated() {
  let leads = Model.realData.leads;
  $("#td-status" + Window.leadsId).removeClass("table-success table-danger");
  for (let i = 0; i < leads.length; i++) {
    if (leads[i].id == Window.leadsId) {
      if (leads[i].status.toLowerCase() == "active") {
        leads[i].status = "Inactive";
        $("label[for='status" + Window.leadsId + "']").html("Inactive");
        $("#td-status" + Window.leadsId).addClass("table-danger");
      } else {
        leads[i].status = "Active";
        $("label[for='status" + Window.leadsId + "']").html("Active");
        $("#td-status" + Window.leadsId).addClass("table-success");
      }
      break;
    }
  }
  $("#status" + Window.leadsId).attr("disabled", false);
  $("#status" + Window.leadsId).click(leadsStatusHandler);
  Window.leadId = undefined;
}
function leadsUpdateFailed() {
  alert("Failed");
  if ($("#status" + Window.leadsId).prop("checked") == true) {
    $("label[for='status" + Window.leadId + "']").html("Inactive");
    $("#status" + Window.leadId).prop("checked", false);
  } else {
    $("label[for='status" + Window.leadId + "']").html("Active");
    $("#status" + Window.leadId).prop("checked", true);
  }
  $("#status" + Window.leadId).attr("disabled", false);
  $("#status" + Window.leadId).click(leadsStatusHandler);
  Window.leadId = undefined;
}

function createLeadsHandler() {
  if ($(".leads-form")[0].checkValidity()) {
    $("#leads-form-msg span").html("");
    $("#leads-form-msg").addClass("disappear");
    $(".create-leads-submit").html(
      'Creating... <div class="spinner-border ml-2 my-0 spinner-border-sm text-light"></div>'
    );
    let leadObj = {
      title: $(".leads-form #title").val(),
      clientName: $(".leads-form #entity-name").val(),
      clientMobile: $(".leads-form #entity-mobile").val(),
      leadType: $(".leads-form #entity-type").val(),
      active: "Active",
      description: $(".leads-form #entity-details").val(),
    };

    Model.createLeads(leadObj);
    window.removeEventListener("leads-created", updateLeadsList);
    window.addEventListener("leads-created", updateLeadsList);

    window.removeEventListener("leads-create-failed", leadsCreateFailed);
    window.addEventListener("leads-create-failed", leadsCreateFailed);
  } else {
    $("#leads-form-msg").removeClass("disappear");
    $("#leads-form-msg .alert").addClass("alert-danger");
    $("#leads-form-msg span").html("Please fill the form properly!");
  }
}
function updateLeadsList() {
  $(".create-leads-submit").html("Created");
  $(".create-leads-submit").addClass("bg-success");
  loadLeadsList();
  setTimeout(function () {
    closeLeadsBox();
  }, 300);
}
function leadsCreateFailed() {
  $(".create-leads-submit").html("Failed");
  $(".create-leads-submit").addClass("bg-danger");
  setTimeout(function () {
    $(".create-leads-submit").html("Create");
    $(".create-leads-submit").removeClass("bg-danger");
  }, 2000);
}
function openLeadsBox() {
  views.applyTemplates("create-leads-cont", "create-leads-template");
  initAdBannerFilePond();
  $("#title").focus();
  $(".close-create-leads").unbind("click", closeLeadsBox);
  $(".close-create-leads").click(closeLeadsBox);
  $(".create-leads-submit").unbind("click", createLeadsHandler);
  $(".create-leads-submit").click(createLeadsHandler);
  $(".create-leads-box").addClass("open");
}
function closeLeadsBox() {
  $(".create-leads-box").removeClass("open");
  $("#create-leads-cont").html("");
}

let tempLeads = [];
function smartLeadsSearchHandler() {
  let str = $("#smart-leads-search").val().toLowerCase();
  let leads = Model.realData.leads;

  tempLeads = [];
  if (str == "") {
    $(window).unbind("hashchange", tempLeadsPageChanged);
    tempLoadLeadsListCont(leads);
    window.location.href = "#page1";
    $("#smart-leads-search").focus();
  } else {
    for (let i = 0; i < leads.length; i++) {
      if (leads[i].id.toString().toLowerCase().startsWith(str)) {
        tempLeads.push(leads[i]);
        continue;
      } else if (leads[i].title.toLowerCase().includes(str)) {
        tempLeads.push(leads[i]);
        continue;
      } else if (leads[i].clientName.toLowerCase().includes(str)) {
        tempLeads.push(leads[i]);
        continue;
      } else if (leads[i].clientMobile.toLowerCase().startsWith(str)) {
        tempLeads.push(leads[i]);
        continue;
      } else if (leads[i].leadType.toLowerCase().includes(str)) {
        tempLeads.push(leads[i]);
        continue;
      } else if (leads[i].status) {
        if (leads[i].active.toLowerCase().startsWith(str)) {
          tempLeads.push(leads[i]);
          continue;
        }
      }
    }

    tempLoadLeadsListCont(tempLeads);
    $("#smart-leads-search").focus();
    $(window).unbind("hashchange", leadsPageChanged);
    $(window).unbind("hashchange", tempLeadsPageChanged);
    $(window).on("hashchange", tempLeadsPageChanged);
  }
}
function tempLeadsPageChanged() {
  let leads = tempLeads;
  let pageMax = options.pageMax;
  let dataCount = leads.length;
  let pageCount = Math.ceil(dataCount / pageMax);
  let c = getCurrentPage(pageCount);
  updatePagination(c, pageCount);
  let slicedLeads = leads.slice((c - 1) * pageMax, c * pageMax);
  fillLeadsListCont(slicedLeads);
}
function tempLoadLeadsListCont(leads) {
  let pageMax = options.pageMax;
  let dataCount = leads.length;
  let pageCount = Math.ceil(dataCount / pageMax);

  let slicedLeads = [];
  if (dataCount > pageMax) {
    paginate(pageCount);
    let c = getCurrentPage(pageCount);
    slicedLeads = leads.slice((c - 1) * pageMax, c * pageMax);
    updatePagination(getCurrentPage(pageCount), pageCount);
    $(window).unbind("hashchange", leadsPageChanged);
    $(window).on("hashchange", leadsPageChanged);
  } else {
    slicedLeads = leads;
    $("#pagination-cont").html("");
  }

  fillLeadsListCont(slicedLeads);
}

//Manage Leads Ends

function initAdBannerFilePond() {
  FilePond.registerPlugin(
    FilePondPluginFileEncode,
    FilePondPluginImagePreview,
    FilePondPluginFileValidateType
  );
  const inputElement = document.querySelector("#ad-banner");

  // Create a FilePond instance
  Window.pond = FilePond.create(inputElement, {
    required: true,
    acceptedFileTypes: ["image/jpg", "image,png", "image/jpeg"],
  });
}

let tempCommAds = [];
function smartCommAdSearchHandler() {
  let str = $("#smart-comm-ad-search").val().toLowerCase();
  let commAds = Model.realData.commAds;

  tempCommAds = [];
  if (str == "") {
    $(window).unbind("hashchange", tempCommAdPageChanged);
    tempLoadCommAdsListCont(commAds);
    window.location.href = "#page1";
    $("#smart-comm-ad-search").focus();
  } else {
    for (let i = 0; i < commAds.length; i++) {
      if (commAds[i].id.toString().toLowerCase().startsWith(str)) {
        tempCommAds.push(commAds[i]);
        continue;
      } else if (commAds[i].title.toLowerCase().includes(str)) {
        tempCommAds.push(commAds[i]);
        continue;
      } else if (commAds[i].entityName.toLowerCase().includes(str)) {
        tempCommAds.push(commAds[i]);
        continue;
      } else if (commAds[i].entityMobile.toLowerCase().startsWith(str)) {
        tempCommAds.push(commAds[i]);
        continue;
      } else if (commAds[i].entityType.toLowerCase().includes(str)) {
        tempCommAds.push(commAds[i]);
        continue;
      } else if (commAds[i].status) {
        if (commAds[i].status.toLowerCase().startsWith(str)) {
          tempCommAds.push(commAds[i]);
          continue;
        }
      }
    }

    tempLoadCommAdsListCont(tempCommAds);
    $("#smart-comm-ad-search").focus();
    $(window).unbind("hashchange", commAdsPageChanged);
    $(window).unbind("hashchange", tempCommAdPageChanged);
    $(window).on("hashchange", tempCommAdPageChanged);
  }
}
function tempCommAdPageChanged() {
  let commAds = tempCommAds;
  let pageMax = options.pageMax;
  let dataCount = commAds.length;
  let pageCount = Math.ceil(dataCount / pageMax);
  let c = getCurrentPage(pageCount);
  updatePagination(c, pageCount);
  let slicedCommAds = commAds.slice((c - 1) * pageMax, c * pageMax);
  fillCommAdsListCont(slicedCommAds);
}
function tempLoadCommAdsListCont(commAds) {
  let pageMax = options.pageMax;
  let dataCount = commAds.length;
  let pageCount = Math.ceil(dataCount / pageMax);

  let slicedCommAds = [];
  if (dataCount > pageMax) {
    paginate(pageCount);
    let c = getCurrentPage(pageCount);
    slicedCommAds = commAds.slice((c - 1) * pageMax, c * pageMax);
    updatePagination(getCurrentPage(pageCount), pageCount);
    $(window).unbind("hashchange", commAdsPageChanged);
    $(window).on("hashchange", commAdsPageChanged);
  } else {
    slicedCommAds = commAds;
    $("#pagination-cont").html("");
  }

  fillCommAdsListCont(slicedCommAds);
}

function leadsBindings() {
  $(".create-leads-btn").unbind("click", openLeadsBox);
  $(".create-leads-btn").click(openLeadsBox);

  $("#smart-leads-search").unbind("keyup", smartLeadsSearchHandler);
  $("#smart-leads-search").keyup(smartLeadsSearchHandler);
}

function mcaBindings() {
  $(".create-comm-ad-btn").unbind("click", openCommAdBox);
  $(".create-comm-ad-btn").click(openCommAdBox);

  $("#smart-comm-ad-search").unbind("keyup", smartCommAdSearchHandler);
  $("#smart-comm-ad-search").keyup(smartCommAdSearchHandler);
}

// Profile Page
if (url.includes("admin") && url.includes("profile")) {
  views.applyTemplates("user-cont", "user-template", userData.user);
}

// Bindings
function bindings() {
  $(".location-field").unbind("keyup", locSuggestionsHandler);
  $(".location-field").keyup(locSuggestionsHandler);

  $(".logout-btn").unbind("click", logoutHandler);
  $(".logout-btn").click(logoutHandler);

  $(".pfa-button").unbind("click", pfaHandler);
  $(".pfa-button").click(pfaHandler);
  $(".apply-signin-temp").unbind("click", applySignInTemp);
  $(".apply-signin-temp").click(applySignInTemp);
  $(".apply-signup-temp").unbind("click", applySignUpTemp);
  $(".apply-signup-temp").click(applySignUpTemp);

  $(".details-submit-btn").unbind("click", detailsFormHandler);
  $(".details-submit-btn").click(detailsFormHandler);
  $(".location-submit-btn").unbind("click", locationFormHandler);
  $(".location-submit-btn").click(locationFormHandler);
  $(".photos-submit-btn").unbind("click", photosFormHandler);
  $(".photos-submit-btn").click(photosFormHandler);

  $(".show-details-form").unbind("click", showDetailsForm);
  $(".show-details-form").click(showDetailsForm);
  $(".show-location-form").unbind("click", showLocationForm);
  $(".show-location-form").click(showLocationForm);
  $(".show-photos-form").unbind("click", showPhotosForm);
  $(".show-photos-form").click(showPhotosForm);

  $("#property-photos").unbind("change", propertyPhotosPreview);
  $("#property-photos").change(propertyPhotosPreview);
  $(".yt-preview-btn").unbind("click", youtubeUrlPreview);
  $(".yt-preview-btn").click(youtubeUrlPreview);
  $(".currency").click(flushCurrencyInfo); //Roop
}
bindings();

document.addEventListener("DOMContentLoaded", () => {
  const popup = document.getElementById("share-popup");
  const shareUrlInput = document.getElementById("share-url");
  const closeBtn = document.querySelector("#share-popup .close");
  const copyUrlBtn = document.getElementById("copy-url-btn");
  const facebookShare = document.getElementById("facebook-share");
  const twitterShare = document.getElementById("twitter-share");
  const whatsappShare = document.getElementById("whatsapp-share");
  const emailShare = document.getElementById("email-share");

  // Event delegation for dynamically generated share buttons
  document.body.addEventListener("click", function (event) {
    const shareBtn = event.target.closest(".share-btn");
    // console.log(shareBtn);

    if (shareBtn) {
      event.preventDefault();
      const url = shareBtn.dataset.url;
      shareUrlInput.value = url;
      popup.style.display = "block";
    }

    if (event.target === closeBtn) {
      popup.style.display = "none";
    }

    if (event.target === copyUrlBtn) {
      shareUrlInput.select();
      document.execCommand("copy");
      alert("URL copied to clipboard!");
    }
  });

  // Social media sharing
  if (facebookShare) {
    facebookShare.addEventListener("click", (e) => {
      e.preventDefault();
      const url = shareUrlInput.value;
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          url
        )}`,
        "_blank"
      );
    });
  }
  if (twitterShare) {
    twitterShare.addEventListener("click", (e) => {
      e.preventDefault();
      const url = shareUrlInput.value;
      window.open(
        `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`,
        "_blank"
      );
    });
  }

  if (whatsappShare) {
    whatsappShare.addEventListener("click", (e) => {
      e.preventDefault();

      const url = shareUrlInput.value;
      window.open(
        `https://api.whatsapp.com/send?text=${encodeURIComponent(url)}`
      );
    });
  }
  // Corrected event listener for email sharing
  if (emailShare) {
    emailShare.addEventListener("click", (e) => {
      e.preventDefault();
      const url = shareUrlInput.value;
      const subject = encodeURIComponent("Check out this property!");
      const body = encodeURIComponent(
        `I found this property and thought you might be interested: ${url}`
      );
      window.open(`mailto:?subject=${subject}&body=${body}`, "_blank");
    });
  }

  // Close popup if clicking outside of it
  window.addEventListener("click", (event) => {
    if (event.target === popup) {
      popup.style.display = "none";
    }
  });
});

export {
  closeSignIn,
  closeOTPSignIn,
  closeSignUp,
  openSignIn,
  openOTPSignIn,
  openSignUp,
};
