var rS = 'GLjQjLONIuIgzzuPzHGPMzkttkmIwmoKx';
var rI = 'wB2IMDIimJOPv9dBoAA';
var pI = 'page_reg_half';

var mooli = '';
var moolidator_lite_countries = {
  default: 'it',
  '1': 'it',
  '2': 'ch',
  '3': 'default',
};

var Optin_layer = function (options) {
  var self = this;
  var _defaults = {
    layer_id: 'optin_layer',
    hide_class: 'hidden',
    confirm_button_id: 'optin_confirm_button',
    skip_button_id: 'optin_skip_button',
    form_id: 'form_reg_half',
    checkbox_1_id: 'agb',
    checkbox_2_id: 'agb2',
    fake_checkbox_id: 'fake_agb_checkbox',
  };
  var _options = {};

  var init = function (options) {
    _options =
      typeof options !== 'object'
        ? _defaults
        : Object.merge(_defaults, options);

    if (typeof $(_options.layer_id) === null) {
      return;
    }

    add_events();
  };

  var add_events = function () {
    if (
      $(_options.confirm_button_id) !== null &&
      $(_options.fake_checkbox_id) !== null
    ) {
      $$(
        '#' + _options.confirm_button_id + ', #' + _options.fake_checkbox_id
      ).each(function (trigger) {
        $(trigger).addEvent('click', function () {
          if (
            $(_options.checkbox_1_id) !== null &&
            $(_options.checkbox_2_id) !== null &&
            $(_options.fake_checkbox_id) !== null
          ) {
            $$(
              '#' +
                _options.checkbox_1_id +
                ', #' +
                _options.checkbox_2_id +
                ', #' +
                _options.fake_checkbox_id
            ).each(function (checkbox) {
              $(checkbox).set('checked', true);
            });
            disable_buttons();
            save_log(self.submit_form);
          }
        });
      });
    }

    if ($(_options.skip_button_id) !== null) {
      $(_options.skip_button_id).addEvent('click', function () {
        disable_buttons();
        save_log(self.submit_form);
      });
    }
  };

  var disable_buttons = function () {
    $(_options.confirm_button_id).removeEvents();
    $(_options.skip_button_id).removeEvents();
    $(_options.fake_checkbox_id).removeEvents();
    $(_options.fake_checkbox_id).set('disabled', true);
    return;
  };

  var save_log = function (do_after_saving) {
    var ident = '';

    if (
      $(_options.checkbox_1_id).checked === false &&
      $(_options.checkbox_2_id).checked === false
    ) {
      ident = 'agb_dialog_62_agb_0';
    }

    if (
      $(_options.checkbox_1_id).checked === true &&
      $(_options.checkbox_2_id).checked === false
    ) {
      ident = 'agb_dialog_62_agb_1';
    }

    if (
      $(_options.checkbox_1_id).checked === true &&
      $(_options.checkbox_2_id).checked === true
    ) {
      ident = 'agb_dialog_62_agb_2';
    }

    new Request({
      url: '/cgi-bin/global.pl?todo=log_misc&ident=' + ident,
      onComplete: function () {
        do_after_saving.attempt();
      },
    }).send();
  };

  self.submit_form = function () {
    if (page_submitted === false) {
      page_submitted = true;
      $(_options.form_id).submit();
    }
    return;
  };

  self.test_checkboxes = function () {
    var is_valid = false;
    if (
      $(_options.checkbox_1_id) !== null &&
      $(_options.checkbox_2_id) !== null
    ) {
      if (
        $(_options.checkbox_1_id).get('checked') === true &&
        $(_options.checkbox_2_id).get('checked') === true
      ) {
        is_valid = true;
      }
    }
    return is_valid;
  };

  self.show = function () {
    if (typeof $(_options.layer_id) !== null) {
      $(_options.layer_id).removeClass(_options.hide_class);
    }
    return;
  };

  self.hide = function () {
    if (typeof $(_options.layer_id) !== null) {
      $(_options.layer_id).removeClass(_options.hide_class);
    }
    return;
  };

  init(options);
};

