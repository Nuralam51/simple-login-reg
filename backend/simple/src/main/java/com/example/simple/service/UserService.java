package com.example.simple.service;

import com.example.simple.entity.User;

public interface UserService {

    User findByEmail(String email);

    User save(User theUser);

    User findByOTP(String otp);

    void updateStatus(String otp);

    void updateOtp(String otp, String email);
}
