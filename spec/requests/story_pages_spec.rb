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
  
end
