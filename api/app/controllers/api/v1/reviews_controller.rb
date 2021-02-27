module Api
  module V1
    class ReviewsController < ApplicationController
      before_action :authenticate_user!, only: [:create]

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
