(function($){

  var BasecampRedirect = function(){
    this.basecampUrl = "http://basecamp.com/";
  }

  BasecampRedirect.prototype.setAccountID = function(accountID){
    if(accountID) {
      localStorage["bcAccountID"] = accountID;
      return true;
    } else {
      $("#error").html("Non numeric ID not supported!");
      return false;
    }
  }

  BasecampRedirect.prototype.getAccountID = function(){
    accountID = parseInt(localStorage["bcAccountID"]);
    if(accountID) return accountID;
  }

  BasecampRedirect.prototype.save = function(){
    if(this.setAccountID(parseInt($("#bc_account_id").val())))
      this.redirect();
  };

  BasecampRedirect.prototype.load = function(){
    $("#bc_account_id").val(this.getAccountID());
  };

  BasecampRedirect.prototype.redirect = function(){
    if(this.getAccountID()) {
      window.location.replace(this.basecampUrl + this.getAccountID());
    } else {
      window.location.replace("/options.html");
    }
  }

  BasecampRedirect.prototype.setup = function(){
    var that = this;
    if(window.location.pathname === "/options.html") {
      $("#save_bc_account_id").on("click", function(ev){ that.save() });
      this.load();
    } else {
      this.redirect();
    }
  }

  $(document).ready(function(){
    var bcRedirect = new BasecampRedirect();
    bcRedirect.setup();
  });

})(jQuery);


