module ApplicationHelper
  def create_empty_task_element
    "<div class='ask_field'> #{inner_html} </div>"
  end

  private
  def inner_html
	  (text_area 'tasks', nil, :size => '50x2', :value => '') + 
    (hidden_field_tag 'story[task_ids][]', 0) + ' ' +
    (link_to_function 'Remove task', 'remove_task(this)')
  end
end
