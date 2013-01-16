class SessionsController < ApplicationController
    def new                      
        omniauth = env['omniauth.auth']                
        user = User.where(:uid => omniauth['uid']).first
        if not user        
          user = User.new(:uid => omniauth['uid'])
        end
        user.login = omniauth['info']['email']               
        user.save
        session[:user_id] = omniauth

        flash[:notice] = "Successfully logged in"        
        respond_to do | format |
            format.js{ 
                render :js => "alert('success request!')"  }
            format.html{
                redirect_to root_path }            
        end
    end

    def destroy
        session[:user_id] = nil
        
        respond_to do | format |
            format.js{ 
                render :js => "alert('success clear session !');" }
            format.html{
                redirect_to new_home_path  }            
        end        
    end
end