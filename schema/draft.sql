DROP TABLE IF EXISTS admins; CREATE TABLE admins (
    [id] TEXT PRIMARY KEY,
    [fullname] TEXT NOT NULL,
    [username] TEXT NOT NULL
);
DROP TABLE IF EXISTS assessors; CREATE TABLE assessors (
    [id] TEXT PRIMARY KEY,
    [fullname] TEXT NOT NULL,
    [username] TEXT NOT NULL
);
DROP TABLE IF EXISTS organizations; CREATE TABLE organizations (
    [id] TEXT PRIMARY KEY,
    [name] TEXT NOT NULL
);
DROP TABLE IF EXISTS slot_types; CREATE TABLE slot_types (
    [id] TEXT PRIMARY KEY,
    [type_num] INTEGER CHECK (type_num IN(1, 2, 3, 4)) NOT NULL,
    [slot_num] INTEGER CHECK (slot_num IN(1, 2, 3, 4)) NOT NULL,
    [description] TEXT
);
DROP TABLE IF EXISTS slots; CREATE TABLE slots (
    [id] TEXT PRIMARY KEY,
    [slot_type] TEXT NOT NULL,
    [slot1] TEXT CHECK (slot1 IN('self', 'case', 'f2f', 'group')),
    [slot2] TEXT CHECK (slot2 IN('self', 'case', 'f2f', 'group')),
    [slot3] TEXT CHECK (slot3 IN('self', 'case', 'f2f', 'group')),
    [slot4] TEXT CHECK (slot4 IN('self', 'case', 'f2f', 'group'))
);
DROP TABLE IF EXISTS tools; CREATE TABLE tools (
    [id] TEXT PRIMARY KEY,
    [category] TEXT CHECK (category IN('self', 'case', 'f2f', 'group')) NOT NULL,
    [title] TEXT NOT NULL,
    [version] TEXT
);
DROP TABLE IF EXISTS batches; CREATE TABLE batches (
    [id] TEXT PRIMARY KEY,
    [org_id] TEXT NOT NULL,
    [name] TEXT NOT NULL,
    [date] TEXT NOT NULL,
    [group_num] INTEGER DEFAULT 0,
    -- [slot_group] = 1 bila jumlah tool = 2 dan jumlah grup > 2,
    -- dan batch akan dipecah dalam grup slot pagi dan grup slot siang
    [slot_group] INTEGER CHECK(slot_group IN(0, 1)) DEFAULT 0,
    [slot_type] TEXT,
    [on_self] TEXT,
    [on_case] TEXT,
    [on_f2f] TEXT,
    [on_group] TEXT,
    -- slot time customization
    [time1] TEXT, -- 07:45
    [time2] TEXT,
    [time3] TEXT,
    [time4] TEXT
);
DROP TABLE IF EXISTS groups; CREATE TABLE groups (
    [id] TEXT PRIMARY KEY,
    [batch_id] TEXT NOT NULL,
    [name] TEXT NOT NULL,
    [slot_id] TEXT,
    [group_ass_id] TEXT
);
DROP TABLE IF EXISTS persons; CREATE TABLE persons (
    [id] TEXT PRIMARY KEY,
    [batch_id] TEXT NOT NULL,
    [fullname] TEXT NOT NULL,
    [username] TEXT NOT NULL
);
DROP TABLE IF EXISTS groupings; CREATE TABLE groupings (
    batch_id TEXT NOT NULL,
    group_id TEXT NOT NULL,
    person_id TEXT NOT NULL,
    f2f_ass_id TEXT,
    case_ass_id TEXT,
    PRIMARY KEY (batch_id, person_id)
);
-- View groups_sessions
DROP VIEW IF EXISTS groups_sessions; CREATE VIEW groups_sessions AS SELECT
    g.*, slot1, slot2, slot3, slot4, a.fullname group_assessor
    FROM groups g
    LEFT JOIN slots s ON g.slot_id=s.id
    LEFT JOIN assessors a ON g.group_ass_id=a.id;
