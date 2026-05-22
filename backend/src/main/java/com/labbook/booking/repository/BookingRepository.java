package com.labbook.booking.repository;

import com.labbook.booking.model.Booking;
import com.labbook.booking.model.BookingStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByUserId(Long userId);
    List<Booking> findByEquipmentId(Long equipmentId);

    // Use findOverlap to enforce no double booking of a certain equipment and status
    @Query("""
        SELECT b FROM Booking b
        WHERE b.equipment.id = :equipmentId
        AND b.status = :status
        AND b.startTime < :endTime
        AND b.endTime > :startTime
        """)
    List<Booking> findOverlap(
        @Param("equipmentId") Long equipmentId,
        @Param("status") BookingStatus status,
        @Param("startTime") LocalDateTime startTime,
        @Param("endTime") LocalDateTime endTime
    );
}