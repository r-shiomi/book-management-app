class CreateBooks < ActiveRecord::Migration[6.0]
  def change
    create_table :books do |t|
      t.string :title
      t.string :author
      t.string :publisher_name
      t.string :sales_date
      t.text :item_caption
      t.string :isbn
      t.string :large_image_url
      t.string :medium_image_url
      t.string :item_url
      t.string :page_count

      t.timestamps
    end
  end
end
