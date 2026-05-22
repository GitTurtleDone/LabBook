package com.labbook.booking.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.FetchType;
import java.time.LocalDate;

@Entity
@Table(name = "equipment")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Equipment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String category;

    @Column(length = 1000)
    private String description;

    @Enumerate(EnumType.STRING)
    @Column(nullable = false)
    private EquipmentStatus status;

    @Column(nullable = false)
    private String connectingStr;

    private String model;
    
    private String manufacturer;

    private String serialNumber;

    private Integer purchaseYear;

    private LocalDate calibrationDue;

    private String location;

    private Boolean requiresTraining;

    private String imageUrl;
    
    private String videoUrl;

    private String documentationUrl;
    
    private String notes;

    @OneToMany(mappedBy = "equipment", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<Booking> bookings = new ArrayList<>();
}