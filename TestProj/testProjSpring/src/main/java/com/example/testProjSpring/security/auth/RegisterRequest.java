package com.example.testProjSpring.security.auth;


import com.example.testProjSpring.security.user.Role;

import jakarta.json.Json;
import jakarta.json.JsonObject;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
    private String username;
    private String email;
    private String passw;
    private Role role;

    

    public JsonObject toJson() {
        return Json.createObjectBuilder()
            .add("username", this.getUsername())
            .add("mathScore", 0)
            .build();
    }


}
