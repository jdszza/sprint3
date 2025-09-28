package com.api.sprint.backend.auth.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record LoginRequest(
    @NotBlank(message = "Email is required")
    String email,
    
    @NotBlank(message = "Password is required")
    @Size(min = 3, message = "Password must be at least 3 characters")
    String senha
) {}
