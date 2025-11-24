package com.rma.recouvrement.gestionusers;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.cache.annotation.EnableCaching;


@EnableCaching
@SpringBootApplication
@ServletComponentScan
public class GestionUsers {
	public static void main(String[] args) {

		SpringApplication.run(GestionUsers.class, args);

	}

}
