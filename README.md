# Express Book Review Application - Final Project

Server-side application for an online bookstore providing book search, user authentication (JWT & Sessions), review management, and asynchronous data fetching using Axios with Promises and Async/Await.

---

## 🚀 Getting Started

### 1. Installation
Navigate to the `final_project` directory and install dependencies:
```bash
cd final_project
npm install
```

### 2. Run the Application
Start the Node.js Express server:
```bash
npm start
# or
node index.js
```
The server will start listening on port `5000`:
```
Server is running on port 5000
```

---

## 📋 Evaluation Tasks & Submission Guide

This section contains the exact inputs (cURL commands, payloads) and outputs for all Coursera grading criteria.

---

### **Task 1: GitHub Repository Fork Check**
* **Saved As:** `githubrepo`
* **Points:** 2
* **Description:** Verify that the repository is forked from `ibm-developer-skills-network/expressBookReviews`.

#### **Input (cURL Command):**
```bash
curl -s https://api.github.com/repos/RajKale07/expressBookReviews
```

#### **Output:**
```json
{
  "id": 1439884839,
  "node_id": "R_kgDOVdLmJw",
  "name": "expressBookReviews",
  "full_name": "RajKale07/expressBookReviews",
  "private": false,
  "fork": true,
  "parent": {
    "id": 533682979,
    "name": "expressBookReviews",
    "full_name": "ibm-developer-skills-network/expressBookReviews",
    "html_url": "https://github.com/ibm-developer-skills-network/expressBookReviews"
  },
  "source": {
    "id": 533682979,
    "name": "expressBookReviews",
    "full_name": "ibm-developer-skills-network/expressBookReviews",
    "html_url": "https://github.com/ibm-developer-skills-network/expressBookReviews"
  }
}
```

---

### **Task 2: Retrieve List of All Available Books**
* **Saved As:** `getallbooks`
* **Points:** 2
* **Method:** `GET`
* **Endpoint:** `http://localhost:5000/`

#### **Input (cURL Command):**
```bash
curl -s http://localhost:5000/
```

#### **Output:**
```json
{
    "1": {
        "author": "Chinua Achebe",
        "title": "Things Fall Apart",
        "reviews": {}
    },
    "2": {
        "author": "Hans Christian Andersen",
        "title": "Fairy tales",
        "reviews": {}
    },
    "3": {
        "author": "Dante Alighieri",
        "title": "The Divine Comedy",
        "reviews": {}
    },
    "4": {
        "author": "Unknown",
        "title": "The Epic Of Gilgamesh",
        "reviews": {}
    },
    "5": {
        "author": "Unknown",
        "title": "The Book Of Job",
        "reviews": {}
    },
    "6": {
        "author": "Unknown",
        "title": "One Thousand and One Nights",
        "reviews": {}
    },
    "7": {
        "author": "Unknown",
        "title": "Njál's Saga",
        "reviews": {}
    },
    "8": {
        "author": "Jane Austen",
        "title": "Pride and Prejudice",
        "reviews": {}
    },
    "9": {
        "author": "Honoré de Balzac",
        "title": "Le Père Goriot",
        "reviews": {}
    },
    "10": {
        "author": "Samuel Beckett",
        "title": "Molloy, Malone Dies, The Unnamable, the trilogy",
        "reviews": {}
    }
}
```

---

### **Task 3: Search Books by ISBN**
* **Saved As:** `getbooksbyISBN`
* **Points:** 2
* **Method:** `GET`
* **Endpoint:** `http://localhost:5000/isbn/1`

#### **Input (cURL Command):**
```bash
curl -s http://localhost:5000/isbn/1
```

#### **Output:**
```json
{"1":{"author":"Chinua Achebe","title":"Things Fall Apart","reviews":{}}}
```

---

### **Task 4: Search Books by Author**
* **Saved As:** `getbooksbyauthor`
* **Points:** 2
* **Method:** `GET`
* **Endpoint:** `http://localhost:5000/author/Jane%20Austen`

#### **Input (cURL Command):**
```bash
curl -s "http://localhost:5000/author/Jane%20Austen"
```

#### **Output:**
```json
{"8":{"author":"Jane Austen","title":"Pride and Prejudice","reviews":{}}}
```

---

### **Task 5: Search Books by Title**
* **Saved As:** `getbooksbytitle`
* **Points:** 2
* **Method:** `GET`
* **Endpoint:** `http://localhost:5000/title/Pride%20and%20Prejudice`

#### **Input (cURL Command):**
```bash
curl -s "http://localhost:5000/title/Pride%20and%20Prejudice"
```

