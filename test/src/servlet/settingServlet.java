package servlet;

import java.sql.*;
import javax.servlet.ServletException;
import javax.servlet.http.*;
import java.io.IOException;
import java.io.Writer;


public class settingServlet extends HttpServlet {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	public void destroy() {
		super.destroy(); // Just puts "destroy" string in log
		// Put your code here
	}
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    	//设置请求编码
        request.setCharacterEncoding("utf-8");
        response.setContentType("text/html;charset=utf-8");
        /* 设置响应头允许ajax跨域访问 */
        response.setHeader("Access-Control-Allow-Origin", "*");
        /* 星号表示所有的异域请求都可以接受， */
        response.setHeader("Access-Control-Allow-Methods", "GET,POST");
        //获取微信小程序get的参数值并打印
        try{
            String birth=request.getParameter("birth");
            String sign=request.getParameter("sign");
            String status=request.getParameter("status");
            System.out.println(birth);
            System.out.println(sign);
            System.out.println(status);
            Class.forName("com.mysql.jdbc.Driver"); // 加载MYSQL						
        	Connection connect = (Connection) DriverManager.getConnection("jdbc:mysql://localhost/tsh?user=root&password=pop966100");
    		PreparedStatement ps = connect.prepareStatement(
    				"update users set ubirth=?,usign=?");
			    		ps.setString(1,birth);
			    		ps.setString(2,sign);
    		    int  result = ps.executeUpdate();
    			ps.close();
    			if (result>0) {
    				System.out.println("更新1信息成功！");
    				//返回值给微信小程序
    		        Writer out = response.getWriter();
    		        out.write("后台已收到");
    		        out.flush();
    		       }
    		PreparedStatement ps1 = connect.prepareStatement(
        				"update moment set private=?");
    			    		ps.setString(1,status);
        		    int  result1 = ps1.executeUpdate();
        			ps1.close();
        			if (result1>0) {
        				System.out.println("更新2信息成功！");
        				//返回值给微信小程序
        		        Writer out = response.getWriter();
        		        out.write("后台已收到了");
        		        out.flush();
        		       }
        }
        catch (Exception e) 
        {
        	System.out.println(e);  
            e.printStackTrace();
       	}
        //result.put("data", user);
        //result.put("msg", "后台已收到");
        //使用Gson类需要导入gson-2.8.0.jar
        //String json = new Gson().toJson(result);

        //返回值给微信小程序
        
    }


    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doGet(request, response);
    }
	public void init() throws ServletException {
	}
}
