//author : huxinghai
//describe : 登陆系统客户端

window.OmniAuthClient = function(options){

    this.default_params = {
        login_success_callback : function(template){},          //成功登陆回调
        jsonp_callback_name : "omnit_auth_client_callback",     //跨域回调函数名 
        jsonp_callback : function(login_template){},            //跨域回调函数
        pm_type : "render_login_load"                           //iframe消息name
    }

    $.extend(this.default_params, options);    
    this.pm_send();
    this.pm_bind();
    window[this.default_params.jsonp_callback_name] = this.default_params.jsonp_callback
    
}

OmniAuthClient.prototype.pm_bind = function(){
    //接收消息, 
    // 1. 当加载对话成功时告诉登陆系统是ajax登陆
    // 2. 登陆成功触发事件 status : true 
    pm.bind(this.default_params.pm_type, $.proxy(function(status){                        
        if(status){
            if(typeof this.default_params.login_success_callback == "function"){
                this.default_params.login_success_callback.apply(this)
            }
        }
    }, this)) 
}

OmniAuthClient.prototype.pm_send = function(){
    if(!$.pm){ 
        console.error("include postMessage.js file ? ");
        return 
    }

    //登陆成功触发iframe的父类消息,告诉它登陆成功
    pm({  target : window.parent,  type : this.default_params.pm_type,  data : true });
}

OmniAuthClient.prototype.jsonp = function(xhr){
    var url = xhr.getResponseHeader("sso_auth_url");
    if(url){        
        var data = JSON.parse(xhr.getResponseHeader("sso_auth_params"));
        $.ajax({
            url : url,  
            data : data,
            dataType : "jsonp",                    
            jsonpCallback : this.default_params.jsonp_callback_name
        });        
    }
}