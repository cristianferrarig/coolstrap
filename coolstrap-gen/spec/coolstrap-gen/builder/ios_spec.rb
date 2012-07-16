require File.expand_path(File.dirname(__FILE__) + '/../../spec_helper')

describe "Creating of a view file" do
  before(:all) do
    ::Coolstrap::Gen::Generate::Project.create('dailyfocus', 'org.codewranglers.demo', 'ipad')
  end
  
  context "Creating a view file and its spec" do
    before(:each) do
      
      puts system("cd dailyfocus" )
      #&& coolstrap build ios 5.1")
    end
    
    it "should have created the ios build directory" do
      File.directory?("dailyfocus/source/native/ios/build").should be_true
    end

  end

  after(:all) do
    remove_directories('dailyfocus', 'app', 'spec/views')
  end
end