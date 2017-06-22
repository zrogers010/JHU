
public abstract class Ship implements Contact {
	private int length;
	private int speed;
	private String name;
	private String type;
	
	public int getLength() {
		return length;
	}

	public void setLength(int length) {
		if(length < 0) {
			System.out.println("Choose a positive number!");
		} else {
			this.length = length;
		}
	}

	public int getSpeed() {
		return speed;
	}
	
	public void setSpeed(int speed) {
		if(speed < 0) {
			System.out.println("Choose a positive number!");
		} else {
			this.speed = speed;
		}
	}
	
	public String getName() {
		return name;
	}
	
	public void setName(String name) {
		if(name.length() == 0 || name.isEmpty()) {
			System.out.println("Choose a positive number!");
		} else {
			this.name = name;
		}
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}
}
