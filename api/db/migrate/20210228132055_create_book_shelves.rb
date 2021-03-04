class CreateBookShelves < ActiveRecord::Migration[6.0]
  def change
    create_table :book_shelves do |t|
      t.references :user, null: false, foreign_key: true
      t.references :book, null: false, foreign_key: true
      t.integer :status

      t.timestamps
    end
  end
end
