package com.labbook.booking.resolver;

import com.labbook.booking.model.User;
import com.labbook.booking.model.UserRole;
import com.labbook.booking.service.UserService;
import com.labbook.booking.input.UserInput;
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
    public User updateUser(@Argument Long id, @Argument UserInput userInput) {
        return userService.updateUser(
            id, userInput.email(), userInput.password(), userInput.firstName(),
            userInput.lastName(), userInput.department(), userInput.role()
        );
    }

    @MutationMapping
    public User createUser(@Argument UserInput userInput) {
        return userService.createUser(
            userInput.email(), userInput.password(), userInput.firstName(),
            userInput.lastName(), userInput.department(), userInput.role()
        );
    }

    @MutationMapping
    public boolean deleteUser(@Argument Long id) {
        userService.deleteUser(id);
        return true;
    }
}