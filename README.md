# Coolstrap

### HTML5/CSS3 Mobile Framework

## Develop coolest mobile applications
  - Responsive design without javascript.
  - iOS / Android support for hybrid integration.
  - Powerfull API.
  - Zepto and Jquery compatible.

[Source](https://github.com/rhyboo/coolstrap) is available on Github.

## DISCLAIMER:
  
  [Coolstrap](https://github.com/rhyboo/coolstrap) isn't production ready, so the project should be treated like that until we release an stable version.

## Coolstrap usage

### Prerequisites
  - Install Ruby 1.9.2 or 1.9.3
  - Install [bundler](http://gembundler.com/)

## Create Run & build application

## Install the gem

    ➜ gem install coolstrap

### Create a new Project

    ➜ coolstrap project new HelloWorld

  Coolstrap main application lives on top of middleman,
  If you need more information about middleman, please visit [Middleman documentation](http://http://middlemanapp.com/guides/getting-started)

### Create views

    ➜ coolstrap view s list Developers commiters

## Run it, et voilà

    ➜ coolstrap r # or coolstrap server

  This command will run an instance of middleman server, since is middleman you can also start the server with 'middleman server' command

  - for better results test applicacion in webkit based navigator.
  - visit [http://localhost:4567/index.html](http://localhost:4567) to see samples

### Build HTML app

    ➜ coolstrap build

  Then you can see in <build> directory:
    
  - Coolstrap Framework: coolstrap-js/coolstrap-0.1.js
  - Coolstrap Framework Packed with Zepto and iScroll: coolstrap-js/coolstrap-0.1.packed.js

### Simulate Apps

    ➜ coolstrap simulate ios

  This buidls ios app & opens Iphone simulator with you application. Android support is on the way.

### Documentation

  > [See our wiki](https://github.com/rhyboo/coolstrap/wiki/_pages) for more information on how to test, develop and more.

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

