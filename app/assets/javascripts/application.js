// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require twitter/bootstrap
//= require_tree .

(function(){
    var omnit_auth_client = new OmniAuthClient({
        login_success_callback : function(){
            $("#login-modal").modal("hide");            
        },

        jsonp_callback : function(_template){
            var template = $(_template);
            $("body").append(template);
            template.bind("hidden", function(){   template.remove();  })
            template.modal("show");
        }
    });    

    $.ajaxSetup({
        complete : function(xhr, ts){                           
            omnit_auth_client.jsonp(xhr);
        }
    })
})()
