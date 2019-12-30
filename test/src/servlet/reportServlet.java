package servlet;

import java.sql.*;
import javax.sql.*;
import java.util.*;

import javax.servlet.ServletException;
import javax.servlet.http.*;

import com.google.gson.*;

import java.io.IOException;
import java.io.PrintWriter;
import java.io.Writer;
import java.util.HashMap;
import java.util.Map;

public class reportServlet extends HttpServlet {

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
            String uid=request.getParameter("Id");
            String imageName="";
            System.out.println(uid);
        	String driverName = "com.mysql.jdbc.Driver";  
        	String url = "jdbc:mysql://localhost/tsh?user=root&password=pop966100";  
        	Class.forName(driverName);  	
        	Connection conn = DriverManager.getConnection(url);     
        	Statement stmt = conn.createStatement();  
    		String ssql="select max(mark),mid from u_mood where uid="+uid; 
    		ResultSet rs = stmt.executeQuery(ssql);
    		rs.last();
    		rs.beforeFirst();
    		JsonObject obj = new JsonObject();  
    		while(rs.next())
    		{
    			String mid=rs.getString("mid");
    			if (mid.equals("m01")) imageName="perfect.png";
    			if (mid.equals("m02")) imageName="help.png";
    			if (mid.equals("m03")) imageName="success.png";
    			if (mid.equals("m04")) imageName="art.png";
    			if (mid.equals("m05")) imageName="wise.png";
    			if (mid.equals("m06")) imageName="loyal.png";
    			if (mid.equals("m07")) imageName="happy.png";
    			if (mid.equals("m08")) imageName="leader.png";
    			if (mid.equals("m09")) imageName="peace.png";
    			System.out.println(imageName);
    			obj.addProperty("imageName",imageName);
    			break;
    		}
    		PrintWriter out = null;
    		out = response.getWriter();
    		out.write(obj.toString());  
	        out.close();
	        stmt.close();
	        conn.close();
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
}
