package com.api.sprint.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "collect_items")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CollectItem {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "Nome do item é obrigatório")
    @Size(max = 100, message = "Nome do item deve ter no máximo 100 caracteres")
    private String name;
    
    @NotBlank(message = "Peso é obrigatório")
    @Size(max = 20, message = "Peso deve ter no máximo 20 caracteres")
    private String weight;
    
    @NotNull(message = "Fragilidade é obrigatória")
    private Boolean fragile;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "collect_id")
    private Collect collect;
}
