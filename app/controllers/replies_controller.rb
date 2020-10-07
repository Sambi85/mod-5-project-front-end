class RepliesController < ApplicationController

  def index
    replies = Reply.all
    render json: replies
  end

  def show
    reply = Reply.find(params[:id])
    render json: reply
  end

  def new
    reply = Reply.new
  end

  def create
    reply = Reply.create(reply_params)
    render json: reply
  end
  
  private

  def reply_params
    params.require(:reply).permit(:user_id, :post_id, :description, :date)
  end

end