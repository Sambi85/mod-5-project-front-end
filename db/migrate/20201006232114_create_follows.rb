class CreateFollows < ActiveRecord::Migration[6.0]
  def change
    create_table :follows do |t|
      t.bigint :leader_id
      t.bigint :follower_id
      t.string :date

      t.timestamps
    end
  end
end
