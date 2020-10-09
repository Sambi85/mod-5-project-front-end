class UsersController < ApplicationController

  def index
    users = User.all
    render :json => users, each_serializer: UserSerializer 
  end

  def show
    user = User.find(params[:id])
    render :json => user, serialzer: UserSerializer
  end

  def create
    user = User.create(user_params)
    render json: user
  end

  def update
    user = User.find(params[:id])
      user.update(user_params)
      render :json => user, serialzer: UserSerializer
  end

  def delete
    user = User.find(params[:id])
      user.destory
      render json:{}
  end 
  
  private

  def user_params
    params.require(:user).permit(:username, :password, :quote, :avatar)
  end

end
