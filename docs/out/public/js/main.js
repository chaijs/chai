$(function () {
  $('a.scroll').click(function (e) {
    e.preventDefault();

    var section = $(this).attr('href')
      , $scrollto = $(section + '-section');

    $('html,body').animate({
      scrollTop: $scrollto.offset().top
    });
  });

  $('.box-wrap').antiscroll({ autoHide: false }).data('antiscroll');
});
