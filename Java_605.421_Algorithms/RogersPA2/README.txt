README

About:
	⁃	JHU 605.421 Foundations of Algorithms - Programming Assignment 2 (PA2)
	⁃	Zachary Rogers (602-818-8886)
	⁃	07/18/2016


Environment:
	⁃	java version "1.7.0_79"
	⁃	javac 1.7.0_79
	⁃	Eclipse Mars.2 IDE Release (4.5.2)


Zip File Contents:
	⁃	README.txt
	⁃	output.txt
	⁃	PA2.java


Assignment Required Methods:  @PA2.java lines 120 - 300
	1a)	Radix Sort
	1b)	Bucket Sort
	2)	
		⁃	PushA()
		⁃	PushB()
		⁃	MultiPopA()
		⁃	MultiPopB()
		⁃ 	Transfer()

	
Method Descriptions and Print Statements:
	⁃	1a) Radix Sort prints the list of words to be sorted and the resulting order of after each pass of the algorithm.  The words are sorted by their letters (referred to as a column), starting with the right-most letter.  Note that Column 0 is the left-most letter one each word.
	⁃	1b) Bucket Sort prints the array of decimals to be sorts. It prints the empty buckets that are built at the start of the algorithm and then prints what bucket each element gets put into during each pass of the algorithm. Finally it prints each element as they are pulled out of the buckets in the correct order and prints the resulting sorted array.
	⁃	2) PushA(x) pushes element x onto a doubly-linked list called stack A. This method prints out each element being pushed and the resulting stack.
	⁃	2) PushB(x) pushes element x onto a doubly-linked list called stack B. This method prints out each element being pushed and the resulting stack.	
	⁃	2) MultiPopA(k) pops k elements from stack A or until empty. This method prints out the stack at the beginning of the call, each element that is being popped, and the resulting stack.
	⁃	2) MultiPopB(k) pops k elements from stack B or until empty. This method prints out the stack at the beginning of the call, each element that is being popped, and the resulting stack.
	⁃	2) Transfer(k) pops an element from stack A and pushes it onto stack B, k times or until stack A is empty. This method prints how many elements will be transferred, the starting stacks, each element as it’s being popped from A and pushed onto B, and the results stacks after each pass.
	
	
Run:
	Run the code from the main method in the class @PA2.java lines 22 - 115. Here each of my methods is called. The results and intermediate steps are printed to the console.
	*I left both 1a and 1b in my code since I wanted to try building both. Please grade the Bucket Sort algorithm if not both of them.


Inputs:
	1a) An array of strings, 3-letter words, to be sorted using radix sort. Defined in the main() method as wordsArray.
	1b) An array of decimals to be sorted using Bucket Sort. Defined in the main() method as A.
	2) Two empty doubly-linked lists. Defined in the main() method as stackA and stackB.


Output:
	Console printed output of each required method.  Output results printed to the console during the test run are also included in the zipped assignment submission files as ‘output.txt’.


Sources:
	I used sample code and examples from the CLRS textbook to understand the algorithms and implement the linked list.


