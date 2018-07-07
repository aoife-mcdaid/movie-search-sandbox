# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

movie_file = File.read('db/movies.json')

movies = JSON.parse(movie_file)

movies.each do |movie|
  puts "Creating #{movie["title"]}"
  Movie.create(
    title: movie["title"],
    alternative_titles: movie["alternative_titles"],
    year: movie["year"],
    image: movie["image"],
    rating: movie["rating"],
    actors: movie["actors"],
    genres: movie["genres"]
  )
end

puts "DONE!"