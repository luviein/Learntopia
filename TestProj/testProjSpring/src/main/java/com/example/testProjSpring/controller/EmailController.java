package com.example.testProjSpring.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.testProjSpring.model.RegisterDetails;
import com.example.testProjSpring.service.EmailService;



import java.io.IOException;
@RestController
@RequestMapping(path="/api")
public class EmailController {

   @Autowired
   private EmailService svc;


    @PostMapping(path = "/send")
    public String sendEmailToUser(@RequestBody RegisterDetails request) throws IOException {
        System.out.println("user request: >>>>>" + request);
        try{
            System.out.println("Sending email >>>>>>>");
           
            this.svc.sendEmail(request.getEmail());
            return "Email sent successfully";
        } catch (IOException ex) {
            ex.printStackTrace();
            return "Error: " + ex.getMessage();
        }

    }
    
}

