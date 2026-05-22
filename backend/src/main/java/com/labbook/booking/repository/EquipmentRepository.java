package com.labbook.booking.repository;

import com.labbook.booking.model.Equipment;
import com.labbook.booking.model.EquipmentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EquipmentRepository extends JpaRepository <Equipment, Long> {
    List<Equipment> findByStatus(EquipmentStatus status);
    List<Equipment> findByCategory (String category);
}