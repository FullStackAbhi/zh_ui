var signinTemplate =
'<!-- Signin -->'+
'<div id="signin-content" class="container-fluid signin-box bottom-box">'+
    '<div class="container form-cont signin-form-cont">'+
        '<div class="headline-cont">'+
            '<h2 class="headline">Sign In</h2>'+
            '<ion-icon class="close-signin close-icon" name="close-outline"></ion-icon>'+
        '</div>'+
        '<!-- Form msg -->'+
        '<div id="signin-form-msg" class="form-msg {{formMsgVisibility}}">'+
            '<div class="alert {{msgType}}">'+
                '<span>{{signInFormMsg}}</span>'+
            '</div>'+
        '</div>'+

        '<form method="POST" onsubmit="event.preventDefault();" class="form signin-form">'+
            '<!-- Mobie Number -->'+
            '<div class="form-group">'+
                '<input type="tel" name="mobile" id="mobile" class="form-control" pattern="[0-9]{10}" placeholder="Enter Mobile No." maxlength="10" minlength="10" required>'+
            '</div>'+
            '<!-- Password -->'+
            '<div class="form-group">'+
                '<input type="password" name="password" id="password" class="form-control" placeholder="Enter Password" required>'+
            '</div>'+
            '<!-- Remember me -->'+
            '<div class="form-check form-group">'+
                '<label class="form-check-label">'+
                    '<input type="checkbox" id="remember" name="remember" class="form-check-input">Remember Me'+
                '</label>'+
            '</div>'+
            '<!-- Login -->'+
            '<button type="submit" class="cta-filled w-100 signin-submit" data-action="{{dataAction}}">Sign In</button>'+

            '<!--div class="or">'+
                '<span>OR</span>'+
            '</div-->'+
        '</form>'+

        '<!--button class="cta-transparent otp-signin-button">Sign In via OTP</button-->'+

        '<div class="no-account">Don&apos;t have an account yet? <span class="signup-button">Sign Up</span></div>'+
    '</div>'+
'</div>';

var otpSigninTemplate =
'<!-- Sign in via otp -->'+
'<div class="container-fluid otp-signin-box bottom-box">'+
    '<div class="container form-cont otp-signin-form-cont">'+
        '<div class="headline-cont">'+
            '<h2 class="headline">Sign In via OTP</h2>'+
            '<ion-icon class="close-otp-signin close-icon" name="close-outline"></ion-icon>'+
        '</div>'+
        '<!-- Form msg -->'+
        '<div id="otp-signin-form-msg" class="form-msg {{formMsgVisibility}}">'+
            '<div class="alert {{msgType}}">'+
                '<span>{{otpSignInFormMsg}}</span>'+
            '</div>'+
        '</div>'+

        '<form method="POST" class="form otp-signin-form" onsubmit="event.preventDefault();">'+
            '<!-- Mobie Number -->'+
            '<div class="form-group">'+
                '<input type="tel" name="mobile" id="otp-mobile" pattern="[0-9]{10}" class="form-control" placeholder="*Enter Mobile No." maxlength="10" minlength="10" inputmode="numeric" required>'+
            '</div>'+
            '<!-- Display name -->'+
            '<div class="form-group">'+
                '<input type="text" name="display-name" id="display-name" class="form-control" placeholder="Display Name">'+
            '</div>'+

            '<!-- OTP -->'+
            '<div class="form-group">'+
                '<input type="password" name="otp" id="otp" class="form-control" placeholder="*Please enter OTP here" required disabled>'+
                '<!-- Resend otp -->'+
                '<div class="otp-options-cont disappear">'+
                    '<div class="resend-cont text-success">'+
                        '<span class="resend-otp-btn deactivated">Resend OTP</span>'+
                        '<span class="otp-timer"></span>'+
                    '</div>'+
                '</div>'+
            '</div>'+

            '<!-- Submit button -->'+
            '<button type="submit" class="cta-filled w-100 otp-signin-submit" data-action="{{dataAction}}">Send OTP</button>'+
            '<div class="or">'+
                '<span>OR</span>'+
            '</div>'+
        '</form>'+
        
        '<button class="cta-transparent signin-button">Sign In via Password</button>'+
    '</div>'+
'</div>';

