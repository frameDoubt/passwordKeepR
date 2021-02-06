/* This query will return title, URL, password, category, and organisation name for a user sorted by organisation name */

SELECT title, url, password_text AS password, category, organisations.name AS organisation_name
FROM passwords
JOIN organisations ON passwords.organisations_id = organisations.id
WHERE passwords.user_id = 1
ORDER BY organisations.name;

/* REPLACE 'WHERE passwords.user_id = THIS PART' with req.params later */
