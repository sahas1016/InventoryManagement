-- Categories required for products
INSERT INTO categories (name, description) VALUES
('Electronics', 'Electronic devices and accessories'),
('Stationery', 'Office stationery and supplies'),
('Furniture', 'Office and home furniture'),
('Clothing', 'Apparel and garments'),
('Food & Beverages', 'Food items and drinks'),
('Tools & Hardware', 'Hardware tools and equipment'),
('Medical', 'Medical supplies and equipment')
ON DUPLICATE KEY UPDATE description=VALUES(description);

-- Suppliers required for products
INSERT INTO suppliers (name, contact_info, address) VALUES
('TechWorld Ltd', 'techworld@example.com | 040-12345678', 'Plot 12, HITEC City, Hyderabad 500081'),
('OfficeHub Supplies', 'officehub@example.com | 040-87654321', 'Begumpet, Hyderabad 500016'),
('HomeStyle Furniture', 'homestyle@example.com | 040-11223344', 'Ameerpet, Hyderabad 500038'),
('MedPharma Inc', 'medpharma@example.com | 040-55667788', 'Secunderabad, Hyderabad 500003')
ON DUPLICATE KEY UPDATE contact_info=VALUES(contact_info), address=VALUES(address);

-- Products
INSERT INTO products (name, sku, description, price, quantity, reorder_level, category_id, supplier_id, is_active, created_at, updated_at) VALUES
('Laptop Dell Inspiron 15', 'ELEC-001', '15.6" FHD, i5, 8GB, 512GB SSD', 54999.00, 25, 5, 1, 1, true, NOW(), NOW()),
('Wireless Mouse', 'ELEC-002', 'Ergonomic wireless mouse with USB receiver', 799.00, 120, 20, 1, 1, true, NOW(), NOW()),
('Mechanical Keyboard', 'ELEC-003', 'RGB mechanical keyboard, blue switches', 2499.00, 45, 10, 1, 1, true, NOW(), NOW()),
('Bluetooth Headphones', 'ELEC-004', 'Over-ear noise-cancelling headphones', 3499.00, 8, 10, 1, 1, true, NOW(), NOW()),
('Smartphone Samsung Galaxy S23', 'ELEC-005', '8GB RAM, 128GB Storage, Phantom Black', 74999.00, 15, 5, 1, 1, true, NOW(), NOW()),
('27-inch 4K Monitor', 'ELEC-006', 'Ultra HD IPS Panel, 144Hz', 32000.00, 10, 2, 1, 1, true, NOW(), NOW()),
('A4 Spiral Notebook', 'STAT-001', '200 pages, ruled, spiral bound', 120.00, 300, 50, 2, 2, true, NOW(), NOW()),
('Gel Pen (Pack of 10)', 'STAT-002', 'Blue gel pens, 0.7mm', 150.00, 200, 30, 2, 2, true, NOW(), NOW()),
('Heavy Duty Stapler', 'STAT-003', 'Staples up to 50 sheets', 450.00, 80, 15, 2, 2, true, NOW(), NOW()),
('Expanding File Folder', 'STAT-004', '13 pockets, A4 size, durable plastic', 299.00, 150, 30, 2, 2, true, NOW(), NOW()),
('Office Desk', 'FURN-001', '120cm x 60cm wooden office desk', 8999.00, 12, 3, 3, 3, true, NOW(), NOW()),
('Ergonomic Chair', 'FURN-002', 'High-back ergonomic office chair', 12999.00, 2, 5, 3, 3, true, NOW(), NOW()),
('3-Seater Sofa', 'FURN-003', 'Grey fabric, comfortable cushioning', 25000.00, 5, 1, 3, 3, true, NOW(), NOW()),
('Cotton T-Shirt (Medium)', 'CLOT-001', '100% Cotton, Navy Blue', 899.00, 200, 40, 4, 2, true, NOW(), NOW()),
('Instant Coffee 200g', 'FOOD-001', 'Premium Roasted Coffee', 450.00, 60, 10, 5, 2, true, NOW(), NOW()),
('Electric Power Drill', 'TOOL-001', '18V Cordless, with 2 batteries', 5500.00, 12, 3, 6, 1, true, NOW(), NOW()),
('Surgical Mask (Box of 50)', 'MED-001', '3-ply disposable surgical masks', 250.00, 400, 100, 7, 4, true, NOW(), NOW()),
('Hand Sanitizer 500ml', 'MED-002', 'Alcohol-based hand sanitizer', 175.00, 3, 20, 7, 4, true, NOW(), NOW()),
('Digital Stethoscope', 'MED-003', 'High precision electronic stethoscope', 12000.00, 7, 2, 7, 4, true, NOW(), NOW());
