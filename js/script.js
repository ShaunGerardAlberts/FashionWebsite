$(function() {

  // ****************   Move menu to top-fixed if scrolled down  ***************/
  //apply a fixed menu bar for the desktop layout, if not desktop dont apply
  var topPosition = 0;
  var whenToChange = 100;
  var desktopSize = 768;
  // var scrollTimeout = false;
  var windowWidth = $(window).width();
  // When width indicates this device is a dektop, add scroll listener
  if (windowWidth >= desktopSize) {
    $(window).on('scroll', function() {
        var scrollFromTop = $(document).scrollTop() - topPosition;
        // When scrolled over 100px from top fix nav, else don't fix it
        if (scrollFromTop > whenToChange) {
          $('#collapsemenu').addClass('navbar-fixed-top');
        } else { // scrolled less than 100px from top, don't fix nav
          $('#collapsemenu').removeClass('navbar-fixed-top');
        }
    });
  }

  /* The sales button needs to be moved down when the collapsed navigation is expanded */
  var smallMobile = 320;
  var mediumMobile = 375;
  var smallTablet = 425;
  // everytime the button is clicked see if it's collapsed or not, then move the button accordingly
  $("button.navbar-toggle").click(function(event) {
    if ($('#collapsemenu').hasClass('in')) {
      // the nav is collapsed so move the sales button up
      if (windowWidth <= smallMobile) {// target different platforms
        $('.shop-button').animate({top: '212px'});
      } else if (windowWidth <= mediumMobile) {
        $('.shop-button').animate({top: '230px' });
      } else if (windowWidth <= smallTablet) {
        $('.shop-button').animate({top: '250px' });
      }
    } else {
      // the nav is not collapsed, so move the button down
      if (windowWidth <= smallMobile) {//, target different platforms
        $('.shop-button').animate({top: '380px' });
      } else if (windowWidth <= mediumMobile) {
        $('.shop-button').animate({top: '400px' });
      } else if (windowWidth <= smallTablet) {
        $('.shop-button').animate({top: '410px' });
      }
    }
  });

  //  *******   Slider wait 5 seconds before changing slide  ****************
  $('.carousel').carousel({
    interval: 5000,
    pause: false,
    keyboard: false
  });

  //  *************   For the Featured Items section  ************************
  /* show lightbox when clicking image | copied from https://codepen.io/webcane/pen/bNEOXZ */
    $('a.thumb').click(function(event) {
    	event.preventDefault();
    	var content = $('.modal-body');
    	content.empty();
      var title = $(this).attr("title");
      $('.modal-title').html(title);
      content.html($(this).html());
      $(".modal-profile").modal({show:true});
    });

  // *******************    For the register form submission   **************
  // Tooltips
  $('[data-toggle]').tooltip();

  // Submit button pressed
  $('#register-button').click(function() {

    var email = $('#inputEmail').val();
    var password = $("#inputPassword").val();

    // Call function to perform all form validation and responses
    validateSubmit(email, password);

  });


// *****************************    Helper Functions   ************************

  // Depending on email and password validity, allow or stop submit
  function validateSubmit(email, password) {

    // Validate the email value.  If blank warn, then if invalid warn
    var isEmailValid = validateEmail(email);

    // Validate the password, If blank warn, then if invalid warn
    var isPasswordValid = validatePassword(password);

    // Have details on email and password
    if (!isEmailValid  || !isPasswordValid) {
        preventSubmit();
    } else {
      $('#inputEmail').val("");
      $('#inputPassword').val("");
      $("form div:first").removeClass("has-error");
      $("form div:nth-child(2)").removeClass("has-error");
      alert("Submit Successful");
    }

  }

  // This will check if the email is blank, invalid or valid
  // if invalid input border set to red and add a message added below the input
  function validateEmail(email) {
    if (email.length == 0) {
      $("form div:first").addClass("has-error");
      $('.email-error-response').text('Email is blank');
      return false;
    } else { // not blank
      // copied this regex from : http://www.jquerybyexample.net/2011/04/validate-email-address-using-jquery.html
      var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
      if (filter.test(email)) {
        $("form div:first").removeClass("has-error");
        $('.email-error-response').text('');
        return true;
      }
      else {
        // Not valid email, inform user
        $("form div:first").addClass("has-error");
        $('.email-error-response').text('Invalid email entry');
        return false;
      }
    }
  }

  // Then it will check if the password is blank, invalid or valid
  // if invalid input border set to red and add a message added below the input
  function validatePassword(password) {
    if (password.length == 0) {
      $("form div:nth-child(2)").addClass("has-error");
      $('.password-error-response').text('Password is blank');
      return false;
    } else {
      // password must contain at least 1 lowercase, uppercase, digit, and at least 8 charaters
      var filter = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
      if (filter.test(password)) {
        $("form div:nth-child(2)").removeClass("has-error");
        $('.password-error-response').text('');
        return true;
      } else {
        // Not a valid password, inform user
        $("form div:nth-child(2)").addClass("has-error");
        $('.password-error-response').text('Invalid password entry');
        return false;
      }
    }
  }

  // Stops the form from submitting
  function preventSubmit() {
    $("form").submit(function(e) {
      e.preventDefault(e);
    });
  }
});
