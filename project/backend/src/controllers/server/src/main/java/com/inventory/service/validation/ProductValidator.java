package com.inventory.service.validation;

import com.inventory.database_system.entity.Product;
import org.springframework.stereotype.Component;

@Component
public class ProductValidator {

    public void validate(Product product) {

        if(product.getName() == null || product.getName().isEmpty()) {
            throw new RuntimeException("Product name required");
        }

        if(product.getPrice() == null || product.getPrice().compareTo(java.math.BigDecimal.ZERO) <= 0) {
            throw new RuntimeException("Invalid price");
        }

        if(product.getQuantity() < 0) {
            throw new RuntimeException("Invalid stock");
        }
    }
}
