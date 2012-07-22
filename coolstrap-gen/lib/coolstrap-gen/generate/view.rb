module Coolstrap::Gen
  module Generate
    class View < Thor
      
      include Thor::Actions
            
      attr_accessor :name
      
      def self.source_root
         ::Coolstrap::Gen.root.join('coolstrap-gen/templates')
      end
    
      no_tasks {
        include ::Coolstrap::Gen::Utils
        
        def create_view_template(name, context)
          log "Creating #{name} view using a template."      
          @context = context
          @name = name
          self.name = @name
          @context.merge!(:name => @name)
          #log "#{context.inspect}"
          case @context[:cs_type]
          when  'list'
            create_list
          when  'complexlist'
            create_complexlist
          when  'tabbar'
            create_tabbar
          when  'toolbar'
            create_toolbar
          when  'dialog'
            create_dialog
          else
            create_complexlist
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
        
        def create_complexlist
          view_directory = "views"
          log("HINT: to use lists call them with href '##{@name}' & data-target = 'section', and add the partial in index.html.haml ")
          template  = templates("app/components/listview/_complexlistavatar.html.haml.erb")
          generate_files(view_directory, template)
        end
        
        def create_list
          #if yes? "hum"
          view_directory = "views"
          log("HINT: to use lists call them with href '##{@name}' & data-target = 'section', and add the partial in index.html.haml ")
          tmp  = "app/components/listview/_simplelist.html.haml.erb"
          generate_files(view_directory, tmp)
        end
        
        def generate_files(view_directory, template)
          template_destination = "source/#{view_directory}/#{(@context[:domain] || '').downcase}/_#{@name}.haml"
          spec_destination = "spec/#{view_directory}/#{(@context[:domain] || '').downcase}/#{@name}_spec.rb"
          template( template, template_destination )
          template( template, spec_destination )
        end
        
        def create(name, context={})
          create_view_template(name, context)
        end
        
      }
    
      map %w(s) => 'scaffold'
      desc "scaffold <list/complexlist/tabbar/toolbar/dialog> <domain> <name>", "generate a scaffold for Coolstrap elements."
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
