package com.example.testProjSpring.service;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.sendgrid.*;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Content;
import com.sendgrid.helpers.mail.objects.Email;

@Service
public class EmailService {

    @Value("${sendgrid.api.key}")
    private String sendGridAPI;

    private final String API_KEY= sendGridAPI;
    
    public void sendEmail(String email) throws IOException {
        Email from = new Email("learntopia.hello@gmail.com");
        String subject = "Sending with SendGrid is Fun";
        Email to = new Email(email);
        Content content = new Content("text/plain", "and easy to do anywhere, even with Java");
        Mail mail = new Mail(from, subject, to, content);
        mail.setTemplateId("d-f4f43e85fedd4dee873dbf67cffbeaab");
        mail.addContent(new Content("text/html", "<p>Enter Learntopia <a href=\"https://learntopia.pro\">learntopia.pro</a></p>"));

        SendGrid sg = new SendGrid(API_KEY);
        Request request = new Request();
        try {
            request.setMethod(Method.POST);
            request.setEndpoint("mail/send");
            request.setBody(mail.build());
            Response response = sg.api(request);
            System.out.println(response.getStatusCode());
            System.out.println(response.getBody());
            System.out.println(response.getHeaders());
        } catch (IOException ex) {
            throw ex;
        }
    }
}
