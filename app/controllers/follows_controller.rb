class FollowsController < ApplicationController
 
  def index
    follows = Follow.all
    render json: follows
  end

  def show
    follow = Follow.find(params[:id])
    render json: like
  end

  def new
    follow = Follow.new
  end

  def create
    follow = Follow.create(follow_params)
    render json: follow
  end
  
  private

  def follow_params
    params.require(:follow).permit(:leader_id, :follower_id, :date)
  end

end
