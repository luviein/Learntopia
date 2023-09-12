package com.example.testProjSpring.service;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.testProjSpring.repository.DictionaryRepository;

@Service
public class DictionaryService {
    
    @Autowired
    private DictionaryRepository repo;

    public List<String> getDict (String query) throws IOException {
        return this.repo.getDict(query);
    }

    public List<String> getJson (String json) throws IOException {
        return this.repo.getJson(json);
    }
}
