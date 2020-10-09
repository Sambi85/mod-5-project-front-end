class FollowSerializer < ActiveModel::Serializer
    attributes :id, :date
    has_one :follower
    has_one :leader
end