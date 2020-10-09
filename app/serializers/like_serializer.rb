class LikeSerializer < ActiveModel::Serializer
    attributes :id, :counter, :date
    has_one :user
    has_one :post
end