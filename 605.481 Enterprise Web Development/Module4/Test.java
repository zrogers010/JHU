
import java.util.*;

/*
 * JHU 605.481
 * Module 4 HW
 * 
 * Zachary Rogers
 * 06/21/2017
 */

public class Test {

	public static void main(String[] args) {
		System.out.println("JHU 605.481 - Mod 4 HW - Zachary Rogers ");
		Destroyer d1 = new Destroyer();
		Destroyer d2 = new Destroyer();		
		
		Submarine s1 = new Submarine();
		Submarine s2 = new Submarine();
		
		P3 p1 = new P3();
		P3 p2 = new P3();
		
		System.out.println("\n Destroyers: ");
		System.out.println(" -----");
		ArrayList<Destroyer> destroyers = new ArrayList<Destroyer>();
		destroyers.add(d1);
		destroyers.add(d2);
		// Set some default Contact parameters:
		destroyers.get(0).setName("Arizona");
		destroyers.get(0).setSpeed(32);
		destroyers.get(0).setLength(350);
		destroyers.get(0).setType("Destroyer");
		destroyers.get(1).setName("NewYork");
		destroyers.get(1).setSpeed(27);
		destroyers.get(1).setLength(380);
		destroyers.get(1).setType("Destroyer");
		// Print out destroyers details
		for(int i=0; i < destroyers.size(); i++) {
			System.out.println(destroyers.get(i).getName());
			System.out.println(destroyers.get(i).getType());
			System.out.println(destroyers.get(i).getSpeed());
			System.out.println(destroyers.get(i).getLength());
			System.out.println("\n");
		}
		
		System.out.println("\n Submarines: ");
		System.out.println(" -----");
		ArrayList<Submarine> submarines = new ArrayList<Submarine>();
		submarines.add(s1);
		submarines.add(s2);
		// Set some default Contact parameters:
		submarines.get(0).setName("Ohio");
		submarines.get(0).setSpeed(18);
		submarines.get(0).setLength(200);
		submarines.get(0).setType("Submarine");
		submarines.get(1).setName("Trident");
		submarines.get(1).setSpeed(22);
		submarines.get(1).setLength(225);
		submarines.get(1).setType("Submarine");
		// Print out destroyers details
		for(int i=0; i < submarines.size(); i++) {
			System.out.println(submarines.get(i).getName());
			System.out.println(submarines.get(i).getType());
			System.out.println(submarines.get(i).getSpeed());
			System.out.println(submarines.get(i).getLength());
			System.out.println("\n");
		}

		System.out.println("\n Ships: ");
		System.out.println(" -----");
		ArrayList<Ship> ships = new ArrayList<Ship>();
		ships.addAll(destroyers);
		ships.addAll(submarines);
		for(int i=0; i < ships.size(); i++) {
			System.out.println(ships.get(i).getName() + ": [" + ships.get(i).getType() + "]");
		}

		System.out.println(" \n Contacts: ");
		System.out.println(" -----");
		int count = 1;
		for(Ship ship : ships) {
			System.out.println("Ship #" + count);
			System.out.println("Contact Ship's Type: " + ship.getType());
			System.out.println("Contact Ship's Speed: " + ship.getSpeed());
			System.out.println("Contact Ship's Length: " + ship.getLength());
			count += 1;
		}
	}

}
