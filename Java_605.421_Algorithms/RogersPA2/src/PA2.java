/** JHU 605.421 PA2 
 * 
 * Zachary Rogers
 * 602-818-8886
 * 07/18/2016
 *  
 *  Resources: 
 *  CLRS Ch. 8, 10.
 *  LinkedList.java class provided in the CRLS supporting documents.
 *  Group discussion boards.
 *  
 */

import java.util.ArrayList;
import java.util.List;
import java.util.Arrays;
import java.util.Collections;
import java.util.LinkedList;

public class PA2 extends LinkedList {

	public static void main(String[] args) {
		
		System.out.println("JHU 605.421 PA2 \nZachary Rogers\nSummer 2016\n");
		
		/*
		 * ########## Problem 1 (a) - Radix Sort ##########
		 * All words in the list must be of the same length n.
		 * Column 0 is the left-most letter in each word.
		 */
		String[] wordsArray = { "COW", "DOG", "SEA", "RUG", "ROW", "MOB", "BOX", "TAB", "BAR", "EAR", "TAR", "DIG",
				"BIG", "TEA", "NOW", "FOX" };

		System.out.println("\n ########## Problem 1 (a) ##########\n");
		System.out.print("Show Radix Sort on: ");
		for (int i = 0; i < wordsArray.length; i++) {
			System.out.print(wordsArray[i] + " ");
		}
		System.out.print("\n\n *Column 0 is the left-most letter in each word in this example.");
		
		System.out.print("\n");

		// Call my radixSort function on the list of words.
		// * All words in the list must be of the same length n.
		int letters = wordsArray[0].length();
		String[] resultA = radixSort(wordsArray, letters);

		// Print the resulting sorted list.
		System.out.println("\nResulting sorted array: ");
		for (int i = 0; i < resultA.length; i++) {
			System.out.print(resultA[i] + " ");
		}

		/*
		 * ########## Problem 1 (b) - Bucket Sort ##########
		 */
		double[] A = { .79, .13, .16, .64, .39, .20, .89, .53, .71, .42 };
		System.out.println("\n\n\n ########## Problem 1 (b) ##########\n");
		System.out.print("Show Bucket Sort on: ");
		for (int i = 0; i < A.length; i++) {
			System.out.print(A[i] + " ");
		}
		// Call my bucketSort function on the array of numbers.
		List<Double> resultB = bucketSort(A);
		System.out.println("\nResulting sorted array:");
		System.out.println(resultB);
		
		
		/*
		 * ########## Problem 2 ##########
		 * 
		 * Show methods PushA(), PushB(), MultiPopA(), MuliPopB(), and Transfer() using doubly-linked lists as the stacks.
		 * I used the source LinkedList.java class provided in the CRLS supporting documents.
		 * 
		 */
		System.out.println("\n\n\n ########## Problem 2 ##########\n");
		LinkedList<Integer> stackA = new LinkedList<Integer>();
		System.out.println("Creating linked list stack A: " + stackA);
		LinkedList<Integer> stackB = new LinkedList<Integer>();
		System.out.println("Creating linked list stack B: " + stackB);
		
		// Test series of some numbers:
		int[] testA = {79, 13, 16, 64, 39};
		int[] testB = {1, 2, 3, 4, 5};
		
		System.out.println("\nTest array a: [79, 13, 16, 64, 39]");
		System.out.println("Test array b: [1, 2, 3, 4, 5]");
		
		// PushA(x):
		System.out.println("\n\n ### PushA() ###\n");
		for(int i = 0; i < testA.length; i++) {
			pushStackA(stackA, testA[i]);
		}
		
		
		// PushB(x):
		System.out.println("\n\n ### PushB() ###\n");
		for(int i = 0; i < testB.length; i++) {
			pushStackB(stackB, testB[i]);
		}
		
	
		// MultiPopA():
		System.out.println("\n\n ### MultiPopA() ###\n");
		multiPopA(stackA, 2);
		
		// MultiPopB():
		System.out.println("\n\n ### MultiPopB() ###\n");
		multiPopB(stackB, 3);
		
	
		// Transfer(k):
		System.out.println("\n\n ### Transfer() ###\n");
		transfer(stackA, stackB, 2);
	}
	
	

	/*
	 * ########## Problem 1 (a) - Radix-Sort ##########
	 * My methods implemented for Problem 1 (a)
	 */
	
	// LSD Radix-Sort
	static String[] radixSort(String[] w, int letters) {
		int n = letters - 1;
		String[] sort = w;
		while (n >= 0) {
			sort = sortByColumn(sort, n);
			n--;
		}
		return sort;
	}

	// Sort arrays by the nth character of each word.
	static String[] sortByColumn(String[] w, int n) {
		System.out.printf("\nSorting words by Column %d:\n", n);
		String[] words = w;
		// Create empty list as a queue
		List<String> queue = new ArrayList<String>();
		// Sort elements of array by nth character value
		for (int ch = 0; ch <= 256; ch++) {
			for (int i = 0; i < words.length; i++) {
				if (ch == words[i].charAt(n)) {
					queue.add(words[i]);
					// System.out.println(w[i]);
				}
			}
		}
		String[] sorted = queue.toArray(new String[10]);
		printWords(sorted);
		return sorted;
	}

