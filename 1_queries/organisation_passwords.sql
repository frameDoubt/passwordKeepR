/* this query will return title, URL, password, and category from all passwords associated with an organisation */

SELECT title, url, password_text AS password, category
FROM passwords
WHERE organisations_id = 1;

/* REPLACE 'WHERE organisations_id = THIS PART' with req.params later to read the URL and determine which organisation this person is related too */

/* NOTE: IM NOT SURE THIS QUERY IS NECESSARY AS THERE ARE NO ORGANISATION LOGINS */
