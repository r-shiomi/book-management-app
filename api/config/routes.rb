Rails.application.routes.draw do
  mount_devise_token_auth_for "User", at: "auth"

  namespace "api" do
    namespace "v1" do
      resources :books
      resources :reviews do
        collection do
          get 'fetch_by_status'
        end
      end
      resources :book_shelves
    end
  end
end
