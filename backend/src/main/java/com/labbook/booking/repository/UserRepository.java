package com.labbook.booking.repository;

import com.labbook.booking.model.User;
import com.labbook.booking.model.UserRole;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    List<User> findByRole(UserRole role);
    Optional<User> findByEmail(String email);
} 