class Api::Auth::PasswordsController < DeviseTokenAuth::PasswordsController
  before_action :ensure_normal_user, only: :create
  
  def ensure_normal_user
    if params[:email].downcase == 'guest@example.com'
      data = {}
      data['message'] = "ゲストユーザーの変更・削除はできません。"
      
      render json: { success: false, data: data }
    end
  end

end
