
public class P3 extends Aircraft {
	
	private int engines;
	
	public int getNumberEngines() {
		return engines;
	}
	public void setNumberEngines(int e) {
		if(e < 0) {
			System.out.println("Choose a positive number!");
			this.engines = 2;
		}
		else {
			this.engines = e;
		}
	}
}
