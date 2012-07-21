require 'session'
module Coolstrap::Gen
  module Simulator
    class Ios < Thor
      class << self
        include ::Coolstrap::Gen::Utils

        def simulate
          # 4.3 simulator: /Applications/Xcode.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/Applications/iOS\ Simulator.app/
          simulator_app = "/Applications/Xcode.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/Applications/iPhone\\ Simulator.app/Contents/MacOS/iPhone\\ Simulator -SimulateApplication"
          app_path = "source/native/ios/build/Release-iphonesimulator/KitchenSink.app/KitchenSink"
          system "echo :::LAUNCHING IPHONE SIMULATOR:::"
          # We need to use the session gem so that we can access the user's aliases
          bash = Session::Bash::new 'program' => 'bash --login -i'
          cmd = "#{simulator_app} #{app_path}"
          #system cmd # ok
          #bash.execute(cmd)
          bash.execute(cmd) { |out, err| puts out }
        end

      end
    
    
      map %w(sim) => 'simulate'
      desc "simulate ", "launch ios/android simulator"
      long_desc "Launch IOS or Android simulator.
                \n\nExample:
                \n\ncoolstrap simulate ios ==> launch iphone simulator"
      def ios(simulator_version="5.1")
        system "echo ::== COOLSTRAP SIMULATOR =="
        ::Coolstrap::Gen::Builder::Ios.build(simulator_version)
        ::Coolstrap::Gen::Simulator::Ios.simulate
          #system "echo you must pass ios or android to coolstrap simulate command."
      end
    
      # def android, o en otro archivo (simulator/android)??
    end
  end
end


# /Applications/Xcode.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/Applications/iPhone\ Simulator.app/Contents/MacOS/iPhone\ Simulator -SimulateApplication source/native/ios/build/Release-iphonesimulator/NativeBridgeiOS.app/NativeBridgeiOS