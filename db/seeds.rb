require 'faker'
require 'pexels'
require 'dotenv'
Dotenv.load

client = Pexels::Client.new(ENV['PEXELS_API_KEY'])
 
User.destroy_all
Post.destroy_all    
Comment.destroy_all
Reply.destroy_all
Like.destroy_all
Follow.destroy_all

client.photos.search('Chicken', per_page: 5).photos.each do |photo|
    user = User.create(username: Faker::GreekPhilosophers.name , password:"123", quote: Faker::GreekPhilosophers.quote , avatar: photo.src.values[3])
end

client.photos.search('Bugs', per_page: 5).photos.each do |photo|
   post = Post.create(user_id: User.all.sample.id, img: photo.src.values[2], description: Faker::Lorem.sentence, date: Time.now)
end

client.photos.search('Seeds', per_page: 5).photos.each do |photo|
    post = Post.create(user_id: User.all.sample.id, img: photo.src.values[2], description: Faker::Lorem.sentence, date: Time.now)
 end

 client.photos.search('Corn', per_page: 5).photos.each do |photo|
    post = Post.create(user_id: User.all.sample.id, img: photo.src.values[2], description: Faker::Lorem.sentence, date: Time.now)
 end

5.times {
    Comment.create(user_id: User.all.sample.id, post_id: Post.all.sample.id, description: Faker::Lorem.sentence, date: Time.now)
}

5.times {
    Like.create(user_id: User.all.sample.id, post_id: Post.all.sample.id, counter: Faker::Number.number(digits: 2), date: Time.now)
}

5.times {
    Reply.create(user_id: User.all.sample.id, comment_id: Comment.all.sample.id, description: Faker::Lorem.sentence, date: Time.now)
}

10.times {
    Follow.create(leader_id: User.all.sample.id, follower_id: User.all.sample.id, date: Time.now)
}
