class ChangeColumns < ActiveRecord::Migration[6.0]
  def change
    remove_column :follows, :leader_id, :bigint
    remove_column :follows, :follower_id, :bigint
  end
end
