# knights-travails
The purpose of the assignment was to use a new data structure, graphs, and search it using a variation of the BFS/DFS algorithms I learned during the binary trees assignment.

Function was to take a starting and end coordinate of a chess board and output the shortest path a knight could take between the two.

Reflection: 
I was able to write a function that takes a starting and end coordinate and creates a graph that contained all possible moves in an adjacency list until the end was within that list. I then struggled perfusely to search the graph as I wasn't familiar with any methods of traversing graphs. 

I wanted to find the end point and go up its adjacency list until I got to the start and keep that path, but this broke down once there were multiple values in the adjacency list.

Eventuallly, I ended up converting the whole graph into a tree, where each node had a reference to its direct parent and an adjacency list with its children, with the root being a node with a value of the starting coordinate, conducting a BFS until the end coordinate was found, and then going back up the tree using the parent pointers until I had the whole path.