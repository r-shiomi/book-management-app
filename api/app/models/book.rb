# == Schema Information
#
# Table name: books
#
#  id               :bigint           not null, primary key
#  title            :string(255)
#  author           :string(255)
#  publisher_name   :string(255)
#  sales_date       :string(255)
#  item_caption     :text(65535)
#  isbn             :string(255)
#  large_image_url  :string(255)
#  medium_image_url :string(255)
#  item_url         :string(255)
#  amazon_item_url  :string(255)
#  page_count       :string(255)
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#
class Book < ApplicationRecord
end
