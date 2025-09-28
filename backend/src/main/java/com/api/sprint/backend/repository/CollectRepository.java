package com.api.sprint.backend.repository;

import com.api.sprint.backend.model.Collect;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CollectRepository extends JpaRepository<Collect, Long> {
    
    List<Collect> findByStatus(Collect.CollectStatus status);
    
    List<Collect> findByClientContainingIgnoreCase(String client);
    
    List<Collect> findByAddressContainingIgnoreCase(String address);
}
