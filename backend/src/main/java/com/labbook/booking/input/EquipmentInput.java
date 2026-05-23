package com.labbook.booking.input;

import com.labbook.booking.model.EquipmentStatus;

import java.time.LocalDate;

public record EquipmentInput(
        String name,
        String category,
        String description,
        String connectingStr,
        String model,
        String manufacturer,
        String serialNumber,
        Integer purchaseYear,
        LocalDate calibrationDue,
        String location,
        Boolean requiresTraining,
        String imageUrl,
        String videoUrl,
        String documentationUrl,
        String notes
) {
}
