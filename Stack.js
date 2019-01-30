
//Stack class
class Stack
{
	constructor()
	{
		this.items = [];
		this.items.length = 0;
	}
	
	push(element)
	{
		// push element into the items
		this.items.push(element);
	}
	
	pop()
	{
		// return top most element in the stack
		// and removes it from the stack
		// Underflow if stack is empty
		if (this.items.length == 0)
		{
			return "Underflow";
		}
		return this.items.pop();
	}
	
	peek()
	{
		// return the top most element from the stack
		// but doesn't delete it.
		return this.items[this.items.length - 1];
	}
	
	isEmpty()
	{
		return this.items.length == 0;
	}
	
	clearArrayStack()
	{
		
		this.items = [];
		this.items.length = 0;
		/*
		while( !this.isEmpty() )
		{
			this.items.pop();
		}
		*/
	}
	
	returnCount()
	{
		return this.items.length;
	}
	
	getElement(i)
	{
		return this.items[i];
	}
	
	IsNotOnStack(s) //VertexType
	{
		for (let i = 0; i < this.items.length; i++)
		{
			if (this.items[i] == s)
			{
				return false;
			}
		}
		return true;
	}
	
	printStack()
	{
		var str = "";
		for (var i = 0; i < this.items.length; i++)
		{
			str += this.items[i] + " ";
		}
		return str;
	}
}