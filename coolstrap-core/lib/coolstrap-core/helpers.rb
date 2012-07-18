require "middleman"

module Coolstrap::Core::Helpers
    
    #TODO separate elements in specific classes:
    # views, asides, articles, header, tabbar, toolbar etc... 
    
    def footer(opts={}, &block)
       content_tag :footer , opts do 
          capture(&block)
       end 
    end
    
    def article(opts={}, &block)
       content_tag :article , opts do 
          capture(&block)
       end 
    end
    
    def section(opts={}, &block)
       content_tag :section , opts do 
          capture(&block)
       end 
    end
    
    def header(opts={}, &block)
       content_tag :header , opts do 
          capture(&block)
       end 
    end
    
    def hgroup(opts={}, &block)
      if block_given?
        content_tag :hgroup, options do 
           capture(&block)
        end
      else
        content_tag :hgroup do
          content_tag( :h1 , opts[:title]).concat(
          content_tag( :h2 , opts[:subtitle])
          )
        end
      end
    end
    
    def list_view(opts={}, &block)
      options = {:class=>opts[:class]}.merge({"data-type" => "listview"})
      content_tag :ul, options do 
         capture(&block)
      end
    end
    
    def list_item(opts={}, &block)
      options = {:class=>opts[:class]}
      options = options.merge({ :class=>  "#{options[:class]} list-divider"}) if opts[:divider] == true
      arrow = content_tag :div , :class=>"aside" do
                content_tag( :i, "",{:class=>"icon-chevron-#{opts[:arrow]}"})
              end if opts[:arrow].present? 
      
      if block_given?
        content_tag :li, options do
          capture(&block) << (arrow || "")
        end
      else
        content_tag :li, options do 
          content_tag :h1 do
            opts[:content]
          end
        end
      end
    end
    
    def divider(opts={}, &block)
      if block_given?
        list_item({:divider=>true}.merge(opts)) do
          capture(&block)
        end
      else
        list_item({:divider=>true}.merge(opts))
      end
    end
    
    def nav(opts={}, &block)
      if block_given?
        content_tag(:nav, opts) do
          capture(&block)
        end
      else
      end
    end
    
    def tabbar(opts={}, &block)
      opts = opts.merge({"data-type" => "tabbar"})
      nav(opts, &block)
    end
    
    def toolbar(opts={}, &block)
      opts = opts.merge({"data-type" => "toolbar"})
      if opts[:control]
        auto = opts[:auto] ? "autoWidth" : ""
        nav(opts.reject!{ |k| k == :control || k == :auto }) do
          content_tag(:div, :class=>"control-group #{auto}") do
            capture(&block)
          end
        end
      else
        nav(opts, &block)
      end
    end
    
    def icon(type, opts={}, &block)
      if block_given?
        capture(&block) <<
        content_tag( :i, "",{:class=>"icon-#{type}"})
      else
        name = opts[:text].present? ? content_tag( :span, opts[:text]) : ""
        name <<
        content_tag( :i, "",{:class=>"icon-#{type}"})
      end
    end
    
    def dialog(opts, &block)
      options = {:role => "dialog", :data=>{:type=>opts[:type] || "modal", :transition=>opts[:transition] || "slideup"}}
      opts = opts.merge(options)
      if block_given?
        content_tag(:div, opts) do
          capture(&block)
        end
      else
      end
    end
    
    def render_tabbar(tabbar)
      partial("views/tabbars/#{tabbar}")
    end
    
    def render_dialog(dialog)
      partial("views/dialogs/#{dialog}")
    end
    
    def render_toolbar(tabbar)
      partial("views/toolbars/#{tabbar}")
    end
    

end