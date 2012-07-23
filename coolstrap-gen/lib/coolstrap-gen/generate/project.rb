require 'session'
module Coolstrap
  module Gen
    module Generate
      class Project < Thor
        
        class << self
          attr_accessor :project_name, :device_platform, :app_id
          include ::Coolstrap::Gen::Utils
          # Coolstrap::Generator::Generate::Project.create('demo', 'org.codewranglers.demo', 'ipad')
          def create(name, id, platform='iphone')
            @project_name    = name
            @device_platform = platform
            @app_id          = id

            begin
              create_directories('tmp')
              copy_defaults
              remove_old_files
              generate_files
              copy_bridges
              log "Your Coolstrap project is ready for you to get coding!"
            rescue => e
              error "There was an error generating your Coolstrap project. #{e} #{e.backtrace}"
            end
          end

          def copy_defaults
            #FileUtils.cp(location.join("Resources/KS_nav_ui.png"),    "/tmp/")
            #FileUtils.cp(location.join("Resources/KS_nav_views.png"), "/tmp/")
          end

          def generate_files
            create_project_directory
            full_app_hash = {:app_name => @project_name, :app_name_underscore => underscore(@project_name), :platform => @device_platform}
            create_with_template('.gitignore', 'defaults/gitignore', full_app_hash)
            create_with_template('Gemfile', 'defaults/Gemfile', full_app_hash)
            create_with_template('LICENSE', 'defaults/LICENSE', full_app_hash)
            create_with_template('coolstrap.yml', 'defaults/coolstrap.yml', full_app_hash)

            create_with_template('config.rb', 'defaults/config', full_app_hash)
            default_templates = ['Readme.mkd']
            default_templates.each do |tempfile|
              create_with_template(tempfile, "defaults/#{tempfile}", full_app_hash)
            end

            FileUtils.cp_r(templates("app/views/shared/."), location.join("source/views/shared") )
            FileUtils.cp_r(templates("app/assets/."), location.join("source/assets") )

            create_with_template('source/index.html.haml', 'app/index.html.haml', full_app_hash)
            create_with_template('source/layout.haml', 'app/layout.haml', full_app_hash)
            create_with_template('source/views/_home.haml', 'app/views/_home.haml', full_app_hash)

          end

          def create_project_directory
            create_directories('docs', 'spec',
                               "source/assets",
                               "source/assets/images",
                               "source/assets/fonts",
                               "source/assets/stylesheets",
                               "source/assets/javascripts",
                               "source/views",
                               "source/models", "native")
          end

          def remove_old_files
            #remove_files('README')
            #remove_directories('Resources')
          end

          def location
            base_location.join(@project_name)
          end

          def copy_bridges
            ## for now raw cp, Todo: erb
            FileUtils.cp_r(templates("bridges/."), location.join("native") )

          end

          def source_root
            File.dirname(__FILE__)
          end
          
        end
      
        map %(n) => 'new'
        desc "project new <name> ", "generates a new Coolstrap project."
        long_desc "Generates a new Coolstrap project. See 'coolstrap help new' for more information.
                  \n\nExample:
                  \n\ncoolstrap project new demo ==> Creates a new project skeleton."
        def new(name, device_id='org.mycompany.demo', platform='iphone')
          #if yes?("You are about to generate a Coolstrap Project, Are you ready ??")
            ::Coolstrap::Gen::Generate::Project.create(name, device_id, platform)
          #end
        end
      
      end
    end
  end
end
