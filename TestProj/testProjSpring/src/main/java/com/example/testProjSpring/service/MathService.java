package com.example.testProjSpring.service;

import java.util.Random;

import org.springframework.stereotype.Service;

import com.example.testProjSpring.model.Question;

@Service
public class MathService {
    private final Random random = new Random();

    public Question generateQuestion() {
        int num1 = random.nextInt(10) + 1;
        int num2 = random.nextInt(10) + 1;
        int operator = random.nextInt(2); // 0 for addition, 1 for subtraction

        if (operator == 0) {
            int answer = num1 + num2;
            return new Question(num1 + " + " + num2 + " =", answer);
        } else {
            int answer = num1 - num2;
            return new Question(num1 + " - " + num2 + " =", answer);
        }
    }
}
