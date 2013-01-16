data = YAML::load_file(Rails.root.join("config/sso.yaml"))

data["accounts"].each do | key, val |	
    Rails.application.config.send("sso_#{key}=".to_sym, val)
end

