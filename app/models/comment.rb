class Comment < ApplicationRecord
    belongs_to :user
    belongs_to :post
    
    has many :replies
    has many :users through :replies
end
