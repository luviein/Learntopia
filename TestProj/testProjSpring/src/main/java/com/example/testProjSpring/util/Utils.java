package com.example.testProjSpring.util;

import java.util.LinkedList;
import java.util.List;

import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.testProjSpring.model.Score;
import com.example.testProjSpring.repository.ScoreRepo;

@Service
public class Utils {

    @Autowired
    private ScoreRepo repo; 

    public  List<Score> toScore(List<Document> doc) {
        List<Score> stringList = new LinkedList<>();
        List<Document> scores = this.repo.getHighScores();
        for(Document score: scores) {
            Score scoreModel = new Score(score.getString("username"), score.getInteger("mathScore"));
            stringList.add(scoreModel);
        }
        return stringList;
 
    }

    public Score toUserScore(Document doc) {
        return new Score(doc.getString("username"), doc.getInteger("mathScore"));
    }
}
