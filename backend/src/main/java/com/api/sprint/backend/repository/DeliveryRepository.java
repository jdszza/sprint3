package com.api.sprint.backend.repository;

import com.api.sprint.backend.model.Delivery;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DeliveryRepository extends JpaRepository<Delivery, Long> {
    
    List<Delivery> findByStatus(Delivery.DeliveryStatus status);
    
    List<Delivery> findByClientContainingIgnoreCase(String client);
    
    List<Delivery> findByAddressContainingIgnoreCase(String address);
}
