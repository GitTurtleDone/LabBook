package com.labbook.booking.resolver;

import com.labbook.booking.model.Equipment;
import com.labbook.booking.model.EquipmentStatus;
import com.labbook.booking.service.EquipmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.stereotype.Controller;

import java.util.List;
import java.util.Map;
import java.time.LocalDate;

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
    public Equipment updateEquipment(@Argument Long id, @Argument EquipmentStatus status) {
        return equipmentService.updateStatus(id, status);
    }

    @MutationMapping
    public Equipment createEquipment(@Argument Map<String, Object> equipmentInput){
        return equipmentService.create(
            (String) equipmentInput.get("name"),
            (String) equipmentInput.get("category"),
            (String) equipmentInput.get("description"),
            (String) equipmentInput.get("connectingStr"),
            (String) equipmentInput.get("model"),
            (String) equipmentInput.get("manufacturer"),
            (String) equipmentInput.get("serialNumber"),
            (Integer) equipmentInput.get("purchaseYear"),
            (LocalDate) equipmentInput.get("calibrationDue"),
            (String) equipmentInput.get("location"),
            (Boolean) equipmentInput.get("requiresTraining"),
            (String) equipmentInput.get("imageUrl"),
            (String) equipmentInput.get("videoUrl"),
            (String) equipmentInput.get("documentationUrl"),
            (String) equipmentInput.get("notes")
        );
    }
}

