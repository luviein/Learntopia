package com.example.testProjSpring.repository;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonObject;
import jakarta.json.JsonReader;
import jakarta.json.JsonString;
import jakarta.json.JsonValue;

@Repository
public class DictionaryRepository {
    @Value("${dict.url}")
    private String dictionaryUrl;

    @Value("${dict.api.key}")
    private String dictAPI;

    public List<String> getDict (String query) throws IOException {
        String dictUrl = UriComponentsBuilder.fromUriString(dictionaryUrl)
            .pathSegment(query)
            .queryParam("key", dictAPI)
            
            .toUriString();

        System.out.println("URL >>>>>>" + dictUrl);

        RestTemplate template = new RestTemplate();
        ResponseEntity<String> res = template.getForEntity(dictUrl, String.class);

        return getJson(res.getBody());
    }

    public List<String> getJson (String json) throws IOException {
        List<String> def = new ArrayList<>();
        try (InputStream is = new ByteArrayInputStream(json.getBytes())) {
            JsonReader reader = Json.createReader(is);

            // api begins with an array so read array
            JsonArray jsonArray = reader.readArray();

            // json value is generic
            for (JsonValue value : jsonArray) {
                // to get see if the generic value is an object
                if (value instanceof JsonObject) {
                    JsonObject jsonObject = (JsonObject) value;

                    // get value of the shortdef array
                    JsonArray shortDefArray = jsonObject.getJsonArray("shortdef");
                    if (shortDefArray != null) {
                        for (JsonValue shortDefValue : shortDefArray) {
                            if (shortDefValue instanceof JsonString) {
                                String shortDef = ((JsonString) shortDefValue).getString();
                                //  \"" and "\"
                                shortDef = shortDef.replace("\\", "").replace("\\\\", ""); // Remove backslash and double quote
                                def.add(shortDef);
                            }
                        }
                    }
                }
            }
        }
           


        return def;
    }
}
