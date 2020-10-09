class CommentsController < ApplicationController

  def index
    comments = Comment.all
    render json: comments
  end

  def show
    comment = Comment.find(params[:id])
    render json: comment
  end

  def new
    comment = Comment.new
  end

  def create
    comment = Comment.create(comment_params)
    render json: comment
  end

  def update
    comment = Comment.find(params[:id])
      comment.update(user_params)
      render :json => comment, serialzer: UserSerializer
  end

  def delete
    comment = Comment.find(params[:id])
      comment.destory
      render json:{}
  end 
    
  private

  def comment_params
    params.require(:comment).permit(:user_id, :post_id, :description, :date)
  end

end