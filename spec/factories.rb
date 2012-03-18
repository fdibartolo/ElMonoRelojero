FactoryGirl.define do
  #https://github.com/thoughtbot/factory_girl/blob/master/GETTING_STARTED.md
  factory :story do
    name  "Story 1"
    body  "Some description for story 1"
    
    factory :story_with_tasks do
      ignore do
        tasks_count 1
      end
      
      after_create do |story, evaluator|
        FactoryGirl.create_list(:task, evaluator.tasks_count, :story => story)
      end
    end
  end

  factory :task do
    description "Task 1 description"
    story
  end
end
