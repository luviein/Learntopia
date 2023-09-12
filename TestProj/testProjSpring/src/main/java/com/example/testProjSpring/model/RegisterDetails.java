package com.example.testProjSpring.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegisterDetails {
    private String username;
    private String email;
    private String passw;

   

}
