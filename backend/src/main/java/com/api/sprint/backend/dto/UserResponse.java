package com.api.sprint.backend.dto;

import com.api.sprint.backend.model.User;

public record UserResponse(
    Long id,
    String name,
    String email
) {
    public static UserResponse fromEntity(User user) {
        return new UserResponse(
            user.getId(),
            user.getName(),
            user.getEmail()
        );
    }
}
