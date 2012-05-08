$(function () {

  var current = 'all';
  function doSwitch (which) {
    if (which == current) return;
    current = which;

    $('html,body').animate({
      scrollTop: 0
    });

    var $plugins = $('.plug_list.' + which + ' article');
    $('#ptags > .tag').removeClass('active');
    $('#ptags > .tag > #' + which).parent('.tag').addClass('active');
    $('.plug_list_scratch')
      .quicksand($plugins, {
        attribute: 'id'
      });
  }

  $('body.plugins #ptags > .tag > .which').click(function (e) {
    e.preventDefault();
    var which = $(this).attr('id');
    doSwitch(which);
  });

  $('body.plugins #ptags > .tag > span.reset').click(function (e) {
    e.preventDefault();
    console.log('reset');
    doSwitch('all');
  });

});
