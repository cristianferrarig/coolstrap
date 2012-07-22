
module Coolstrap::Gen
  module Builder
    class Ios
      class << self
        include ::Coolstrap::Gen::Utils
        def build(simulator_version="5.1")
          project_name = "KitchenSink"
          project_path = "native/ios/KitchenSink.xcodeproj"
          sdk = "iphonesimulator#{simulator_version}"
          system "xcodebuild -project '#{project_path}' -target '#{project_name}' -sdk '#{sdk}' -configuration Release" # Debug clean build
        end

        def deploy
          # http://blog.octo.com/wp-content/uploads/2010/11/build.txt
          # /usr/bin/xcrun -sdk iphoneos PackageApplication -v "${PROJECT_BUILDDIR}/${APPLICATION_NAME}.app" -o "${BUILD_HISTORY_DIR}/${APPLICATION_NAME}.ipa" --sign "${DEVELOPPER_NAME}" --embed "${PROVISONNING_PROFILE}"
        end
      end
    end
  end
end
