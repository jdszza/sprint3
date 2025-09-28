package com.api.sprint.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class CollectItemRequest {
    
    @NotBlank(message = "Nome do item é obrigatório")
    @Size(max = 100, message = "Nome do item deve ter no máximo 100 caracteres")
    private String name;
    
    @NotBlank(message = "Peso é obrigatório")
    @Size(max = 20, message = "Peso deve ter no máximo 20 caracteres")
    private String weight;
    
    @NotNull(message = "Fragilidade é obrigatória")
    private Boolean fragile;
}
