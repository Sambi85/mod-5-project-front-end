class CommentSerializer < ActiveModel::Serializer
    attributes :id, :description, :date

    has_one :user
    has_one :post
end