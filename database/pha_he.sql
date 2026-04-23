-- Bảng Families dòng họ
CREATE TABLE Families (
    Id INT PRIMARY KEY IDENTITY,
    FamilyName NVARCHAR(200) NOT NULL,
    AncestorName NVARCHAR(200),
    OriginLocation NVARCHAR(300),
    Description NVARCHAR(MAX),
    CreatedAt DATETIME DEFAULT GETDATE()
);
--FamilyBranches (Chi họ)
CREATE TABLE FamilyBranches (
    Id INT PRIMARY KEY IDENTITY,
    FamilyId INT NOT NULL,
    BranchName NVARCHAR(200) NOT NULL,
    BranchOrder INT DEFAULT 1,
    Description NVARCHAR(MAX),
    CreatedAt DATETIME DEFAULT GETDATE(),

    CONSTRAINT FK_FamilyBranches_Family
        FOREIGN KEY (FamilyId) REFERENCES Families(Id)
        ON DELETE CASCADE
);

-- Bảng Persons các thành viên dòng họ
--Quan hệ:
--1 Family → nhiều Persons
--1 Person → nhiều Marriages
--1 Person → nhiều Children

CREATE TABLE Persons (
    Id INT PRIMARY KEY IDENTITY,
    FamilyId INT NOT NULL,
    BranchId INT NULL,

    FullName NVARCHAR(200) NOT NULL,
    Gender INT NOT NULL, -- 0=Nữ,1=Nam,2=Khác
    BirthDate DATE NULL,
    DeathDate DATE NULL,

    Biography NVARCHAR(MAX),
    Avatar NVARCHAR(500),

    Generation INT NULL,
    IsAlive BIT DEFAULT 1,

    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME NULL,

    CONSTRAINT FK_Person_Family
        FOREIGN KEY (FamilyId) REFERENCES Families(Id)
        ON DELETE CASCADE,

    CONSTRAINT FK_Person_Branch
        FOREIGN KEY (BranchId) REFERENCES FamilyBranches(Id)
        ON DELETE SET NULL
);
--Titles (Chức danh)
CREATE TABLE Titles (
    Id INT PRIMARY KEY IDENTITY,
    TitleName NVARCHAR(200) NOT NULL,
    ScopeLevel INT NOT NULL, 
    -- 0 = Toàn họ
    -- 1 = Theo chi

    Description NVARCHAR(500)
);
--PersonTitles
CREATE TABLE PersonTitles (
    Id INT PRIMARY KEY IDENTITY,
    PersonId INT NOT NULL,
    TitleId INT NOT NULL,
    BranchId INT NULL,

    StartDate DATE,
    EndDate DATE,
    IsActive BIT DEFAULT 1,

    CONSTRAINT FK_PT_Person
        FOREIGN KEY (PersonId) REFERENCES Persons(Id)
        ON DELETE CASCADE,

    CONSTRAINT FK_PT_Title
        FOREIGN KEY (TitleId) REFERENCES Titles(Id),

    CONSTRAINT FK_PT_Branch
        FOREIGN KEY (BranchId) REFERENCES FamilyBranches(Id)
);

-- Bảng Marriages (Quan hệ hôn nhân – trung tâm hệ thống)
--Quan hệ:
--1 Person → nhiều Marriages
--1 Marriage → nhiều Children
--🔥 Không phân biệt chồng/vợ → hệ thống trung lập giới tính.

CREATE TABLE Marriages (
    Id INT IDENTITY PRIMARY KEY,
    Person1Id INT NOT NULL,
    Person2Id INT NOT NULL,
    MarriageDate DATE NOT NULL,
    DivorceDate DATE NULL,
    MarriageStatus INT NOT NULL DEFAULT 0,
    -- 0=Active,1=Divorced,2=Widowed
    MarriageOrder INT NULL,
    Note NVARCHAR(500),
    CreatedAt DATETIME DEFAULT GETDATE(),

    CONSTRAINT FK_Marriage_P1
        FOREIGN KEY (Person1Id) REFERENCES Persons(Id),

    CONSTRAINT FK_Marriage_P2
        FOREIGN KEY (Person2Id) REFERENCES Persons(Id)
);

CREATE INDEX IX_Marriage_Person1 ON Marriages(Person1Id);
CREATE INDEX IX_Marriage_Person2 ON Marriages(Person2Id);

