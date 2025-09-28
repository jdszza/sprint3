package com.api.sprint.backend.service;

import com.api.sprint.backend.dto.DeliveryRequest;
import com.api.sprint.backend.dto.DeliveryResponse;
import com.api.sprint.backend.model.Delivery;
import com.api.sprint.backend.model.DeliveryItem;
import com.api.sprint.backend.repository.DeliveryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class DeliveryService {
    
    private final DeliveryRepository deliveryRepository;
    
    public List<DeliveryResponse> getAllDeliveries() {
        return deliveryRepository.findAll().stream()
            .map(DeliveryResponse::fromEntity)
            .collect(Collectors.toList());
    }
    
    public DeliveryResponse getDeliveryById(Long id) {
        Delivery delivery = deliveryRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Entrega não encontrada"));
        return DeliveryResponse.fromEntity(delivery);
    }
    
    public DeliveryResponse createDelivery(DeliveryRequest request) {
        Delivery delivery = new Delivery();
        delivery.setTitle(request.getTitle());
        delivery.setDescription(request.getDescription());
        delivery.setStatus(Delivery.DeliveryStatus.PENDING);
        delivery.setAddress(request.getAddress());
        delivery.setDate(request.getDate());
        delivery.setTime(request.getTime());
        delivery.setClient(request.getClient());
        delivery.setPhone(request.getPhone());
        
        // Salvar a entrega primeiro
        Delivery savedDelivery = deliveryRepository.save(delivery);
        
        // Criar os itens
        if (request.getItems() != null) {
            final Delivery finalDelivery = savedDelivery;
            List<DeliveryItem> items = request.getItems().stream()
                .map(itemRequest -> {
                    DeliveryItem item = new DeliveryItem();
                    item.setName(itemRequest.getName());
                    item.setWeight(itemRequest.getWeight());
                    item.setFragile(itemRequest.getFragile());
                    item.setDelivery(finalDelivery);
                    return item;
                })
                .collect(Collectors.toList());
            
            savedDelivery.setItems(items);
            savedDelivery = deliveryRepository.save(savedDelivery);
        }
        
        return DeliveryResponse.fromEntity(savedDelivery);
    }
    
    public DeliveryResponse updateDeliveryStatus(Long id, String status) {
        Delivery delivery = deliveryRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Entrega não encontrada"));
        
        try {
            delivery.setStatus(Delivery.DeliveryStatus.valueOf(status.toUpperCase()));
            delivery = deliveryRepository.save(delivery);
            return DeliveryResponse.fromEntity(delivery);
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Status inválido: " + status);
        }
    }
    
    public void deleteDelivery(Long id) {
        if (!deliveryRepository.existsById(id)) {
            throw new RuntimeException("Entrega não encontrada");
        }
        deliveryRepository.deleteById(id);
    }
}
