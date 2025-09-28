package com.api.sprint.backend.config;

import com.api.sprint.backend.model.User;
import com.api.sprint.backend.model.Collect;
import com.api.sprint.backend.model.CollectItem;
import com.api.sprint.backend.model.Delivery;
import com.api.sprint.backend.model.DeliveryItem;
import com.api.sprint.backend.repository.UserRepository;
import com.api.sprint.backend.repository.CollectRepository;
import com.api.sprint.backend.repository.DeliveryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CollectRepository collectRepository;

    @Autowired
    private DeliveryRepository deliveryRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // Create default admin user if it doesn't exist
        if (userRepository.findByEmail("admin@admin.com").isEmpty()) {
            User admin = new User();
            admin.setName("Admin User");
            admin.setEmail("admin@admin.com");
            admin.setPassword(passwordEncoder.encode("admin"));
            userRepository.save(admin);
            System.out.println("Default admin user created: admin@admin.com / admin");
        }

        // Create sample collects if they don't exist
        if (collectRepository.count() == 0) {
            createSampleCollects();
        }

        // Create sample deliveries if they don't exist
        if (deliveryRepository.count() == 0) {
            createSampleDeliveries();
        }
    }

    private void createSampleCollects() {
        // Coleta 1
        Collect collect1 = new Collect();
        collect1.setTitle("Coleta no Shopping Center");
        collect1.setDescription("Coletar encomendas no shopping center");
        collect1.setStatus(Collect.CollectStatus.PENDING);
        collect1.setAddress("Rua das Flores, 123 - Shopping Center");
        collect1.setDate("2024-01-15");
        collect1.setTime("14:30");
        collect1.setClient("Maria Santos");
        collect1.setPhone("(11) 99999-9999");
        collect1 = collectRepository.save(collect1);

        CollectItem item1 = new CollectItem();
        item1.setName("Pacote 1");
        item1.setWeight("2.5kg");
        item1.setFragile(false);
        item1.setCollect(collect1);
        collect1.setItems(Arrays.asList(item1));

        // Coleta 2
        Collect collect2 = new Collect();
        collect2.setTitle("Coleta no Centro Comercial");
        collect2.setDescription("Coletar documentos no centro comercial");
        collect2.setStatus(Collect.CollectStatus.IN_PROGRESS);
        collect2.setAddress("Av. Central, 456 - Centro Comercial");
        collect2.setDate("2024-01-15");
        collect2.setTime("16:00");
        collect2.setClient("Carlos Oliveira");
        collect2.setPhone("(11) 88888-8888");
        collect2 = collectRepository.save(collect2);

        CollectItem item2 = new CollectItem();
        item2.setName("Documentos");
        item2.setWeight("0.5kg");
        item2.setFragile(false);
        item2.setCollect(collect2);
        collect2.setItems(Arrays.asList(item2));

        System.out.println("Sample collects created");
    }

    private void createSampleDeliveries() {
        // Entrega 1
        Delivery delivery1 = new Delivery();
        delivery1.setTitle("Entrega no Centro");
        delivery1.setDescription("Entregar pacotes no centro da cidade");
        delivery1.setStatus(Delivery.DeliveryStatus.PENDING);
        delivery1.setAddress("Av. Central, 456");
        delivery1.setDate("2024-01-15");
        delivery1.setTime("16:00");
        delivery1.setClient("Pedro Santos");
        delivery1.setPhone("(11) 66666-6666");
        delivery1 = deliveryRepository.save(delivery1);

        DeliveryItem item1 = new DeliveryItem();
        item1.setName("Pacote A");
        item1.setWeight("1.5kg");
        item1.setFragile(false);
        item1.setDelivery(delivery1);
        delivery1.setItems(Arrays.asList(item1));

        // Entrega 2
        Delivery delivery2 = new Delivery();
        delivery2.setTitle("Entrega Residencial");
        delivery2.setDescription("Entregar encomenda em residência");
        delivery2.setStatus(Delivery.DeliveryStatus.IN_PROGRESS);
        delivery2.setAddress("Rua das Rosas, 321");
        delivery2.setDate("2024-01-15");
        delivery2.setTime("18:00");
        delivery2.setClient("Lucia Ferreira");
        delivery2.setPhone("(11) 55555-5555");
        delivery2 = deliveryRepository.save(delivery2);

        DeliveryItem item2 = new DeliveryItem();
        item2.setName("Encomenda");
        item2.setWeight("4.0kg");
        item2.setFragile(false);
        item2.setDelivery(delivery2);
        delivery2.setItems(Arrays.asList(item2));

        System.out.println("Sample deliveries created");
    }
}
