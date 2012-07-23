# Coolstrap Generator

### An app generator for rapid HTML5 mobile development with [Coolstrap](https://github.com/rhyboo/coolstrap) framework.
  
  
## Requirements

* ruby 1.9.3
* install bundler
* CoffeeScript

## Install the gem

    ➜ gem install coolstrap-gen

### Create a new Project

    ➜ coolstrap project new HelloWorld

### Create your views

    ➜ coolstrap view s list Developers commiters
    ➜ coolstrap view s list Developers watchers

## Run it, et voilà

    ➜ coolstrap r # or coolstrap server

  This command will run an instance of middleman server, since is middleman you can also start the server with 'middleman server' command

### Create your tabbars & toolbars

    ➜ coolstrap view s tabbar Developers watchers
    ➜ coolstrap view s toolbar Developers watchers
    
  Those lines generates partials in views/tabbars & views/toolbars.
  
  To use Tabbars or Toolbars you need to call the partials in the views, for example in a header or footer elements.  

## Build it

    ➜ coolstrap b # or coolstrap build
    
  This command will build middleman static site, since is middleman you can also build with 'middleman build' command
  
### Native Bridges, the fun part

 run app simulator 
 
 http://stackoverflow.com/questions/8351278/run-the-iphone-ipad-simulator-from-the-command-line

build
      /usr/bin/xcodebuild -workspace myApp.xcworkspace -scheme MyAppDemo -sdk iphonesimulator5.1 -configuration Debug clean build
       
      http://blog.carbonfive.com/2011/04/06/building-xcode-4-projects-from-the-command-line/

      http://blog.octo.com/en/automating-over-the-air-deployment-for-iphone/
      
      gotchas
      
      http://stackoverflow.com/questions/9621706/how-can-i-resolve-error-no-developer-directory-found-at-developer

### Contributing to Coolstrap-Generator

* Check out the latest master to make sure the feature hasn't been implemented or the bug hasn't been fixed yet
* Check out the issue tracker to make sure someone already hasn't requested it and/or contributed it
* Fork the project
* Start a feature/bugfix branch
* Commit and push until you are happy with your contribution
* Make sure to add tests for it. This is important so I don't break it in a future version unintentionally.
* Please try not to mess with the Rakefile, version, or history. If you want to have your own version, or is otherwise necessary, that is fine, but please isolate to its own commit so I can cherry-pick around it.

### Local installation

* Download from the repo
* cd /to/coolstrap-generator && rake install
* ruby -Ilib ./bin/coolstrap # test local bin

### Acknowledgments
  * Coolstrap team - Cristian Ferrari, Abraham Barrera, Felipe Funes - for their awesome work on coolstrap framework.
  * This gem is heavily inspired in Ti gem from Robert Evans, so many of this gorgeous code was taken verbatim from that gem, the main difference is that I adapted the code to work with coolstrap mobile framework and middleman static page generator system.

### Copyright

Coolstrap mobile framework is licensed under Apache 2.0 by [Rhyboo](http://Rhyboo.com) & (http://needmorecaffeine.com | @needmorecaffeine)

coolstrap-generator is a project started by Miguel Michelson and mantained by [Continuum](http://continuum.cl) under the same license as coolstrap.
