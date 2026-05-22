package com.labbook.booking.service;

import com.labbook.booking.exception.ResourceNotFoundException;
import com.labbook.booking.model.Equipment;
import com.labbook.booking.model.EquipmentStatus;
import com.labbook.booking.repository.EquipmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class EquipmentService {
    private final EquipmentRepository equipmentRepository;

    public List<Equipment> findAll() {
        return equipmentRepository.findAll();
    }

    public Equipment findById(Long id) {
        return equipmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Equipment with id: %s not found.".formatted(id)));
    }

    public List<Equipment> findByCategory(String category) {
        return equipmentRepository.findByCategory(category);
    }

    public List<Equipment> findByStatus(EquipmentStatus status) {
        return equipmentRepository.findByStatus(status);
    }

    @Transactional
    public Equipment updateStatus(Long id, EquipmentStatus status) {
        Equipment equipment = findById(id);
        equipment.setStatus(status);
        return equipmentRepository.save(equipment);
    }

    @Transactional
    public Equipment create(String name, String category, String description, String connectingStr,
                              String model, String manufacturer, String serialNumber,
                              Integer purchaseYear, LocalDate calibrationDue, String location, Boolean requiresTraining,
                              String imageUrl, String videoUrl, String documentationUrl, String notes)
    {
        Equipment equipment = Equipment.builder()
                .name(name)
                .category(category)
                .description(description)
                .status(EquipmentStatus.AVAILABLE)
                .connectingStr(connectingStr)
                .model(model)
                .manufacturer(manufacturer)
                .serialNumber(serialNumber)
                .purchaseYear(purchaseYear)
                .calibrationDue(calibrationDue)
                .location(location)
                .requiresTraining(requiresTraining != null && requiresTraining)
                .imageUrl(imageUrl)
                .videoUrl(videoUrl)
                .documentationUrl(documentationUrl)
                .notes(notes)
                .build();
        return equipmentRepository.save(equipment);
    }

    @Transactional
    public void deleteEquipment(Long id) {
        equipmentRepository.deleteById(id);
    }
}