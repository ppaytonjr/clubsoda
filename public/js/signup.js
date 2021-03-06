$(document).ready(function() {
  // Getting references to our form and input
  var signUpForm = $("form.signup");
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");
  var clubInput = $("select#club-input");
  var adminInput = $("select#admin-input");
  var clubs = [];

  function getClubs() {
    $.get("/api/clubs", {
    })
    .then(function (data) {
      clubs = data;
      clubs.forEach(club => {
        clubInput.append(`<option value="${club.club_name}">${club.club_name}</option>`)
      })
    })
  };

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", function(event) {
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      club: clubInput.val()[0],
      admin: adminInput.val()[0]
    };

    console.log(userData);

    if (!userData.email || !userData.password || !userData.club || !userData.admin) {
      return;
    }
    
    signUpUser(userData.email, userData.password, userData.club, userData.admin);
    emailInput.val("");
    passwordInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(email, password, club, isAdmin) {
    $.post("/api/signup", {
      email: email,
      password: password,
      club: club,
      isAdmin: isAdmin
    })
      .then(function(data) {
        window.location.replace("/members");
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }

  getClubs();

});

