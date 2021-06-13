DELIMITER //
CREATE OR REPLACE TRIGGER maximunPhotosPerUser
    BEFORE INSERT ON Photos FOR EACH ROW
    BEGIN
        DECLARE actualNum INT;
        SET actualNum = (SELECT COUNT(*) FROM Photos WHERE userId=new.userId);
        IF(actualNum =50) THEN
            SIGNAL SQLSTATE '45000' SET message_text =
            'The maximun number of photos has been reached';
        END IF;
    END//
DELIMITER ;