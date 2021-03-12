module Api
  module V1
    class ReviewsController < ApplicationController
      before_action :authenticate_user!, only: [:fetch_by_status, :create]

      #新着レビュー取得
      def index
        data = {}
        reviews = []
        new_reviews = Review.order(updated_at: :DESC).limit(9).eager_load(:book, :user)
        new_reviews.each do |review|
          reviews << review.book.parse_json_for_review
          reviews.last["reviewDate"] = review.updated_at.strftime("%Y-%m-%d %H:%M")
          reviews.last["content"] = review.content
          reviews.last["userName"] = review.user.name
        end
        data["reviews"] = reviews

        render json: { status: "SUCCESS", data: data }
      end

      def fetch_by_status
        page = params[:page].to_i
        data = {}
        reviews = []
        case params[:status]
        when "your_reviews"
          user_reviews = User.find(current_user.id).reviews.order(updated_at: :DESC).eager_load(:book)
          user_reviews.each do |review|
            reviews << review.book.parse_json_for_review
            reviews.last["reviewDate"] = review.updated_at.strftime("%Y-%m-%d %H:%M")
            reviews.last["content"] = review.content
          end
        when "other_users_reviews"
          book_shelves = User.find(current_user.id).book_shelves
          current_user_book_shelf_ids = []
          book_shelves.each do |book_shelf|
            current_user_book_shelf_ids << book_shelf.book_id
          end
          #他ユーザのレビューからログインユーザの本棚に登録されている本に関するレビューだけを抽出
          other_users_reviews = Review.where.not(user_id: current_user.id).where("book_id IN (?)", current_user_book_shelf_ids).order(updated_at: :DESC).eager_load(:book, :user)
          other_users_reviews.each do |review|
            reviews << review.book.parse_json_for_review
            reviews.last["reviewDate"] = review.updated_at.strftime("%Y-%m-%d %H:%M")
            reviews.last["content"] = review.content
            reviews.last["userName"] = review.user.name
          end
        end
        sliceReviews(data, reviews, page)

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

      private

      def sliceReviews(data, reviews, page)
        data["totalPage"] = (reviews.length / 10.to_f).ceil
        hits = 10 #1ページの取得件数
        start_index = (page - 1) * hits
        reviews = reviews.slice(start_index, hits)
        data["reviews"] = reviews
      end
    end
  end
end
