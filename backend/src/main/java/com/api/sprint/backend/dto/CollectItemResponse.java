package com.api.sprint.backend.dto;

import com.api.sprint.backend.model.CollectItem;
import lombok.Data;

@Data
public class CollectItemResponse {
    
    private Long id;
    private String name;
    private String weight;
    private Boolean fragile;
    
    public static CollectItemResponse fromEntity(CollectItem item) {
        CollectItemResponse response = new CollectItemResponse();
        response.setId(item.getId());
        response.setName(item.getName());
        response.setWeight(item.getWeight());
        response.setFragile(item.getFragile());
        return response;
    }
}