var signupTemplate =
'<!-- SignUp -->'+
'<div class="container-fluid signup-box bottom-box">'+
    '<div class="container form-cont signup-form-cont">'+
        '<div class="headline-cont">'+
            '<h2 class="headline">Sign Up</h2>'+
            '<ion-icon class="close-signup close-icon" name="close-outline"></ion-icon>'+
        '</div>'+
        '<!-- Form msg -->'+
        '<div id="signup-form-msg" class="form-msg {{formMsgVisibility}}">'+
            '<div class="alert {{msgType}}">'+
                '<span>{{signUpFormMsg}}</span>'+
            '</div>'+
        '</div>'+

        '<form method="POST" class="form signup-form" onsubmit="event.preventDefault();">'+
            '<div class="signup-fields-cont">'+
                '<!-- User-type -->'+
                '<div class="form-group form-field-cont user-type">'+
                    '<label class="mb-0 user-type-label form-field-name"><span class="text-danger">*</span>I am an</label>'+
                    '<div class="form-check-inline-cont">'+
                        '<div class="form-check-inline">'+
                            '<label class="form-check-label">'+
                                '<input type="radio" class="form-check-input" name="user-type" id="individual" value="Individual" checked><label for="individual">Individual</label>'+
                            '</label>'+
                        '</div>'+
                        '<div class="form-check-inline">'+
                            '<label class="form-check-label">'+
                                '<input type="radio" class="form-check-input" name="user-type" id="owner" value="Owner"><label for="owner">Owner</label>'+
                            '</label>'+
                        '</div>'+
                        '<div class="form-check-inline">'+
                            '<label class="form-check-label">'+
                                '<input type="radio" class="form-check-input" name="user-type" id="agent" value="Agent"><label for="agent">Agent</label>'+
                            '</label>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
                '<!-- Name -->'+
                '<div class="form-group">'+
                    '<input type="text" name="name" id="name" class="form-control" placeholder="*Your name" required>'+
                '</div>'+
                '<!-- Mobile Number -->'+
                '<div class="form-group">'+
                    '<input type="tel" name="mobile" id="signup-mobile" maxlength="10" minlength="10" class="form-control" placeholder="*Your mobile number" required>'+
                '</div>'+
                '<!-- Email -->'+
                '<div class="form-group">'+
                    '<input type="email" name="email" id="email" class="form-control" placeholder="*Your email address" required>'+
                '</div>'+
                '<!-- Password -->'+
                '<div class="form-group">'+
                    '<input type="password" name="signup-pwd" id="signup-pwd" class="form-control" placeholder="*Enter Password" required>'+
                '</div>'+
                '<!-- Confirm Password -->'+
                '<div class="form-group">'+
                    '<input type="password" name="confirm-pwd" id="confirm-pwd" class="form-control" placeholder="*Confirm Password" required>'+
                '</div>'+
                '<!-- Agreement -->'+
                '<div class="form-check form-group">'+
                    '<label class="form-check-label">'+
                        '<!-- input type="checkbox" name="agreement" class="form-check-input" value="true" required checked>*I have read the <a href="#" target="blank" class="agreement-link text-primary">agreement</a-->'+
                    '</label>'+
                '</div>'+
            '</div>'+
            '<!-- Signup OTP -->'+
            '<div class="form-group signup-otp-cont disappear">'+
                '<input type="password" name="signup-otp" id="signup-otp" class="form-control" placeholder="Enter OTP" required disabled>'+
                '<!-- Resend Signup OTP -->'+
                '<div class="signup-otp-options-cont">'+
                    '<div class="signup-resend-cont text-success">'+
                        '<span class="signup-resend-otp-btn deactivated">Resend OTP</span>'+
                        '<span class="signup-otp-timer"></span>'+
                    '</div>'+
                '</div>'+
            '</div>'+
            '<!-- Signup -->'+
            '<button type="submit" class="cta-filled w-100 signup-submit" data-action="{{dataAction}}">Verify Mobile</button>'+
        '</form>'+
        '<div class="no-account">Already have an account? <span class="signin-button">Sign In</span></div>'+
    '</div>'+
'</div>';


Handlebars.registerPartial(
    "signin",
    signinTemplate + otpSigninTemplate + signupTemplate
);