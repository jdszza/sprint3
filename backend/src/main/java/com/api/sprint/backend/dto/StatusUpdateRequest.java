package com.api.sprint.backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class StatusUpdateRequest {
    
    @NotBlank(message = "Status é obrigatório")
    private String status;
}
