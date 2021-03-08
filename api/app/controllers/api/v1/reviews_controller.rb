module Api
  module V1
    class ReviewsController < ApplicationController
      before_action :authenticate_user!, only: [:index, :create]

      def index
        page = params[:page].to_i
        data = {}
        reviews = []
        case params[:status]
        when "your_reviews"
          user_reviews = User.find(current_user.id).reviews.eager_load(:book)
          user_reviews.each do |review|
            reviews << review.book.parse_json_for_review
            reviews.last["wroteDate"] = review.updated_at.strftime("%Y-%m-%d %H:%M")
            reviews.last["content"] = review.content
          end
        when "other_users_reviews"
          book_shelves = User.find(current_user.id).book_shelves
          current_user_book_shelf_ids = []
          book_shelves.each do |book_shelf|
            current_user_book_shelf_ids << book_shelf.book_id
          end
          #他ユーザのレビューからログインユーザの本棚に登録されている本に関するレビューだけを抽出
          other_users_reviews = Review.where.not(user_id: current_user.id).where("book_id IN (?)", current_user_book_shelf_ids).eager_load(:book,:user)
          other_users_reviews.each do |review|
            reviews << review.book.parse_json_for_review
            reviews.last["wroteDate"] = review.updated_at.strftime("%Y-%m-%d %H:%M")
            reviews.last["content"] = review.content
            reviews.last["userName"] = review.user.name
          end
        end

        data["totalPage"] = (reviews.length / 10.to_f).ceil
        hits = 10 #1ページあたりの取得件数
        start_index = (page - 1) * hits
        reviews = reviews.slice(start_index, hits)
        data["reviews"] = reviews

        render json: { status: "SUCCESS", data: data }
      end

      def create
        review = Review.new(content: params[:content], user_id: current_user.id, book_id: params[:bookId])

        if review.save
          render json: { status: "SUCCESS", data: review }
        else
          render json: { status: "ERROR", data: review.errors }
        end
      end
    end
  end
end
