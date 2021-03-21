class Api::Auth::RegistrationsController < DeviseTokenAuth::RegistrationsController
  before_action :ensure_normal_user, only: %i[update destroy]
end
