class Post < ApplicationRecord
    has many :comments
    has many :users, through :comments
    
    has many :likes
    has many :users, through :likes

end
