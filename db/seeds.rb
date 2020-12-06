# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


5.times do |index|
    Task.create!({ name: "Task #{index + 1}", description: "This task is to be done" ,completed: false})
  end
  
  puts "5 uncompleted Tasks created"
  
  5.times do |index|
    Task.create!({ name: "Task #{index + 1}",description: "This task is done", completed: true})
  end
  
  puts "5 completed todos created"