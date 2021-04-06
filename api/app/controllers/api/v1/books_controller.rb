require "httpclient"

module Api
  module V1
    class BooksController < ApplicationController
      before_action :set_book, only: [:show]

      def index
        uri = "https://app.rakuten.co.jp/services/api/BooksTotal/Search/20170404"
        query = URI.encode_www_form({
          applicationId: ENV["APPLICATION_ID"],
          formatVersion: 2,
          booksGenreId: "001",
          keyword: params[:keyword],
          hits: 10, #1ページあたりの取得件数 指定範囲:1~30
          page: params[:page], #取得ページ 指定範囲:1~100
          sort: "standard", # "-releaseDate":発売日(新しい)
        })

        client = HTTPClient.new
        rakuten_res = client.get(uri, query)
        @books = []
        puts "aaa"
        JSON.parse(rakuten_res.body)["Items"].each do |item|
          @books << Book.new(Book.read(item))
        end
        puts "bbb"

        resBooks = []
        @books.each do |book|

          #既にdbに存在する書籍は保存しない
          if exist_book = Book.find_by(isbn: book.isbn)
            book["id"] = exist_book.id
          else
            book.save
          end

          #レスポンス用にjson化
          resBooks << book.parse_json
        end

        resData = { "totalPageCount": JSON.parse(rakuten_res.body)["pageCount"] }
        resData["Items"] = resBooks
        render json: { status: "SUCCESS", message: "Loaded books", data: resData }
      end

      def show
        review_page = params[:reviewPage].to_i
        hits = 10 #1ページあたりの取得件数
        book = @book.parse_json
        start_index = (review_page - 1) * hits
        book["totalPage"] = (book[:reviews].length / 10.to_f).ceil
        book[:reviews].sort_by! { |r| r[:updatedAt] }.reverse!
        book[:reviews] = book[:reviews].slice(start_index, hits)
        if user_signed_in?
          #対象の本が本棚に登録されている時、そのステータスを返す
          if book_shelf = BookShelf.find_by(book_id: book[:id], user_id: current_user.id)
            book[:bookShelfId] = book_shelf.id
            book[:bookShelfStatus] = book_shelf.status
          end
        end

        render json: { status: "SUCCESS", message: "Loaded the book", data: book }
      end

      private

      def set_book
        @book = Book.find(params[:id])
      end
    end
  end
end
