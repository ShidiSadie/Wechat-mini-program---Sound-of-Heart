package servlet;

import java.sql.*;
import javax.servlet.ServletException;
import javax.servlet.http.*;
import java.io.IOException;
import java.io.Writer;



public class quesServlet extends HttpServlet {
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
        	int m1=0;
        	int m2=0;
        	int m3=0;
        	int m4=0;
        	int m5=0;
        	int m6=0;
        	int m7=0;
        	int m8=0;
        	int m9=0;
            String topicid=request.getParameter("topicid");
            String q1=request.getParameter("q1");
            String q2=request.getParameter("q2");
            String q3=request.getParameter("q3");
            String q4=request.getParameter("q4");
            String q5=request.getParameter("q5");
            String q6=request.getParameter("q6");
            String q7=request.getParameter("q7");
            String q8=request.getParameter("q8");
            String q9=request.getParameter("q9");
            String q10=request.getParameter("q10");
            String[] str={q1,q2,q3,q4,q5,q6,q7,q8,q9,q10};
            int index=0;
            System.out.println(topicid);
            System.out.println(q1);
            System.out.println(q2);
            System.out.println(q3);
            System.out.println(q4);
            System.out.println(q5);
            System.out.println(q6);
            System.out.println(q7);
            System.out.println(q8);
            System.out.println(q9);  
            System.out.println(q10);
        	System.out.println("接受成功！");
        	//进行不同型人格的分值占比的匹配
        	Class.forName("com.mysql.jdbc.Driver"); // 加载MYSQL						
            Connection connect = (Connection) DriverManager.getConnection("jdbc:mysql://localhost/tsh?user=root&password=pop966100");
        	Statement stmt1 = connect.createStatement();      	 
        	String ssql="select aid,tid,M1,M2,M3,M4,M5,M6,M7,M8,M9 from question_answer where tid="+"'"+topicid+"'"; 
        	
        	ResultSet rs = stmt1.executeQuery(ssql);
        	rs.last();
        	rs.beforeFirst();
        	    while(rs.next())     //找出每一个标签下的问题的编号，在使用数组去匹配
        	    {   
        	    	String aid=rs.getString(1);
        	        int  M1=rs.getInt(3);
        	        int  M2=rs.getInt(4);
        	        int  M3=rs.getInt(5);
        	        int  M4=rs.getInt(6);
        	        int  M5=rs.getInt(7);
        	        int  M6=rs.getInt(8);
        	        int  M7=rs.getInt(9);
        	        int  M8=rs.getInt(10);
        	        int  M9=rs.getInt(11);
        	        if(str[index].equals(aid))
        	         {   
	        	        m1=m1+M1;
	        	        m2=m2+M2;
	        	        m3=m3+M3;
	        	        m4=m4+M4;
	        	        m5=m5+M5;
	        	        m6=m6+M6;
	        	        m7=m7+M7;
	        	        m8=m8+M8;
	        	        m9=m9+M9;
	        	        index++;
        	        }  
        	        if(index==9)
        	        {
        	        	break;
        	        }
        	      }       	   
        	  rs.close();  
              System.out.println(m1);
              System.out.println(m2);
              System.out.println(m3);
              System.out.println(m4);
              System.out.println(m5);
              System.out.println(m6);
              System.out.println(m7);
              System.out.println(m8);
              System.out.println(m9);
        	  //再次答题对其进行人格的分值的更新,使用while循环，对数据进行更新
              int n=0;
              int i=1;
              int[] m={m1,m2,m3,m4,m5,m6,m7,m8,m9};  //存储提交后的答案的分析数值
              while(n<9){
              String str1= "update u_mood set mark=mark+? where mid="+"'"+"m0"+i+"'";
              PreparedStatement pstmt1 = connect.prepareStatement(str1);
              pstmt1.setInt(1, m[n]);
        	  int x= pstmt1.executeUpdate();
        	  if(x>0)  //若是一次更新完成，则将本次的查询关闭，则可以容许其进行下一次的更新。若是没有完成，则会报错，更新停止
        	   {
        	    pstmt1.close();
        	   }
        	  n++;
        	  i++;
              }              
              //返回值给微信小程序
            Writer out = response.getWriter();
            out.write("数据已经更新到数据库中！");
            out.flush();
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
