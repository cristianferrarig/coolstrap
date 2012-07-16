# -*- encoding: utf-8 -*-
require File.expand_path('../lib/coolstrap/version', __FILE__)

Gem::Specification.new do |gem|
  gem.authors       = ["Cristian Ferrari", "Abraham Barrera"]
  gem.email         = ["cristianferrarig@gmail.com"]
  gem.description   = %q{HTML5/CSS3 Mobile Framework}
  gem.summary       = %q{Develop coolest mobile applications
                        - Responsive design without javascript
                        - iOS / Android support
                        - Powerfull API
                        - Zepto and Jquery compatible}
  gem.homepage      = ""

  gem.files         = `git ls-files`.split($\)
  gem.executables   = gem.files.grep(%r{^bin/}).map{ |f| File.basename(f) }
  gem.test_files    = gem.files.grep(%r{^(test|spec|features)/})
  gem.name          = "coolstrap"
  gem.require_paths = ["lib"]
  gem.version       = Coolstrap::VERSION
  gem.add_runtime_dependency("sprockets-plugin")
  gem.add_runtime_dependency("%q<coolstrap-generator>", ["~> 0.1.4"])
  gem.add_development_dependency(%q<bundler>,         ["~> 1.1.pre.10"])
  gem.add_development_dependency(%q<rspec>,           ["~> 2.6.0"])
  gem.add_development_dependency(%q<middleman>,         ["~> 3.0.0"])
  
end
