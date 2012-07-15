require "sprockets-plugin"

class CoolstrapPlugin < Sprockets::Plugin 
  # Set the root path to use relative paths in `.append_path`
  root File.expand_path("../..", __FILE__)
  append_path "lib/assets/fonts"      
  append_path "lib/assets/images"      
  append_path "lib/assets/javascripts" 
  append_path "lib/assets/stylesheets" 
end