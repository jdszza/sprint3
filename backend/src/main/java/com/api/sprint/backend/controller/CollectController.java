package com.api.sprint.backend.controller;

import com.api.sprint.backend.dto.CollectRequest;
import com.api.sprint.backend.dto.CollectResponse;
import com.api.sprint.backend.dto.StatusUpdateRequest;
import com.api.sprint.backend.service.CollectService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/collects")
@RequiredArgsConstructor
public class CollectController {
    
    private final CollectService collectService;
    
    @GetMapping
    public ResponseEntity<List<CollectResponse>> getAllCollects() {
        List<CollectResponse> collects = collectService.getAllCollects();
        return ResponseEntity.ok(collects);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<CollectResponse> getCollectById(@PathVariable Long id) {
        CollectResponse collect = collectService.getCollectById(id);
        return ResponseEntity.ok(collect);
    }
    
    @PostMapping
    public ResponseEntity<CollectResponse> createCollect(@Valid @RequestBody CollectRequest request) {
        CollectResponse collect = collectService.createCollect(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(collect);
    }
    
    @PatchMapping("/{id}/status")
    public ResponseEntity<CollectResponse> updateCollectStatus(
            @PathVariable Long id, 
            @Valid @RequestBody StatusUpdateRequest request) {
        CollectResponse collect = collectService.updateCollectStatus(id, request.getStatus());
        return ResponseEntity.ok(collect);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCollect(@PathVariable Long id) {
        collectService.deleteCollect(id);
        return ResponseEntity.noContent().build();
    }
}
