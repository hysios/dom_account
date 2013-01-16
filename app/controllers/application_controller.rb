require 'net/http'

class ApplicationController < ActionController::Base
  include ApplicationHelper
  protect_from_forgery

  helper_method :login_required

  def login_required        
    if !current_user                
      respond_to do |format|    
        format.js{
          response_headers
          render :js => "ok".to_json } 
        format.html{ 
          redirect_to '/auth/wanliuid'  }        
        format.json {
          render :json => { 'error' => 'Access Denied' }.to_json   }
      end
      return false
    end
  end

  # def current_user
  #   return nil unless session[:user]
  #   session[:user]
  # end

  private
  def response_headers    
    options = auth_params
    response.headers["sso_auth_url"] = authorize_url
    response.headers["sso_auth_params"] = options.to_json
    foreg_state(options)    
  end

  def wanliu_omniauth_options     
    OmniAuth::Strategies::WanliuId.default_options.client_options 
  end

  def auth_params
    {
      :response => "code",
      :client_id =>  Rails.application.config.sso_app_id,
      :redirect_uri => "#{request.env["REQUEST_URI"]}auth/wanliuid/callback",
      :state => SecureRandom.hex(24)      
    }
  end

  def foreg_state(options)
    session["omniauth.state"] = options[:state]  
  end

  def authorize_url
    wanliu_omniauth_options.authorize_url
  end
end
