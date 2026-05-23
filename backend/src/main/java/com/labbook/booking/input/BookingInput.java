package com.labbook.booking.input;

public record BookingInput(
        Long equipmentId,
        Long userId,
        String startTime,
        String endTime,
        String purpose
) {
}


