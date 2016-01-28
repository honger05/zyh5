require('amazeui/less/amazeui.less')

require('./ajax.handle.js')
require('./widgets.helper.js')

var progress = $.AMUI.progress

$(window).load(function() {
  progress.done(true)
})

$(document).ready(function() {
  progress.set(0.4)
})

var CONTEXT_URL = 'ceis/a/'

var Utils = {

  RSAUtils: require('./rsautils'),

  URL: {
    VALIDATA_IMG: 'ceis/servlet/validateCodeServlet',
    LOGIN: CONTEXT_URL + 'login',
    LOGOUT: CONTEXT_URL + 'logout',
    LIST_MENU: CONTEXT_URL + 'sys/user/listMenus.do',
    RSA_KEY: CONTEXT_URL + 'getrsakey.do',
    MODIFYPWD: CONTEXT_URL + 'sys/user/modifyPwd.do'
  },

  UI: {
    toastinit: function() {
      $('#toast').on('opened.modal.amui', function() {
        setTimeout(function() {
          $(this).modal('close')
        }.bind(this), 800)
      })
    },

    toast: function(msg) {
      $('#toast-cnt').html(msg)
      $('#toast').modal('open')
    }
  },

  forward: function(url) {
    window.location.replace(url)
  },

  storage: {
    set: function(key, val) {
      try {
        var val_str = JSON.stringify(val || {})
        window.sessionStorage.setItem('$' + key, val_str)
      }
      catch (ex) {
        console.error('json stringify error!');
      }
    },
    get: function(key) {
      try {
        var val = window.sessionStorage.getItem('$' + key) || '{}'
        return JSON.parse(val)
      }
      catch (ex) {
        console.error('json parse error!');
      }
    }
  },

  log: function(msg) {
    console.log(msg)
  }

}

module.exports = Utils
