class Movie < ActiveRecord::Base
  serialize :alternative_titles, Array
  serialize :actors, Array
  serialize :genres, Array

  include AlgoliaSearch

  algoliasearch do
    attribute :title, :alternative_titles, :year, :rating, :actors, :genres
    searchableAttributes ['title', 'alternative_titles', 'year', 'rating', 'actors', 'genres']
    customRanking ['desc(rating)']
  end
end
