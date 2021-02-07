/* This query will return title, URL, password, category, sorted by category */

SELECT title, url, password_text AS password, category
FROM passwords
WHERE passwords.user_id = 6
ORDER BY title;

/* REPLACE 'WHERE passwords.user_id = THIS PART' with req.params later */
