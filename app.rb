require 'sinatra'
require 'sinatra/reloader' if development?
require './config.rb'
require 'httparty'

# Show main UI
get '/' do
    @stats = HTTParty.get('https://todoist.com/API/v6/get_productivity_stats?token='+$api_token)
    erb :index
end

# Process todoist webhooks
get '/webhook' do

end
