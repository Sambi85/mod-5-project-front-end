class RepliesController < ApplicationController

  def index
    replies = Reply.all
    render :json => replies
  end

  def show
    reply = Reply.find(params[:id])
    render :json => reply
  end

  def create
    reply = Reply.create(reply_params)
    render :json => reply
  end

  def update
    reply = Reply.find(params[:id])
      reply.update(user_params)
      render :json => reply, serialzer: UserSerializer
  end

  def delete
    reply = Reply.find(params[:id])
      reply.destory
      render json:{}
  end 
  
  private

  def reply_params
    params.require(:reply).permit(:user_id, :post_id, :description, :date)
  end

end