require 'rubygems' unless defined?(Gem)
require 'rake'
require 'rspec/core/rake_task'
require 'yard'
require 'bundler'

Bundler::GemHelper.install_tasks :name => GEM_NAME

# Skip the releasing tag
class Bundler::GemHelper
  def release_gem
    guard_clean
    # guard_already_tagged
    built_gem_path = build_gem
    rubygem_push(built_gem_path)
  end
end

desc 'Test the coolstrap plugin.'
RSpec::Core::RakeTask.new('spec') do |t|
  t.pattern = FileList['spec/**/*_spec.rb']
end

YARD::Rake::YardocTask.new
desc 'Default: run unit specs.'
task :default => :spec
