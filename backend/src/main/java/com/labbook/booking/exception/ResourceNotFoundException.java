package com.labbook.booking.exception;

public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String message) {
        super(message); // just to catch later ResourceNotFoundException
    }
}