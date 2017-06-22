
public class Submarine extends Ship {
	
	private int torpedoes = 2;
	
	public int getNumberTorpedos() {
		return torpedoes;
	}
	
	public void setNumberTorpedos(int t) {
		if(t < 0) {
			System.out.println("Choose a positive number!");
			this.torpedoes = 2;
		} else {
			this.torpedoes = t;
		}
	}
}
