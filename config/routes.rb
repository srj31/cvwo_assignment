Rails.application.routes.draw do

  namespace :api do
    namespace :v1 do
      resources :tasks do
        resources :tags  
      end

      get 'search/:name', to: 'tags#show'
    end
  end
  
  resources :users, only: [:create, :show, :index]

  post '/login',    to: 'sessions#create'
  post '/logout',   to: 'sessions#destroy'
  get '/logged_in', to: 'sessions#is_logged_in?'
  
  get 'home/index'
  root 'home#index'
  get '/*path' => 'home#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
