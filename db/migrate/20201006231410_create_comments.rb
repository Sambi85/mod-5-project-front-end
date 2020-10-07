class CreateComments < ActiveRecord::Migration[6.0]
  def change
    create_table :comments do |t|
      t.bigint :user_id
      t.bigint :post_id
      t.string :description
      t.date :date

      t.timestamps
    end
  end
end
