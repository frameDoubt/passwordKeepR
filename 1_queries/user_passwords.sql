/* this query will return back all URLs, Passwords, Title, and Categories that are assigned to the user */

SELECT title, url, password_text AS password, category
FROM passwords
WHERE user_id = 1;

/* REPLACE 'WHERE user_id = THIS PART' with req.params later */
