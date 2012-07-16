module Coolstrap::Gen
  module Builder
    class Middleman
      class << self
        include ::Coolstrap::Gen::Utils
        
        def build
          system "middleman build"
        end

      end
    end
  end
end