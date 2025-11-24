package com.rma.recouvrement.gestionusers.services;

import com.rma.recouvrement.gestionusers.dtos.UserCreateDto;
import com.rma.recouvrement.gestionusers.dtos.UserDto;
import com.rma.recouvrement.gestionusers.dtos.UserUpdateDto;
import com.rma.recouvrement.gestionusers.pagination.PagedResult;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
public interface UserService {

    List<UserDto>findAll();
    public UserDto findById(Long id);
    public List<UserDto> createAllUsers(List<UserCreateDto> listUserCreateDto);
    public void deleteUserById(Long id);
    public List<UserDto> importUsersFromExcel(MultipartFile file)throws IOException;
    public PagedResult<UserDto> searchUsersCriteria(String nom, String compteNt,Integer idIntermediaire, int page, int size);
    UserDto updateUser(Long id, UserUpdateDto userUpdateDto);
    public UserDto createUserVf(UserCreateDto userCreateDto);

}
