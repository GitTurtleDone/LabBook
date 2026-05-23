package com.labbook.booking.input;

import com.labbook.booking.model.UserRole;

public record UserInput(
        String email,
        String password,
        String firstName,
        String lastName,
        String department,
        UserRole role
) {
}