# frozen_string_literal: true

class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  include DeviseTokenAuth::Concerns::User

  validates :password, format: { with: /\A[a-zA-Z0-9]+\z/ }
  validates :name, presence: true, uniqueness: true, length: { maximum: 20 }
end
