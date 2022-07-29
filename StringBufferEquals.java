
public class StringBufferEquals {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		StringBuffer sb1 = new StringBuffer("pratik");
		StringBuffer sb2 = new StringBuffer("pratik");
		
		System.out.println(sb1==sb2); //reference comparison
		System.out.println(sb1.equals(sb2)); //reference comparison
		
	}

}
