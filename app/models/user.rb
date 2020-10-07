class User < ApplicationRecord
    has_many :likes
    has_many :posts, through: :likes
    
    has_many :comments
    has_many :posts, through: :comments
    
    has_many :replies
    has_many :comments, through: :replies
    

    has_many :follower_follows, foreign_key: leader_id, class_name: "Follow"
    has_many :followers, through: :follower_follows, source: :follower

    has_many :leader_follows, foreign_key: follower_id, class_name: "Follow"
    has_many :leaders, through: :leader_follows, source: :leaders


end
