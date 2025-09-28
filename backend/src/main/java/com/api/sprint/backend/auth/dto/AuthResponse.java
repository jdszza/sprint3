package com.api.sprint.backend.auth.dto;

public record AuthResponse(
    String token,
    String tokenType,
    Long expiresIn
) {}
