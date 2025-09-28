package com.api.sprint.backend.service;

import com.api.sprint.backend.dto.CollectRequest;
import com.api.sprint.backend.dto.CollectResponse;
import com.api.sprint.backend.model.Collect;
import com.api.sprint.backend.model.CollectItem;
import com.api.sprint.backend.repository.CollectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class CollectService {
    
    private final CollectRepository collectRepository;
    
    public List<CollectResponse> getAllCollects() {
        return collectRepository.findAll().stream()
            .map(CollectResponse::fromEntity)
            .collect(Collectors.toList());
    }
    
    public CollectResponse getCollectById(Long id) {
        Collect collect = collectRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Coleta não encontrada"));
        return CollectResponse.fromEntity(collect);
    }
    
    public CollectResponse createCollect(CollectRequest request) {
        Collect collect = new Collect();
        collect.setTitle(request.getTitle());
        collect.setDescription(request.getDescription());
        collect.setStatus(Collect.CollectStatus.PENDING);
        collect.setAddress(request.getAddress());
        collect.setDate(request.getDate());
        collect.setTime(request.getTime());
        collect.setClient(request.getClient());
        collect.setPhone(request.getPhone());
        
        // Salvar a coleta primeiro
        Collect savedCollect = collectRepository.save(collect);
        
        // Criar os itens
        if (request.getItems() != null) {
            final Collect finalCollect = savedCollect;
            List<CollectItem> items = request.getItems().stream()
                .map(itemRequest -> {
                    CollectItem item = new CollectItem();
                    item.setName(itemRequest.getName());
                    item.setWeight(itemRequest.getWeight());
                    item.setFragile(itemRequest.getFragile());
                    item.setCollect(finalCollect);
                    return item;
                })
                .collect(Collectors.toList());
            
            savedCollect.setItems(items);
            savedCollect = collectRepository.save(savedCollect);
        }
        
        return CollectResponse.fromEntity(savedCollect);
    }
    
    public CollectResponse updateCollectStatus(Long id, String status) {
        Collect collect = collectRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Coleta não encontrada"));
        
        try {
            collect.setStatus(Collect.CollectStatus.valueOf(status.toUpperCase()));
            collect = collectRepository.save(collect);
            return CollectResponse.fromEntity(collect);
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Status inválido: " + status);
        }
    }
    
    public void deleteCollect(Long id) {
        if (!collectRepository.existsById(id)) {
            throw new RuntimeException("Coleta não encontrada");
        }
        collectRepository.deleteById(id);
    }
}
