class Story < ActiveRecord::Base
  has_many :tasks, :dependent => :destroy
  accepts_nested_attributes_for :tasks, :reject_if => lambda { |a| a[:description].blank? }, :allow_destroy => true
  attr_accessible :name, :body, :tasks_attributes
  
  validates :name, presence: true, length: { maximum: 30 }
  validates :body, presence: true, length: { maximum: 250 }
end
