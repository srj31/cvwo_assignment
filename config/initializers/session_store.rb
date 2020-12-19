if Rails.env === 'production' 
    Rails.application.config.session_store :cookie_store, key: '_cvwo_assignment', domain: 'cvwo_assignment-json-api'
  else
    Rails.application.config.session_store :cookie_store, key: '_cvwo_assignment'

  end