# README.md

IMPORTANT: Once you've cloned this to your forked repository, ensure that you continuously update this document as you complete each task to demonstrate your ongoing progress.

Please include your shared repository link here:

NHAT NAM HOANG (21519077)'S REPOSITORY:
https://github.com/namhoang9910/A2-NhatNam-21519077.git 

## Access Database
1 **Plsql Cheat Sheet:**
You can refer to the PostgreSQL cheat sheet [here](https://www.postgresqltutorial.com/postgresql-cheat-sheet/).

2 **Know the Container ID:**
To find out the container ID, execute the following command:
   ```bash
   docker ps
      CONTAINER ID   IMAGE                          COMMAND                  CREATED      STATUS          PORTS                NAMES
      42b57d821b3b   a2-nhatnam-21519077-nginx      "/docker-entrypoint.…"   6 days ago   Up 19 minutes   0.0.0.0:80->80/tcp   a2-nhatnam-21519077-nginx-1
      9b8fff3011e4   a2-nhatnam-21519077-frontend   "docker-entrypoint.s…"   6 days ago   Up 19 minutes   3000/tcp             a2-nhatnam-21519077-frontend-1
      5946c5c790b7   a2-nhatnam-21519077-api        "docker-entrypoint.s…"   6 days ago   Up 19 minutes   5000/tcp             a2-nhatnam-21519077-api-1
      b007ff94e66f   postgres:15.3-alpine3.18       "docker-entrypoint.s…"   6 days ago   Up 19 minutes   5432/tcp             a2-nhatnam-21519077-db-1
   ```
3. Running the application

**docker compose command:**
   ```bash
   docker compose up --build
   ```

4 **Access postgreSQL in the container:**
Once you have the container ID, you can execute the container using the following command:
You will see the example of running the PostgreSQL inside the container.
   ```bash
   docker exec -it tb007ff94e66f psql -U postgres
   namhoang9910@Nams-MacBook-21 A2-NhatNam-21519077 % docker exec -it b007ff94e66f psql -U postgres                                       
   psql (15.3)
   Type "help" for help.
   
   postgres=# \dt
             List of relations
    Schema |   Name   | Type  |  Owner   
   --------+----------+-------+----------
    public | contacts | table | postgres
    public | phones   | table | postgres
   (2 rows)
  
    postgres=# select * from contacts;
   id |    name    |         createdAt          |         updatedAt          
   ----+------------+----------------------------+----------------------------
   1 | tony       | 2024-09-18 01:30:50.984+00 | 2024-09-18 01:30:50.984+00
   4 | Scott Mann | 2024-09-18 01:53:57.967+00 | 2024-09-18 02:01:39.607+00
    (2 rows)
    postgres=# select * from phones;
   id |  name  |   number   | contactId |         createdAt          |         updatedAt          
   ----+--------+------------+-----------+----------------------------+----------------------------
   1 |        | q2345678   |         1 | 2024-09-18 01:30:54.306+00 | 2024-09-18 01:30:54.306+00
   2 | Mobile | 23456789   |         1 | 2024-09-18 01:30:58.233+00 | 2024-09-18 01:30:58.233+00
   4 |        | 23456      |         4 | 2024-09-18 01:54:02.475+00 | 2024-09-18 01:54:02.475+00
   5 | Mobile | 345678     |         4 | 2024-09-18 01:54:05.912+00 | 2024-09-18 01:54:05.912+00
   7 | Mobile | 6101119999 |         1 | 2024-09-18 02:08:46.16+00  | 2024-09-18 02:27:05.023+00

postgres=# select * from contacts;
   ```


Task 1. ![Task 1 Screenshot](images/Task1.png)

Task 2. API Commands
2.1. Show Contact
Command: http GET http://localhost/api/contacts
Screenshot: ![Task 2.1 Screenshot](images/Task2.1.png)

2.2. Add Contact   
Command: http POST http://localhost/api/contacts name="nam"
Screenshot: ![Task 2.2 Screenshot](images/Task2.2.png)

2.3. Delete Contact
Command: http DELETE http://localhost/api/contacts/3 
Screenshot: ![Task 2.3 Screenshot](images/Task2.3.png)

2.4. Update Contact
Command: http PUT http://localhost/api/contacts/4 name="Scott Mann"
Screenshot: ![Task 2.4 Screenshot](images/Task2.4.png)

2.5. Show Phone
Command: http GET http://localhost/api/contacts/1/phones
Screenshot: ![Task 2.5 Screenshot](images/Task2.5.png)

2.6. Add Phone
Command: http POST http://localhost/api/contacts/1/phones name="Mobile" number="01119999"
Screenshot: ![Task 2.6 Screenshot](images/Task2.6.png)

2.7. Delete Phone
Command: http DELETE  http://localhost/api/contacts/1/phones/6   
Screenshot: ![Task 2.7 Screenshot](images/Task2.7.png)

2.8. Update Phone
Command: http PUT http://localhost/api/contacts/1/phones/7 number="6101119999"
Screenshot: ![Task 2.8 Screenshot](images/Task2.8.png)


```bash
http get http://localhost/api/contacts

choiruzain@MacMarichoy-7 TestSystem % http get http://localhost/api/contacts
HTTP/1.1 200 OK
Access-Control-Allow-Origin: http://localhost:3000
Connection: keep-alive
Content-Length: 104
Content-Type: application/json; charset=utf-8
Date: Thu, 08 Aug 2024 21:04:58 GMT
ETag: W/"68-V+4KuL2xahYt8YAkKG6rKdR7wHg"
Server: nginx/1.25.1
Vary: Origin
X-Powered-By: Express

[
{
"createdAt": "2024-08-08T21:01:53.017Z",
"id": 1,
"name": "Choiru",
"updatedAt": "2024-08-08T21:01:53.017Z"
}
]

```
3. Show/create the API commmand to delete the contacts (DELETE)

```bash




```

4. Show/create the API command to edit the contacts (PUT)
```
http get http://localhost/api/contacts/1/phones

```

### Phone API