-- View persons_sessions
DROP VIEW IF EXISTS persons_sessions; CREATE VIEW persons_sessions AS SELECT
    gr.*, p.fullname person_name, a1.fullname group_assessor, a2.fullname f2f_assessor,
    on_self, on_case, on_f2f, on_group, slot1, slot2, slot3, slot4
    FROM groupings gr
    LEFT JOIN batches b ON gr.batch_id=b.id
    LEFT JOIN persons p ON gr.person_id=p.id
    LEFT JOIN groups g ON gr.group_id=g.id
    LEFT JOIN assessors a1 ON g.group_ass_id=a1.id
    LEFT JOIN assessors a2 ON gr.f2f_ass_id=a2.id
    LEFT JOIN slots s ON g.slot_id=s.id;

-- TEST DATA

-- admins (1)
INSERT INTO admins VALUES ('admin1', 'Admin 1', 'admin1');
-- assessors (20)
INSERT INTO assessors VALUES
    ('ass1', 'Asesor 1', 'asesor1'),
    ('ass2', 'Asesor 2', 'asesor2'),
    ('ass3', 'Asesor 3', 'asesor3'),
    ('ass4', 'Asesor 4', 'asesor4'),
    ('ass5', 'Asesor 5', 'asesor5'),
    ('ass6', 'Asesor 6', 'asesor6'),
    ('ass7', 'Asesor 7', 'asesor7'),
    ('ass8', 'Asesor 8', 'asesor8'),
    ('ass9', 'Asesor 9', 'asesor9'),
    ('ass10', 'Asesor 10', 'asesor10'),
    ('ass11', 'Asesor 11', 'asesor11'),
    ('ass12', 'Asesor 12', 'asesor12'),
    ('ass13', 'Asesor 13', 'asesor13'),
    ('ass14', 'Asesor 14', 'asesor14'),
    ('ass15', 'Asesor 15', 'asesor15'),
    ('ass16', 'Asesor 16', 'asesor16'),
    ('ass17', 'Asesor 17', 'asesor17'),
    ('ass18', 'Asesor 18', 'asesor18'),
    ('ass19', 'Asesor 19', 'asesor19'),
    ('ass20', 'Asesor 20', 'asesor20');
-- organizations (1)
INSERT INTO organizations VALUES ('org1', 'PT Long Slow Run');
-- slot_types ()
INSERT INTO slot_types VALUES
    ('all-slots', 4, 4, 'All 4 slots'),
    ('no-self', 3, 4, '3 slots, no-self'),
    ('no-case', 3, 4, '3 slots, no-case'),
    ('no-group', 3, 4, '3 slots, no-group'),
    ('no-f2f', 3, 4, '3 slots, no-f2f'),
    ('self-case', 2, 4, '2 slots, self-case'),
    ('self-group', 2, 4, '2 slots, self-group'),
    ('self-f2f', 2, 4, '2 slots, self-f2f'),
    ('case-group', 2, 4, '2 slots, case-group'),
    ('case-f2f', 2, 4, '2 slots, case-f2f'),
    ('group-f2f', 2, 4, '2 slots, group-f2f'),
    ('self-only', 1, 4, '1 slot: self'),
    ('case-only', 1, 4, '1 slot: case'),
    ('group-only', 1, 4, '1 slot: group'),
    ('f2f-only', 1, 4, '1 slot: f2f');
-- slots (...)
INSERT INTO slots VALUES
    ('4a', 'all-slots', 'f2f', 'self', 'case', 'group'),
    ('4b', 'all-slots', 'self', 'case', 'group', 'f2f'),
    ('4c', 'all-slots', 'case', 'group', 'f2f', 'self'),
    ('4d', 'all-slots', 'group', 'f2f', 'self', 'case'),
    
 -- 3-no-self-baru
    ('3a', 'no-self', 'f2f', 'case', 'group', null),
    ('3b', 'no-self', 'case', 'group', 'f2f', null),
    ('3c', 'no-self', 'group', 'f2f', 'case', null),

