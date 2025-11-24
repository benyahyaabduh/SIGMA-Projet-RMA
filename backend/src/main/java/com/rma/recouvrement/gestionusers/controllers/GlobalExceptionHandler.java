package com.rma.recouvrement.gestionusers.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Map<String, Object>> handleIllegalArgument(IllegalArgumentException ex) {
        String message = ex.getMessage();
        List<String> details = Arrays.asList(message.split("\n")).stream()
                .filter(line -> !line.startsWith("Critères")) // optionnel
                .toList();

        Map<String, Object> body = new HashMap<>();
        body.put("message", "Erreur lors de la mise à jour du mot de passe");
        body.put("details", details);

        return ResponseEntity.badRequest().body(body);
    }
}
