
(function ($) {

  /**
   * Augment jQuery prototype.
   */

  $.fn.antiscroll = function (options) {
    return this.each(function () {
      if ($(this).data('antiscroll')) {
        $(this).data('antiscroll').destroy();
      }

      $(this).data('antiscroll', new $.Antiscroll(this, options));
    });
  };

  /**
   * Expose constructor.
   */

  $.Antiscroll = Antiscroll;

  /**
   * Antiscroll pane constructor.
   *
   * @param {Element|jQuery} main pane
   * @parma {Object} options
   * @api public
   */

  function Antiscroll (el, opts) {
    this.el = $(el);
    this.options = opts || {};
    this.padding = undefined == this.options.padding ? 2 : this.options.padding;
    this.inner = this.el.find('.antiscroll-inner');
    this.inner.css({
        'width': '+=' + scrollbarSize()
      , 'height': '+=' + scrollbarSize()
    });

    if (this.inner.get(0).scrollWidth > this.el.width()) {
      this.horizontal = new Scrollbar.Horizontal(this);
    }

    if (this.inner.get(0).scrollHeight > this.el.height()) {
      this.vertical = new Scrollbar.Vertical(this);
    }
  }

  /**
   * Cleans up.
   *
   * @return {Antiscroll} for chaining
   * @api public
   */

  Antiscroll.prototype.destroy = function () {
    if (this.horizontal) {
      this.horizontal.destroy();
    }
    if (this.vertical) {
      this.vertical.destroy();
    }
    return this;
  };

  /**
   * Scrolbar constructor.
   *
   * @param {Element|jQuery} element
   * @api public
   */

  function Scrollbar (pane) {
    this.pane = pane;
    this.pane.el.append(this.el);
    this.innerEl = this.pane.inner.get(0);

    this.dragging = false;
    this.enter = false;
    this.shown = false;

    // hovering
    this.pane.el.mouseenter($.proxy(this, 'mouseenter'));
    this.pane.el.mouseleave($.proxy(this, 'mouseleave'));

    // dragging
    this.el.mousedown($.proxy(this, 'mousedown'));

    // scrolling
    this.pane.inner.scroll($.proxy(this, 'scroll'));

    // wheel -optional-
    this.pane.inner.bind('mousewheel', $.proxy(this, 'mousewheel'));

    // show
    var initialDisplay = this.pane.options.initialDisplay;

    if (initialDisplay !== false) {
      this.show();
      this.hiding = setTimeout($.proxy(this, 'hide'), parseInt(initialDisplay, 10) || 3000);
    }
  };

  /**
   * Cleans up.
   *
   * @return {Scrollbar} for chaining
   * @api public
   */

  Scrollbar.prototype.destroy = function () {
    this.el.remove();
    return this;
  };

  /**
   * Called upon mouseenter.
   *
   * @api private
   */

  Scrollbar.prototype.mouseenter = function () {
    this.enter = true;
    this.show();
  };

  /**
   * Called upon mouseleave.
   *
   * @api private
   */

  Scrollbar.prototype.mouseleave = function () {
    this.enter = false;

    if (!this.dragging) {
      this.hide();
    }
  }

  /**
   * Called upon wrap scroll.
   *
   * @api private
   */

  Scrollbar.prototype.scroll = function () {
    if (!this.shown) {
      this.show();
      if (!this.enter && !this.dragging) {
        this.hiding = setTimeout($.proxy(this, 'hide'), 1500);
      }
    }

    this.update();
  };

  /**
   * Called upon scrollbar mousedown.
   *
   * @api private
   */

  Scrollbar.prototype.mousedown = function (ev) {
    ev.preventDefault();

    this.dragging = true;

    this.startPageY = ev.pageY - parseInt(this.el.css('top'), 10);
    this.startPageX = ev.pageX - parseInt(this.el.css('left'), 10);

    // prevent crazy selections on IE
    document.onselectstart = function () { return false; };

    var pane = this.pane
      , move = $.proxy(this, 'mousemove')
      , self = this

    $(document)
      .mousemove(move)
      .mouseup(function () {
        self.dragging = false;
        document.onselectstart = null;

        $(document).unbind('mousemove', move);

        if (!self.enter) {
          self.hide();
        }
      })
  };

  /**
   * Show scrollbar.
   *
   * @api private
   */

  Scrollbar.prototype.show = function (duration) {
    if (!this.shown) {
      this.update();
      this.el.addClass('antiscroll-scrollbar-shown');
      if (this.hiding) {
        clearTimeout(this.hiding);
        this.hiding = null;
      }
      this.shown = true;
    }
  };

  /**
   * Hide scrollbar.
   *
   * @api private
   */

  Scrollbar.prototype.hide = function () {
    if (this.shown) {
      // check for dragging
      this.el.removeClass('antiscroll-scrollbar-shown');
      this.shown = false;
    }
  };

  /**
   * Horizontal scrollbar constructor
   *
   * @api private
   */

  Scrollbar.Horizontal = function (pane) {
    this.el = $('<div class="antiscroll-scrollbar antiscroll-scrollbar-horizontal">');
    Scrollbar.call(this, pane);
  }

  /**
   * Inherits from Scrollbar.
   */

  inherits(Scrollbar.Horizontal, Scrollbar);

  /**
   * Updates size/position of scrollbar.
   *
   * @api private
   */

  Scrollbar.Horizontal.prototype.update = function () {
    var paneWidth = this.pane.el.width()
      , trackWidth = paneWidth - this.pane.padding * 2
      , innerEl = this.pane.inner.get(0)

    this.el
      .css('width', trackWidth * paneWidth / innerEl.scrollWidth)
      .css('left', trackWidth * innerEl.scrollLeft / innerEl.scrollWidth)
  }

  /**
   * Called upon drag.
   *
   * @api private
   */

  Scrollbar.Horizontal.prototype.mousemove = function (ev) {
    var trackWidth = this.pane.el.width() - this.pane.padding * 2
      , pos = ev.pageX - this.startPageX
      , barWidth = this.el.width()
      , innerEl = this.pane.inner.get(0)

    // minimum top is 0, maximum is the track height
    var y = Math.min(Math.max(pos, 0), trackWidth - barWidth)

    innerEl.scrollLeft = (innerEl.scrollWidth - this.pane.el.width())
      * y / (trackWidth - barWidth)
  };

  /**
   * Called upon container mousewheel.
   *
   * @api private
   */

  Scrollbar.Horizontal.prototype.mousewheel = function (ev, delta, x, y) {
    if ((x < 0 && 0 == this.pane.inner.get(0).scrollLeft) ||
        (x > 0 && (this.innerEl.scrollLeft + this.pane.el.width()
          == this.innerEl.scrollWidth))) {
      ev.preventDefault();
      return false;
    }
  };

  /**
   * Vertical scrollbar constructor
   *
   * @api private
   */

  Scrollbar.Vertical = function (pane) {
    this.el = $('<div class="antiscroll-scrollbar antiscroll-scrollbar-vertical">');
    Scrollbar.call(this, pane);
  };

  /**
   * Inherits from Scrollbar.
   */

  inherits(Scrollbar.Vertical, Scrollbar);

  /**
   * Updates size/position of scrollbar.
   *
   * @api private
   */

  Scrollbar.Vertical.prototype.update = function () {
    var paneHeight = this.pane.el.height()
      , trackHeight = paneHeight - this.pane.padding * 2
      , innerEl = this.innerEl

    this.el
      .css('height', trackHeight * paneHeight / innerEl.scrollHeight)
      .css('top', trackHeight * innerEl.scrollTop / innerEl.scrollHeight)
  };

  /**
   * Called upon drag.
   *
   * @api private
   */

  Scrollbar.Vertical.prototype.mousemove = function (ev) {
    var paneHeight = this.pane.el.height()
      , trackHeight = paneHeight - this.pane.padding * 2
      , pos = ev.pageY - this.startPageY
      , barHeight = this.el.height()
      , innerEl = this.innerEl

    // minimum top is 0, maximum is the track height
    var y = Math.min(Math.max(pos, 0), trackHeight - barHeight)

    innerEl.scrollTop = (innerEl.scrollHeight - paneHeight)
      * y / (trackHeight - barHeight)
  };

  /**
   * Called upon container mousewheel.
   *
   * @api private
   */

  Scrollbar.Vertical.prototype.mousewheel = function (ev, delta, x, y) {
    if ((y > 0 && 0 == this.innerEl.scrollTop) ||
        (y < 0 && (this.innerEl.scrollTop + this.pane.el.height()
          == this.innerEl.scrollHeight))) {
      ev.preventDefault();
      return false;
    }
  };

  /**
   * Cross-browser inheritance.
   *
   * @param {Function} constructor
   * @param {Function} constructor we inherit from
   * @api private
   */

  function inherits (ctorA, ctorB) {
    function f() {};
    f.prototype = ctorB.prototype;
    ctorA.prototype = new f;
  };

  /**
   * Scrollbar size detection.
   */

  var size;

  function scrollbarSize () {
    if (!size) {
      var div = $(
          '<div style="width:50px;height:50px;overflow:hidden;'
        + 'position:absolute;top:-200px;left:-200px;"><div style="height:100px;">'
        + '</div>'
      );

      $('body').append(div);

      var w1 = $('div', div).innerWidth();
      div.css('overflow-y', 'scroll');
      var w2 = $('div', div).innerWidth();
      $(div).remove();

      size = w1 - w2;
    }

    return size;
  };

})(jQuery);