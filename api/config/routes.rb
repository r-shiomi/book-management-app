Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth'

  namespace 'api' do
    namespace 'v1' do
      resources :books
      get '/search', to: 'books#search'
      resources :reviews
      resources :book_shelves
    end
  end

end