-- 3-no-group-baru
    ('3d', 'no-group', 'f2f', 'self', 'case', null),
    ('3e', 'no-group', 'self', 'case', 'f2f', null),
    ('3f', 'no-group', 'case', 'f2f', 'self', null),
    
 -- 3-no-case-baru
    ('3g', 'no-case', 'f2f', 'self', 'group', null),
    ('3h', 'no-case', 'self', 'group', 'f2f', null),
    ('3i', 'no-case', 'group', 'f2f', 'self', null),

-- 3-no-f2f-baru
    ('3j', 'no-f2f', 'self', 'case', 'group', null),
    ('3k', 'no-f2f', 'group', 'self', 'case', null),
    ('3l', 'no-f2f', 'case', 'group', 'self', null),

    -- 2 pagi
    ('21a', 'self-case', 'self', 'case', null, null), --baru (tanpa asesor)
    ('21b', 'self-group', 'self', 'group', null, null),
    ('21c', 'self-group', 'group', 'self', null, null),
    ('21d', 'self-f2f', 'self', 'f2f', null, null),
    ('21e', 'self-f2f', 'f2f', 'self', null, null),
    ('21f', 'case-group', 'case', 'group', null, null),
    ('21g', 'case-group', 'group', 'case', null, null),
    ('21h', 'case-f2f', 'case', 'f2f', null, null),
    ('21i', 'case-f2f', 'f2f', 'case', null, null),
    ('21j', 'group-f2f', 'group', 'f2f', null, null),
    ('21k', 'group-f2f', 'f2f', 'group', null, null),
    -- 2 siang
    ('22a', 'self-case', null, null, 'self', 'case'), --baru (tanpa asesor)
    ('22b', 'self-group', null, null, 'self', 'group'),
    ('22c', 'self-group', null, null, 'group', 'self'),
    ('22d', 'self-f2f', null, null, 'self', 'f2f'),
    ('22e', 'self-f2f', null, null, 'f2f', 'self'),
    ('22f', 'case-group', null, null, 'case', 'group'),
    ('22g', 'case-group', null, null, 'group', 'case'),
    ('22h', 'case-f2f', null, null, 'case', 'f2f'),
    ('22i', 'case-f2f', null, null, 'f2f', 'case'),
    ('22j', 'group-f2f', null, null, 'group', 'f2f'),
    ('22k', 'group-f2f', null, null, 'f2f', 'group'),
	-- 1 --baru
	('1a', 'self-only', 'self', null, null, null),
	('1b', 'case-only', 'case', null, null, null),
	('1c', 'group-only', 'group', null, null, null),
	('1d', 'f2f-only', 'f2f', null, null, null);

-- tools (9)
-- need to dev ID semantic for each tool, eg:
-- - GPQ-01
-- - GPQ-GMATE-01
-- - GPQ-CRATE-01
-- - CASE-MAN-01
-- - CASE-DIS-01
INSERT INTO tools VALUES
    ('t01', 'self', 'GPQ', 'generic'),
    ('t02', 'self', 'GPQ + G-MATE', 'generic'),
    ('t03', 'self', 'GPQ + C-RATE', 'generic'),
    ('t04', 'case', 'Case Analysis', 'generic'),
    ('t05', 'case', 'Intray', 'generic'),
    ('t06', 'f2f', 'Wawancara', 'generic'),
    ('t07', 'f2f', 'Wawancara + Presentasi', 'generic'),
    ('t08', 'f2f', 'Roleplay', 'generic'),
    ('t09', 'group', 'LGD', 'generic');
-- batches (1)
INSERT INTO batches VALUES ('batch1', 'org1', 'Batch 25 - PT Long Slow Run', '2023-12-23', 0, 0, '4-slots', 't02', 't04', 't07', 't09', null, null, null, null);
-- groups (5)
INSERT INTO groups VALUES
    ('batch1-group-1', 'batch1', 'Grup 1', '4a', 'ass1'),
    ('batch1-group-2', 'batch1', 'Grup 2', '4b', 'ass1'),
    ('batch1-group-3', 'batch1', 'Grup 3', '4c', 'ass1'),
    ('batch1-group-4', 'batch1', 'Grup 4', '4d', 'ass1'),
    ('batch1-group-5', 'batch1', 'Grup 5', '4a', 'ass2');
