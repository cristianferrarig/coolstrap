# Coolstrap

### HTML5/CSS3 Mobile Framework

## Develop coolest mobile applications
  - Responsive design without javascript
  - iOS / Android support
  - Powerfull API
  - Zepto and Jquery compatible

[Source](https://github.com/rhyboo/coolstrap) is available on Github.

## Do you want to develop Coolstrap?

### Prerequisites
  - Install Ruby 1.9.2 or 1.9.3
  - Install [bundler](http://gembundler.com/)

### Installation of middleman
  - $ bundle install

If you need more information about middleman, please visit [Middleman documentation](http://http://middlemanapp.com/guides/getting-started)

### Test
  - $ middleman server
  - for better results test applicacion in webkit based navigator.
  - visit [http://localhost:4567/index.html](http://localhost:4567/index.html) to see samples

### Deploy
  - $ middleman build
  Then you can see in <build> directory:
  - Coolstrap Framework: coolstrap-js/coolstrap-0.1.js
  - Coolstrap Framework Packed with Zepto and iScroll: coolstrap-js/coolstrap-0.1.packed.js

### Documentation 
#### generation for js with docco ( [docco repo](http://jashkenas.github.com/docco/) )
  + sudo npm install docco
  + docco source/assets/javascripts/**/*.coffee

## Do you want to use Coolstrap?
### coming soon...

## Convenience Helpers

  Coolstrap comes with some convenience helpers methods for header, footer, sections, list_view and more.
  see: lib/coolstrap-generator/templates/. to see more examples.
  
### Some examples
### Header    
    = header do
      = toolbar(:control=>true) do
        %a= icon(:facebook)
        %a= icon(:facebook)
        %a= icon(:comments)
### Footer & tabbars   
    = footer do  
      = tabbar do
        = link_to "#" do
          = icon(:facebook)
### List views  
    = article(:class=>"scrollable") do
      = list_view(:class=>"inset") do
      = list_item(:arrow=>"right")
      = divider do
        2. Title and description with arrow and avatar
    
    = list_view(:class=>"inset") do 
      = divider do
        1. Title and description widht avatar
      = list_item do
        ....
### Dialogs        
    = dialog(:id=>"mymodal") do
      = link_to "#mymodal", "data-target" => "close" do
        = icon :"remove-circle"
      %h1 Cras mattis consectetur purus sit amet fermentumm agnis dis parturient mo.



### Contributing
  + Fork it
  + Create your feature branch (`git checkout -b my-new-feature`)
  + Commit your changes (`git commit -am 'Added some feature'`)
  + Push to the branch (`git push origin my-new-feature`)
  + Create new Pull Request
  
  ## Installation

  Add this line to your application's Gemfile:

      gem 'coolstrap'

  And then execute:

      $ bundle

  Or install it yourself as:

      $ gem install coolstrap


## Credits
Created by [Cristian Ferrari](http://twitter.com/energetico).
Co-Authors [Abraham Barrera](http://twitter.com/abraham_barrera) and
[Felipe Funes](http://twitter.com/nifoQue).

Copyright (c) 2012 by Rhyboo.

## Licensing Options
See LICENSE.txt for license.