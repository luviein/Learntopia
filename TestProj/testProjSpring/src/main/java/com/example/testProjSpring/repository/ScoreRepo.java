package com.example.testProjSpring.repository;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import com.example.testProjSpring.model.RegisterDetails;
import com.example.testProjSpring.model.Score;
import com.example.testProjSpring.security.auth.RegisterRequest;

@Repository
public class ScoreRepo {

    @Autowired
    private RedisTemplate <String, Object> template;

    public void save(RegisterRequest request) {
        template.opsForValue().set(String.valueOf(request.getUsername()), request.toJson().toString());
    }

    public void update(String username, int newMathScore) {
    // 1. Retrieve the existing RegisterDetails object from Redis
    Object userDetails = template.opsForValue().get(username);
    System.out.println("update redis repo >>>>" + userDetails);

    String json = (String) userDetails;
    System.out.println("json value >>>>>" + json);
    Score score = Score.getFromJson(json);
    // System.out.println("score model >>>>" + score);

    if (json != null) {

        // 3. Update the mathScore field with the new value
        score.setMathScore(newMathScore);
        System.out.println("new score >>>>" + score);

        // 4. Serialize the updated Score object to JSON and save it back to Redis
        String updatedJson = score.toJson().toString();
        System.out.println("updated json >>>>" + updatedJson);
        template.opsForValue().set(username, updatedJson);
    } else {
        System.out.println("No data found for username: " + username);
    }
    }

    public Score get(String username){
        String json =  (String)template.opsForValue().get(String.valueOf(username));
        System.out.println(json);
        return null;
    }
}