-- persons (25)
INSERT INTO persons VALUES
    ('batch1-01', 'batch1', 'Person 01', 'person01'),
    ('batch1-02', 'batch1', 'Person 02', 'person02'),
    ('batch1-03', 'batch1', 'Person 03', 'person03'),
    ('batch1-04', 'batch1', 'Person 04', 'person04'),
    ('batch1-05', 'batch1', 'Person 05', 'person05'),
    ('batch1-06', 'batch1', 'Person 06', 'person06'),
    ('batch1-07', 'batch1', 'Person 07', 'person07'),
    ('batch1-08', 'batch1', 'Person 08', 'person08'),
    ('batch1-09', 'batch1', 'Person 09', 'person09'),
    ('batch1-10', 'batch1', 'Person 10', 'person10'),
    ('batch1-11', 'batch1', 'Person 11', 'person11'),
    ('batch1-12', 'batch1', 'Person 12', 'person12'),
    ('batch1-13', 'batch1', 'Person 13', 'person13'),
    ('batch1-14', 'batch1', 'Person 14', 'person14'),
    ('batch1-15', 'batch1', 'Person 15', 'person15'),
    ('batch1-16', 'batch1', 'Person 16', 'person16'),
    ('batch1-17', 'batch1', 'Person 17', 'person17'),
    ('batch1-18', 'batch1', 'Person 18', 'person18'),
    ('batch1-19', 'batch1', 'Person 19', 'person19'),
    ('batch1-20', 'batch1', 'Person 20', 'person20'),
    ('batch1-21', 'batch1', 'Person 21', 'person21'),
    ('batch1-22', 'batch1', 'Person 22', 'person22'),
    ('batch1-23', 'batch1', 'Person 23', 'person23'),
    ('batch1-24', 'batch1', 'Person 24', 'person24'),
    ('batch1-25', 'batch1', 'Person 25', 'person25');
-- groupings (25)
INSERT INTO groupings (batch_id, group_id, person_id, f2f_ass_id, case_ass_id) VALUES
    ('batch1', 'batch1-group-1', 'batch1-01', 'ass6', null),
    ('batch1', 'batch1-group-1', 'batch1-02', 'ass7', null),
    ('batch1', 'batch1-group-1', 'batch1-03', 'ass8', null),
    ('batch1', 'batch1-group-1', 'batch1-04', 'ass9', null),
    ('batch1', 'batch1-group-1', 'batch1-05', 'ass10', null),
    ('batch1', 'batch1-group-2', 'batch1-06', 'ass6', null),
    ('batch1', 'batch1-group-2', 'batch1-07', 'ass7', null),
    ('batch1', 'batch1-group-2', 'batch1-08', 'ass8', null),
    ('batch1', 'batch1-group-2', 'batch1-09', 'ass9', null),
    ('batch1', 'batch1-group-2', 'batch1-10', 'ass10', null),
    ('batch1', 'batch1-group-3', 'batch1-11', 'ass6', null),
    ('batch1', 'batch1-group-3', 'batch1-12', 'ass7', null),
    ('batch1', 'batch1-group-3', 'batch1-13', 'ass8', null),
    ('batch1', 'batch1-group-3', 'batch1-14', 'ass9', null),
    ('batch1', 'batch1-group-3', 'batch1-15', 'ass10', null),
    ('batch1', 'batch1-group-4', 'batch1-16', 'ass6', null),
    ('batch1', 'batch1-group-4', 'batch1-17', 'ass7', null),
    ('batch1', 'batch1-group-4', 'batch1-18', 'ass8', null),
    ('batch1', 'batch1-group-4', 'batch1-19', 'ass9', null),
    ('batch1', 'batch1-group-4', 'batch1-20', 'ass10', null),
    ('batch1', 'batch1-group-5', 'batch1-21', 'ass11', null),
    ('batch1', 'batch1-group-5', 'batch1-22', 'ass12', null),
    ('batch1', 'batch1-group-5', 'batch1-23', 'ass13', null),
    ('batch1', 'batch1-group-5', 'batch1-24', 'ass14', null),
    ('batch1', 'batch1-group-5', 'batch1-25', 'ass15', null);
