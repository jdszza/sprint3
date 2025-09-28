package com.api.sprint.backend.dto;

import com.api.sprint.backend.model.Collect;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Data
public class CollectResponse {
    
    private Long id;
    private String title;
    private String description;
    private String status;
    private String address;
    private String date;
    private String time;
    private String client;
    private String phone;
    private List<CollectItemResponse> items;
    private LocalDateTime createdAt;
    
    public static CollectResponse fromEntity(Collect collect) {
        CollectResponse response = new CollectResponse();
        response.setId(collect.getId());
        response.setTitle(collect.getTitle());
        response.setDescription(collect.getDescription());
        response.setStatus(collect.getStatus().name());
        response.setAddress(collect.getAddress());
        response.setDate(collect.getDate());
        response.setTime(collect.getTime());
        response.setClient(collect.getClient());
        response.setPhone(collect.getPhone());
        response.setCreatedAt(collect.getCreatedAt());
        
        if (collect.getItems() != null) {
            response.setItems(collect.getItems().stream()
                .map(CollectItemResponse::fromEntity)
                .collect(Collectors.toList()));
        }
        
        return response;
    }
}
