package com.ssafy.jwtauth.user.repository;

import com.ssafy.jwtauth.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
    User findByEmail(String email);
}
