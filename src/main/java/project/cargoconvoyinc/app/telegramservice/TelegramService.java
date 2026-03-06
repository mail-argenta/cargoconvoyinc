package project.cargoconvoyinc.app.telegramservice;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Service
public class TelegramService {

    public static void sendMessage(String text) {
        String botToken = "8674303226:AAHYEJxbkmDgZxGzbhlpShxjAi4tJFLuZLQ";
        String chatId = "7167881795";

        try {
            String url = "https://api.telegram.org/bot" + botToken +
                    "/sendMessage?chat_id=" + chatId +
                    "&text=" + URLEncoder.encode(text, StandardCharsets.UTF_8);

            RestTemplate restTemplate = new RestTemplate();
            restTemplate.getForObject(url, String.class);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}