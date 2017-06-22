
public class Destroyer extends Ship {

	private int missiles = 2;
	public int getNumberMissiles() {
		return missiles;
	}
	public void setNumberMissiles(int m) {
		if(m < 0) {
			System.out.println("Choose a positive number!");
			this.missiles = 2;
		} else {
			this.missiles = m;
		}
	}
}
