$(function () {

  function closeSubItems (which) {
    var $which = $('nav#guide #' + which + '.subitems');
    $('nav#guide #' + which + '.item.primary').removeClass('expanded');
    $which.find('.item.secondary').each(function () {
      $(this)
        .stop()
        .animate({
            height: 0
          , opacity: 0
        }, 200, function () {
          $(this).removeClass('expanded');
          $(this)
            .hide()
            .css({
                height: ''
              , opacity: ''
            });
        });
    });
  }

  function openSubItems (which) {
    var $which = $('nav#guide #' + which + '.subitems');
    $('nav#guide #' + which + '.item.primary').addClass('expanded');
    $which.find('.item.secondary').each(function () {
      $(this)
        .filter(':hidden')
        .css({
            height: 0
          , opacity: 0
          , display: 'block'
        })
        .show();

      $(this)
        .stop()
        .animate({
            height: 24
          , opacity: 1
        }, 200, function () {
          $(this).addClass('expanded');
        });
    });
  }

  var current = '';
  $('nav#guide .item.primary').each(function () {
    var id = $(this).attr('id');
    if ($(this).hasClass('active')) current = id;
  });

  $('nav#guide .item.primary span').click(function (e) {
    e.preventDefault();
    var action = ($(this).hasClass('expand')) ? 'expand' : 'collapse';

    if (action === 'expand') {
      var $parent = $(this).parent('.item.primary')
        , id = $parent.attr('id')
        , $list = $parent.next('#' + id + '.subitems');
      if (current.length) closeSubItems(current);
      current = id;
      openSubItems(current);
    } else if (action === 'collapse') {
      var $parent = $(this).parent('.item.primary')
        , id = $parent.attr('id');
      closeSubItems(id);
    }
  });

});
