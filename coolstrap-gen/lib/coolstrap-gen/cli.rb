module Coolstrap::Generator
  class CLI < Thor
    include Utils

    STATUS_TYPES = {:success          => 0,
                    :general_error    => 1,
                    :not_supported    => 3,
                    :not_found        => 4,
                    :incorrect_usage  => 64,
                    }

    no_tasks {
      def cli_error(message, exit_status=nil)
        $stderr.puts message
        exit_status = STATUS_TYPES[exit_status] if exit_status.is_a?(Symbol)
        exit(exit_status || 1)
      end
    }

    ### TODO: When these commands list grows big, we need to move them into a seperate commands.rb file
    map %w(--version -v) => 'info'
    desc "info", "information about Coolstrap::Generator."
    def info
      say "Version #{::Coolstrap::Gen::VERSION}"
    end

    map %(n) => 'new'
    desc "new <name> ", "generates a new Coolstrap project."
    long_desc "Generates a new Coolstrap project. See 'coolstrap help new' for more information.
              \n\nExample:
              \n\ncoolstrap new demo ==> Creates a new project skeleton."
    def new(name, device_id='org.mycompany.demo', platform='iphone')
      ::Coolstrap::Gen::Generate::Project.create(name, device_id, platform)
    end
    
    map %w(s) => 'scaffold'
    desc "scaffold <list/complexlist/tabbar/toolbar/dialog> <domain> <name>", "generate a scaffold for Coolstrap elements."
    def scaffold(cs_type, domain, name)
      ::Coolstrap::Gen::Generate::View.create(name, { 
        :domain   => domain, 
        :cs_type  => cs_type, 
        :name     => name })
    end

    map %w(g) => 'generate'
    #TODO: models, bridges
    desc "generate <view> <name>", "generate a view"
    def generate(type, name)
      case 
      when type =~ /view/i
        ::Coolstrap::Gen::Generate::View.create(name)
      end
    end

    map %w(r) => 'server'
    desc "server ", "run middleman app"
    def server
      system "echo == :::COOLSTRAP STARTING::: =="
      system "bundle exec middleman server"
    end

    map %w(b) => 'build'
    desc "build ", "builds middleman/ios/android app"
    long_desc "Build Coolstrap static files (middleman) or Builds an ios app. See 'coolstrap help build' for more information.
              \n\nExample:
              \n\ncoolstrap build ios ==> build iphone app.
              \n\ncoolstrap build ios 5.1 ==> build iphone app with sdk 5.1.
              \n\ncoolstrap build mm ==> build middleman static files.
              \n\ncoolstrap build ==> build middleman & IOS."
              
    def build(type="", ver="5.1")
      system "echo ::== COOLSTRAP BUILD =="
      case type
      when "mm"
        ::Coolstrap::Gen::Builder::Middleman.build
      when "ios"
        ::Coolstrap::Gen::Builder::Ios.build(ver)
      else
        ::Coolstrap::Gen::Builder::Middleman.build
        ::Coolstrap::Gen::Builder::Ios.build
      end
    end
    
    
    map %w(sim) => 'simulate'
    desc "simulate ", "launch ios/android simulator"
    long_desc "Launch IOS or Android simulator.
              \n\nExample:
              \n\ncoolstrap simulate ios ==> launch iphone simulator"
    
    def simulate(type="")
      system "echo ::== COOLSTRAP SIMULATOR =="
      case type
      when "ios"
        ::Coolstrap::Gen::Simulator::Ios.simulate
      #when "android"
      # ::Coolstrap::Gen::Simulator::Android.simulate
      else
        system "echo you must pass ios or android to coolstrap simulate command."
      end
    end
    
  end
end
