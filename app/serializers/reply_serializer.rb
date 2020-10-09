class ReplySerializer < ActiveModel::Serializer
    attributes :id, :date, :description

    has_one :comment
    has_one :user
end