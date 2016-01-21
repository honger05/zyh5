
var Utils = require('utils')
require('../../common/common.scss')

$('#doc-form-file').on('change', function() {
  var fileNames = '';
  $.each(this.files, function() {
    fileNames += '<span class="am-badge">' + this.name + '</span> ';
  });
  $('#file-list').html(fileNames);
});