-- Bảng Children (Quan hệ cha mẹ - con)
--Con thuộc về 1 cuộc hôn nhân cụ thể
--Giải quyết hoàn toàn bài toán đa thê / đa phu.

CREATE TABLE MarriageChildren (
    Id INT IDENTITY PRIMARY KEY,
    MarriageId INT NOT NULL,
    ChildId INT NOT NULL,

    CONSTRAINT FK_MC_Marriage
        FOREIGN KEY (MarriageId) REFERENCES Marriages(Id),

    CONSTRAINT FK_MC_Child
        FOREIGN KEY (ChildId) REFERENCES Persons(Id)
);

CREATE INDEX IX_MC_Marriage ON MarriageChildren(MarriageId);
CREATE INDEX IX_MC_Child ON MarriageChildren(ChildId);

-- ParentChild (Quan hệ sinh học)
--Dùng cho:
--Xác định huyết thống
--Tính đời (Generation)
--Tính nhánh cha / mẹ

CREATE TABLE ParentChild (
    Id INT IDENTITY PRIMARY KEY,
    FatherId INT NOT NULL,
    MotherId INT NOT NULL,
    ChildId INT NOT NULL,
    RelationshipType INT DEFAULT 0,
    -- 0=Biological,1=Adopted

    CONSTRAINT FK_PC_Father
        FOREIGN KEY (FatherId) REFERENCES Persons(Id),

    CONSTRAINT FK_PC_Mother
        FOREIGN KEY (MotherId) REFERENCES Persons(Id),

    CONSTRAINT FK_PC_Child
        FOREIGN KEY (ChildId) REFERENCES Persons(Id)
);

-- Events (Lưu lịch sử)
--Sinh con = 0
--Kết hôn = 1
--Ly hôn = 2
--Cái chết = 3
--Nhận con nuôi = 4

CREATE TABLE Events (
    Id INT IDENTITY PRIMARY KEY,
    PersonId INT NOT NULL,
    EventType INT NOT NULL,
    -- 0=Birth,1=Marriage,2=Divorce,3=Death,4=Adoption
    EventDate DATE NOT NULL,
    Description NVARCHAR(1000),

    CONSTRAINT FK_Event_Person
        FOREIGN KEY (PersonId) REFERENCES Persons(Id)
);
--GraveLocations (Mộ phần)
CREATE TABLE GraveLocations (
    Id INT PRIMARY KEY IDENTITY,
    PersonId INT NOT NULL,

    CemeteryName NVARCHAR(200),
    Area NVARCHAR(100),
    RowNumber NVARCHAR(50),
    PlotNumber NVARCHAR(50),

    Latitude FLOAT NULL,
    Longitude FLOAT NULL,

    MapImage NVARCHAR(500),
    Note NVARCHAR(500),

    CreatedAt DATETIME DEFAULT GETDATE(),

    CONSTRAINT FK_Grave_Person
        FOREIGN KEY (PersonId) REFERENCES Persons(Id)
        ON DELETE CASCADE
);

-- Media (Ảnh / tài liệu)

CREATE TABLE Media (
    Id INT IDENTITY PRIMARY KEY,
    PersonId INT NOT NULL,
    FilePath NVARCHAR(500) NOT NULL,
    MediaType INT NOT NULL,
    -- 0=Image,1=Document
    Description NVARCHAR(500),
    UploadedAt DATETIME DEFAULT GETDATE(),

    CONSTRAINT FK_Media_Person
        FOREIGN KEY (PersonId) REFERENCES Persons(Id)
);
--AuditLogs (Lịch sử chỉnh sửa)
CREATE TABLE AuditLogs (
    Id INT PRIMARY KEY IDENTITY,

    TableName NVARCHAR(200),
    RecordId INT,

    ActionType NVARCHAR(50),
    -- INSERT / UPDATE / DELETE

    OldData NVARCHAR(MAX),
    NewData NVARCHAR(MAX),

    ModifiedBy NVARCHAR(200),
    ModifiedAt DATETIME DEFAULT GETDATE(),
    IPAddress NVARCHAR(50)
);

