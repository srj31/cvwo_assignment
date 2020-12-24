# Task Schema
# t.string "name"
# t.text "description"
# t.datetime "deadline"
# t.string "image", default: "https://increasify.com.au/wp-content/uploads/2016/08/default-image.png"
# t.boolean "completed", default: false
# t.datetime "created_at", precision: 6, null: false
# t.datetime "updated_at", precision: 6, null: false
# t.integer "user_id"
# t.index ["user_id"], name: "index_tasks_on_user_id"


class Task < ApplicationRecord
    belongs_to :user
    has_many :tags, dependent: :destroy
    validates :name, presence: true
    validates :description, presence: true
end
