require "sso"

sso_app_id = Rails.application.config.sso_app_id
sso_app_secret = Rails.application.config.sso_app_secret

Rails.application.config.middleware.use OmniAuth::Builder do 
    provider :WanliuId , sso_app_id, sso_app_secret
end

