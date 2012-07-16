#require "coolstrap"
#compass_config do |config|
#  config.sass_options = {
#    :output_style => :nested, 
#    :images_dir => 'images', 
#    :fonts_dir => 'fonts'}
#end
#activate :sprockets
#activate :livereload
set :images_dir,  "assets/images"
set :fonts_dir,  "assets/fonts"
set :css_dir,  "assets/stylesheets"
set :js_dir, "assets/javascripts"
set :markdown, :layout_engine => :haml
set :default_encoding, 'utf-8'


configure :build do
  activate :compass
  activate :minify_css
  activate :minify_javascript
  activate :relative_assets
end


# Per-page layout changes:
#
# With no layout
# page "/path/to/file.html", :layout => false
#
# With alternative layout
 page "/examples/layouts/*", :layout => "/examples/examples"
 page "/examples/kitchen-sink/*", :layout => "/examples/examples"
 page "/examples/components/*", :layout => "/examples/examples"
 page "/examples/demo/*", :layout => "/examples/examples"
 page "/examples/rhyboo/*", :layout => "/examples/examples"
#
# A path which all have the same layout
# with_layout :admin do
#   page "/admin/*"
# end