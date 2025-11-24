package com.rma.recouvrement.gestionusers.services;

import com.rma.recouvrement.gestionusers.dtos.UserUpdatePasswordDto;

public interface HelpDeskService {
    public void regenererMotDePasse(Long userId);
    public void modifierMotDePasse (Long idUser, UserUpdatePasswordDto userUpdatePasswordDto);
}
