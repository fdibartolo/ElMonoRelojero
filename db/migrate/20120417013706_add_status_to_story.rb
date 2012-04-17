class AddStatusToStory < ActiveRecord::Migration
  def change
    add_column :stories, :status, :integer
  end

  def down
    remove_column :stories, :status
  end
end
