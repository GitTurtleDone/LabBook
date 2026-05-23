package com.labbook.booking.service;

import com.labbook.booking.exception.BookingConflictException;
import com.labbook.booking.exception.ResourceNotFoundException;
import com.labbook.booking.model.Booking;
import com.labbook.booking.model.BookingStatus;
import com.labbook.booking.model.Equipment;
import com.labbook.booking.model.EquipmentStatus;
import com.labbook.booking.model.User;
import com.labbook.booking.repository.BookingRepository;
import com.labbook.booking.repository.EquipmentRepository;
import com.labbook.booking.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Transactional
public class BookingService {
    private final BookingRepository bookingRepository;
    private final EquipmentRepository equipmentRepository;
    private final UserRepository userRepository;

    public List<Booking> findAll() {
        return bookingRepository.findAll();
    }

    public Booking findById(Long id) {
        return bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking with Id %s not found".formatted(id)));
    }

    public List<Booking> findByUser(User user) {
        return bookingRepository.findByUserId(user.getId());
    }

    public List<Booking> findByEquipment(Equipment equipment) {
        return bookingRepository.findByEquipmentId(equipment.getId());
    }

    @Transactional(readOnly = true)
    public boolean isTimeSlotAvailable(Long equipmentId, LocalDateTime start, LocalDateTime end) {
        List<Booking> overlaps = bookingRepository.findOverlap(equipmentId, BookingStatus.CONFIRMED, start, end);
        return overlaps.isEmpty();
    }

    @Transactional
    public Booking updateBooking(Long bookingId, Long equipmentId, Long userId,
                                    LocalDateTime startTime, LocalDateTime endTime,
                                    String purpose, BookingStatus bookingStatus)
    {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking with Id %s not found".formatted(bookingId)));
        booking.setEquipment(equipmentRepository.findById(equipmentId).orElseThrow());
        booking.setUser(userRepository.findById(userId).orElseThrow());
        booking.setStartTime(startTime);
        booking.setEndTime(endTime);
        booking.setPurpose(purpose);
        if (bookingStatus != null) {
            booking.setStatus(bookingStatus);
        }
        return bookingRepository.save(booking);
    }

    @Transactional
    public Booking createBooking(Long equipmentId, Long userId,
                                    LocalDateTime startTime, LocalDateTime endTime,
                                    String purpose) {
        if (!startTime.isBefore(endTime)) {
            throw new IllegalArgumentException("startTime must be before end time");
        }

        Equipment equipment = equipmentRepository.findById(equipmentId)
                .orElseThrow(() -> new ResourceNotFoundException("Equipment with Id %s not found".formatted(equipmentId)));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User with Id %s not found".formatted(userId)));

        if (equipment.getStatus() == EquipmentStatus.OUT_OF_SERVICE
                || equipment.getStatus() == EquipmentStatus.MAINTENANCE) {
            throw new BookingConflictException("Equipment '" + equipment.getName() + "' is currently " + equipment.getStatus());
        }

        List<Booking> overlaps = bookingRepository.findOverlap(equipmentId, BookingStatus.CONFIRMED, startTime, endTime);
        if (!overlaps.isEmpty()) {
            throw new BookingConflictException("Time slot conflicts with existing booking(s)");
        }

        Booking booking = Booking.builder()
                .equipment(equipment)
                .user(user)
                .startTime(startTime)
                .endTime(endTime)
                .purpose(purpose)
                .status(BookingStatus.CONFIRMED)
                .build();
        return bookingRepository.save(booking);
    }

    @Transactional
    public void cancelBooking(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking with Id %s not found".formatted(id)));
        booking.setStatus(BookingStatus.CANCELLED);
        bookingRepository.save(booking);
    }

    @Transactional
    public void deleteBooking(Long id) {
        bookingRepository.deleteById(id);
    }
}