package com.shiro.controller;

import com.shiro.model.User;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;

/**
 * Created by zhenghuasheng on 2017/9/16.
 */
@Controller
public class ShiroController {

    @RequestMapping(value="/index",method= RequestMethod.GET)
    public String index(Model model){
        User user = (User) SecurityUtils.getSubject().getPrincipal();
        model.addAttribute("username", user.getUsername());
        return "index";
    }

    @RequestMapping(value="/login",method=RequestMethod.GET)
    public String loginForm(Model model){
        model.addAttribute("user", new User());
        return "login";
    }

    //用户登录
    @RequestMapping(value = "/login",method=RequestMethod.POST)
    public String login(User user, Boolean rememberMe, HttpServletRequest request) {
        Subject subject = SecurityUtils.getSubject();
        UsernamePasswordToken token = new UsernamePasswordToken(user.getUsername(), user.getPassword());
        try{
            if (rememberMe != null && rememberMe) {
                token.setRememberMe(true);
            }
            subject.login(token);//会跳到我们自定义的realm中
            request.getSession().setAttribute("user", user);
            return "index";
        }catch(Exception e){
            request.getSession().setAttribute("user", user);
            request.setAttribute("error", "用户名或密码错误！");
            return "login";
        }
    }

    @RequestMapping("/logout")
    public String logout(HttpServletRequest request) {
        Subject subject = SecurityUtils.getSubject();
        subject.logout();
        request.getSession().invalidate();
        return "login";
    }

//    @RequiresRoles({"admin"}) //和配置 filterChainDefinitionMap.put("/admin/**", "roles[admin]")一样的效果
    @RequestMapping("/admin")
    public String admin(HttpServletRequest request) {
        return "index";
    }
}
