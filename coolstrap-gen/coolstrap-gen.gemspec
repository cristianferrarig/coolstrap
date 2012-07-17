# -*- encoding: utf-8 -*-
$:.push File.expand_path("../lib", __FILE__)
require File.expand_path("../../coolstrap/lib/coolstrap/version.rb", __FILE__)
#require "coolstrap/version"
Gem::Specification.new do |s|
  s.name        = "coolstrap-gen"
  s.version     = Coolstrap::VERSION
  s.authors     = ["Miguel Michelson"]
  s.email       = ["miguelmichelson@gmail.com"]
  s.homepage    = ""
  s.summary     = %q{App Generator for coolstrap mobile framework }
  s.description = %q{Coolstrap-gen is a scaffold generator & static site builder on top of middleman,
                      which adds client support for build, simulate & deploy native apps.}

  s.rubyforge_project = "coolstrap-gen"

  s.files         = `git ls-files`.split("\n")
  s.test_files    = `git ls-files -- {test,spec,features}/*`.split("\n")
  s.executables   = `git ls-files -- bin/*`.split("\n").map{ |f| File.basename(f) }
  s.require_paths = ["lib"]
  
  s.add_runtime_dependency(%q<coffee-script>,       ["~> 2.2.0"])

  s.add_runtime_dependency(%q<colored>,             ["~> 1.2"])
  s.add_runtime_dependency(%q<rake>,                ["~> 0.9.2"])
  s.add_runtime_dependency(%q<nokogiri>,            ["~> 1.4.4"])
  s.add_runtime_dependency(%q<erubis>,              ["~> 2.7.0"])
  s.add_runtime_dependency(%q<rocco>,               ["~> 0.7"])
  s.add_runtime_dependency(%q<thor>,                ["~> 0.15.4"])
  s.add_runtime_dependency(%q<compass>,             ["~> 0.7"])
  s.add_runtime_dependency(%q<session>,             ["~> 3.1"])
  s.add_runtime_dependency(%q<middleman>,           ["~> 3.0.0"])

  # s.add_development_dependency(%q<bundler>,         ["~> 1.0.14"])
  s.add_development_dependency(%q<bundler>,         ["~> 1.1"])
  s.add_development_dependency(%q<rspec>,           ["~> 2.6.0"])
  
end
