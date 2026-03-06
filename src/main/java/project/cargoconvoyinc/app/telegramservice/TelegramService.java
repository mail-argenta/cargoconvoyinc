package project.cargoconvoyinc.app.telegramservice;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

@Service
public class TelegramService {

    public static void sendMessage(String text) {
        String botToken = "8684250607:AAE7yUiG_MrOslcNcnfgNy7PbCJJ0LgxC7w";
        String chatId = "7419451964";
        String url = "https://api.telegram.org/bot" + botToken + "/sendMessage";

        RestTemplate restTemplate = new RestTemplate();

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("chat_id", chatId);
        params.add("parse_mode", "HTML"); // Enables <b>, <br>, etc.
        params.add("text", text);

        try {
            restTemplate.postForObject(url, params, String.class);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}