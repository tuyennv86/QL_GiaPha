-- ========================
-- EXTENSIONS (nếu cần)
-- ========================
-- UUID nếu sau này muốn dùng
-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ========================
-- Families
-- ========================
CREATE TABLE families (
    id SERIAL PRIMARY KEY,
    family_name VARCHAR(200) NOT NULL,
    ancestor_name VARCHAR(200),
    origin_location VARCHAR(300),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ========================
-- FamilyBranches
-- ========================
CREATE TABLE family_branches (
    id SERIAL PRIMARY KEY,
    family_id INT NOT NULL,
    branch_name VARCHAR(200) NOT NULL,
    branch_order INT DEFAULT 1,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_familybranches_family
        FOREIGN KEY (family_id) REFERENCES families(id)
        ON DELETE CASCADE
);

-- ========================
-- Persons
-- ========================
CREATE TABLE persons (
    id SERIAL PRIMARY KEY,
    family_id INT NOT NULL,
    branch_id INT NULL,

    full_name VARCHAR(200) NOT NULL,
    gender INT NOT NULL,
    birth_date DATE,
    death_date DATE,

    biography TEXT,
    avatar VARCHAR(500),

    generation INT,
    is_alive BOOLEAN DEFAULT TRUE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,

    CONSTRAINT fk_person_family
        FOREIGN KEY (family_id) REFERENCES families(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_person_branch
        FOREIGN KEY (branch_id) REFERENCES family_branches(id)
        ON DELETE SET NULL
);

-- ========================
-- Titles
-- ========================
CREATE TABLE titles (
    id SERIAL PRIMARY KEY,
    title_name VARCHAR(200) NOT NULL,
    scope_level INT NOT NULL,
    description VARCHAR(500)
);

-- ========================
-- PersonTitles
-- ========================
CREATE TABLE person_titles (
    id SERIAL PRIMARY KEY,
    person_id INT NOT NULL,
    title_id INT NOT NULL,
    branch_id INT,

    start_date DATE,
    end_date DATE,
    is_active BOOLEAN DEFAULT TRUE,

    CONSTRAINT fk_pt_person FOREIGN KEY (person_id) REFERENCES persons(id) ON DELETE CASCADE,
    CONSTRAINT fk_pt_title FOREIGN KEY (title_id) REFERENCES titles(id),
    CONSTRAINT fk_pt_branch FOREIGN KEY (branch_id) REFERENCES family_branches(id)
);

-- ========================
-- Marriages
-- ========================
CREATE TABLE marriages (
    id SERIAL PRIMARY KEY,
    person1_id INT NOT NULL,
    person2_id INT NOT NULL,
    marriage_date DATE NOT NULL,
    divorce_date DATE,
    marriage_status INT DEFAULT 0,
    marriage_order INT,
    note VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_marriage_p1 FOREIGN KEY (person1_id) REFERENCES persons(id),
    CONSTRAINT fk_marriage_p2 FOREIGN KEY (person2_id) REFERENCES persons(id)
);

-- ========================
-- MarriageChildren
-- ========================
CREATE TABLE marriage_children (
    id SERIAL PRIMARY KEY,
    marriage_id INT NOT NULL,
    child_id INT NOT NULL,

    CONSTRAINT fk_mc_marriage FOREIGN KEY (marriage_id) REFERENCES marriages(id),
    CONSTRAINT fk_mc_child FOREIGN KEY (child_id) REFERENCES persons(id)
);

-- ========================
-- ParentChild
-- ========================
CREATE TABLE parent_child (
    id SERIAL PRIMARY KEY,
    father_id INT NOT NULL,
    mother_id INT NOT NULL,
    child_id INT NOT NULL,
    relationship_type INT DEFAULT 0,

    CONSTRAINT fk_pc_father FOREIGN KEY (father_id) REFERENCES persons(id),
    CONSTRAINT fk_pc_mother FOREIGN KEY (mother_id) REFERENCES persons(id),
    CONSTRAINT fk_pc_child FOREIGN KEY (child_id) REFERENCES persons(id)
);

-- ========================
-- Events
-- ========================
CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    person_id INT NOT NULL,
    event_type INT NOT NULL,
    event_date DATE NOT NULL,
    description VARCHAR(1000),

    CONSTRAINT fk_event_person FOREIGN KEY (person_id) REFERENCES persons(id)
);

-- ========================
-- GraveLocations
-- ========================
CREATE TABLE grave_locations (
    id SERIAL PRIMARY KEY,
    person_id INT NOT NULL,

    cemetery_name VARCHAR(200),
    area VARCHAR(100),
    row_number VARCHAR(50),
    plot_number VARCHAR(50),

    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,

    map_image VARCHAR(500),
    note VARCHAR(500),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_grave_person FOREIGN KEY (person_id) REFERENCES persons(id) ON DELETE CASCADE
);

-- ========================
-- Media
-- ========================
CREATE TABLE media (
    id SERIAL PRIMARY KEY,
    person_id INT NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    media_type INT NOT NULL,
    description VARCHAR(500),
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_media_person FOREIGN KEY (person_id) REFERENCES persons(id)
);

-- ========================
-- AuditLogs
-- ========================
CREATE TABLE audit_logs (
    id SERIAL PRIMARY KEY,
    table_name VARCHAR(200),
    record_id INT,
    action_type VARCHAR(50),
    old_data TEXT,
    new_data TEXT,
    modified_by VARCHAR(200),
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ip_address VARCHAR(50)
);

-- ========================
-- Users
-- ========================
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(500) NOT NULL,
    full_name VARCHAR(200),
    email VARCHAR(200),
    phone VARCHAR(50),
    person_id INT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP,

    CONSTRAINT fk_user_person FOREIGN KEY (person_id) REFERENCES persons(id)
);

