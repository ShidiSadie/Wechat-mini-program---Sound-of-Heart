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

public class findServlet extends HttpServlet {

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
            System.out.println(uid);
        	String driverName = "com.mysql.jdbc.Driver";  
        	String url = "jdbc:mysql://localhost/tsh?user=root&password=pop966100";  
        	Class.forName(driverName);  	
        	Connection conn = DriverManager.getConnection(url);     
        	Statement stmt = conn.createStatement();  
    		String ssql="select momid,mcontent,mtime,thumscount,commcount,tname,tagname,private,uname,uimg from find_m where uid="+uid; 
    		ResultSet rs = stmt.executeQuery(ssql);
    		rs.last();
    		rs.beforeFirst();
    		JsonArray array = new JsonArray();
    		while(rs.next())
    		{
    			JsonObject obj = new JsonObject();
    			int momid = rs.getInt("momid"); 
    			System.out.println(momid);
    			String mcontent=rs.getString("mcontent");
    			System.out.println(mcontent);
    			String mtime=rs.getString("mtime");
    			int thumscount=rs.getInt("thumscount");
    			int commcount=rs.getInt("commcount");
    			String tname=rs.getString("tname");
    			String tagname=rs.getString("tagname");
    			int priv=rs.getInt("private");
    			String uname=rs.getString("uname");
    			String uimg=rs.getString("uimg");
    			obj.addProperty("momid",momid);
    			obj.addProperty("mcontent",mcontent);
    			obj.addProperty("mtime",mtime);
    			obj.addProperty("thumscount",thumscount);
    			obj.addProperty("commcount",commcount);
    			obj.addProperty("tid",tname);
    			obj.addProperty("tagid",tagname);
    			obj.addProperty("private",priv);
    			obj.addProperty("uname",uname);
    			obj.addProperty("uimg",uimg);
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
