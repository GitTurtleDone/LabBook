package com.labbook.booking.service;

import com.labbook.booking.model.*;
import com.labbook.booking.exception.BookingConflictException;

import org.junit.jupiter.api.BeforeEach; //marks a method that run before each test method
import org.junit.jupiter.api.DisplayName;// gives a test a human readable name
import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import com.labbook.booking.repository.EquipmentRepository;
import com.labbook.booking.repository.UserRepository;
import com.labbook.booking.service.BookingService;

import java.time.LocalDateTime;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
public class BookingServiceTest {

    @Autowired
    private BookingService bookingService;
    @Autowired
    private EquipmentRepository equipmentRepository;
    @Autowired
    private UserRepository userRepository;

    Equipment equipment;
    User user;

    @BeforeEach
    void setup() {
        equipment = equipmentRepository.save(Equipment.builder()
        .name("Keithley 2400")
        .category("Source meter")
        .status(EquipmentStatus.AVAILABLE)
        .connectingStr("GPIB::INSTR::23")
        .build());
        user = userRepository.save(User.builder()
        .email("giang.dang@labbook.com")
        .firstName("Giang")
        .lastName("Dang")
        .department("Electrical and Computer Engineering")
        .role(UserRole.RESEARCHER)
        .build());
    }

    @Test
    @DisplayName("Success creation of a valid booking")
    void shouldCreateValidBooking() {
        LocalDateTime start = LocalDateTime.now().plusDays(2);
        LocalDateTime end = start.plusHours(5);

        Booking booking = bookingService.createBooking(equipment.getId(), user.getId(), start, end, "Testing");

        assertNotNull(booking.getId());
        assertEquals(BookingStatus.CONFIRMED, booking.getStatus());
    }

    @Test
    @DisplayName("Overlapping booking on same equipment is rejected")
    void shouldRejectOverlappingBooking() {
        LocalDateTime start = LocalDateTime.now().plusDays(2);
        LocalDateTime end = start.plusHours(5);

        bookingService.createBooking(equipment.getId(), user.getId(), start, end, "Testing1");
        
        assertThrows(BookingConflictException.class, () -> 
            bookingService.createBooking(equipment.getId(), user.getId(), start.minusHours(2), start.plusHours(3), "Testing2"));
    }

    @Test
    @DisplayName("Booking with end before start is rejected")
    void shouldRejectEndBeforeStartBooking() {
        LocalDateTime start = LocalDateTime.now().plusDays(2);
        LocalDateTime end = start.minusHours(5);
        assertThrows(IllegalArgumentException.class, () ->
            bookingService.createBooking(equipment.getId(), user.getId(), start, end, "Testing2"));
    }

    @Test
    @DisplayName("Booking with OUT_OF_SERVICE equipment should be rejected")
    void shouldRejectBookingOfOutOfServiceEquipment() {
        equipment.setStatus(EquipmentStatus.OUT_OF_SERVICE);
        equipmentRepository.save(equipment);

        LocalDateTime start = LocalDateTime.now().plusDays(2);
        LocalDateTime end = start.plusHours(5);

        assertThrows(BookingConflictException.class, () ->
            bookingService.createBooking(equipment.getId(), user.getId(), start, end, "Testing3"));
    }
}

