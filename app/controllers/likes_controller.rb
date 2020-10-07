class LikesController < ApplicationController
  
  def index
    likes = Likes.all
    render json: likes
  end

  def show
    like = Like.find(params[:id])
    render json: like
  end

  def new
    like = Like.new
  end

  def create
    like = Like.create(like_params)
    render json: like
  end
  
  private

  def like_params
    params.require(:like).permit(:user_id, :post_id, :counter, :date)
  end

end
