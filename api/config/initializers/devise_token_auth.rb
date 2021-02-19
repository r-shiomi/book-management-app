# frozen_string_literal: true

DeviseTokenAuth.setup do |config|
  # リクエストごとにトークンを更新するか
  # 扱いやすいようにFalseにします
  config.change_headers_on_each_request = false

  # トークンの有効期限
  # デフォルトでは2週間です
  config.token_lifespan = 2.weeks

  # ヘッダーの名前対応
  config.headers_names = { :'access-token' => "access-token",
                           :'client' => "client",
                           :'expiry' => "expiry",
                           :'uid' => "uid",
                           :'token-type' => "token-type" }

  config.token_cost = Rails.env.test? ? 4 : 10
end
