Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'tasks/index'
      post 'tasks/create'
      put 'tasks/update'
      get 'show/:id', to: 'tasks#show'
      delete '/destroy/:id', to: 'tasks#destroy'
    end
  end

  # get 'home/index'
  root 'home#index'
  get '/*path' => 'home#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
