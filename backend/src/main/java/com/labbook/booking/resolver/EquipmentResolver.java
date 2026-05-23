package com.labbook.booking.resolver;

import com.labbook.booking.model.Equipment;
import com.labbook.booking.model.EquipmentStatus;
import com.labbook.booking.service.EquipmentService;
import com.labbook.booking.input.EquipmentInput;
import lombok.RequiredArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
@RequiredArgsConstructor
public class EquipmentResolver {
    private final EquipmentService equipmentService;

    @QueryMapping
    public List<Equipment> equipmentList() {
        return equipmentService.findAll();
    }

    @QueryMapping
    public Equipment equipment(@Argument Long id) {
        return equipmentService.findById(id);
    }

    @QueryMapping
    public List<Equipment> equipmentByCategory(@Argument String category) {
        return equipmentService.findByCategory(category);
    }

    @QueryMapping
    public List<Equipment> equipmentByStatus(@Argument EquipmentStatus status) {
        return equipmentService.findByStatus(status);
    }
    
    @MutationMapping
    public Equipment updateEquipmentStatus(@Argument Long id, @Argument EquipmentStatus status) {
        return equipmentService.updateStatus(id, status);
    }

    @MutationMapping
    public Equipment updateEquipment(@Argument Long id, @Argument EquipmentInput equipmentInput) {
        return equipmentService.update(
            id,
            equipmentInput.name(), equipmentInput.category(), equipmentInput.description(),
            equipmentInput.connectingStr(), equipmentInput.model(), equipmentInput.manufacturer(),
            equipmentInput.serialNumber(), equipmentInput.purchaseYear(), equipmentInput.calibrationDue(),
            equipmentInput.location(), equipmentInput.requiresTraining(), equipmentInput.imageUrl(),
            equipmentInput.videoUrl(), equipmentInput.documentationUrl(), equipmentInput.notes()
        );
    }

    @MutationMapping
    public boolean deleteEquipment(@Argument Long id) {
        equipmentService.deleteEquipment(id);
        return true;
    }

    @MutationMapping
    public Equipment createEquipment(@Argument EquipmentInput equipmentInput){
        return equipmentService.create(
            equipmentInput.name(),
            equipmentInput.category(),
            equipmentInput.description(),
            equipmentInput.connectingStr(),
            equipmentInput.model(),
            equipmentInput.manufacturer(),
            equipmentInput.serialNumber(),
            equipmentInput.purchaseYear(),
            equipmentInput.calibrationDue(),
            equipmentInput.location(),
            equipmentInput.requiresTraining(),
            equipmentInput.imageUrl(),
            equipmentInput.videoUrl(),
            equipmentInput.documentationUrl(),
            equipmentInput.notes()
        );
    }
}

