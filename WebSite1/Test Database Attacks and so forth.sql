

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
	
	/*
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
*/


-- Third iteration of the tables

--Making a new data type

--Creation of the Armor Table
	CREATE TABLE Armor(
	ID INT IDENTITY(1,1) NOT NULL,
	Name VARCHAR(256) NOT NULL,
	Stats INT NOT NULL, -- There would be a multiplier in the main code.
	Type VARCHAR(2),
	Description VARCHAR(256),
	PRIMARY KEY(ID),
);

INSERT dbo.Armor
	VALUES('Leather Boots', 5, 'LP', 'This is a pair of Leather boots')
	GO

--Inserting all the armor values.
INSERT INTO Armor (Name, Stats,Type,Description) 
VALUES ('Chain Mail',20,'BP','This is a chain mail Shirt'),
('Cloth',10,'BP','This is a normal piece of clothing like a robe'),
('Studded Leahter',15,'BP','This is leather with studds in it'),
('Nothing Head',0,'HP','Nothing on head'),
('Hood',5,'HP','This is like a robe hood very light'),
('Cowl',8,'HP','Move covering than the Hood, Still very light'),
('Nothing Body',0,'BP','Nothing on the body'),
('Nothing Legs',0,'LP','Nothing on the legs');
	
--Creation of the Spell and Attack table. Added together for simplicity will go into detail later.
	CREATE TABLE SPELLS(
	ID INT IDENTITY(1,1) NOT NULL,
	Name VARCHAR(256) NOT NULL,
	Stats INT NOT NULL,
	TYPE VARCHAR(2) NOT NULL, 
	--Type would be what it is, ATM AttackSpell would be AS, Attack would be A, Healing spell would be HS, And so on.
	--We could add code in the front end to read this and do with it what it wants
	Description VARCHAR(256),
	PRIMARY KEY(ID),
);

--Inserting all the Spell and attack values.
INSERT INTO SPELLS (Name,Stats,TYPE,Description)
VALUES ('Sword Slash',15,'TA','Your sword slashes into the enemy'),
('Raise Defence',10,'PA','Your valor is so strong you and your party get a boost of defence'),
('Cleave',35,'TU','Your sword cleaves through the enemy and hits everyone on the field'),
('Pale Fire Strike',30,'WA','You shoot a ball of energy out of your staff to hit the enemy'),
('Heal',25,'PA','You heal you and your party members'),
('Fireball',45,'WU','You shoot a huge fireball out of your staff'),
('Aim Shot',20,'EA','You aim your shot and hit right in their soft spot'),
('Raise Attack',10,'PA','You raise the attack of you and your allies'),
('Rapid Shot',25,'EU','You fire multiple arrows at your enemy each of them hitting their mark');

--Creation of the Item table
	CREATE TABLE Items(
	ID INT IDENTITY(1,1) NOT NULL,
	Name VARCHAR(256) NOT NULL,
	Stats INT NOT NULL,
	TYPE VARCHAR(2) NOT NULL,
	--Consumeable-C, Healing Potion-HP ...
	Description VARCHAR(256),
	PRIMARY KEY(ID),
);
-- too be added at a later date.
