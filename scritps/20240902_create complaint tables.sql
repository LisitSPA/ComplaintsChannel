
CREATE TABLE dbo.Attachments (
    Id INT PRIMARY KEY IDENTITY(1,1),
	ComplaintId int not null,
    FileName VARCHAR(150) NOT NULL,
    Description VARCHAR(150) NOT NULL,
	Active bit NOT NULL
);

CREATE TABLE dbo.Users (
    Id INT PRIMARY KEY IDENTITY(1,1),
    RUT VARCHAR(50)  NULL,
    Names VARCHAR(150)  NULL,
    LastName VARCHAR(150)  NULL,
	Position VARCHAR(180) NULL,
	Area VARCHAR(180) NULL,
    PersonDescription VARCHAR(500) NULL,
	ECompanyStatus INT NULL,
	EGenre INT NULL,
	EUserType INT NULL,
	ContactPhone VARCHAR(20) NULL,
	ContactEmail VARCHAR(200) NULL,
	Active bit NOT NULL
);

CREATE TABLE dbo.Complaints (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Description VARCHAR(2000) NOT NULL,
	IncidentDate DateTime NOT NULL,
    ComplainantId INT NULL,
	CreatedOn DateTime NOT NULL,
	ModifiedBy INT NULL,
	ModifiedOn DateTime NULL,
	TrackingCode VARCHAR(20) NOT NULL,
	EStatus int NOT NULL,
	Active bit NOT NULL,
    FOREIGN KEY (ComplainantId) REFERENCES Users(Id)
);

CREATE TABLE dbo.ComplaintInvolved (
    Id INT PRIMARY KEY IDENTITY(1,1),
    ComplaintId INT NOT NULL,
    UserId INT NOT NULL,
    FOREIGN KEY (ComplaintId) REFERENCES Complaints(Id),
    FOREIGN KEY (UserId) REFERENCES Users(Id)
);

CREATE TABLE dbo.ComplaintTypes (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Description VARCHAR(500) NOT NULL,
	Active bit NOT NULL,
);

CREATE TABLE dbo.ComplaintReasons (
    Id INT PRIMARY KEY IDENTITY(1,1),
    ComplaintId INT NOT NULL,
    ComplaintTypeId INT NOT NULL,
    FOREIGN KEY (ComplaintId) REFERENCES Complaints(Id),
    FOREIGN KEY (ComplaintTypeId) REFERENCES ComplaintTypes(Id)
);

CREATE TABLE dbo.Chat (
    Id INT PRIMARY KEY IDENTITY(1,1),
    ComplaintId int not NULL,
    Message VARCHAR(500) NOT NULL,
    AttachmentId int NULL,
	CreatedOn datetime not null,
	CreatedBy int null,
	Active bit NOT NULL,
	FOREIGN KEY (ComplaintId) REFERENCES Complaints(Id),
	FOREIGN KEY (CreatedBy) REFERENCES Users(Id)
);


CREATE TABLE dbo.ComplaintHistory (
    Id INT PRIMARY KEY IDENTITY(1,1),
	ComplaintId int NOT NULL,
	EStatus int NOT NULL,
	Notes VARCHAR(500) NOT NULL,
	CreatedOn DateTime NOT NULL,
	CreatedBy int not null,
    FOREIGN KEY (ComplaintId) REFERENCES Complaints(Id)
);

CREATE TABLE dbo.Parameters (
    Id INT PRIMARY KEY IDENTITY(1,1),
	Code int NOT NULL,
	Value int NULL,
	TextValue VARCHAR(300) NULL,
	CreatedOn DateTime NOT NULL,
	CreatedBy int not null,
);