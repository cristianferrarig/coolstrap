
$:.unshift(File.dirname(__FILE__)) unless $:.include?(File.dirname(__FILE__)) || $:.include?(File.expand_path(File.dirname(__FILE__)))
#require File.expand_path("../../../coolstrap/lib/coolstrap/version.rb", __FILE__)

require 'rubygems'
require 'pathname'
require 'fileutils'
require 'rbconfig'

module Coolstrap
  module Core
    ROOT_PATH = Pathname(__FILE__).dirname.expand_path
    #autoload  :SPROCKETS_PLUGIN, 'coolstrap/sprockets_plugin.rb'
    #autoload  :VERSION,       'coolstrap/version.rb'
  end
end
