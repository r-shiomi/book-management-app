require "httpclient"

uri = "https://app.rakuten.co.jp/services/api/BooksTotal/Search/20170404"
query = URI.encode_www_form({
  applicationId: ENV["APPLICATION_ID"],
  formatVersion: 2,
  booksGenreId: "001",
  keyword: "あ",
  hits: 10, #1ページあたりの取得件数 指定範囲:1~30
  page: 1, #取得ページ 指定範囲:1~100
  sort: "standard", # "-releaseDate":発売日(新しい)
})

client = HTTPClient.new
rakuten_res = client.get(uri, query)
books = []
JSON.parse(rakuten_res.body)["Items"].each do |item|
  books << Book.new(Book.read(item))
end

books.each do |book|
  book.save
end


guest_email = 'guest@example.com'
guest_password = SecureRandom.urlsafe_base64
User.create!(email: guest_email,
name: 'ゲストユーザー',
password: guest_password,
password_confirmation: guest_password,
uid: guest_email,
provider: 'email',
confirmed_at: Time.now  # Confirmable を使用している場合は必要
)


9.times do |n|
  name = Faker::Internet.unique.username
  email = Faker::Internet.safe_email
  password = SecureRandom.urlsafe_base64
  User.create!(name: name,
               email: email,
               password: password,
               password_confirmation: password,
               uid: email)
end

sample_reviews = ["感動した。","面白かった。","参考になった。","最後まで面白かった。","読ませる文章だった。","面白すぎる。","最高でした。","夢中に読み進めました。","期待を裏切らない面白さだった。","心を揺さぶられました。","とても良かったです。","良かった。","とても面白かった。","とても感動した。","すらすらと読めました。","読みやすかったです。","読み応えがあった。","とても読了感のいい作品だと感じました。"]
User.all.each do |user|
  user.reviews.create!(book_id: books.sample.id,
                    content: sample_reviews.sample)
end

guest_book_shelf = BookShelf.create!(user_id: User.find_by(email: guest_email).id,
book_id: books.sample.id,
status: :finished_reading)

Review.create!(book_id: guest_book_shelf.book_id,
user_id: User.last.id,
content: sample_reviews.sample)