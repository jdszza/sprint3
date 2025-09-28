package com.api.sprint.backend.dto;

import com.api.sprint.backend.model.DeliveryItem;
import lombok.Data;

@Data
public class DeliveryItemResponse {
    
    private Long id;
    private String name;
    private String weight;
    private Boolean fragile;
    
    public static DeliveryItemResponse fromEntity(DeliveryItem item) {
        DeliveryItemResponse response = new DeliveryItemResponse();
        response.setId(item.getId());
        response.setName(item.getName());
        response.setWeight(item.getWeight());
        response.setFragile(item.getFragile());
        return response;
    }
}
