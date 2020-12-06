class CreateTasks < ActiveRecord::Migration[6.0]
  def change
    create_table :tasks do |t|
      t.string :name
      t.text :description
      t.datetime :deadline
      t.string :image, default: "https://increasify.com.au/wp-content/uploads/2016/08/default-image.png"
      t.boolean :completed, default: false

      t.timestamps
    end
  end
end
