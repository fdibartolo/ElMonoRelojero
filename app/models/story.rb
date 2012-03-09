class Story < ActiveRecord::Base
  has_many :tasks, :dependent => :destroy
  accepts_nested_attributes_for :tasks, :allow_destroy => true
  attr_accessible :name, :body, :tasks, :task_ids
end
