package com.example.simple.service;

import java.math.BigInteger;
import java.util.Date;

public interface MailService {
    void otpSendMail(String to, String subject, String body);
}
