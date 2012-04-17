require 'spec_helper'

describe StoriesController do
  it "should set the status" do
    @story = FactoryGirl.create(:story)
    put :set_status, :id => @story.id, :new_status => 1

    @story.status.should be 1
    response.should redirect_to :board
  end
end