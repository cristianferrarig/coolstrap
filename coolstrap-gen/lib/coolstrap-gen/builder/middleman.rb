module Coolstrap::Generator
  module Builder
    class Middleman
      class << self
        include ::Coolstrap::Generator::Utils
        
        def build
          system "middleman build"
        end

      end
    end
  end
end