package com.example.testProjSpring.security.auth;


import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.testProjSpring.security.config.JwtService;
import com.example.testProjSpring.security.user.Role;
import com.example.testProjSpring.security.user.User;
import com.example.testProjSpring.security.user.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    
    private final UserRepository repo;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;


    public AuthenticationResponse register (RegisterRequest request) {
        
        // Create user object out of the request
        var user = User.builder()
        .username(request.getUsername())  
        .email(request.getEmail())
        .passw(passwordEncoder.encode(request.getPassw()))
        .role(Role.USER)
        .build();
        
        repo.save(user);
        

        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
            .token(jwtToken)
            .build();
    }

    public AuthenticationResponse authenticate (AuthenticationRequest request) {
        authenticationManager.authenticate(
            // if email and username dont match, exception will be thrown
            new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
        );

        // user is authenticated
        var user = repo.findByUsername(request.getUsername())
            .orElseThrow();

        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
            .token(jwtToken)
            .build();
    }
}
