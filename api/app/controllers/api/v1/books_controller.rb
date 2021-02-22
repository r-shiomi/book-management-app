require 'httpclient'
require "pry"

module Api
  module V1
    class BooksController < ApplicationController
    
      def search
        uri = "https://app.rakuten.co.jp/services/api/BooksTotal/Search/20170404"
          query = URI.encode_www_form({
            applicationId: ENV['APPLICATION_ID'],
            formatVersion: 2,
            booksGenreId: "001",
            keyword: params[:keyword], 
            hits: 10, #1ページあたりの取得件数 指定範囲:1~30
            page: 1, #取得ページ 指定範囲:1~100
            sort: "standard", # "-releaseDate":発売日(新しい)
          })
        
        client = HTTPClient.new
        rakuten_res = client.get(uri,query)
        books = []
        JSON.parse(rakuten_res.body)["Items"].each do |item|
          books << read(item)
        end

        render json: {status: 'SUCCESS', message: 'Loaded books', data: books}
      end

      private
      #楽天apiのレスポンスデータから必要な項目を絞り込む
      def read(item)
        {
          "title": item["title"],
          "author": item["author"],
          "publisherName": item["publisherName"],
          "salesDate": item["salesDate"],
          "itemCaption": item["itemCaption"], 
          "isbn":  item["isbn"],
          "largeImageUrl": item["largeImageUrl"],
          "mediumImageUrl": item["mediumImageUrl"],
          "itemUrl": item["itemUrl"],
          "amazonItemUrl": "http://amazon.jp/dp/" + item["isbn"],
          "pageCount": get_page_count(item["isbn"]),
        }   
      end

      #OpenbdApiからページ数を取得する
      def get_page_count(isbn)
        uri = "https://api.openbd.jp/v1/get"
        query = URI.encode_www_form({
          isbn: isbn
        })
        client = HTTPClient.new
        openbd_res = client.get(uri,query)
        
        #apiレスポンスが存在しない時
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

    end
  end
end

