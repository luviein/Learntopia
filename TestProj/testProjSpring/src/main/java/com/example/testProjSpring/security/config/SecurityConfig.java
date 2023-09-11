package com.example.testProjSpring.security.config;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    
    private final JwtAuthenticationFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;
    
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        // whitelist items do not require authentication eg: creating account, log in
        http
            .csrf().disable()
            .authorizeHttpRequests()
            // authorise all methods in this request mapping
            .requestMatchers("/api/**")
            // allow all in the request matchers
                .permitAll()
            // .requestMatchers("/api/v1/auth/**")
            //     .permitAll()
            // .requestMatchers("/api/send")
            // // allow all in the request matchers
            //     .permitAll()
            // .requestMatchers("/api/update-score")
            // // allow all in the request matchers
            //     .permitAll()
            // .requestMatchers("/api/getScore")
            // // allow all in the request matchers
            //     .permitAll()
            // any other request not in request matcher should be authenticated
            .anyRequest()
                .authenticated()
            // session should not be a state, as each request should be authenticated
            .and()
            .sessionManagement()
            .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and()
            .authenticationProvider(authenticationProvider)
            // execute the jwt filter before next filter
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
