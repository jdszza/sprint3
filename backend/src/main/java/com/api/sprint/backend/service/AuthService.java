package com.api.sprint.backend.service;

import com.api.sprint.backend.model.User;
import com.api.sprint.backend.repository.UserRepository;
import com.api.sprint.backend.security.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.authentication.BadCredentialsException;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtService jwtService;

    public String login(String email, String senha) {
        User user = userRepository.findByEmailAndPassword(email, senha);
        if (user == null) {
            throw new BadCredentialsException("Email ou senha incorretos");
        }
        return jwtService.generateToken(user);
    }
}