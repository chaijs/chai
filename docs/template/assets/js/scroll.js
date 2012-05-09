$(function () {

  $('.sticky').each(function () {
    var $stick = $(this)
      , offset = $stick.offset().top;

    $(document).scroll(function () {
      var top = $(document).scrollTop();
      if ((offset - 105) <= top) {
        $stick.css({
            position: 'fixed'
          , top: 105
        });
      } else {
        $stick.css({
            position: 'relative'
          , top: ''
        });
      }

    });

  });

});