	// Print out the elements of a string array.
	static void printWords(String[] words) {
		for (int i = 0; i < words.length; i++) {
			System.out.println(" " + words[i]);
		}
	}
	
	
	/*
	 * ########## Problem 1 (b) - Bucket Sort ##########
	 * My methods implemented for Problem 1 (b)
	 */

	// Bucket Sort
	static List<Double> bucketSort(double[] nums) {
		int n = nums.length;
		System.out.println("\n\nMaking empty buckets:");
		List<Double> sorted = new ArrayList<Double>();
		ArrayList<ArrayList<Double>> buckets = new ArrayList<ArrayList<Double>>(10);
		for (int i = 0; i < n; i++) {
			buckets.add(new ArrayList<Double>());
		}
		System.out.println(" " + buckets);

		System.out.println("\nPutting numbers in their buckets:");
		for (int i = 0; i < n; i++) {
			double num = nums[i];
			System.out.printf("\n  Inserting number: %f", num);
			int bucket = (int) Math.floor(nums[i] * 10);
			buckets.get(bucket).add((nums[i]));
			System.out.print("\n  Resulting buckets: ");
			System.out.println(buckets);
		}

		// Sort the elements in each bucket.
		for (int i = 0; i < n; i++) {
			Collections.sort(buckets.get(i));
		}

		// Print out sorted array in order of buckets.
		System.out.println("\nPull elements out of their buckets in-order:");
		for (int i = 0; i < n; i++) {
			int bucketSize = buckets.get(i).size();
			Double[] bucket = new Double[bucketSize];
			bucket = buckets.get(i).toArray(bucket);
			for (int j = 0; j < bucketSize; j++) {
				System.out.println(" " + bucket[j]);
				sorted.add(bucket[j]);
			}
		}
		
		return sorted;
	}
	
	
	
	/*
	 * ########## Problem 2 ##########
	 * 
	 * 
	 * Sources: CLRS 10.1
	 */
	
	// PushA(x)
	//public static void pushStackA(int x) {
	public static void pushStackA(LinkedList<Integer> stack, int x) {
		System.out.printf("\nPushing %s onto stack A\n", x);
		stack.push(x);
		System.out.println(stack);
		//System.out.println(stack.size());
	}
	
	// PushB(x)
	//public static void pushStackB(int x) {
	public static void pushStackB(LinkedList<Integer> stack, int x) {
		System.out.printf("\nPushing %s onto stack B\n", x);
		stack.push(x);
		System.out.println(stack);
		//System.out.println(stack.size());
	}
	
	
	static int popStack(LinkedList<Integer> stack) {
		int node;
		if(stack.isEmpty()) {
			System.out.println("  Stack is empty.");;
		}
		node = (int)stack.getFirst();
		System.out.printf("\nPopping the element: %s\n", node);
		stack.removeFirst();	
		System.out.println(stack);

		return node;
	}
	
	// MultiPopA(k)
	public static void multiPopA(LinkedList<Integer> stack, int k) {
		System.out.println("MultiPopA(" + k + "):");
		System.out.println("Stack A: " + stack);
		// pop k elements from A.
		while(!stack.isEmpty() && k > 0) {
			k--;
			int val = (int)stack.getFirst();
			System.out.println(" Popping from A: " + val);
			stack.removeFirst();		
		}
		System.out.println("Resulting Stack A: " + stack);
	}
	
	// MultiPopB(k)
	public static void multiPopB(LinkedList<Integer> stack, int k) {
		System.out.println("MultiPopB(" + k + "):");
		System.out.println("Stack B: " + stack);
		// pop k elements from B.
		while(!stack.isEmpty() && k > 0) {
			k--;
			int val = (int)stack.getFirst();
			System.out.println(" Popping from B: " + val);
			stack.removeFirst();		
		}
		System.out.println("Resulting Stack B: " + stack);
	}
	
	// Transfer(k)
	public static void transfer(LinkedList<Integer> A, LinkedList<Integer> B, int k) {
		System.out.println("Transfer(" + k + "): ");
		System.out.println("Transfer " + k + " from A to B: ");
		System.out.println(" A = " + A);
		System.out.println(" B = " + B);
		System.out.print("\n");
		// transfer k elements from A to B.
		while(!A.isEmpty() && k > 0) {
			k--;
			// pop from A.
			int val = (int)A.getFirst();
			A.removeFirst();
			System.out.println(" Pop from A: " + val + " <- " + A);
			// push to B.
			B.push(val);
			System.out.println(" Push to B: " + val + "  -> " + B);
			System.out.print("\n");
		}
		System.out.println("Resulting stacks: ");
		System.out.println(" A: " + A);
		System.out.print(" B: " + B);
	}
	
	
}






