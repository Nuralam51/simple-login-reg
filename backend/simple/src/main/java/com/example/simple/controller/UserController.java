package com.example.simple.controller;

import com.example.simple.entity.User;
import com.example.simple.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/user-details/{email}")
    public ResponseEntity<?> getUserDetails(@PathVariable String email) {
        User user = userService.findByEmail(email);
        if (user == null) {
            return new ResponseEntity(HttpStatus.CONFLICT);
        }
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

}
