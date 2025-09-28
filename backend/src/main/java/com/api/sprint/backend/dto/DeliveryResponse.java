package com.api.sprint.backend.dto;

import com.api.sprint.backend.model.Delivery;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Data
public class DeliveryResponse {
    
    private Long id;
    private String title;
    private String description;
    private String status;
    private String address;
    private String date;
    private String time;
    private String client;
    private String phone;
    private List<DeliveryItemResponse> items;
    private LocalDateTime createdAt;
    
    public static DeliveryResponse fromEntity(Delivery delivery) {
        DeliveryResponse response = new DeliveryResponse();
        response.setId(delivery.getId());
        response.setTitle(delivery.getTitle());
        response.setDescription(delivery.getDescription());
        response.setStatus(delivery.getStatus().name());
        response.setAddress(delivery.getAddress());
        response.setDate(delivery.getDate());
        response.setTime(delivery.getTime());
        response.setClient(delivery.getClient());
        response.setPhone(delivery.getPhone());
        response.setCreatedAt(delivery.getCreatedAt());
        
        if (delivery.getItems() != null) {
            response.setItems(delivery.getItems().stream()
                .map(DeliveryItemResponse::fromEntity)
                .collect(Collectors.toList()));
        }
        
        return response;
    }
}
