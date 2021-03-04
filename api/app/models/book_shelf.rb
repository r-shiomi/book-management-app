class BookShelf < ApplicationRecord
  enum status: [:want_to_read, :reading, :finished_reading, :tsundoku]
  belongs_to :user
  belongs_to :book
end
