
import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.arnx.jsonic.JSON;
import net.arnx.jsonic.JSONException;


class Data{

	public String a;
	public String b;
	public String c;

}

/**
 * Servlet implementation class Main
 */
@WebServlet("/Main")
public class Main extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private Oracle mOracle;
	private final String DB_ID = "x14g023";
	private final String DB_PASS = "ha9shiba";



public void init() throws ServletException {
	// TODO 自動生成されたメソッド・スタブ
	super.init();


	try{
		mOracle = new Oracle();
		mOracle.connect("ux4", DB_ID, DB_PASS);

		//テーブルが無ければ作成
//		if(!mOracle.isTable("db_exam10"))
//		{
//			mOracle.execute("create table db_exam10(id number,name varchar2(200),msg varchar2(200))");
//			mOracle.execute("create sequence db_exam10_seq");
//		}
	} catch (Exception e) {
		System.err.println("認証に失敗しました");
	}
}

@Override
public void destroy() {
	//DB切断
	mOracle.close();
	// TODO 自動生成されたメソッド・スタブ
	super.destroy();
}

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public Main() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		action(request, response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		action(request, response);
	}

	protected void action(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {

		// 要求文字コードのセット(Javaプログラムからはき出す文字コード)
		response.setCharacterEncoding("UTF-8");
		// 応答文字コードのセット(クライアントに通知する文字コードとファイルの種類)
		response.setContentType("text/html; charset=UTF-8");


		try {
			Data data = JSON.decode(request.getInputStream(),Data.class);
			String sql = String.format("insert into t_rank values(id_seq.nextval,'%s','%s','%s')",data.a,data.b,data.c);
			mOracle.execute(sql);
		} catch (JSONException e) {
			// TODO 自動生成された catch ブロック
			e.printStackTrace();
		}

	}

}