-- ========================
-- Roles
-- ========================
CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    role_name VARCHAR(100) UNIQUE NOT NULL,
    description VARCHAR(300)
);

-- ========================
-- Permissions
-- ========================
CREATE TABLE permissions (
    id SERIAL PRIMARY KEY,
    permission_code VARCHAR(100) UNIQUE,
    permission_name VARCHAR(200),
    description VARCHAR(500)
);

-- ========================
-- RolePermissions (BỊ THIẾU trong script gốc → FIX)
-- ========================
CREATE TABLE role_permissions (
    id SERIAL PRIMARY KEY,
    role_id INT NOT NULL,
    permission_id INT NOT NULL,

    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
    FOREIGN KEY (permission_id) REFERENCES permissions(id) ON DELETE CASCADE
);

-- ========================
-- UserRoles
-- ========================
CREATE TABLE user_roles (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    role_id INT NOT NULL,

    CONSTRAINT fk_ur_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_ur_role FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
);

-- ========================
-- UserBranchPermissions
-- ========================
CREATE TABLE user_branch_permissions (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    branch_id INT NOT NULL,
    role_id INT NOT NULL,

    CONSTRAINT fk_ub_user FOREIGN KEY (user_id) REFERENCES users(id),
    CONSTRAINT fk_ub_branch FOREIGN KEY (branch_id) REFERENCES family_branches(id),
    CONSTRAINT fk_ub_role FOREIGN KEY (role_id) REFERENCES roles(id)
);

-- ========================
-- Menu
-- ========================
CREATE TABLE menu_items (
    id SERIAL PRIMARY KEY,
    menu_name VARCHAR(200),
    route VARCHAR(200),
    parent_id INT,
    sort_order INT
);

CREATE TABLE menu_permissions (
    id SERIAL PRIMARY KEY,
    menu_id INT NOT NULL,
    permission_id INT NOT NULL,

    FOREIGN KEY (menu_id) REFERENCES menu_items(id),
    FOREIGN KEY (permission_id) REFERENCES permissions(id)
);

-- ========================
-- INDEXES
-- ========================
CREATE INDEX ix_person_family ON persons(family_id);
CREATE INDEX ix_person_branch ON persons(branch_id);

CREATE INDEX ix_marriage_p1 ON marriages(person1_id);
CREATE INDEX ix_marriage_p2 ON marriages(person2_id);

CREATE INDEX ix_mc_marriage ON marriage_children(marriage_id);
CREATE INDEX ix_mc_child ON marriage_children(child_id);

CREATE INDEX ix_pc_child ON parent_child(child_id);

CREATE INDEX ix_grave_person ON grave_locations(person_id);
CREATE INDEX ix_event_person ON events(person_id);

CREATE INDEX ix_userroles_user ON user_roles(user_id);
CREATE INDEX ix_userroles_role ON user_roles(role_id);

CREATE INDEX ix_rolepermissions_role ON role_permissions(role_id);
CREATE INDEX ix_rolepermissions_permission ON role_permissions(permission_id);

CREATE INDEX ix_userbranch_user ON user_branch_permissions(user_id);