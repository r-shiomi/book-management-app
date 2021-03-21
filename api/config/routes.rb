Rails.application.routes.draw do
  scope "api" do
    mount_devise_token_auth_for "User", at: "auth", controllers: {
      sessions: 'api/auth/sessions',
      registrations: 'api/auth/registrations',
      passwords: 'api/auth/passwords'
    }

    devise_scope :user do
      post 'auth/guest_sign_in', to: 'api/auth/sessions#new_guest'
    end
  end

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
