webpackJsonp([6],[function(n,exports,o){(function($){o(2);o(3),$("#toast").on("opened.modal.amui",function(){setTimeout(function(){$(this).modal("close")}.bind(this),1e3)}),$("#cfrPassword").on("change",function(){this.value!==$("[name=newPassword]").val()&&(this.value="",$("#toast-cnt").html("前后输入不一致"),$("#toast").modal("open"))}),$("#modify-form").on("submit",function(n){n.preventDefault()})}).call(exports,o(1))}]);
//# sourceMappingURL=modifypwd.bundle.js.map