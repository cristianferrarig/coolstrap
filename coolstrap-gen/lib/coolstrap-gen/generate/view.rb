module Coolstrap::Gen
  module Generate
    class View < Thor
      
      include Thor::Actions
            
      attr_accessor :name, :model
      
      def self.source_root
        ::Coolstrap::Gen.root.join('coolstrap-gen/templates')
      end
    
      no_tasks {
        include ::Coolstrap::Gen::Utils
        
        def create_view_template(name, context)
           
          unless File.exists?(location.join("coolstrap.yml"))  
            error "It seems that you are not inside in a coolstrap project" 
            log "run 'coolstrap project new MyApp' to create one." 
            return 
          end
           
          log "Creating #{name} view using a template." 
          
          @context = context
          @name = name
          self.name = @name
          self.model = (@context[:domain] || '').downcase
          @context.merge!(:name => @name) 
          #log "#{context.inspect}"
          case @context[:cs_type]
            when  'list'
              create_list
            when  'complexlist'
              create_list("complex")
            when  'tabbar'
              create_tabbar
            when  'toolbar'
              create_toolbar
            when  'dialog'
              create_dialog
            else
              log "you didn't pass correct parameters use coolstrap view s <model> <collection>"
            end
        end
        
        def create_dialog
          view_directory = "views/dialogs"
          log("HINT: put partial in index.html.haml, see comments' ")
          template  = templates("app/components/dialog.html.haml.erb")
          generate_files(view_directory, template)
        end
        
        def create_toolbar
          view_directory = "views/toolbars"
          log("HINT: put partial in some header or footer element' ")
          template  = templates("app/components/toolbar.html.haml.erb")
          generate_files(view_directory, template)
        end
        
        def create_tabbar
          view_directory = "views/tabbars"
          log("HINT: put partial in some header or footer element' ")
          template  = templates("app/components/tabbar.html.haml.erb")
          generate_files(view_directory, template)
        end
        
        def create_list(style="simple")
          #if yes? "hum"
          view_directory = "views"
          #log("HINT: to use lists call them with href '##{@name}' & data-target = 'section', and add the partial in index.html.haml ")
          
          case style
          when "simple"
            tmp  = "app/components/listview/_simplelist.html.haml.erb"
          when "complex"
            tmp  = "app/components/listview/_complexlistavatar.html.haml.erb"
          end
        
          generate_files(view_directory, tmp)
          
          # add section in resource path, it run first to check if it exists previously to append content
          resource_path = "source/#{view_directory}/_#{model}.haml"
          if File.exists?(location.join(resource_path))
            append_to_file resource_path do
              tmp = templates("app/components/section.haml.erb")
              @context.merge!(:model => @model)
              contents = Erubis::Eruby.new(File.read(tmp)).result(@context)
              "#{contents}"
            end
          end
          
          section_tmp  = "app/components/section.haml.erb"
          section_destination = "source/#{view_directory}/_#{@model}.haml"
          
          template( section_tmp, section_destination )
          
          ## add section link to home
          home_tmp = "source/#{view_directory}/_home.haml"
          #insert_into_file home_tmp, :after => "= list_view(:id=>\"someid\") do" do
          append_to_file home_tmp do
            tmp = templates("app/components/section_link.haml.erb")
            contents  = Erubis::Eruby.new(File.read(tmp)).result(@context)
          end
          
          
          # add partial to index just after partial views/home
          index_tmp = "source/index.html.haml"
          
          unless File.read(location.join(index_tmp)).include?("partial \"views/#{@model}\"")
            insert_into_file index_tmp, :after => '= partial "views/home"' do
              tmp = templates("app/components/partial_for_index.haml.erb")
              contents  = Erubis::Eruby.new(File.read(tmp)).result(@context)
            end
          end
          
          
          # remove default message
          # gsub_file home_tmp, /#\s*(Run -> coolstrap s view <model> <collection>)/, '\1'
          #  gsub_file home_tmp, /Run -> coolstrap s view <model> <collection>/, :green do |match|
            #match << ""
          #   ""
          #  end
          
        end
        
        def generate_files(view_directory, template)
          spec_template = templates("specs/app_spec.coffee.erb")
          template_destination = "source/#{view_directory}/#{(@context[:domain] || '').downcase}/_#{@name}.haml"
          spec_destination = "spec/#{view_directory}/#{(@context[:domain] || '').downcase}/#{@name}_spec.coffee"
          template( template, template_destination )
          template( spec_template, spec_destination )
        end
        
        def create(name, context={})
          create_view_template(name, context)
        end
        
      }
    
      map %w(s) => 'scaffold'
      desc "view scaffold <list/complexlist/tabbar/toolbar/dialog> <domain> <name>", "generate a scaffold for Coolstrap elements."
      def scaffold(cs_type, domain, name)
        create(name, { 
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
          create(name)
        end
      end
    
    end
  end
end
