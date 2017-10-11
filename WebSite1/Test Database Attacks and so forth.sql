
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


--Adding a couple more adds for testing purposes and s&g
INSERT dbo.Attacks_Spells_Armor
	Values (2,'Attack 2','This is the attack Description',0)
GO

INSERT dbo.Attacks_Spells_Armor
	Values (3,'Attack 3','This is the attack Description',0)
GO

INSERT dbo.Attacks_Spells_Armor
	Values (4,'Attack 4','This is the attack Description',0)
GO

INSERT dbo.Attacks_Spells_Armor
	Values (5,'Attack 5','This is the attack Description',0)
GO


--Adding some Spells ... More s&g
INSERT dbo.Attacks_Spells_Armor
	Values (6,'Spell 1','This is the Spell Description',10)
GO

INSERT dbo.Attacks_Spells_Armor
	Values (7,'Spell 2','This is the Spell Description',10)
GO

INSERT dbo.Attacks_Spells_Armor
	Values (8,'Spell 3','This is the Spell Description',10)
GO

INSERT dbo.Attacks_Spells_Armor
	Values (9,'Spell 4','This is the Spell Description',10)
GO

INSERT dbo.Attacks_Spells_Armor
	Values (10,'Spell 5','This is the Spell Description',10)
GO

--Adding some Armor ... Again s&g
INSERT dbo.Attacks_Spells_Armor
	Values (11,'Armor 1','This is the Armor Description',.5)
GO

INSERT dbo.Attacks_Spells_Armor
	Values (12,'Armor 2','This is the Armor Description',.5)
GO

INSERT dbo.Attacks_Spells_Armor
	Values (13,'Armor 3','This is the Armor Description',.5)
GO

INSERT dbo.Attacks_Spells_Armor
	Values (14,'Armor 4','This is the Armor Description',.5)
GO

INSERT dbo.Attacks_Spells_Armor
	Values (15,'Armor 5','This is the Armor Description',.5)
GO