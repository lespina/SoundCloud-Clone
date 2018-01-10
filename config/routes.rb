Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'static_pages#root'

  namespace :api, defaults: { format: :json } do
    resources :likes, only: [:destroy]
    resources :follows, only: [:destroy]
    resources :reposts, only: [:destroy]
    resources :songs, only: [:index, :create, :show, :update]
    resources :users, only: [:index, :create, :show, :update] do
      resources :likes, only: [:create]
      resources :follows, only: [:create]
      resources :reposts, only: [:create]
    end
    resource :session, only: [:create, :destroy]
  end

end
