# Memo Card

## Description
A simple login and memo website.

---

## Technologies Used

This project is built with the following technologies:

- **React JS**
- **Tailwindcss**
- **Axios**

---
## How to Use
To get started with the project, follow these steps:
1. **Install Tweak Extension**  
   Install the Tweak extension to mock API
   [Click here to install Tweak Extension](https://chromewebstore.google.com/detail/tweak-mock-and-modify-htt/feahianecghpnipmhphmfgmpdodhcapi)

2. **Create Mock APIs**  
   - **User Login** (`POST /auth/login`)  
     Request:  
     ```json
     {
       "username": "user.email@gmail.com",
       "password": "1234"
     }
     ```  
     Response:  
     ```json
     {
       "status": 200,
       "response": "OK",
       "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidXNlcjEiLCJlbWFpbCI6InVzZXIuZW1haWxAZ21haWwuY29tIiwicm9sZSI6IlVTRVIifQ.IgQln56kjBGc66IAjRMjeJtscM2u--Uz5Ul01r1f874",
     }
     ```

   - **Admin Login** (`POST /auth/login`)  
     Request:  
     ```json
     {
       "username": "admin.email@gmail.com",
       "password": "1234"
     }
     ```  
     Response:  
     ```json
     {
       "status": 200,
       "response": "OK",
       "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYWRtaW4xIiwiZW1haWwiOiJhZG1pbi5lbWFpbEBnbWFpbC5jb20iLCJyb2xlIjoiQURNSU4ifQ.91VaQcMDdRWOj849ddLZO7pR_qjl_DpHdaaYCYfakkg"
     }
     ```

   - **Get Memo Cards** (`GET /memos`)  
     Response:  
     ```json
     {
       "status": 200,
       "response": "OK",
       "memos": [
         {
           "role": "USER",
           "number": 1,
           "text": "All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable.",
           "createdAt": "2025-02-09T10:15:23.000Z"
         },
         {
           "role": "USER",
           "number": 2,
           "text": "All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable.",
           "createdAt": "2025-02-10T12:47:10.000Z"
         }
       ]
     }
     ```

---
