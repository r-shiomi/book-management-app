class Api::Auth::RegistrationsController < DeviseTokenAuth::RegistrationsController
  before_action :ensure_normal_user, only: %i[update destroy]

  def ensure_normal_user
    if current_user.email == 'guest@example.com'
      data = {}
      data['message'] = "ゲストユーザーの変更・削除はできません。"
      
      render json: { success: false, data: data }
    end
end
