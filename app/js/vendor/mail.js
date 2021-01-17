/** @format */

$(document).ready(function () {
  //E-mail Ajax Send
  $(".send__form").submit(function () {
    //Change
    var th = $(this);
    $.ajax({
      type: "POST",
      url: "mail.php", //Change
      data: th.serialize(),
    }).done(function () {
      alert("Thank you!");
      setTimeout(function () {
        // Done Functions
        th.trigger("reset");
      }, 1000);
    });
    return false;
  });
  $("form").keydown(function () {
    if (e.keyCode == 13) {
      e.preventDefault();
    }
  });
});
