package com.labbook.booking.resolver;

import com.labbook.booking.model.User;
import com.labbook.booking.model.UserRole;
import com.labbook.booking.repository.UserRepository;
import com.labbook.booking.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;
import java.util.List;

@Controller
@RequiredArgsConstructor
public class UserResolver {
    private final UserService userService;

    @QueryMapping
    public List<User> usersList() {
        return userService.findAll();
    }

    @QueryMapping
    public User user(@Argument Long id) {
        return userService.findById(id);
    }

    @QueryMapping
    public List<User> usersByRole(@Argument UserRole role) {
        return userService.findUsersByRole(role);
    }

    @QueryMapping
    public User userByEmail(@Argument String email) {
        return userService.findUserByEmail(email);
    }

    @MutationMapping
    public User updateUser(@Argument Long id, @Argument String email, @Argument String password, @Argument String firstName,
                           @Argument String lastName, @Argument String department, @Argument UserRole role) {
        return userService.updateUser(id, email, password, firstName, lastName, department, role);
    }

    @MutationMapping
    public User createUser(@Argument String email, @Argument String password, @Argument String firstName,
                           @Argument String lastName, @Argument String department, @Argument UserRole role) {
        return userService.createUser(email, password, firstName, lastName, department, role);
    }
}