package com.example.testProjSpring.service;

import java.util.Optional;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.testProjSpring.model.Question;
import com.example.testProjSpring.model.Score;
import com.example.testProjSpring.repository.ScoreRepo;
import com.example.testProjSpring.security.auth.RegisterRequest;

@Service
public class MathService {

    @Autowired
    private ScoreRepo scoreRepo;
    private final Random random = new Random();

    public Question generateQuestion() {
        int num1 = random.nextInt(10) + 1;
        int num2 = random.nextInt(10) + 1;
        int operator = random.nextInt(2); // 0 for addition, 1 for subtraction

        if (operator == 0) {
            int answer = num1 + num2;
            return new Question(num1 + " + " + num2 + " =", answer, "What is the correct answer?");
        } else {
            int answer = num1 - num2;
            return new Question(num1 + " - " + num2 + " =", answer, "What is the correct answer?");
        }
    }

    public void save(RegisterRequest request) {
        this.scoreRepo.save(request);
    }

    // public void update(String username, int newMathScore) {
    //     this.scoreRepo.update(username, newMathScore);
    // }

    public Score get(String username){
        return this.scoreRepo.get(username);
    }

}
