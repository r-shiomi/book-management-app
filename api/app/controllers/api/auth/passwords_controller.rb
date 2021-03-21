class Api::Auth::PasswordsController < DeviseTokenAuth::PasswordsController
  before_action :ensure_normal_user, only: :update
  
end
