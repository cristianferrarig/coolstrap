module Coolstrap::Gen
  module Generate
    class View < Thor
      class << self
        include ::Coolstrap::Gen::Utils
        

        def create(name, context={})
          create_view_template(name, context)
        end
        
        def create_view_template(name, context)
          log "Creating #{name} view using a template."      
          view_directory = "source/views"
          context.merge!(:name => name)
          #log "#{context.inspect}"
          case context[:cs_type]
          when  'list'
            log("HINT: to use lists call them with href '##{name}' & data-target = 'section', and add the partial in index.html.haml ")
            template  = templates("app/components/listview/_simplelist.html.haml.erb")
          when  'complexlist'
            log("HINT: to use lists call them with href '##{name}' & data-target = 'section', and add the partial in index.html.haml ")
            template  = templates("app/components/listview/_complexlistavatar.html.haml.erb")
          
          when  'tabbar'
            view_directory = "source/views/tabbars"
            log("HINT: put partial in some header or footer element' ")
            template  = templates("app/components/tabbar.html.haml.erb")
          when  'toolbar'
            view_directory = "source/views/toolbars"
            log("HINT: put partial in some header or footer element' ")
            template  = templates("app/components/toolbar.html.haml.erb")
          when  'dialog'
            view_directory = "source/views/dialogs"
            log("HINT: put partial in index.html.haml, see comments' ")
            template  = templates("app/components/dialog.html.haml.erb")
          
          
          else
            log("HINT: to use lists call them with href '##{name}' & data-target = 'section', and add the partial in index.html.haml ")
            template  = templates("app/components/listview/_complexlistavatar.html.haml.erb")
          end
          
          payload   = Pathname.new("#{view_directory}/#{(context[:domain] || '').downcase}")
          contents  = Erubis::Eruby.new(File.read(template)).result(context) if template
          
          create_directories(payload)         unless File.directory?(payload)
          create_directories("spec/views")    unless File.directory?("spec/views")
          
          filename = payload.join("_#{name.downcase}.haml")
          File.open(location.join(filename), 'w') { |f| f.write(contents) }

          #create_new_file("spec/views/#{name}_spec.coffee", templates("specs/app_spec.coffee"))
          #create_new_file("app/#{underscore(app_name)}/stylesheets/_#{(context[:domain] || '').downcase}.sass", templates("app/stylesheets/sample.sass"))
          #append_to_router(context[:domain].capitalize, 'views')
        end

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
    
    end
  end
end
