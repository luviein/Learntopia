package com.example.testProjSpring.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
@AllArgsConstructor
public class Question {
    private String question;
    private Integer answer;
    private String message;


}
