class ApplicationController < ActionController::API
  include DeviseTokenAuth::Concerns::SetUserByToken
  skip_before_action :verify_authenticity_token, if: :devise_controller?, raise: false # APIではCSRFチェックをしない
  before_action :configure_permitted_parameters, if: :devise_controller?
  rescue_from StandardError, with: :error500

  def error500(error)
    render json: { errors: [{ code: 'E9999', message: '例外が発生しました' }] }, status: :internal_server_error
  end
  
  def ensure_normal_user
    puts "ensure_normal_user"
    if current_user.email == 'guest@example.com'
      data = {}
      data['message'] = "ゲストユーザーの変更・削除はできません。"
      
      render json: { status: "SUCCESS", data: data }
    end
  end

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:name])
  end
end
