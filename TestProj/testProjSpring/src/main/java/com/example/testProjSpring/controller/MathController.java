package com.example.testProjSpring.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.testProjSpring.model.Question;
import com.example.testProjSpring.model.Score;
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

    @PutMapping(path = "/update-score", consumes = MediaType.APPLICATION_JSON_VALUE)
    public void updateMathScore(@RequestBody Score request) {
        try{
           if(this.svc.updateScore(request.getUsername(), request.getMathScore())){
            System.out.println("success");
           }
        }catch(Exception e) {
            e.printStackTrace();
        }

    }

    @GetMapping(path="/getScore")
    public List<Score> getScore() {

        return this.svc.getHighScores();
  
    }

    @GetMapping(path="/getScore/{username}")
    public Score getScore(@PathVariable String username) {

        return this.svc.getUserScore(username);
  
    }


}
