package com.example.simple.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;
import org.springframework.web.bind.annotation.CrossOrigin;

@Configuration
@EnableResourceServer
public class ResourceServerConfig extends ResourceServerConfigurerAdapter {

    String SECURED_PATTERN = "/api/**";
    String SECURED_WRITE_SCOPE = "#oauth2.hasScope('write')";
    String SECURED_READ_SCOPE = "#oauth2.hasScope('read')";

    @Override
    public void configure(HttpSecurity http) throws Exception {
        System.out.println("### Start Auth Resource Server Configuration ###");
        http
                .requestMatchers()
                .antMatchers(SECURED_PATTERN)
                .and()
                .authorizeRequests()
                .antMatchers("/fapi/", "/fapi/register", "/fapi/login", "/fapi/otp").permitAll()
                .antMatchers(HttpMethod.POST, SECURED_PATTERN).access(SECURED_WRITE_SCOPE)
                .anyRequest().access(SECURED_READ_SCOPE);
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
