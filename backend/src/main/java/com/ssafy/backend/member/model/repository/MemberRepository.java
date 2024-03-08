package com.ssafy.backend.member.model.repository;

import com.ssafy.backend.member.model.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member,Integer> {
    Optional<Member> findByNameAndPassword(String name, String password);

    Optional<Member> findByName(String name);
}
