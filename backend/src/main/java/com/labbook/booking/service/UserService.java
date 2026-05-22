package com.labbook.booking.service;

import com.labbook.booking.model.User;
import com.labbook.booking.model.UserRole;
import com.labbook.booking.repository.UserRepository;
import com.labbook.booking.exception.ResourceNotFoundException;
import com.labbook.booking.exception.BookingConflictException;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.time.LocalDateTime;
import org.springframework.security.crypto.password.PasswordEncoder;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public List<User> findAll() {
        return userRepository.findAll();
    }

    public User findById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User with Id %s not found".formatted(id)));
    }

    public List<User> findUsersByRole(UserRole role) {
        return userRepository.findByRole(role);
    }

    public User findUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User with email %s not found".formatted(email)));
    }

    @Transactional
    public User createUser(String email, String password, String firstName, String lastName,
                           String department, UserRole role) {
        if (userRepository.findByEmail(email).isPresent()) {
            throw new BookingConflictException("User with email '%s' already exists".formatted(email));
        }

        User user = User.builder()
                .email(email)
                .passwordHash(passwordEncoder.encode(password))
                .firstName(firstName)
                .lastName(lastName)
                .department(department)
                .role(role)
                .createdAt(LocalDateTime.now())
                .build();
        return userRepository.save(user);
    }

    @Transactional
    public User updateUser(Long id, String email, String password, String firstName, String lastName,
                           String department, UserRole role) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User with Id %s not found".formatted(id)));

        if (email != null) {
            user.setEmail(email);
        }
        if (password != null) {
            user.setPasswordHash(passwordEncoder.encode(password));
        }
        if (firstName != null) {
            user.setFirstName(firstName);
        }
        if (lastName != null) {
            user.setLastName(lastName);
        }
        if (department != null) {
            user.setDepartment(department);
        }
        if (role != null) {
            user.setRole(role);
        }

        return userRepository.save(user);
    }

    @Transactional
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}