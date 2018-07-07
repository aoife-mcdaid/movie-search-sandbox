class CreateMovies < ActiveRecord::Migration
  def change
    create_table :movies do |t|
      t.string :title
      t.string :alternative_titles
      t.integer :year
      t.string :image
      t.integer :rating
      t.string :actors
      t.string :genres

      t.timestamps null: false
    end
  end
end
