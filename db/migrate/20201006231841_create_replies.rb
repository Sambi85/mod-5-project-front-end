class CreateReplies < ActiveRecord::Migration[6.0]
  def change
    create_table :replies do |t|
      t.bigint :user_id
      t.bigint :comment_id
      t.string :description
      t.date :date

      t.timestamps
    end
  end
end
