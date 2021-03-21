require 'rails_helper'

RSpec.describe "Auth::Registrations", type: :request do

  describe "GET /auth/passwords" do
    it "returns http success" do
      get "/auth/registrations/auth/passwords"
      expect(response).to have_http_status(:success)
    end
  end

end
