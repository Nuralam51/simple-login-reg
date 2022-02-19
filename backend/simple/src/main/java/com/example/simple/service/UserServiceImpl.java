package com.example.simple.service;

import com.example.simple.entity.Role;
import com.example.simple.entity.User;
import com.example.simple.repository.UserRepository;
import net.bytebuddy.utility.RandomString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private MailService mailService;

    @Autowired
    PasswordEncoder passwordEncoded;

    @Override
    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public User save(User theUser) {
        String otp = RandomString.make(6);
        theUser.setPassword(passwordEncoded.encode(theUser.getPassword()));
        theUser.setOtp(otp);
        theUser.setRole(Role.USER);
        theUser.setStatus(0);
        mailService.otpSendMail(theUser.getEmail(), "Registration OTP code", "This is 6 digit otp code: " + otp + "\n\nThank you.");
        return userRepository.save(theUser);
    }

    @Override
    public void updateStatus(String otp) {
        User theUser = userRepository.findByotp(otp);
        theUser.setStatus(1);
        theUser.setOtp(null);
        userRepository.save(theUser);
    }

    @Override
    public User findByOTP(String otp) {
        return userRepository.findByotp(otp);
    }

    @Override
    public void updateOtp(String otp, String email) {
        User theUser = userRepository.findByEmail(email);
        theUser.setOtp(otp);
        userRepository.save(theUser);
    }
}
