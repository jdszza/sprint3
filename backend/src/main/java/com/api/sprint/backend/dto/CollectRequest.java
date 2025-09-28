package com.api.sprint.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.List;

@Data
public class CollectRequest {
    
    @NotBlank(message = "Título é obrigatório")
    @Size(max = 100, message = "Título deve ter no máximo 100 caracteres")
    private String title;
    
    @NotBlank(message = "Descrição é obrigatória")
    @Size(max = 500, message = "Descrição deve ter no máximo 500 caracteres")
    private String description;
    
    @NotBlank(message = "Endereço é obrigatório")
    @Size(max = 200, message = "Endereço deve ter no máximo 200 caracteres")
    private String address;
    
    @NotBlank(message = "Data é obrigatória")
    private String date;
    
    @NotBlank(message = "Horário é obrigatório")
    private String time;
    
    @NotBlank(message = "Cliente é obrigatório")
    @Size(max = 100, message = "Nome do cliente deve ter no máximo 100 caracteres")
    private String client;
    
    @NotBlank(message = "Telefone é obrigatório")
    @Size(max = 20, message = "Telefone deve ter no máximo 20 caracteres")
    private String phone;
    
    @NotNull(message = "Itens são obrigatórios")
    private List<CollectItemRequest> items;
}
