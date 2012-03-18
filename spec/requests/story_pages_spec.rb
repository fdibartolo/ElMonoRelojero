require 'spec_helper'

describe "Stories pages" do
  
  describe "create new story" do
    before { visit new_story_path }

    describe "with invalid information" do
      it "should not be allowed" do
        expect { click_button "Create Story" }.not_to change(Story, :count)
      end

      it "should display error messages" do
        click_button "Create Story"
        page.should have_content('errors prohibited this story from being saved')
      end
    end

    describe "with valid information" do
      before do
        fill_in "Name",   with: "Story 1: Create User Role"
        fill_in "Body",   with: "As an admin, I want to..."
      end

      it "should create a story without tasks" do
        expect { click_button "Create Story" }.to change(Story, :count).by(1)
      end

      it "should create a story with one task", :js => true do
        click_link "Add new task"
        fill_in "description",  with: "Task 1"
        click_button "Create Story"

        page.should have_content('Story was successfully created.')
        page.should have_content('Task 1')
      end
    end
  end

  describe "update story" do
    let(:story) { FactoryGirl.create(:story_with_tasks) }

    it "should populate show fields" do
      visit story_path(story)
 
      page.should have_content(story.name)
      page.should have_content(story.body)
      story.tasks.count.should == 1
      page.should have_content(story.tasks.first.description)
    end

    it "should be allowed" do
      visit edit_story_path(story)
      
      fill_in "description",  with: "Task 1 updated"
      click_button "Update Story"

      page.should have_content('Story was successfully updated.')
      page.should have_content('Task 1 updated')
    end
    
#    it "should remove original task and add a new one", :js => true do
#      visit edit_story_path(story)

#      click_link "Remove task"
#      click_link "Add new task"
#      fill_in "description",  with: "Task 2 added"
#      click_button "Update Story"

#      page.should have_content('Story was successfully updated.')
#      page.should have_content('Task 2 added')
#    end
  end
end