#### **Output:**
```json
{"8":{"author":"Jane Austen","title":"Pride and Prejudice","reviews":{}}}
```

---

### **Task 6: Access Book Review**
* **Saved As:** `getbookreview`
* **Points:** 2
* **Method:** `GET`
* **Endpoint:** `http://localhost:5000/review/1`

#### **Input (cURL Command):**
```bash
curl -s http://localhost:5000/review/1
```

#### **Output:**
```json
{}
```

---

### **Task 7: Register a New User**
* **Saved As:** `register`
* **Points:** 3
* **Method:** `POST`
* **Endpoint:** `http://localhost:5000/register`
* **Headers:** `Content-Type: application/json`
* **Body:** `{"username":"john","password":"password123"}`

#### **Input (cURL Command):**
```bash
curl -s -X POST http://localhost:5000/register -H "Content-Type: application/json" -d '{"username":"john","password":"password123"}'
```

#### **Output:**
```json
{"message":"User successfully registered. Now you can login"}
```

---

### **Task 8: Login as Registered User**
* **Saved As:** `login`
* **Points:** 3
* **Method:** `POST`
* **Endpoint:** `http://localhost:5000/customer/login`
* **Headers:** `Content-Type: application/json`
* **Body:** `{"username":"john","password":"password123"}`

#### **Input (cURL Command):**
```bash
curl -s -X POST http://localhost:5000/customer/login -H "Content-Type: application/json" -d '{"username":"john","password":"password123"}'
```

#### **Output:**
```json
{"message":"User successfully logged in","token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG4iLCJpYXQiOjE3OTMzODgwMzMsImV4cCI6MTc5MzM5MTYzM30.7kK_btrYLYJT8in4to3mxZo1UNDRG42ZY9OFN4cWVT8"}
```

---

### **Task 9: Add or Modify a Book Review**
* **Saved As:** `reviewadded`
* **Points:** 2
* **Method:** `PUT`
* **Endpoint:** `http://localhost:5000/customer/auth/review/1?review=This%20is%20a%20great%20book!`
* **Headers:** `Authorization: Bearer <TOKEN>`

#### **Input (cURL Command):**
```bash
curl -s -X PUT "http://localhost:5000/customer/auth/review/1?review=This%20is%20a%20great%20book!" -H "Authorization: Bearer <your_jwt_token>"
```

#### **Output:**
```json
{"message":"Review added or updated successfully","reviews":{"john":"This is a great book!"}}
```

---

### **Task 10: Delete a Book Review**
* **Saved As:** `deletereview`
* **Points:** 2
* **Method:** `DELETE`
* **Endpoint:** `http://localhost:5000/customer/auth/review/1`
* **Headers:** `Authorization: Bearer <TOKEN>`

#### **Input (cURL Command):**
```bash
curl -s -X DELETE "http://localhost:5000/customer/auth/review/1" -H "Authorization: Bearer <your_jwt_token>"
```

#### **Output:**
```json
{"message":"Review deleted successfully","reviews":{}}
```

---

### **Task 11: Async/Await & Promises Implementation (`general.js`)**
* **Points:** 8
* **Submission Type:** GitHub File URL

#### **GitHub File Link:**
```
https://github.com/RajKale07/expressBookReviews/blob/main/final_project/router/general.js
```

#### **Code Architecture in `general.js`:**
1. **Task 10 - Get all books using Async/Await / Promises with Axios:**
   ```javascript
   const getAllBooks = async () => {
       try {
           const response = await axios.get(`${API_URL}/`);
           return response.data;
       } catch (error) {
           throw error;
       }
   };
   ```
2. **Task 11 - Search by ISBN using Promises with Axios:**
   ```javascript
   const getBookByISBN = (isbn) => {
       return axios.get(`${API_URL}/isbn/${encodeURIComponent(isbn)}`)
           .then(response => response.data)
           .catch(error => { throw error; });
   };
   ```
3. **Task 12 - Search by Author using Async/Await with Axios:**
   ```javascript
   const getBooksByAuthor = async (author) => {
       try {
           const response = await axios.get(`${API_URL}/author/${encodeURIComponent(author)}`);
           return response.data;
       } catch (error) {
           throw error;
       }
   };
   ```
4. **Task 13 - Search by Title using Promises with Axios:**
   ```javascript
   const getBooksByTitle = (title) => {
       return axios.get(`${API_URL}/title/${encodeURIComponent(title)}`)
           .then(response => response.data)
           .catch(error => { throw error; });
   };
   ```
