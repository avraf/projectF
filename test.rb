def foo(i,v)
	@starting_index ||= i
	@greatest_sum ||= 0

	if (@greatest_sum + v) > 0
		@greatest_sum += v 
		{ starting_index: @starting_index, value: @greatest_sum }
	else		
		wanted_path =  { starting_index: @starting_index, value: @greatest_sum } 
		@starting_index, @greatest_sum = nil

		wanted_path
	end
end

[2,3,-100,9].each_with_index { |v,i|	puts foo(i,v) }
