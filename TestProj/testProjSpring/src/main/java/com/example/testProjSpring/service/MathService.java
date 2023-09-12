package com.example.testProjSpring.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;

import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.testProjSpring.model.Question;
import com.example.testProjSpring.model.Score;
import com.example.testProjSpring.repository.ScoreRepo;
import com.example.testProjSpring.security.auth.RegisterRequest;
import com.example.testProjSpring.util.Utils;

@Service
public class MathService {

    @Autowired
    private ScoreRepo scoreRepo;

    @Autowired
    private Utils util;

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

    public Document postInitialScore(RegisterRequest request) {
        return this.scoreRepo.postInitialScore(request);
    }

    public Boolean updateScore(String username, Integer mathScore) {
        return this.scoreRepo.updateScore(username, mathScore);
    }

    // public static List<String> removeQuotesAndForwardSlashesAndSpacesAndCurlyBraces(List<String> jsonStrings) {
    //     List<String> results = new ArrayList<>();
    //     for (String jsonString : jsonStrings) {
    //         String result = jsonString.replaceAll("\"", "").replaceAll("/", "").trim();
    //         result = result.substring(1, result.length() - 1); // remove curly braces
    //         results.add(result);
    //     }
    //     return results;
    // }


    public List<Score> getHighScores() {
        return this.util.toScore(this.scoreRepo.getHighScores());
        
    }

    public Score getUserScore(String username) {
        return this.util.toUserScore(this.scoreRepo.getUserScore(username));
    }


   
}
