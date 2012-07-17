# coding: utf-8

#"dailyfocus"

require "coolstrap-core/helpers"
helpers Coolstrap::Core::Helpers

set :relative_links, false
set :images_dir,  "assets/images"
set :fonts_dir,  "assets/fonts"
set :css_dir,  "assets/stylesheets"
set :js_dir, "assets/javascripts"
set :markdown, :layout_engine => :haml
set :default_encoding, 'utf-8'

activate :helpers

configure :build do
  activate :compass
  activate :minify_css
  activate :minify_javascript
  activate :relative_assets
end
