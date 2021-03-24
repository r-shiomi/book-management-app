class Api::Auth::SessionsController < DeviseTokenAuth::SessionsController
  def new_guest
    data = {}
    user = User.guest
    sign_in user
    data["token"] = user.create_new_auth_token
    data['message'] = "ゲストユーザーとしてログインしました"
    data['user'] = user

    render json: { status: "SUCCESS", data: data }
  end
end