var dccBts = (function () {
  try {
    document.addEventListener('DOMContentLoaded', function () {
      var linkElements = document.getElementsByTagName('a');
      for (var i = 0; i < linkElements.length; i++) {
        linkElements[i].setAttribute('data-dcc', 0);
      }

      function watchBotClicks(event) {
        if (!event) {
          return false;
        }
        var clicked_Element = event.target;
        var clicked_Element_tag_name = event.target.nodeName.toLowerCase();

        if (
          clicked_Element.getAttribute('data-dcc') !== null ||
          clicked_Element.parentElement.getAttribute('data-dcc') !== null
        ) {
          if (
            clicked_Element_tag_name === 'a' &&
            clicked_Element.children.length > 0 &&
            clicked_Element.getAttribute('data-dcc') !== null
          ) {
            for (var j = 0; j < clicked_Element.children.length; j++) {
              clicked_Element.children[j].setAttribute(
                'data-dcc',
                parseInt(clicked_Element.children[j].getAttribute('data-dcc')) +
                  1
              );
            }
          } else if (
            clicked_Element_tag_name !== 'a' &&
            clicked_Element.parentElement.tagName.toLowerCase() === 'a'
          ) {
            clicked_Element.parentElement.setAttribute(
              'data-dcc',
              parseInt(clicked_Element.parentElement.getAttribute('data-dcc')) +
                1
            );
          }

          if (clicked_Element_tag_name === 'a') {
            if (parseInt(clicked_Element.getAttribute('data-dcc')) >= 3) {
              handleAttr(clicked_Element);
            }
          } else {
            if (
              parseInt(
                clicked_Element.parentElement.getAttribute('data-dcc')
              ) >= 3
            ) {
              handleAttr(clicked_Element.parentElement);
            }
          }
          return false;
        }
      }

      function handleAttr(element) {
        element.removeProperties('target', 'class').setAttribute('href', '#');
      }

      var watchedLinkElements = document.querySelectorAll('[data-dcc]');
      for (var l = 0; l < watchedLinkElements.length; l++) {
        watchedLinkElements[l].addEventListener('click', watchBotClicks);
      }
    });
  } catch (error) {}
})();

!(function (e) {
  'function' != typeof e.matches &&
    (e.matches =
      e.msMatchesSelector ||
      e.mozMatchesSelector ||
      e.webkitMatchesSelector ||
      function (e) {
        for (
          var t = this,
            o = (t.document || t.ownerDocument).querySelectorAll(e),
            n = 0;
          o[n] && o[n] !== t;

        )
          ++n;
        return Boolean(o[n]);
      }),
    'function' != typeof e.closest &&
      (e.closest = function (e) {
        for (var t = this; t && 1 === t.nodeType; ) {
          if (t.matches(e)) return t;
          t = t.parentNode;
        }
        return null;
      });
})(window.Element.prototype);

document.addEventListener('DOMContentLoaded', function () {
  var modalButtons = document.querySelectorAll('.js-open-modal'),
    overlay = document.querySelector('.js-overlay-modal'),
    closeButtons = document.querySelectorAll('.js-modal-close');

  modalButtons.forEach(function (item) {
    item.addEventListener('click', function (e) {
      e.preventDefault();

      var modalId = this.getAttribute('data-modal'),
        modalElem = document.querySelector(
          '.modal[data-modal="' + modalId + '"]'
        );

      modalElem.classList.add('active');
      overlay.classList.add('active');
    });
  });

  closeButtons.forEach(function (item) {
    item.addEventListener('click', function (e) {
      var parentModal = this.closest('.modal');

      parentModal.classList.remove('active');
      overlay.classList.remove('active');
    });
  });

  document.body.addEventListener(
    'keyup',
    function (e) {
      var key = e.keyCode;

      if (key == 27) {
        document.querySelector('.modal.active').classList.remove('active');
        document.querySelector('.overlay').classList.remove('active');
      }
    },
    false
  );

  overlay.addEventListener('click', function () {
    document.querySelector('.modal.active').classList.remove('active');
    this.classList.remove('active');
  });
});

!(function (e) {
  'function' != typeof e.matches &&
    (e.matches =
      e.msMatchesSelector ||
      e.mozMatchesSelector ||
      e.webkitMatchesSelector ||
      function (e) {
        for (
          var t = this,
            o = (t.document || t.ownerDocument).querySelectorAll(e),
            n = 0;
          o[n] && o[n] !== t;

        )
          ++n;
        return Boolean(o[n]);
      }),
    'function' != typeof e.closest &&
      (e.closest = function (e) {
        for (var t = this; t && 1 === t.nodeType; ) {
          if (t.matches(e)) return t;
          t = t.parentNode;
        }
        return null;
      });
})(window.Element.prototype);

document.addEventListener('DOMContentLoaded', function () {
  var modalButtons = document.querySelectorAll('.js-open-modal'),
    overlay = document.querySelector('.js-overlay-modal'),
    closeButtons = document.querySelectorAll('.js-modal-close');

  modalButtons.forEach(function (item) {
    item.addEventListener('click', function (e) {
      e.preventDefault();
      var modalId = this.getAttribute('data-modal'),
        modalElem = document.querySelector(
          '.modal[data-modal="' + modalId + '"]'
        );

      modalElem.classList.add('active');
      overlay.classList.add('active');
    });
  });

  closeButtons.forEach(function (item) {
    item.addEventListener('click', function (e) {
      var parentModal = this.closest('.modal');

      parentModal.classList.remove('active');
      overlay.classList.remove('active');
    });
  });

  document.body.addEventListener(
    'keyup',
    function (e) {
      var key = e.keyCode;

      if (key == 27) {
        document.querySelector('.modal.active').classList.remove('active');
        document.querySelector('.overlay').classList.remove('active');
      }
    },
    false
  );

  overlay.addEventListener('click', function () {
    document.querySelector('.modal.active').classList.remove('active');
    this.classList.remove('active');
  });
});
