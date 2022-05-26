# Course Aggregator

Course Aggregator is website and online database with free online coding courses for computer programming. Now there are courses in English and Russian, divided by programming languages.

---
## API Documentation
**Base URL for all endpoints:** https://course-aggregator.herokuapp.com/
### GET
Path | Description
--- | ---
/api/courses | Will return all courses
/api/courses/{id} | Will return course with specified id
/api/programmingLanguages | Will return all programming languages
/api/programmingLanguages/{id} | Will return programming language with specified id
/api/my_favorites* | Will return all favorites

### POST
Path | Description
--- | ---
/api/favorite/{id}* | Will add course with specified id in the favorites
/api/unfavorite/{id}* |  Will delete course with specified id from the favorites

`* Requires authentication. This can be achieved by logging in manually on the website.`

---
## Models

Name  | Description
--- | ---
User | A user of the Course Aggregator site
Course | A course
ProgrammingLanguage | A programming language or some category of courses
