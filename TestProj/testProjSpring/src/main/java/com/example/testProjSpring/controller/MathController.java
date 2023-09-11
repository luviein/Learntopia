package com.example.testProjSpring.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.testProjSpring.model.Question;
import com.example.testProjSpring.model.Score;
import com.example.testProjSpring.repository.ScoreRepo;
import com.example.testProjSpring.service.MathService;

@RestController
@RequestMapping(path = "/api")
public class MathController {
    
    @Autowired
    private MathService svc;

    @Autowired
    private ScoreRepo scoreRepo;

    @GetMapping(path="/question")
    public Question getQuestion() {
        return this.svc.generateQuestion();
    }

    @PutMapping(path = "/update-score", consumes = MediaType.APPLICATION_JSON_VALUE)
    public void updateMathScore(@RequestBody Score request) {
        try{
            this.scoreRepo.update(request.getUsername(), request.getMathScore());
        }catch(Exception e) {
            e.printStackTrace();
        }

    }

    @GetMapping(path="/getScore")
    public Score getScore(@RequestParam String username) {

        Score score = this.scoreRepo.get(username);
        return score;
    }


}
