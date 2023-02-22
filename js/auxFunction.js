$(document).ready(() => {
  $("#firstContent").show();
  $("#secondContent").hide();

  $(".homeButton").click((event) => {
    event.preventDefault();
    $("#firstContent").show();
    $("#secondContent").hide();
  });

  $("#seePicturesButton").click((event) => {
    event.preventDefault();
    $("#secondContent").show();
    $("#firstContent").hide();
  });
});