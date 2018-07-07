class MoviesController < ApplicationController
  def index
    @search_api_key = Rails.application.secrets.SEARCHONLY_API_KEY
  end
end
