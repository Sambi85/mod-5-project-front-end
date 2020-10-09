Rails.application.routes.draw do
resources :users
resources :posts
resources :replies
resources :likes
resources :comments
resources :follows

  
  
  # get 'follows/index'
  # get 'follows/show'
  # get 'replies/index'
  # get 'replies/show'
  # get 'comments/index'
  # get 'comments/show'
  # get 'likes/index'
  # get 'likes/show'
  # get 'posts/index'
  # get 'posts/show'
  # get 'posts/new'
  # get 'posts/create'
  # get 'users/index'
  # get 'users/show'
  # get 'users/new'
  # get 'users/create'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
