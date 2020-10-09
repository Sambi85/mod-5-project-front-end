class UserSerializer < ActiveModel::Serializer

    attributes :id, :username, :avatar, :quote

    has_many :posts
    has_many :comments
    has_many :likes
    has_many :replies
    has_many :followed_users
    has_many :following_users
 
end