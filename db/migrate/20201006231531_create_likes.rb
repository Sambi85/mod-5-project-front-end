class CreateLikes < ActiveRecord::Migration[6.0]
  def change
    create_table :likes do |t|
      t.bigint :user_id
      t.bigint :post_id
      t.integer :counter
      t.date :date

      t.timestamps
    end
  end
end
