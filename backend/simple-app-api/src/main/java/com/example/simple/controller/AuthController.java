package com.example.simple.controller;

import com.example.simple.entity.User;
import com.example.simple.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/fapi/v1")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> userRegister(@RequestBody User theUser) {
        if(userService.findByEmail(theUser.getEmail()) != null) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        userService.save(theUser);
        return new ResponseEntity(HttpStatus.CREATED);
    }

    @PostMapping("/otp")
    public ResponseEntity<?> checkOTP(@RequestBody User theUser){
        if(userService.findByOTP(theUser.getOtp()) == null){
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        userService.updateStatus(theUser.getOtp());
        return new ResponseEntity(HttpStatus.OK);
    }

}
