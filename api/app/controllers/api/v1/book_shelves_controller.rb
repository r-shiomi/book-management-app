module Api
  module V1
    class BookShelvesController < ApplicationController
      before_action :authenticate_user!, only: [:index, :create, :update, :destroy]

      def index
        page = params[:page].to_i
        book_shelves = User.find(current_user.id).book_shelves.eager_load(:book)
        data = {}
        books = []
        book_shelves.where(status: params[:status]).each do |book_shelf|
          books << book_shelf.book.parse_json        
          books.last["bookShelfAddedDate"] = book_shelf.updated_at.strftime("%Y-%m-%d %H:%M")
        end
        data["totalPage"] = (books.length / 10.to_f).ceil
        hits = 10 #1ページあたりの取得件数
        start_index = (page - 1) * hits
        books = books.slice(start_index,hits)
        data["books"] = books

        render json: { status: "SUCCESS", data: data }
      end

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

        render json: { status: "SUCCESS", data: book_shelf }
      end

      def destroy
        book_shelf = BookShelf.find(params[:id])
        book_shelf.destroy

        render json: { status: "SUCCESS", data: book_shelf }
      end

    end
  end
end
