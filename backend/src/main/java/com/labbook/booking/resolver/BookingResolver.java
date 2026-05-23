package com.labbook.booking.resolver;

import com.labbook.booking.model.Booking;
import com.labbook.booking.model.Equipment;
import com.labbook.booking.model.User;
import com.labbook.booking.model.BookingStatus;
import com.labbook.booking.input.BookingInput;
import com.labbook.booking.service.BookingService;

import com.labbook.booking.service.EquipmentService;
import com.labbook.booking.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;
import java.util.List;
import java.time.LocalDateTime;

@Controller
@RequiredArgsConstructor
public class BookingResolver {
    private final BookingService bookingService;
    private final UserService userService;
    private final EquipmentService equipmentService;

    @QueryMapping
    public List<Booking> bookingsList() {
        return bookingService.findAll();
    }

    @QueryMapping
    public Booking booking(@Argument Long id) {
        return bookingService.findById(id);
    }

    @QueryMapping
    public List<Booking> bookingsByUser(@Argument Long userId) {
        User user = userService.findById(userId);
        return bookingService.findByUser(user);
    }

    @QueryMapping
    public List<Booking> bookingsByEquipment(@Argument Long equipmentId) {
        Equipment equipment = equipmentService.findById(equipmentId);
        return bookingService.findByEquipment(equipment);
    }

    @MutationMapping
    public Booking createBooking(@Argument BookingInput bookingInput) {
        return bookingService.createBooking(
            bookingInput.equipmentId(), bookingInput.userId(),
            LocalDateTime.parse(bookingInput.startTime()),
            LocalDateTime.parse(bookingInput.endTime()),
            bookingInput.purpose());
    }

    @MutationMapping
    public Booking updateBooking(@Argument Long bookingId, @Argument BookingInput bookingInput) {
        return bookingService.updateBooking(
            bookingId, bookingInput.equipmentId(), bookingInput.userId(),
            LocalDateTime.parse(bookingInput.startTime()),
            LocalDateTime.parse(bookingInput.endTime()),
            bookingInput.purpose(), null);
    }

    @MutationMapping
    public boolean deleteBooking(@Argument Long id) {
        bookingService.deleteBooking(id);
        return true;
    }

    @MutationMapping
    public boolean cancelBooking(@Argument Long id) {
        bookingService.cancelBooking(id);
        return true;
    }
}