package com.rma.recouvrement.gestionusers.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;

@Configuration
public class OpenAPIConfig {
    @Bean
    public OpenAPI openApi() {
        return new OpenAPI()
                .info(new Info()
                        .title("Gestion-Users")
                        .description("backend microservice for RMA Gestion Users project")
                        .description("API de Gestion Users global")
                        .version("v 1.2.1 - " + LocalDate.now())
                        .termsOfService("TOC")
                        .license(new License().name("License").url("#"))
                );
    }
}
