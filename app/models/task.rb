class Task < ApplicationRecord
    has_many :tags, dependent: :destroy
end
