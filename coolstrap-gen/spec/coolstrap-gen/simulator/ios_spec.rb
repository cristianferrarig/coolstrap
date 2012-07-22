require File.expand_path(File.dirname(__FILE__) + '/../../spec_helper')

describe "Creating of a view file" do
  before(:all) do
    ::Coolstrap::Gen::Generate::Project.create('dailyfocus', 'org.codewranglers.demo', 'ipad')
  end
  
  context "Creating a view file and its spec" do
    before(:each) do
      # uncoment if you want to tests simulator
      # system("cd dailyfocus && coolstrap build ios; coolstrap simulate ios")
    end
    
    it "should have created the ios build directory" do
      pending("uncomment this test torun it , xcode required")
      File.directory?("dailyfocus/source/native/ios/build").should be_true
    end

  end

  after(:all) do
    remove_directories('dailyfocus', 'app', 'spec/views')
  end
end