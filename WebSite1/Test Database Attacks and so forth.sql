
--Creating the Attack tables and more (Tell me if you want any other columns added to the table)
CREATE TABLE Attacks_Spells_Armor (
	ASA_ID INT NOT NULL,
	Attack_Name varchar(255),
	Descriptions varchar(255),
	Item_Stats INT,
	Primary Key (ASA_ID)
);

--Trying to Insert a item to the table
INSERT dbo.Attacks_Spells_Armor
	Values (1,'Attack 1','This is the attack Description',21)
GO


--Trying to Extract
SELECT ASA_ID,Attack_Name,Descriptions,Item_Stats
	FROM dbo.Attacks_Spells_Armor
GO
--If you want to grab a specific column you just put that column in the select command
	--This was what was left after the change of tables, leaving it so we can understand how to do tables.


    --ID int IDENTITY(1,1), -- how to auto increment 
	--DBCC CHECKIDENT (Stat, RESEED, 0) To reset the auto increment to start at 0.
	--Should make sure there is nothing above what you specify, so if you start at 0, next will be 1 and start at 10 next will be 11.

	--Creation of the Stats table
	CREATE TABLE Stat (
	ID INT IDENTITY(1,1),
	Value INT,
	PRIMARY KEY (ID),
);	

	--Creation of the Attack table
	CREATE TABLE Attack (
	ID INT IDENTITY(1,1),
	Name VARCHAR(256),
	Description VARCHAR(256),
	PRIMARY KEY(ID),
);

	--Creation of the Attacks Stats table
	CREATE TABLE Attack_Stats(
	ID INT IDENTITY(1,1),
	AttackID INT NOT NULL,
	StatID INT NOT NULL,
	PRIMARY KEY(ID),
	FOREIGN KEY(StatID) REFERENCES Stat(ID), --Referencing Stats Table
	FOREIGN KEY(AttackID) REFERENCES Attack(ID),
);

	--Cration of the Spell Table
	CREATE TABLE Spell(
	ID INT IDENTITY(1,1),
	Name VARCHAR(256),
	Description VARCHAR(256),
	PRIMARY KEY(ID),
);

	--Creation of the Spell Stats Table
	CREATE TABLE Spell_Stats(
	ID INT IDENTITY(1,1),
	SpellID INT NOT NULL,
	StatID INT NOT NULL,
	PRIMARY KEY(ID),
	FOREIGN KEY(StatID) REFERENCES Stat(ID),
	FOREIGN KEY(SpellID) REFERENCES Spell(ID),
);

	--Creation of the Armor Table
	CREATE TABLE Armor(
	ID INT IDENTITY(1,1),
	Name VARCHAR(256),
	Description VARCHAR(256),
	PRIMARY KEY(ID),
);

	--Creation of the Armor Stats Table
	CREATE TABLE Armor_Stats(
	ID INT IDENTITY(1,1),
	ArmorID INT NOT NULL,
	StatID INT NOT NULL,
	PRIMARY KEY(ID),
	FOREIGN KEY(ArmorID) REFERENCES Armor(ID),
	FOREIGN KEY(StatID) REFERENCES Stat(ID),
);


-- Testing By adding Values To Stat table, These should be final values for Stat table.
INSERT dbo.Stat
	VALUES (10)
	GO

INSERT dbo.Stat
	VALUES (20)
	GO

INSERT dbo.Stat
	VALUES (30)
	GO

INSERT dbo.Stat
	VALUES (40)
	GO

INSERT dbo.Stat
	VALUES (50)
	GO

INSERT dbo.Stat
	VALUES (60)
	GO

INSERT dbo.Stat
	VALUES (70)
	GO

INSERT dbo.Stat
	VALUES (80)
	GO

INSERT dbo.Stat
	VALUES (90)
	GO

INSERT dbo.Stat
	VALUES (100)
	GO
--May add more all depends on what you guys want and when you tell me.
