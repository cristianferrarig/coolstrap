require File.expand_path(File.dirname(__FILE__) + '/../../spec_helper')

describe "Creating of a new Coolstrap Project" do
  before(:all) do
    ::Coolstrap::Gen::Generate::Project.create('dailyfocus', 'org.codewranglers.demo', 'ipad')
  end

  context "Directories should be created" do

    it "should have created the project" do
      File.directory?("dailyfocus").should be_true
    end

    it "should have an app directory" do
      File.directory?("dailyfocus/source").should be_true
    end

    it "should have a assets directory" do
      File.directory?("dailyfocus/source/assets").should be_true
    end

    it "should have a docs directory" do
      File.directory?("dailyfocus/docs").should be_true
    end

    it "should have a specs directory" do
      File.directory?("dailyfocus/spec").should be_true
    end

    it "should have a tmp directory" do
      File.directory?("dailyfocus/tmp").should be_true
    end

    it "should have a native/ios directory" do
      File.directory?("dailyfocus/native").should be_true
    end
  end

  context "Top tier files should be created" do

    it "should have created the LICENSE" do
      File.exists?("dailyfocus/LICENSE").should be_true
    end

    it "should have created the config file" do
      File.exists?("dailyfocus/config.rb").should be_true
    end

    it "should have created the Readme.mkd" do
      File.exists?("dailyfocus/Readme.mkd").should be_true
    end

    it "should have created the Gemfile" do
      File.exists?("dailyfocus/Gemfile").should be_true
    end
    
    it "should have created coolstrap config file" do
      File.exists?("dailyfocus/coolstrap.yml").should be_true
    end
  end

  context "Inside the source directory" do


    it "should have created the models directory" do
      File.directory?("dailyfocus/source/models").should be_true
    end

    it "should have created the stylesheets directory" do
      File.directory?("dailyfocus/source/assets/stylesheets").should be_true
    end

    it "should have created the javascripts directory" do
      File.directory?("dailyfocus/source/assets/javascripts").should be_true
    end

    it "should have created the images directory" do
      File.directory?("dailyfocus/source/assets/images").should be_true
    end

    it "should have created the fonts directory" do
      File.directory?("dailyfocus/source/assets/fonts").should be_true
    end

    it "should have created the views directory" do
      File.directory?("dailyfocus/source/views").should be_true
    end
  end

  context "Inside the Resources directory" do

    it "should have created the images directory" do
      pending
      File.directory?("dailyfocus/Resources/images").should be_true
    end

    it "should have created the vendor directory" do
      pending
      File.directory?("dailyfocus/Resources/vendor").should be_true
    end

    it "should have created the KS_nav_ui.png within the images directory" do
      pending
      File.exists?("dailyfocus/Resources/images/KS_nav_ui.png").should be_true
    end

    it "should have created the KS_nav_views.png within the images directory" do
      pending
      File.exists?("dailyfocus/Resources/images/KS_nav_views.png").should be_true
    end
  end

  context "Inside the specs directory" do
    it "should have created the app_spec.coffee file" do
      pending
      File.exists?("dailyfocus/spec/app_spec.coffee").should be_true
    end

    it "should have created the models directory" do
      pending
      File.directory?("dailyfocus/spec/models").should be_true
    end

    it "should have created the views directory" do
      pending
      File.directory?("dailyfocus/spec/views").should be_true
    end

  end

  after(:all) do
    remove_directories('dailyfocus')
  end
end