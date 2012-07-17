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



## Create Run & build application

## Install the gem

    ➜ gem install coolstrap-gen

### Create a new Project

    ➜ coolstrap new HelloWorld
    
  Coolstrap main application lives on top of middleman, 
  If you need more information about middleman, please visit [Middleman documentation](http://http://middlemanapp.com/guides/getting-started)

### Create views

    ➜ coolstrap s list Developers commiters    
    
### Run Server

    ➜ coolstrap server
    
  This actually runs a middleman server, that actually runs a thin instance :)
  You can run with the middleman commands too.
  
  - for better results test applicacion in webkit based navigator.
  - visit [http://localhost:4567/index.html](http://localhost:4567/index.html) to see samples
  
  
### Build HTML app
 
    ➜ coolstrap build
    
  Then you can see in <build> directory:
  - Coolstrap Framework: coolstrap-js/coolstrap-0.1.js
  - Coolstrap Framework Packed with Zepto and iScroll: coolstrap-js/coolstrap-0.1.packed.js
  - TODO: Build native apps, deploy them to xstore

### Simulate Apps

    ➜ coolstrap simulate ios  
    
  This opens Iphone simulator with you application


## Convenience Helpers in coolstrap-gen

  Coolstrap comes with some convenience helpers methods for header, footer, sections, list_view and more.
  see: lib/coolstrap-gen/templates/. to see more examples.
  
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



## Test

 clone repo and run

    ➜ rake test


### Documentation 
#### generation for js with docco ( [docco repo](http://jashkenas.github.com/docco/) )
  + sudo npm install docco
  + docco source/assets/javascripts/**/*.coffee

### Contributing
  
  * Check out the latest master to make sure the feature hasn't been implemented or the bug hasn't been fixed yet
  * Check out the issue tracker to make sure someone already hasn't requested it and/or contributed it
  * Fork the project
  * Start a feature/bugfix branch
  * Commit and push until you are happy with your contribution
  * Make sure to add tests for it. This is important so I don't break it in a future version unintentionally.
  * Please try not to mess with the Rakefile, version, or history. If you want to have your own version, or is otherwise necessary, that is fine, but please isolate to its own commit so we can cherry-pick around it.

## Credits

+ Created by [Cristian Ferrari](http://twitter.com/energetico).
+ Co-Authors [Abraham Barrera](http://twitter.com/abraham_barrera) and
+ [Felipe Funes](http://twitter.com/nifoQue).
+ Gem mantainer [Miguel Michelson](http://github.com/michelson)


## Licensing Options

Coolstrap mobile framework is licensed under Apache 2.0 by [Rhyboo](http://needmorecaffeine.com | @needmorecaffeine)

See LICENSE.txt for license.
Copyright 2012 [Rhyboo](http://needmorecaffeine.com | @needmorecaffeine)

