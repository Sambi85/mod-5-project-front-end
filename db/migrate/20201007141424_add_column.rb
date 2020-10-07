class AddColumn < ActiveRecord::Migration[6.0]
  def change
    add_column :follows, :leader_id, :bigint
    add_column :follows, :follower_id, :bigint
  end
end
