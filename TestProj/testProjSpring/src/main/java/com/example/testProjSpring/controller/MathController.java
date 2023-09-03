package com.example.testProjSpring.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.testProjSpring.model.Question;
import com.example.testProjSpring.service.MathService;

@RestController
@RequestMapping(path = "/api")
public class MathController {
    
    @Autowired
    private MathService svc;

    @GetMapping(path="/question")
    public Question getQuestion() {
        return this.svc.generateQuestion();
    }
}
