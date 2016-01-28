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
    LIST_MENU: CONTEXT_URL + 'sys/user/listMenus.yy',
    RSA_KEY: CONTEXT_URL + 'getrsakey.yy',
    MODIFYPWD: CONTEXT_URL + 'sys/user/modifyPwd.yy',

    REPAY_LIST: CONTEXT_URL + 'repay/list.yy',
    REPAY_DETAIL: CONTEXT_URL + 'repay/detail.yy',
    REPAY_DEBIT: CONTEXT_URL + 'repay/debit.yy'
  },

  UI: {

    Pull: require('./pull'),

    toastinit: function() {
      $('body').append(Handlebars.compile('{{>toast}}')())
      $('#toast').on('opened.modal.amui', function() {
        setTimeout(function() {
          $(this).modal('close')
        }.bind(this), 1000)
      })
    },

    toast: function(msg) {
      $('#toast-cnt').html(msg)
      $('#toast').modal('open')
    }
  },

  getQueryString: function(name) {
    var val = ''
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
    var r = window.location.search.substr(1).match(reg)
    if (r !== null) {
      val = unescape(r[2])
    }
    return val
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

Utils.UI.toastinit()

$( document ).ajaxError(function(event, jqxhr, settings, thrownError) {
  Utils.UI.toast('服务器异常，请稍后...')
  console.error([event, jqxhr, settings, thrownError])
})

$( document ).ajaxComplete(function( event, xhr, settings ) {
  // settings.url,
  var res_data = JSON.parse(xhr.responseText)
  console.log(res_data)

  switch (res_data.status) {
    case 'unlogin':
      Utils.forward('./login.html')
      break;
    case 'warning':
      Utils.UI.toast(res_data.msg)
      break;
    case 'error':
      Utils.UI.toast(res_data.msg)
      break;
    default:
      // no code
  }

})

module.exports = Utils
