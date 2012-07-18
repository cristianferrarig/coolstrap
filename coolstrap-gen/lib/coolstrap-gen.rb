
$:.unshift(File.dirname(__FILE__)) unless $:.include?(File.dirname(__FILE__)) || $:.include?(File.expand_path(File.dirname(__FILE__)))
#require File.expand_path("../../../coolstrap/lib/coolstrap/version.rb", __FILE__)

require 'rubygems'
require 'pathname'
require 'fileutils'
require 'rbconfig'
require 'colored'
require 'rocco'
require 'thor'
require 'erubis'
require 'nokogiri'

module Coolstrap
  module Gen
    
    ROOT_PATH = Pathname(__FILE__).dirname.expand_path

    #autoload  :VERSION,       'coolstrap/version.rb'
    autoload  :CLI,           'coolstrap-gen/cli.rb'
    autoload  :Logger,        "coolstrap-gen/logger.rb"
    autoload  :Utils,         "coolstrap-gen/utils.rb"
    
    module Builder
      autoload :Middleman,     'coolstrap-gen/builder/middleman.rb'
      #genautoload :Android,     'coolstrap-gen/builder/android.rb'
      autoload :Ios,     'coolstrap-gen/builder/ios.rb'
    end
    
    module Simulator
      #autoload :Android,     'coolstrap-gen/simulator/middleman.rb'
      autoload :Ios,     'coolstrap-gen/simulator/ios.rb'
    end

    module Generate
      autoload  :Project,     "coolstrap-gen/generate/project.rb"
      autoload  :Model,       "coolstrap-gen/generate/model.rb"
      autoload  :View,        "coolstrap-gen/generate/view.rb"
      autoload  :Controller,  "coolstrap-gen/generate/controller.rb"
    end

    def self.root
      @root ||= Pathname(__FILE__).dirname.expand_path
    end
  end
end
