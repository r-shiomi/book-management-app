class Api::Auth::SessionsController < DeviseTokenAuth::SessionsController
  def new_guest
    data = {}
    puts "aaa"
    user = User.guest
    puts "bbb"
    sign_in user
    puts "ccc"
    data["token"] = user.create_new_auth_token
    data['message'] = "ゲストユーザーとしてログインしました"
    data['user'] = user

    render json: { status: "SUCCESS", data: data }
  end
end
