import * as views from "./view.js";
import * as Main from "./main.js";

const Model = {
    api : {
        domain : "https://zilahouse.com",
    	//domain : "http://localhost:8084",
        verifyToken: "/zilahouse/validateToken",
        countStats: "/zilahouse/admin/countStats",
        assignUsers : "/zilahouse/assignUsers",
        doLogin :  "/zilahouse/login",
        getAllUsers : "/zilahouse/admin/getAllUsers",
        registerWelcomeUser: "/zilahouse/registerWelcomeUser",
        welcome : "/zilahouse/welcome",
        doRegister : "/zilahouse/register",
        getLocationSuggestions : "/zilahouse/searchsuggestions", 
        editAccount : "/zilahouse/editAccount",
        editEstate : "/zilahouse/editEstate",
        postAd : "/zilahouse/postAd",
        editPropertyPhoto : "/zilahouse/editPropertyPhoto",
        publishCommercialAd : "/zilahouse/publishCommercialAd",
        editCommercialAd : "/zilahouse/editCommercialAd",
        getAdById : "/zilahouse/post",
        getEstateSearchResult : "/zilahouse/searchEstate",
        getRentPGLeaseEstates : "/zilahouse/getRentPGLeaseEstates",
        getEstateSearchAllResult : "/zilahouse/searchEstateAll",
        pullMasterInfo : "/zilahouse/admin/pullMasterInfo",
        sendOTP : "/zilahouse/sendOTP",
        verifyMobileViaOTP : "/zilahouse/verifyMobileViaOTP",
        getAllWishlists : "/zilahouse/admin/getAllWishlists",
        getAllEstates : "/zilahouse/admin/getAllEstates",
        createWishlist : "/zilahouse/createWishlist",
        editWishlist : "/zilahouse/editWishlist",
        getAllWishlistsByIds : "/zilahouse/getAllWishlistsByIds",
        getAllPostByIds : "/zilahouse/getAllPostByIds",
        getPostByQuery  : "/zilahouse/getPostByQuery",
        getUser : "/zilahouse/getUser",
        getUserById : "/zilahouse/user",
        pullCommercialAds : "/zilahouse/admin/pullCommercialAds",
        getPost : "/zilahouse/getPost",
        sendUserInterestOnProperty : "/zilahouse/sendUserInterestOnProperty",
        pullInterestsOnProperty: "/zilahouse/pullInterestsOnProperty",
        lead: "/zilahouse/admin/lead",
        uploadAjaxPost : "/zilahouse/uploadAjaxPost",
    },

    samples: {
        //Sample method type 

        // getPropertySearchAutoCompleteList(searchTokenJsonPath:string):any{
        //     return this.httpClient.get(searchTokenJsonPath);
        //   }

        //   getUploadAjaxPostEndpoint():string{
        //     return this._uploadAjaxPost;
        //   }

        //   doLogin(user:User):Observable<any>{
        //     return this.httpClient.post(this._doLogin,user);
        //   }

        //   getPost(estate:Estate):Observable<any>{
        //     return this.httpClient.post(this._getPost,estate);
        //   }

        //   sendOTP(user:User):Observable<any>{
        //     return this.httpClient.post(this._sendOTP,user);
        //   }

        //   sendUserInterestOnProperty(user:User):Observable<any>{
        //     return this.httpClient.post(this._sendUserInterestOnProperty,user);
        // let SMSText="Hi, "+user.displayName+" "+user.mobile+" viewed your contact on ZilaHouse.com. "+adHeaderInfo;
        // user = {
        //     interestSMSText: SMSText,
        // }
        //   }

        //   doRegister(user:User):Observable<any>{
        //     return this.httpClient.post(this._doRegister,user);
        // userObj.emailId=this.userEmail;
        // userObj.password=this.userPass;
        // userObj.displayName=this.userDisplayName;
        // userObj.mobile=this.userMobile;
        // userObj.userType=this.userType;
        //   }

        //   editAccount(user:User):Observable<any>{
        //     return this.httpClient.post(this._editAccount,user);
        //   }

        //   editEstate(estate:Estate):Observable<any>{
        //     return this.httpClient.post(this._editEstate,estate);
        //   }

        //   doPostAd(estate:Estate):Observable<any>{
        //     return this.httpClient.post(this._postAd,estate);
        //   }

        //   editPropertyPhoto(estate:Estate):Observable<any>{
        //     return this.httpClient.post(this._editPropertyPhoto,estate);
        //   } 

        //   pulishCommercialAd(commercialAd:CommercialAd):Observable<any>{
        //     return this.httpClient.post(this._pulishCommercialAd,commercialAd);
        //   }

        //   createWishlist(wishlist:Wishlist):Observable<any>{
        //     return this.httpClient.post(this._createWishlist,wishlist);
        //   }

        //   editWishlist(wishlist:Wishlist):Observable<any>{
        //     return this.httpClient.post(this._editWishlist,wishlist);
        //   }


        //   getUser(user:User):Observable<any>{
        //     return this.httpClient.post(this._getUser,user);
        //   }

        //   pullCommercialAds():Observable<any>{
        //     return this.httpClient.get(this._pullCommercialAds);
        //   }

        //   getAllUsers():Observable<any>{
        //     return this.httpClient.get(this._getAllUsers);
        //   }

        //   getAllWishlistsByIds(wishlistIds:string[]):Observable<any>{
        //     return this.httpClient.post(this._getAllWishlistsByIds,wishlistIds);
        // array numeric
        //   }

        //   getAllPostByIds(adIds:string[]):Observable<any>{
        //     return this.httpClient.post(this._getAllPostByIds,adIds);
        //   }

        //   getPostByQuery(query:string):Observable<any>{
        //     return this.httpClient.post(this._getPostByQuery,query);
        //   }
        
        //   getAllWishlists():Observable<any>{
        //     return this.httpClient.get(this._getAllWishlists);
        //   }

        //   getAllEstates(topAllOrLimit:number):Observable<any>{
        //     return this.httpClient.post(this._getAllEstates,topAllOrLimit);
        //   }

        //   getAdById(estateId:string):Observable<any>{
        //     return this.httpClient.get(this._getAdById+"/"+estateId);
        //   }

        //   getEstateSearchResult(estateSearchText:string,isRentPgLease:boolean):Observable<any>{
        //     if(isRentPgLease){
        //       return this.httpClient.post(this._getRentPGLeaseEstates,estateSearchText);
        //     }else{
        //       return this.httpClient.post(this._getEstateSearchResult,estateSearchText);
        //     }
            
        //   }

        //   getEstateSearchAllResult(estateSearchText:string):Observable<any>{
        //     return this.httpClient.post(this._getEstateSearchAllResult,estateSearchText);
        //   }
        
        //   pullMasterInfo():Observable<any>{
        //     return this.httpClient.get(this._pullMasterInfo);
        //   }
        
        //   welcome():Observable<any>{
        //     return this.httpClient.get(this._welcome);
        //   }

        // export class Estate {
        //     estateId:number;
        //     estateTitle:string;
        //     requesterMobile: "7070405500",
        //     estateCode:string;
        //     estateTitle:string;
        //     estateDescription:string;
        //     city:string;
        //     country:string;
        //     estateType:string;
        //     estateStatus:string;
        //     estatePictures:EstatePicture[];
            
        //     numOfBalconies:string;
        //     numOfBedrooms:string;
        //     numOfBathrooms:string;
        //     numOfReserveParking:string;
        //     numOfOpenParking:string;
        //     numOfFloors:string;
        //     petAllowed:string;
            
        //     transactionType:string;
        //     constructionStatus:string;
        //     furnish:string;
        //     estateArea:string;
        //     cost:number;
        //     isbrokerage:string;
            
        //     brokerageamount:number;
        //     adPhotos:any[];
        //     requesterMobile:string;
        //     requesterName:string;
        //     requesterUserType:string;
        //     locality:string;
        //     areaProjectSocietyName:string;
        //     postedDate:string;
        //     status:string;
        //     reviewStatus:string;
        // }        
        // Ends



    },

    realData : {
        user: [],
        users: [],
        commAds: [],
        commAd: [],
        properties : [],
        searchResponseProps: [],
        wishlists: [],
        locations: [],
        countStats: null,
        signUpOtp: null,
        singleEstate: null,
        masterLocations: null,
        interests: null,
        leads: null,
    },

    loggedInUser: {
        'user': null,
    },


    getToken: function() {
        let token = null;
        if(sessionStorage.getItem("loggedInUser") !== null) {
            token = JSON.parse(sessionStorage.getItem("loggedInUser")).user.token;
        }
        if(localStorage.getItem("loggedInUser") !== null) {
            token = JSON.parse(localStorage.getItem("loggedInUser")).user.token;
        }
        return token;
    },
    verifyToken: function() {
        fetch(this.api.domain + this.api.verifyToken, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": this.getToken()
            },
        })
        .then((response) => response.json())
        //Then with the data from the response in JSON...
        .then((response) => {
            if(!(response.statusCode == 200)) {
                sessionStorage.removeItem("loggedInUser");
                localStorage.removeItem("loggedInUser");
                window.location.href = "/";
            }
        })
        //Then with the error genereted...
        .catch((error) => {
            console.error(error);
        });
    },

    // AUTH AND REG FUNCTIONS
    // Login
    loggingIn: function(userInfo, afterSignIn) {
        fetch(this.api.domain + this.api.doLogin, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userInfo),
        })
        .then((response) => response.json())
        //Then with the data from the response in JSON...
        .then((response) => {
            if(response.statusCode === 200) {
                this.loggedInUser.user = response.data;
                if(userInfo.remember) {
                    localStorage.setItem("loggedInUser", JSON.stringify(this.loggedInUser));
                } else {
                    sessionStorage.setItem("loggedInUser", JSON.stringify(this.loggedInUser));
                }
                $(".signin-submit").html('Sign In');
                if(afterSignIn) {
                    if(afterSignIn.action == "openLink") {
                        window.location.href = afterSignIn.destination;
                    } else if (afterSignIn.action == "call") {
                        window.location.reload();
                    }
                }
            } else {
                console.log("Status ",response.statusCode);
                console.log("Data", response.data);
                console.log("Msg", response.message);
            }
        })
        //Then with the error genereted...
        .catch((error) => {
            $(".signin-submit").html('Sign In');
            $("#signin-form-msg").removeClass("disappear");
            $("#signin-form-msg .alert").addClass("alert-danger");
            $("#signin-form-msg span").html("Username or password is incorrect!");
        });
    },
    // Welcome User Login
    welcomeLogin: function(userInfo) {
        fetch(this.api.domain + this.api.doLogin, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userInfo),
        })
        .then((response) => response.json())
        //Then with the data from the response in JSON...
        .then((response) => {
            if(response.statusCode === 200) {
                console.log(response.data);
                this.loggedInUser.user = response.data;
                $(".welcome-status").html("Redirecting...");
                localStorage.removeItem("loggedInUser");
                sessionStorage.removeItem("loggedInUser");
                sessionStorage.setItem("loggedInUser", JSON.stringify(this.loggedInUser));
                window.location.href = "admin/dashboard.html";
            } else {
                $(".welcome-status").html("Oops! looks like something is wrong. <u><a href='/' class='text-primary'>Go to Homepage</a></u>");
            }
        })
        //Then with the error genereted...
        .catch((error) => {
            console.log(error);
            $(".welcome-status").html("Oops! Looks like something is wrong. <u><a href='/' class='text-primary'>Go to Homepage</a></u>");
        });
    },
    // Login via otp
    loggingInViaOtp: function(guestUserInfo, afterSignIn) {
        fetch(this.api.domain + this.api.doLogin, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(guestUserInfo),
        })
        .then((response) => response.json())
        //Then with the data from the response in JSON...
        .then((data) => {
            if(response.statusCode === 200) {
                // console.log(JSON.stringify(data));
                this.loggedInUser.user = data;
                if(typeof(Storage) !== "undefined") {
                    sessionStorage.setItem("loggedInUser", JSON.stringify(this.loggedInUser));
                } else {
                    alert("Please open this site on a modern browser.");
                }
                $(".otp-signin-submit").html('Sign In');
                if(afterSignIn) {
                    if(afterSignIn.action == "openLink") {
                        window.location.href = afterSignIn.destination;
                    } else if (afterSignIn.action == "call") {
                        this.callThis(this.realData.singleEstate.requesterMobile);
                        Main.closeSignIn();
                        Main.closeOTPSignIn();
                        Main.closeSignUp();
                    } else if (afterSignIn.action == "save") {
                        this.invertSave(this.loggedInUser.user.id, this.realData.singleEstate.estateId);
                        Main.closeSignIn();
                        Main.closeOTPSignIn();
                        Main.closeSignUp();
                    }
                }
            } else {
                console.log("Status ",response.statusCode);
                console.log("Data", response.data);
                console.log("Msg", response.message);
            }
        })
        //Then with the error genereted...
        .catch((error) => {
            $(".otp-signin-submit").html('Sign In');
            $("#otp-signin-form-msg").removeClass("disappear");
            $("#otp-signin-form-msg .alert").removeClass("alert-warning alert-success");
            $("#otp-signin-form-msg .alert").addClass("alert-danger");
            $("#otp-signin-form-msg span").html("Incorrect OTP! Please try again");
        });
    },
    // SendOtp
    sendOtp: function(guestUserInfo) {
        fetch(this.api.domain + this.api.sendOTP, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(guestUserInfo),
        }).then((response) => response.json())
        //Then with the data from the response in JSON...
        .then((data) => {
            $(".otp-signin-submit").html('Sign In');
            $("#otp-signin-form-msg .alert").removeClass("alert-danger alert-warning");
            $("#otp-signin-form-msg .alert").addClass("alert-success");
            $("#otp-signin-form-msg span").html("OTP sent successfully to " + guestUserInfo.mobile);
            $("#otp-signin-form-msg").removeClass("disappear");

            $(".resend-otp-btn").addClass("deactivated");
            $("#otp-mobile").attr("disabled", true);
            $("#display-name").attr("disabled", true);
            $("#otp").attr("disabled", false);
            $("#otp").focus();
            $(".otp-options-cont").removeClass("disappear");
            $(".otp-timer").removeClass("disappear");

            let timer = 59;
            let otpTimerInterval = setInterval(function() {
                if(timer < 1) {
                    clearInterval(otpTimerInterval);
                    $("#otp-signin-form-msg span").html("Sometimes OTP doesn't reach you because of network problems. Check your phone's connectivity and try resending.");
                    $("#otp-signin-form-msg .alert").removeClass("alert-success alert-danger");
                    $("#otp-signin-form-msg .alert").addClass("alert-warning");
                    $("#otp-signin-form-msg").removeClass("disappear");
                    $(".resend-otp-btn").removeClass("deactivated");
                    $(".otp-timer").html("");
                    $(".otp-timer").addClass("disappear");
                    $(".resend-otp-btn").click(Model.resendOtpHandler);
                } else if(timer < 10) {
                    $(".otp-timer").html("00:0" + timer--);
                } else {
                    $(".otp-timer").html("00:" + timer--);
                }
            }, 1000);
        })
        //Then with the error genereted...
        .catch((error) => {

        });

        // Dont delete
        // setTimeout(function() {
        //     $(".otp-signin-submit").html('Sign In');
        //     $("#otp-signin-form-msg .alert").removeClass("alert-danger alert-warning");
        //     $("#otp-signin-form-msg .alert").addClass("alert-success");
        //     $("#otp-signin-form-msg span").html("OTP sent successfully to " + guestUserInfo.mobile);
        //     $("#otp-signin-form-msg").removeClass("disappear");

        //     $(".resend-otp-btn").addClass("deactivated");
        //     $("#otp-mobile").attr("disabled", true);
        //     $("#display-name").attr("disabled", true);
        //     $("#otp").attr("disabled", false);
        //     $("#otp").focus();
        //     $(".otp-options-cont").removeClass("disappear");
        //     $(".otp-timer").removeClass("disappear");

        //     let timer = 59;
        //     let otpTimerInterval = setInterval(function() {
        //         if(timer < 1) {
        //             clearInterval(otpTimerInterval);
        //             $("#otp-signin-form-msg span").html("Sometimes OTP doesn't reach you because of network problems. Check your phone's connectivity and try resending.");
        //             $("#otp-signin-form-msg .alert").removeClass("alert-success");
        //             $("#otp-signin-form-msg .alert").addClass("alert-warning");
        //             $("#otp-signin-form-msg").removeClass("disappear");
        //             $(".resend-otp-btn").removeClass("deactivated");
        //             $(".otp-timer").html("");
        //             $(".otp-timer").addClass("disappear");
        //             $(".resend-otp-btn").click(Model.resendOtpHandler);
        //         } else if(timer < 10) {
        //             $(".otp-timer").html("00:0" + timer--);
        //         } else {
        //             $(".otp-timer").html("00:" + timer--);
        //         }
        //     }, 1000);
        // }, 1800);
    },
    // Resend OTP Handler
    resendOtpHandler: function() {
        $('.resend-otp-btn').unbind('click', this.resendOtpHandler);
        $("#otp-signin-form-msg span").html("");
        $("#otp-signin-form-msg").addClass("disappear");
        $(".otp-signin-submit").html('Resending OTP<div class="spinner-border ml-2 spinner-border-sm text-light"></div>');
        let guestUserInfo = {
            mobile: $("#otp-mobile").val(),
            displayName: ($("#display-name").val() != "") ? $("#display-name").val() : "Guest",
        };
        Model.sendOtp(guestUserInfo);
    },
    // Sign Up
    signingUp: function(newUserInfo, afterSignUp) {
        fetch(this.api.domain + this.api.doRegister, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newUserInfo),
        }).then((response) => response.json())
        //Then with the data from the response in JSON...
        .then((data) => {
            //console.log(data);
            $("#signup-form-msg").removeClass("disappear");
            $("#signup-form-msg .alert").removeClass("alert-warning alert-danger");
            $("#signup-form-msg .alert").addClass("alert-success");
            $("#signup-form-msg span").html(data.regAcknowledgement);
            this.loggedInUser.user = data.registeredUser;
            if(typeof(Storage) !== "undefined") {
                localStorage.setItem("loggedInUser", JSON.stringify(this.loggedInUser));
            } else {
                alert("Please open this site on a modern browser.");
            }
            $(".signup-submit").html('Logging In<div class="spinner-border ml-2 spinner-border-sm text-light"></div>');
            setTimeout(function() {
                if(afterSignUp) {
                    if(afterSignUp.action == "openLink") {
                        window.location.href = afterSignUp.destination;
                    } else if (afterSignIn.action == "call") {
                        this.callThis(this.realData.singleEstate.requesterMobile);
                        Main.closeSignIn();
                        Main.closeOTPSignIn();
                        Main.closeSignUp();
                    } else if (afterSignIn.action == "save") {
                        this.invertSave(this.loggedInUser.user.id, this.realData.singleEstate.estateId);
                        Main.closeSignIn();
                        Main.closeOTPSignIn();
                        Main.closeSignUp();
                    }
                }
            }, 2000)
        })
        //Then with the error genereted...
        .catch((error) => {
            $("#signup-form-msg").removeClass("disappear");
            $("#signup-form-msg .alert").removeClass("alert-warning alert-success");
            $("#signup-form-msg .alert").addClass("alert-danger");
            $("#signup-form-msg span").html("Something went wrong! Try Again");
            $(".signup-submit").html("Sign Up");
        });
    },
    // Send Signup OTP 
    sendSignUpOtp: function(newUserInfo) {
        fetch(this.api.domain + this.api.verifyMobileViaOTP, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newUserInfo),
        }).then((response) => response.json())
        // Then with the data from the response in JSON...
        .then((data) => {
            //console.log(data);
            Model.realData.signUpOtp = data.smsPwd;
            $(".signup-submit").html('Sign Up');
            
            if(data.success){
            	$("#signup-form-msg .alert").removeClass("alert-danger alert-warning");
            	$("#signup-form-msg .alert").addClass("alert-success");
            	//Delete below line once SMS gateway is functional
            	
            	$("#signup-form-msg span").html("OTP sent successfully to " + newUserInfo.mobile);
            	$("#signup-otp").attr("disabled", false);
                $("#signup-otp").focus();
            }else{
            	$("#signup-form-msg .alert").removeClass("alert-success alert-danger");
                $("#signup-form-msg .alert").addClass("alert-warning");
            	$("#signup-form-msg span").html(data.error);
            	$(".signup-submit").attr("disabled",true);
            	$("#signup-otp").attr("disabled", true);
            	$("#signup-otp").addClass("deactivated");
            	$(".signup-resend-otp-btn").addClass("deactivated");
            }
            
            $("#signup-form-msg").removeClass("disappear");

            $(".signup-resend-otp-btn").addClass("deactivated");
            $(".signup-otp-cont").removeClass("disappear");
           
            $(".signup-otp-timer").removeClass("disappear");
            $(".signup-fields-cont").addClass("disappear");

            let timer = 59;
            let otpTimerInterval = setInterval(function() {
                if(timer < 1) {
                    clearInterval(otpTimerInterval);
                    $("#signup-form-msg span").html("Sometimes OTP doesn't reach you because of network problems. Check your phone's connectivity and try resending.");
                    $("#signup-form-msg .alert").removeClass("alert-success alert-danger");
                    $("#signup-form-msg .alert").addClass("alert-warning");
                    $("#signup-form-msg").removeClass("disappear");
                    $(".signup-resend-otp-btn").removeClass("deactivated");
                    $(".signup-otp-timer").html("");
                    $(".signup-otp-timer").addClass("disappear");
                    $(".signup-resend-otp-btn").click(Model.resendSignUpOtpHandler);
                } else if(timer < 10) {
                    $(".signup-otp-timer").html("00:0" + timer--);
                }else if(timer < 45) {
					if(data.success){
                		$("#signup-form-msg span").html("Please use this code <b>"+data.smsPwd+"</b> to complete your registration. <br>OTP sent successfully to " + newUserInfo.mobile + "<br>But sometimes OTP doesn't reach you because of network problems.");
                	}
                } else {
                    $(".signup-otp-timer").html("00:" + timer--);
                }
            }, 1000);
            
        })
        // Then with the error genereted...
        .catch((error) => {

        });
    },
    // Resend Signup OTP Handler
    resendSignUpOtpHandler: function() {
        $('.signup-resend-otp-btn').unbind('click', this.resendSignUpOtpHandler);
        $("#signup-form-msg span").html("");
        $("#signup-form-msg").addClass("disappear");
        $(".signup-submit").html('Resending OTP<div class="spinner-border ml-2 spinner-border-sm text-light"></div>');
        let newUserInfo = {
            mobile: $(".signup-form #signup-mobile").val(),
        };
        Model.sendSignUpOtp(newUserInfo);
    },
    // Direct Registration or Create new User
    createNewUser: function(newUserInfo) {
        console.log(newUserInfo);
        fetch(this.api.domain + this.api.registerWelcomeUser, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": this.getToken()
            },
            body: JSON.stringify(newUserInfo),
        })
        .then((response) => response.json())
        //Then with the data from the response in JSON...
        .then((data) => {
            //console.log(data);
            $("#direct-signup-form-msg").removeClass("disappear");
            $("#direct-signup-form-msg .alert").removeClass("alert-warning alert-danger");
            $("#direct-signup-form-msg .alert").addClass("alert-success");
            $("#direct-signup-form-msg span").html(data.regAcknowledgement);
            let event = new CustomEvent("user-created");
            window.dispatchEvent(event);
        })
        //Then with the error genereted...
        .catch((error) => {
            console.log(error);
            $("#direct-signup-form-msg").removeClass("disappear");
            $("#direct-signup-form-msg .alert").removeClass("alert-warning alert-success");
            $("#direct-signup-form-msg .alert").addClass("alert-danger");
            $("#direct-signup-form-msg span").html("Something went wrong! Try again");
            $(".direct-signup-submit").html("Create New User");
        });
    },


    // GETTING PROPERTIES FUNCTIONS
    // Properties Functions
    getAllProperties: function(topAllOrLimit) {
        fetch(this.api.domain + this.api.getAllEstates, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            // limit 0 for all properties
            body: topAllOrLimit,
        })
        .then((response) => response.json())
        //Then with the data from the response in JSON...
        .then((data) => {
            this.realData.properties = data;
            let event = new CustomEvent("properties-fetched");
            window.dispatchEvent(event);
        })
        //Then with the error genereted...
        .catch((error) => {
            console.error("Error : " + error);
        }); 
    },
    getAllPostByIds: function(adIds) {
        fetch(this.api.domain + this.api.getAllPostByIds, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
               // "Authorization": this.getToken() roop uncomment later
            },
            body: JSON.stringify(adIds),
        })
        .then((response) => response.json())
        //Then with the data from the response in JSON...
        .then((data) => {
            this.realData.properties = data;
            let event = new CustomEvent("posts-by-ids-fetched");
            window.dispatchEvent(event);
        })
        //Then with the error genereted...
        .catch((error) => {
            console.error("Error : " + error);
        }); 
    },
    // Get properties by status
    getPropsByQuery: function(filterStrs) {
        fetch(this.api.domain + this.api.getPostByQuery, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": this.getToken()
            },
            body: JSON.stringify(filterStrs),
        })
        .then((response) => response.json())
        //Then with the data from the response in JSON...
        .then((data) => {
            Model.realData.properties = [];
            Model.realData.properties = data;
            let event = new CustomEvent("propsFetchedByQuery");
            window.dispatchEvent(event);
        })
        //Then with the error genereted...
        .catch((error) => {
            console.error("Error : " + error);
        }); 
    },
    // Update Property
    updatewholeProperty: function(estateInfo) {
        fetch(this.api.domain + this.api.editEstate, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": this.getToken()
            },
            body: JSON.stringify(estateInfo),
        })
        .then((response) => response.json())
        //Then with the data from the response in JSON...
        .then((data) => {
            //console.log(data);
            let event = new CustomEvent("whole-property-updated");
            window.dispatchEvent(event);
            $(".waiting-frame img").attr("src", "../assets/images/gifs/completed.gif");
            $(".waiting-frame span").html("");
            $(".waiting-frame h3").html("Congrats! Property updated successfully!");
            $(".waiting-frame p").html("But currently it's under review. We will let you know when it is published on our site.");
            $(".waiting-frame div").html("<a href='dashboard.html' class='cta-filled'>Go to dashboard</a>");
        })
        //Then with the error genereted...
        .catch((error) => {
            alert(error);
            console.error("Error : " + error);
        });
    },
    // used for updating only status and reviewStatus
    updateProperty: function(estateInfo) {
        fetch(this.api.domain + this.api.editEstate, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": this.getToken()
            },
            body: JSON.stringify(estateInfo),
        })
        .then((response) => response.json())
        //Then with the data from the response in JSON...
        .then((data) => {
            this.updateFetchedProperty(data);
        })
        //Then with the error genereted...
        .catch((error) => {
            $("#save"+estateInfo.estateId).html("Failed");
            alert("Something went wrong! Try again");
            console.error("Error : " + error);
        });
    },
    // Update fetched property
    updateFetchedProperty: function(newEstate) {
        let estateId = newEstate.estateId;
        let oldReviewStatus = this.getFetchedPropertyById(estateId).reviewStatus;
        if(newEstate.reviewStatus != oldReviewStatus) {
            for(let i=0; i<Model.realData.properties.length; i++) {
                if(this.realData.properties[i].estateId == estateId) {
                    this.realData.properties.splice(i, 1);
                    break;
                }
            }
            $("#save"+estateId).html("Done");
            $("#row"+estateId).hide(1000);
        } else {
            for(let i=0; i<Model.realData.properties.length; i++) {
                if(this.realData.properties[i].estateId == estateId) {
                    this.realData.properties.splice(i, 1, newEstate);
                    break;
                }
            }
        }
        let event = new CustomEvent("changesSaved");
        window.dispatchEvent(event);
    },
    // Get fetched property by id
    getFetchedPropertyById: function(estateId) {
        let ap = Model.realData.properties;
        for(let i=0; i<ap.length; i++) {
            if(ap[i].estateId == estateId) {
                return ap[i];
            }
        }
    },
    // Get property search result
    getPropertySearchResult: function(propertyQuery, purpose) {
        let propertyFetchUrl;
        if(purpose == "Sale") {
            propertyFetchUrl = this.api.getEstateSearchResult;
        } else {
            propertyFetchUrl = this.api.getRentPGLeaseEstates;
        }

        fetch(this.api.domain + propertyFetchUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(propertyQuery),
        })
        .then((response) => response.json())
        //Then with the data from the response in JSON...
        .then((response) => {
            this.realData.searchResponseProps = response.data;
            let event = new CustomEvent("search-properties-fetched");
            window.dispatchEvent(event);
        })
        //Then with the error genereted...
        .catch((error) => {
            console.error("Error : " + error);
            let event = new CustomEvent("search-properties-fetch-failed");
            window.dispatchEvent(event);
        });
    },
    // Get Single property
    getEstate: function(estate) {
        fetch(this.api.domain + this.api.getPost, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(estate),
        })
        .then((response) => response.json())
        //Then with the data from the response in JSON...
        .then((data) => {
            this.realData.singleEstate = data;
            let event = new CustomEvent("estate-fetched");
            window.dispatchEvent(event);
        })
        //Then with the error genereted...
        .catch((error) => {
            console.error("Error : " + error);
        });
    },
    callThis: function(phone) {
        window.location.href = "tel:"+phone;
    },
    // GETTING PROPERTIES FUNCTIONS ENDS HERE



    // POST FREE AD FUNCTIONS
    // Load Master locations
    loadMasterLocationInfo: function() {
        fetch(this.api.domain + this.api.pullMasterInfo, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": this.getToken()
            },
        })
        .then((response) => response.json())
        //Then with the data from the response in JSON...
        .then((data) => {
            this.realData.masterLocations = data;
            let event = new CustomEvent("master-locations-fetched");
            window.dispatchEvent(event);
        })
        //Then with the error genereted...
        .catch((error) => {
            console.error("Error : " + error);
        });
    },
    // Post Properties
    postProperty: function(propertyFormData) {
        $.ajax({
            url: this.api.domain + this.api.postAd,
            data: propertyFormData,
            type: 'POST',
            headers: {
                "Authorization": this.getToken()
            },
            contentType: false,
            processData: false,
            success: function(data) {
                $(".waiting-frame img").attr("src", "../assets/images/gifs/completed.gif");
                $(".waiting-frame span").html("");
                $(".waiting-frame h3").html("Congrats! Property added successfully!");
                $(".waiting-frame p").html("But currently it's under review. We will let you know when it is published on our site.");
                $(".waiting-frame div").html("<a href='post-free-ad.html' class='cta-filled'>Post another Ad</a>");
                console.log(JSON.stringify(data));
            },
            error: function(textStatus, errorThrown) { 
                alert("Status: " + textStatus); 
                alert("Error: " + errorThrown); 
            } 
        });
    },
    // POST FREE AD FUNCTIONS ENDS HERE






    // OTHER FEATURES
    // Get Location Suggestions
    getLocSuggestions: function(locQuery) {
        fetch(this.api.domain + this.api.getLocationSuggestions + "/" + locQuery, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((response) => response.json())
        //Then with the data from the response in JSON...
        .then((data) => {
            let locations = data.suggestions;
            views.applyTemplates("location", "loc-suggestions-template", { location : locations });
        })
        //Then with the error genereted...
        .catch((error) => {
            console.error("Error : " + error);
        });
    },
    sendUserInterestOnProperty: function(interestInfo) {
        fetch(this.api.domain + this.api.sendUserInterestOnProperty, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": this.getToken()
            },
            body: JSON.stringify(interestInfo),
        })
        .then((response) => response.json())
        //Then with the data from the response in JSON...
        .then((data) => {
            //console.log(data);
        })
        //Then with the error genereted...
        .catch((error) => {
            console.error("Error : " + error);
        });
    },
    pullInterestsOnProperty: function(mobile) {
        fetch(this.api.domain + this.api.pullInterestsOnProperty, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": this.getToken()
            },
            body: mobile,
        })
        .then((response) => response.json())
        //Then with the data from the response in JSON...
        .then((response) => {
            Model.realData.interests = response.data;
            let event = new CustomEvent("all-interests-fetched");
            window.dispatchEvent(event);
        })
        //Then with the error genereted...
        .catch((error) => {
            let event = new CustomEvent("all-interests-fetch-failed");
            window.dispatchEvent(event);
            console.error("Error : " + error);
        });
    },
    
      // Manage Leads Starts - Roop
      getAllLeads: function(i, limit) {
        fetch(this.api.domain + this.api.lead, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                 "Authorization": this.getToken()
            },
           
        }).then((response) => response.json())
        //Then with the data from the response in JSON...
        .then((response) => {
            if(response.statusCode == 200) {
                Model.realData.leads = response.data;
                let event = new CustomEvent("leads-fetched"+i);
                window.dispatchEvent(event);
            } else {
                let event = new CustomEvent("leads-fetch-failed"+i);
                window.dispatchEvent(event);
            }
        })
        //Then with the error genereted...
        .catch((error) => {
            console.error(error);
            let event = new CustomEvent("leads-fetch-failed"+i);
            window.dispatchEvent(event);
        });
    },
    
    
     createLeads: function(lead) {
        fetch(this.api.domain + this.api.lead, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": this.getToken()
            },
            body: JSON.stringify(lead),
        }).then((response) => response.json())
        //Then with the data from the response in JSON...
        .then((response) => {
            if(response.statusCode === 200) {
                let event = new CustomEvent("leads-created");
                window.dispatchEvent(event);
            } else {
                let event = new CustomEvent("leads-create-failed");
                window.dispatchEvent(event);
            }
        })
        //Then with the error genereted...
        .catch((error) => {
            console.error(error);
            let event = new CustomEvent("leads-create-failed");
            window.dispatchEvent(event);
        });
    },
    
      updateLeads: function(i, lead) {
        fetch(this.api.domain + this.api.lead, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": this.getToken()
            },
            body: JSON.stringify(lead),
        })
        .then((response) => response.json())
        //Then with the data from the response in JSON...
        .then((response) => {
            console.log(response);
            if(response.statusCode === 200) {
                Model.realData.leads = response.data;
                let event = new CustomEvent("leads-updated"+i);
                window.dispatchEvent(event);
            } else {
                let event = new CustomEvent("leads-update-failed"+i);
                window.dispatchEvent(event);
            }
        })
        //Then with the error genereted...
        .catch((error) => {
            console.error(error);
            let event = new CustomEvent("leads-update-failed"+i);
            window.dispatchEvent(event);
        });
    },

	// Manage Leads Ends

    // DASHBOARD FUNCTIONS
    getCountStats: function(mobile) {
        fetch(this.api.domain + this.api.countStats, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": this.getToken()
            },
            body: mobile,
        })
        .then((response) => response.json())
        //Then with the data from the response in JSON...
        .then((data) => {
            this.realData.countStats = data;
            let event = new CustomEvent("count-stats-fetched");
            window.dispatchEvent(event);
        })
        //Then with the error genereted...
        .catch((error) => {
            console.error("Error : " + error);
        }); 
    },


    // MY PROPERTIES
    updateMyPState: function(estateInfo) {
        fetch(this.api.domain + this.api.editEstate, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": this.getToken()
            },
            body: JSON.stringify(estateInfo),
        })
        .then((response) => response.json())
        //Then with the data from the response in JSON...
        .then((data) => {
            let event = new CustomEvent("myp-state-updated");
            window.dispatchEvent(event);
        })
        //Then with the error genereted...
        .catch((error) => {
            if(estateInfo.status == "Active") {
                $("label[for='state"+estateInfo.estateId+"']").html("Inactive");
                $("#state"+estateInfo.estateId).prop("checked", false);
            } else {
                $("label[for='state"+estateInfo.estateId+"']").html("Active");
                $("#state"+estateInfo.estateId).prop("checked", true);
            }
            alert("Something went wrong! Try again");
            console.error("Error : " + error);
        });
    },
    updateMyPStatus: function(estateInfo) {
        fetch(this.api.domain + this.api.editEstate, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": this.getToken()
            },
            body: JSON.stringify(estateInfo),
        })
        .then((response) => response.json())
        //Then with the data from the response in JSON...
        .then((data) => {
            let event = new CustomEvent("myp-status-updated");
            window.dispatchEvent(event);
        })
        //Then with the error genereted...
        .catch((error) => {
            $("#status"+estateInfo.estateId+" option:selected").html("Sold Out");
            $("#status"+estateInfo.estateId+" option:not(:selected)").prop("selected", true);
            alert("Something went wrong! Try again");
            console.error("Error : " + error);
        });
    },

    // MANAGE USERS
    getAllUsers: function(i) {
        fetch(this.api.domain + this.api.getAllUsers, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": this.getToken()
            },
        })
        .then((response) => response.json())
        //Then with the data from the response in JSON...
        .then((data) => {
            this.realData.users = data;
            let event = new CustomEvent("all-users-fetched"+i);
            window.dispatchEvent(event);
        })
        //Then with the error genereted...
        .catch((error) => {
            console.error("Error : " + error);
        }); 
    },
    updateUser: function(user, i) {
        console.log(user);
        fetch(this.api.domain + this.api.editAccount, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": this.getToken()
            },
            body: JSON.stringify(user),
        })
        .then((response) => response.json())
        //Then with the data from the response in JSON...
        .then((data) => {
           // console.log(data);
            let event = new CustomEvent("user-updated"+i);
            window.dispatchEvent(event);
        })
        //Then with the error genereted...
        .catch((error) => {
            console.error("Error : " + error);
        }); 
    },

    // MANAGE WISHISTS
    getAllWishlists: function(i) {
        fetch(this.api.domain + this.api.getAllWishlists, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": this.getToken()
            },
        }).then((response) => response.json())
        //Then with the data from the response in JSON...
        .then((data) => {
            this.realData.wishlists = data;
            let event = new CustomEvent("all-wishlists-fetched"+i);
            window.dispatchEvent(event);
        })
        //Then with the error genereted...
        .catch((error) => {
            console.error(error);
        });
    },
    getWlAllProps: function() {
        fetch(this.api.domain + this.api.getAllEstates, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": this.getToken()
            },
            // limit 0 for all properties
            body: 0,
        })
        .then((response) => response.json())
        //Then with the data from the response in JSON...
        .then((data) => {
            this.realData.properties = data;
            let event = new CustomEvent("wl-all-props-fetched");
            window.dispatchEvent(event);
        })
        //Then with the error genereted...
        .catch((error) => {
            console.error("Error : " + error);
        }); 
    },
    createWishlist: function(wishlist) {
        fetch(this.api.domain + this.api.createWishlist, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": this.getToken()
            },
            body: JSON.stringify(wishlist),
        }).then((response) => response.json())
        //Then with the data from the response in JSON...
        .then((data) => {
            let event = new CustomEvent("wishlist-created");
            window.dispatchEvent(event);
        })
        //Then with the error genereted...
        .catch((error) => {
            console.error(error);
        });
    },
    updateWishlist: function(wishlist) {
        fetch(this.api.domain + this.api.editWishlist, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": this.getToken()
            },
            body: JSON.stringify(wishlist),
        }).then((response) => response.json())
        //Then with the data from the response in JSON...
        .then((data) => {
           // console.log(data);
            let event = new CustomEvent("wishlist-updated");
            window.dispatchEvent(event);
        })
        //Then with the error genereted...
        .catch((error) => {
            console.error(error);
        });
    },
    assignUsers: function(wl) {
        fetch(this.api.domain + this.api.assignUsers, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": this.getToken()
            },
            body: JSON.stringify(wl),
        })
        //Then with the data from the response in JSON...
        .then((data) => {
           // console.log(data);
            let event = new CustomEvent("users-assigned");
            window.dispatchEvent(event);
        })
        //Then with the error genereted...
        .catch((error) => {
            console.error(error);
            alert(error);
        });
    },

    // MY WISHLISTS
    getAllWishlistsByIds: function(i, oW) {
        fetch(this.api.domain + this.api.getAllWishlistsByIds, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
               // "Authorization": this.getToken() roop later
            },
            body: JSON.stringify(oW),
        }).then((response) => response.json())
        //Then with the data from the response in JSON...
        .then((data) => {
            this.realData.wishlists = data;
            let event = new CustomEvent("all-wishlists-by-ids-fetched"+i);
            window.dispatchEvent(event);
        })
        //Then with the error genereted...
        .catch((error) => {
            console.error(error);
            $("#wishlists-list-cont").html("");
            $("#wishlist-table-cont .loader-cont").html("<div class='my-2'>Failed to load. Try refreshing the page</div>");
        });
    },
    getUserByMobile: function(user) {
        fetch(this.api.domain + this.api.getUser, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": this.getToken()
            },
            body: JSON.stringify(user)
        })
        .then((response) => response.json())
        //Then with the data from the response in JSON...
        .then((response) => {
            Model.realData.user = response.data;
            let event = new CustomEvent("user-by-id-fetched");
            window.dispatchEvent(event);
        })
        //Then with the error genereted...
        .catch((error) => {
            console.error(error);
        });
    },

    // COMM ADS
    getAllCommAds: function(i, limit) {
        fetch(this.api.domain + this.api.pullCommercialAds, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: Number(limit),
        }).then((response) => response.json())
        //Then with the data from the response in JSON...
        .then((response) => {
            if(response.statusCode == 200) {
                Model.realData.commAds = response.data;
                let event = new CustomEvent("comm-ads-fetched"+i);
                window.dispatchEvent(event);
            } else {
                let event = new CustomEvent("comm-ads-fetch-failed"+i);
                window.dispatchEvent(event);
            }
        })
        //Then with the error genereted...
        .catch((error) => {
            console.error(error);
            let event = new CustomEvent("comm-ads-fetch-failed"+i);
            window.dispatchEvent(event);
        });
    },
    createCommAd: function(commAd) {
        fetch(this.api.domain + this.api.publishCommercialAd, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": this.getToken()
            },
            body: JSON.stringify(commAd),
        }).then((response) => response.json())
        //Then with the data from the response in JSON...
        .then((response) => {
            if(response.statusCode === 200) {
                console.log(response);
                let event = new CustomEvent("comm-ad-created");
                window.dispatchEvent(event);
            } else {
                let event = new CustomEvent("comm-ad-create-failed");
                window.dispatchEvent(event);
            }
        })
        //Then with the error genereted...
        .catch((error) => {
            console.error(error);
            let event = new CustomEvent("comm-ad-create-failed");
            window.dispatchEvent(event);
        });
    },
    updateCommAd: function(i, commAd) {
        fetch(this.api.domain + this.api.editCommercialAd, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": this.getToken()
            },
            body: JSON.stringify(commAd),
        })
        .then((response) => response.json())
        //Then with the data from the response in JSON...
        .then((response) => {
            console.log(response);
            if(response.statusCode === 200) {
                Model.realData.commAd = response.data;
                let event = new CustomEvent("comm-ad-updated"+i);
                window.dispatchEvent(event);
            } else {
                let event = new CustomEvent("comm-ad-update-failed"+i);
                window.dispatchEvent(event);
            }
        })
        //Then with the error genereted...
        .catch((error) => {
            console.error(error);
            let event = new CustomEvent("comm-ad-update-failed"+i);
            window.dispatchEvent(event);
        });
    }
};

export { Model };