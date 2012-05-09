$(function () {
  $('a.scroll').click(function (e) {
    e.preventDefault();

    var section = $(this).attr('href')
      , $scrollto = $(section + '-section');

    console.log(section, $scrollto);
    $('html,body').animate({
      scrollTop: $scrollto.offset().top - 90
    });
  });

  $('.box-wrap').antiscroll({ autoHide: false }).data('antiscroll');
});
