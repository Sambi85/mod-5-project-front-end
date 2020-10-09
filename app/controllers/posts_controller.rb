class PostsController < ApplicationController

  def index
    posts = Post.all
    render :json => posts, each_serialzer: PostSerializer
  end

  def show
    post = Post.find(params[:id])
    render :json => post, serialzer: PostSerializer
  end

  def create
    post = Post.create(post_params)
    render :json => post
  end

  def update
    post = Post.find(params[:id])
      post.update(user_params)
      render :json => post, serialzer: UserSerializer
  end

  def delete
    post = Post.find(params[:id])
      post.destory
      render json:{}
  end 
  
  private

  def post_params
    params.require(:post).permit(:img, :description, :date)
  end

end