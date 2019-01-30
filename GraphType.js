
class GraphType
{
	constructor()
	{
		this.numVertices = 0;
	
		this.vertices = [];
		this.edges = [];
		
		this.mystack = new Stack();
		this.marks2D = [];
	
		this.myPaths = [];
		this.pathsCount = 0;
		
	}
	
	getPathsCount() 
	{ 
		return this.pathsCount; 
	}
	
	resetGraphVariables()
	{
		this.pathsCount = 0;
		this.myPaths = [];			
	}

	hintFunc(departure, destination )
	{
		let i = 0;
		let throwaway;
	
		this.mystack.push(departure);

		if ( this.mystack.peek() == destination )
		{
			let sum = 0;
		
			//not in original program
			this.myPaths.push( {cities: [], sum : 0, cityCount: 0} );//not in original program
			for (let z = 0; z < this.mystack.returnCount(); z++) 
			{
				this.myPaths[this.pathsCount].cities[z] = this.mystack.getElement(z);
				this.myPaths[this.pathsCount].cityCount = z + 1;

				if ( z != (this.mystack.returnCount() - 1) )
				{	
					sum = sum + parseInt( this.GetWeight(this.mystack.getElement(z), this.mystack.getElement(z + 1) ) );	
					this.myPaths[this.pathsCount].sum = sum;
				}
			}
			
			this.pathsCount++;
			this.mystack.pop();
		}
		else
		{
			while (i < this.vertices.length ) /*( i < 7 )*/
			{
				if ( parseInt( this.GetWeight(departure, this.vertices[i]) ) > 0 )
				{
					if ( this.mystack.IsNotOnStack( this.vertices[i]) )
					{
						this.hintFunc( this.vertices[i], destination );
					}
				}
				i++;
			}
			
			this.mystack.pop();
		}
	}
	
	GetWeight(fromVertex, toVertex)
	{
		let row;
		let col;

		row = this.IndexIs(this.vertices, fromVertex);
		
		col = this.IndexIs(this.vertices, toVertex);
		
		return this.edges[row][col];
	}
	
	getCity(i) { return this.vertices[i]; }
	getVertices() { return this.vertices; }
	getNumVertices() { return this.numVertices; }
	
	loadFromTxtFile()
	{
		/*
		When you execute something synchronously, you wait for it to finish before moving on to another task. When you execute something asynchronously, you can move on to another task before it finishes.
		That being said, in the context of computers this translates into executing a process or task on another "thread." A thread is a series of commands (a block of code) that exists as a unit of work. The operating system can manage multiple threads and assign a thread a piece ("slice") of processor time before switching to another thread to give it a turn to do some work. At its core (pardon the pun), a processor can simply execute a command, it has no concept of doing two things at one time. The operating system simulates this by allocating slices of time to different threads.
		*/
		let res = null;
		var f = new XMLHttpRequest();
		f.open("GET", "load.txt", false);
		f.onreadystatechange = function ()
		{
			if(f.readyState === 4)
			{
				if(f.status === 200 || f.status == 0)
				{
					res = f.responseText;
				}
			}
		}
		f.send(null);
		
		let lines = res.split("\n");
		let edgesTemp = [];
		let marks2DTemp = []; //not in original program
		let lineTemp = null;
		let splitLineTemp = null;
		
		for (let i = 0; i < lines.length; i++)
		{
			lineTemp = lines[i]; //each line in the text file
			splitLineTemp = lineTemp.split(" ");
			
			this.vertices.push(splitLineTemp[0]); //for the cities
			this.numVertices++; //updates the number of cities
			
			for (let j = 1; j < splitLineTemp.length; j++) //all the numbers in the text file
			{
				edgesTemp.push(splitLineTemp[j]);
				marks2DTemp.push(false); //not in original program
			}
			
			this.edges.push(edgesTemp);
			this.marks2D.push(marks2DTemp);
			
			edgesTemp = [];
			marks2DTemp = [];
		}	
	}
	
	output()
	{
		let result = [];
		
		let temp; //paths
		let i, j;
		for (i = 0; i < this.pathsCount; i++)
		{
			let min = i; // min declared here and changed to i
			for (j = i + 1; j < this.pathsCount; j++)
			{
				if (this.myPaths[j].sum < this.myPaths[min].sum)
				{
					min = j;
				}
			}
			// moved swap to here
			temp = this.myPaths[i];
			this.myPaths[i] = this.myPaths[min];
			this.myPaths[min] = temp;
		
		}
	
		for (let y = 0; y < this.pathsCount; y++)
		{
			result.push(this.myPaths[y]);
		}
		
		return result;
	}
	
	
	IndexIs(vertices, vertex)
	{
		let index = 0;
		while (!(vertex == vertices[index]))
		{
			index++;
		}
		return index;
	}
	
}