-- Index tối ưu hiệu năng
CREATE INDEX IX_Person_Family ON Persons(FamilyId);
CREATE INDEX IX_Person_Branch ON Persons(BranchId);
CREATE INDEX IX_Marriage_P1 ON Marriages(Person1Id);
CREATE INDEX IX_Marriage_P2 ON Marriages(Person2Id);
CREATE INDEX IX_MC_Marriage ON MarriageChildren(MarriageId);
CREATE INDEX IX_PC_Child ON ParentChild(ChildId);
CREATE INDEX IX_Grave_Person ON GraveLocations(PersonId);
CREATE INDEX IX_Event_Person ON Events(PersonId);

--Bảng Users (Tài khoản)
CREATE TABLE Users (
    Id INT PRIMARY KEY IDENTITY,
    Username NVARCHAR(100) NOT NULL UNIQUE,
    PasswordHash NVARCHAR(500) NOT NULL,
    FullName NVARCHAR(200),
    Email NVARCHAR(200),
    Phone NVARCHAR(50),

    PersonId INT NULL, -- liên kết người trong gia phả

    IsActive BIT DEFAULT 1,
    CreatedAt DATETIME DEFAULT GETDATE(),
    LastLogin DATETIME NULL,

    CONSTRAINT FK_User_Person
        FOREIGN KEY (PersonId) REFERENCES Persons(Id)
);

--Bảng Roles (Vai trò)
--Ví dụ vai trò:
--SuperAdmin
--AdminGiaToc
--AdminChi
--Editor
--Viewer
CREATE TABLE Roles (
    Id INT PRIMARY KEY IDENTITY,
    RoleName NVARCHAR(100) NOT NULL UNIQUE,
    Description NVARCHAR(300)
);

--Bảng Permissions (Chức năng hệ thống)
--Ví dụ:
--PERSON_VIEW
--PERSON_CREATE
--PERSON_EDIT
--PERSON_DELETE
--MARRIAGE_MANAGE
--GRAVE_MANAGE
--FAMILY_MANAGE
--USER_MANAGE
CREATE TABLE Permissions (
    Id INT PRIMARY KEY IDENTITY,
    PermissionCode NVARCHAR(100) UNIQUE,
    PermissionName NVARCHAR(200),
    Description NVARCHAR(500)
);

--UserRoles (User → Role)
CREATE TABLE UserRoles (
    Id INT PRIMARY KEY IDENTITY,
    UserId INT NOT NULL,
    RoleId INT NOT NULL,

    CONSTRAINT FK_UR_User
        FOREIGN KEY (UserId) REFERENCES Users(Id)
        ON DELETE CASCADE,

    CONSTRAINT FK_UR_Role
        FOREIGN KEY (RoleId) REFERENCES Roles(Id)
        ON DELETE CASCADE
);

--UserBranchPermissions (Phân quyền theo chi họ)
--Cho phép:
--Admin chi A
--Chỉ sửa dữ liệu chi A
CREATE TABLE UserBranchPermissions (
    Id INT PRIMARY KEY IDENTITY,
    UserId INT NOT NULL,
    BranchId INT NOT NULL,
    RoleId INT NOT NULL,

    CONSTRAINT FK_UB_User
        FOREIGN KEY (UserId) REFERENCES Users(Id),

    CONSTRAINT FK_UB_Branch
        FOREIGN KEY (BranchId) REFERENCES FamilyBranches(Id),

    CONSTRAINT FK_UB_Role
        FOREIGN KEY (RoleId) REFERENCES Roles(Id)
);

--MenuPermissions (Quản lý quyền menu UI)
CREATE TABLE MenuItems (
    Id INT PRIMARY KEY IDENTITY,
    MenuName NVARCHAR(200),
    Route NVARCHAR(200),
    ParentId INT NULL,
    SortOrder INT
);
CREATE TABLE MenuPermissions (
    Id INT PRIMARY KEY IDENTITY,
    MenuId INT NOT NULL,
    PermissionId INT NOT NULL,

    FOREIGN KEY (MenuId) REFERENCES MenuItems(Id),
    FOREIGN KEY (PermissionId) REFERENCES Permissions(Id)
);

CREATE INDEX IX_UserRoles_User ON UserRoles(UserId);
CREATE INDEX IX_UserRoles_Role ON UserRoles(RoleId);

CREATE INDEX IX_RolePermissions_Role ON RolePermissions(RoleId);
CREATE INDEX IX_RolePermissions_Permission ON RolePermissions(PermissionId);

CREATE INDEX IX_UserBranch_User ON UserBranchPermissions(UserId);