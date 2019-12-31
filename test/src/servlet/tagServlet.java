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

public class tagServlet extends HttpServlet {

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
            String tid=request.getParameter("tid");
            System.out.println(tid);
        	String driverName = "com.mysql.jdbc.Driver";  
        	String url = "jdbc:mysql://localhost/tsh?user=root&password=pop966100";  
        	Class.forName(driverName);  	
        	Connection conn = DriverManager.getConnection(url);     
        	Statement stmt = conn.createStatement();  
    		String ssql="select tagid,tagname from tag where tid="+"'"+tid+"'"; 
    		ResultSet rs = stmt.executeQuery(ssql);
    		rs.last();
    		rs.beforeFirst();
    		JsonArray array = new JsonArray();
    		while(rs.next())
    		{
    			JsonObject obj = new JsonObject();
    			String tagid=rs.getString("tagid");
    			String tagname=rs.getString("tagname");
    			obj.addProperty("tid",tid);
    			obj.addProperty("tagid",tagid);
    			obj.addProperty("tagname",tagname);
    			array.add(obj);
    		}
    		PrintWriter out = null;
    		out = response.getWriter();
    		out.append(array.toString());  
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
