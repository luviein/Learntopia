package com.example.testProjSpring.model;

import java.io.Serializable;
import java.io.StringReader;

import jakarta.json.Json;
import jakarta.json.JsonObject;
import jakarta.json.JsonReader;
import jakarta.json.stream.JsonParsingException;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Score implements Serializable{
    private String username;
    private Integer mathScore;

    public static JsonObject readJSON(String json){
        JsonReader r = Json.createReader(new StringReader(json));
        return r.readObject();
    }

    public static Score getFromJson(String jsonString) {
        JsonObject o = readJSON(jsonString);
        Score m = new Score();
        m.setUsername(o.getString("username"));
        m.setMathScore(o.getInt("mathScore"));
        // System.out.println("in model getfromjson>>>>>"+m);
        return m;
    }

    public JsonObject toJson() {
        return Json.createObjectBuilder()
            .add("username", this.getUsername())
            .add("mathScore", this.getMathScore())
            .build();
    }
}
