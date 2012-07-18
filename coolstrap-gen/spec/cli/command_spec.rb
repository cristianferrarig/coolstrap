require File.expand_path(File.dirname(__FILE__) + '/../spec_helper')

describe "Coolstrap Generator Commands" do
  context "Help command:" do
    context "Coolstrap help" do
      it "should display the basic help for the CLI" do
        response, status = capture_with_status(:stdout){ Coolstrap::Gen::CLI.start(['help']) }
        status.should eql(Coolstrap::Gen::CLI::STATUS_TYPES[:success])
      end
    end
    context "Coolstrap help invalid_task" do
      it "should display appropriate error message" do
        response, status = capture_with_status(:stderr){ Coolstrap::Gen::CLI.start(['help', 'blah']) }
        response.should eql("Could not find task \"blah\".\n")
        status.should eql(Coolstrap::Gen::CLI::STATUS_TYPES[:success])
      end
    end
  end
  context "Info command:" do
    context "Coolstrap info" do
      it "should display the version" do
        response, status = capture_with_status(:stdout){ Coolstrap::Gen::CLI.start(['info']) }
        #response.should eql("Version #{::Coolstrap::VERSION}\n")
        status.should eql(Coolstrap::Gen::CLI::STATUS_TYPES[:success])
      end
    end
    context "Coolstrap -v (alias)" do
      it "should display the version" do
        response, status = capture_with_status(:stdout){ Coolstrap::Gen::CLI.start(['-v']) }
        #response.should eql("Version #{::Coolstrap::VERSION}\n")
        status.should eql(Coolstrap::Gen::CLI::STATUS_TYPES[:success])
      end
    end
    context "Coolstrap --version (alias)" do
      it "should display the version" do
        response, status = capture_with_status(:stdout){ Coolstrap::Gen::CLI.start(['--version']) }
        #response.should eql("Version #{::Coolstrap::VERSION}\n")
        status.should eql(Coolstrap::Gen::CLI::STATUS_TYPES[:success])
      end
    end
  end
  context "New command: " do
    context "Help (Coolstrap help new)" do
      it "should display help for the task 'new'" do
        response, status = capture_with_status(:stdout){ Coolstrap::Gen::CLI.start(['help', 'new']) }
        status.should eql(Coolstrap::Gen::CLI::STATUS_TYPES[:success])
      end
    end
    context "Generate a new project: " do
      context "with no name (Coolstrap new)" do
        it "should exit with error" do
          response, status = capture_with_status(:stderr){ Coolstrap::Gen::CLI.start(['new']) }
          response.should eql("\"new\" was called incorrectly. Call as \"rspec new <name> <id> <platform>\".\n")
        end
      end
      context "with custom name (Coolstrap new Demo)" do
        it "should generate new project \"Demo\"" do
          response, status = capture_with_status(:stdout){ Coolstrap::Gen::CLI.start(['new', 'Demo']) }
		      #response.should eql("\n\n\e]0;~/Workspace/ruby/Ti\aCreated iphone application project\n\n\n\e]0;~/Workspace/ruby/Ti\a\e]0;~/Workspace/ruby/Ti\a\e]0;~/Workspace/ruby/Ti\a\n\e[1m\e[32mCreating the tmp directory.\e[0m\e[0m\n\e[1m\e[32mRemoving README file.\e[0m\e[0m\n\e[1m\e[32mRemoving Resources directory.\e[0m\e[0m\n\e[1m\e[32mCreating the Resources directory.\e[0m\e[0m\n\e[1m\e[32mCreating the Resources/images directory.\e[0m\e[0m\n\e[1m\e[32mCreating the Resources/vendor directory.\e[0m\e[0m\n\e[1m\e[32mCreating the config directory.\e[0m\e[0m\n\e[1m\e[32mCreating the docs directory.\e[0m\e[0m\n\e[1m\e[32mCreating the app/demo/models directory.\e[0m\e[0m\n\e[1m\e[32mCreating the app/demo/helpers directory.\e[0m\e[0m\n\e[1m\e[32mCreating the app/demo/views directory.\e[0m\e[0m\n\e[1m\e[32mCreating the app/demo/stylesheets directory.\e[0m\e[0m\n\e[1m\e[32mCreating the app/demo/stylesheets/partials directory.\e[0m\e[0m\n\e[1m\e[32mCreating the spec/models directory.\e[0m\e[0m\n\e[1m\e[32mCreating the spec/views directory.\e[0m\e[0m\n\e[1m\e[32mCreating the spec/helpers directory.\e[0m\e[0m\n\e[1m\e[32mCreating spec/app_spec.coffee\e[0m\e[0m\n\e[1m\e[32mCreating app/demo/stylesheets/app.sass\e[0m\e[0m\n\e[1m\e[32mYour Titanium project is ready for you to get coding!\e[0m\e[0m\n")		  
          status.should eql(Coolstrap::Gen::CLI::STATUS_TYPES[:success])
        end
        after (:all) do
          remove_directories("Demo")
        end
      end
      context "with custom name and id (ti new Demo com.mycompany.demo)" do
        it "should generate new project \"Demo\" with id \"com.mycompany.demo\"" do
          response, status = capture_with_status(:stdout){ Coolstrap::Gen::CLI.start(['new', 'Demo', 'com.mycompany.demo']) }
		      #response.should eql("\n\n\e]0;~/Workspace/ruby/Ti\aCreated iphone application project\n\n\n\e]0;~/Workspace/ruby/Ti\a\e]0;~/Workspace/ruby/Ti\a\e]0;~/Workspace/ruby/Ti\a\n\e[1m\e[32mCreating the tmp directory.\e[0m\e[0m\n\e[1m\e[32mRemoving README file.\e[0m\e[0m\n\e[1m\e[32mRemoving Resources directory.\e[0m\e[0m\n\e[1m\e[32mCreating the Resources directory.\e[0m\e[0m\n\e[1m\e[32mCreating the Resources/images directory.\e[0m\e[0m\n\e[1m\e[32mCreating the Resources/vendor directory.\e[0m\e[0m\n\e[1m\e[32mCreating the config directory.\e[0m\e[0m\n\e[1m\e[32mCreating the docs directory.\e[0m\e[0m\n\e[1m\e[32mCreating the app/demo/models directory.\e[0m\e[0m\n\e[1m\e[32mCreating the app/demo/helpers directory.\e[0m\e[0m\n\e[1m\e[32mCreating the app/demo/views directory.\e[0m\e[0m\n\e[1m\e[32mCreating the app/demo/stylesheets directory.\e[0m\e[0m\n\e[1m\e[32mCreating the app/demo/stylesheets/partials directory.\e[0m\e[0m\n\e[1m\e[32mCreating the spec/models directory.\e[0m\e[0m\n\e[1m\e[32mCreating the spec/views directory.\e[0m\e[0m\n\e[1m\e[32mCreating the spec/helpers directory.\e[0m\e[0m\n\e[1m\e[32mCreating spec/app_spec.coffee\e[0m\e[0m\n\e[1m\e[32mCreating app/demo/stylesheets/app.sass\e[0m\e[0m\n\e[1m\e[32mYour Titanium project is ready for you to get coding!\e[0m\e[0m\n")
		  status.should eql(Coolstrap::Gen::CLI::STATUS_TYPES[:success])
        end
        after (:all) do
          remove_directories("Demo")
        end
      end
      context "with custom name, id and platform (Coolstrap new Demo com.mycompany.demo ipad)" do
        it "should generate new project \"Demo\" with id \"com.mycompany.demo\" and for platform \"ipad\"" do
          response, status = capture_with_status(:stdout){ Coolstrap::Gen::CLI.start(['new', 'Demo', 'com.mycompany.demo']) }
          #response.should eql("\n\n\e]0;~/Workspace/ruby/Ti\aCreated iphone application project\n\n\n\e]0;~/Workspace/ruby/Ti\a\e]0;~/Workspace/ruby/Ti\a\e]0;~/Workspace/ruby/Ti\a\n\e[1m\e[32mCreating the tmp directory.\e[0m\e[0m\n\e[1m\e[32mRemoving README file.\e[0m\e[0m\n\e[1m\e[32mRemoving Resources directory.\e[0m\e[0m\n\e[1m\e[32mCreating the Resources directory.\e[0m\e[0m\n\e[1m\e[32mCreating the Resources/images directory.\e[0m\e[0m\n\e[1m\e[32mCreating the Resources/vendor directory.\e[0m\e[0m\n\e[1m\e[32mCreating the config directory.\e[0m\e[0m\n\e[1m\e[32mCreating the docs directory.\e[0m\e[0m\n\e[1m\e[32mCreating the app/demo/models directory.\e[0m\e[0m\n\e[1m\e[32mCreating the app/demo/helpers directory.\e[0m\e[0m\n\e[1m\e[32mCreating the app/demo/views directory.\e[0m\e[0m\n\e[1m\e[32mCreating the app/demo/stylesheets directory.\e[0m\e[0m\n\e[1m\e[32mCreating the app/demo/stylesheets/partials directory.\e[0m\e[0m\n\e[1m\e[32mCreating the spec/models directory.\e[0m\e[0m\n\e[1m\e[32mCreating the spec/views directory.\e[0m\e[0m\n\e[1m\e[32mCreating the spec/helpers directory.\e[0m\e[0m\n\e[1m\e[32mCreating spec/app_spec.coffee\e[0m\e[0m\n\e[1m\e[32mCreating app/demo/stylesheets/app.sass\e[0m\e[0m\n\e[1m\e[32mYour Titanium project is ready for you to get coding!\e[0m\e[0m\n")
		  status.should eql(Coolstrap::Gen::CLI::STATUS_TYPES[:success])
        end
        after (:all) do
          remove_directories("Demo")
        end
      end
    end
  end
end
