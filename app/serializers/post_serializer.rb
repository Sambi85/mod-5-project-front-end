class PostSerializer < ActiveModel::Serializer
    attributes :img, :description, :date

    has_one :user
    has_many :comments
    has_many :likes
    
end