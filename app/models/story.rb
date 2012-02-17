class Story < ActiveRecord::Base
  has_many :tasks, :dependent => :destroy
  accepts_nested_attributes_for :tasks
  attr_accessible :name, :body, :tasks
end
