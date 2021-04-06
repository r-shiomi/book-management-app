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
#  page_count       :string(255)
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#
class Book < ApplicationRecord
  has_many :reviews, dependent: :delete_all
  has_many :reviews_users, through: :reviews, source: :user
  has_many :book_shelves, dependent: :delete_all
  has_many :book_shelves_users, through: :book_shelves, source: :user

  #楽天apiのレスポンスデータから必要な項目を絞り込む
  def self.read(item)
    {
      "title": item["title"],
      "author": item["author"],
      "publisher_name": item["publisherName"],
      "sales_date": item["salesDate"],
      "item_caption": item["itemCaption"],
      "isbn": item["isbn"],
      "large_image_url": item["largeImageUrl"],
      "medium_image_url": item["mediumImageUrl"],
      "item_url": item["itemUrl"],
      "page_count": Book.get_page_count(item["isbn"]),
    }
  end

  #OpenbdApiからページ数を取得する
  def self.get_page_count(isbn)
    uri = "https://api.openbd.jp/v1/get"
    query = URI.encode_www_form({
      isbn: isbn,
    })
    client = HTTPClient.new
    openbd_res = client.get(uri, query)

    #apiレスポンスにデータが存在しない時
    if openbd_res.body == "[null]"
      return "-"
    end
    extentData = JSON.parse(openbd_res.body).first["onix"]["DescriptiveDetail"]["Extent"]
    unless extentData && extentData.first
      return "-"
    end

    #apiレスポンスにページ数が存在する場合
    return extentData.first["ExtentValue"]
  end

  def parse_json
    {
      "id": id,
      "title": title,
      "author": author,
      "publisherName": publisher_name,
      "salesDate": sales_date,
      "itemCaption": item_caption,
      "isbn": isbn,
      "largeImageUrl": large_image_url,
      "mediumImageUrl": medium_image_url,
      "itemUrl": item_url,
      "pageCount": page_count,
      "reviews": reviews_to_json(reviews),
    }
  end

  def parse_json_for_review
    {
      "bookId": id,
      "bookTitle": title,
      "bookAuthor": author,
      "bookPublisherName": publisher_name,
      "bookSalesDate": sales_date,
      "bookItemCaption": item_caption,
      "bookLargeImageUrl": large_image_url,
      "bookMediumImageUrl": medium_image_url,
    }
  end

  private

  def reviews_to_json(reviews)
    res = []
    reviews.each do |review|
      res <<
        {
          "id": review.id,
          "content": review.content,
          "createdAt": review.created_at.strftime("%Y-%m-%d %H:%M"),
          "updatedAt": review.updated_at.strftime("%Y-%m-%d %H:%M"),
          "userId": review.user.id,
          "userName": review.user.name,
        }
    end
    return res
  end
end
