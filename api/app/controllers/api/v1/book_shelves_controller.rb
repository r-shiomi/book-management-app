module Api
  module V1
    class BookShelvesController < ApplicationController
      before_action :authenticate_user!, only: [:create,:update, :destroy]

      def create
        book_shelf = BookShelf.new(status: params[:status], user_id: current_user.id, book_id: params[:bookId])
        if book_shelf.save
          render json: { status: "SUCCESS", data: book_shelf }
        else
          render json: { status: "ERROR", data: book_shelf.errors }
        end
      end

      def update
        book_shelf = BookShelf.find(params[:id])
        book_shelf.update(status: params[:status])

        render json: {status: "SUCCESS", data: book_shelf}
      end

      def destroy
        book_shelf = BookShelf.find(params[:id])
        book_shelf.destroy

        render json: {status: "SUCCESS", data: book_shelf}
      end

    end
  end
end
