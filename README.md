# Asteria

## Setup
1. Run `npm install` in the `/backend` and `/frontend` directories. 

2. Create a `.env` file in the `/backend` directory with the format:
```
SECRET_STRING={Secret string for generating tokens}
DB_URL={MongoDB URL}
```
For CS188: The `.env` file is provided in the Google Drive.

## Run
1. Run `npm run dev` in the `/backend` directory. This will host the backend on `http://localhost:5555/`

2. Run `npm run dev` in the `/frontend` directory. This hosts the app on `http://localhost:5173/`

## Interaction Flow #1
### 1. Start on home page
### 2. Click on a subject
- This will redirect you to the login page
### 3. Click on register on top right
- Since we have no account yet, we must register.
- Provide username and password
- Get redirected back to home page
### 4. Click on a subject
### 5. Choose a topic within the subject
- Search bar is provided for filtering
### 6. Answer the problem
- Appropriate responses are provided for whether the answer is correct or not
- Also choice to reveal answer (for no points)
- On getting answer correct, 100 points are gained
- Can choose to to another problem or return to home page

## Sources Used
1. Carnes B. MERN Stack Crash Course – Build a Book Store App [Internet]. freeCodeCamp.org. 2023 [cited 2023 Dec 7]. Available from: [https://www.freecodecamp.org/news/mern-stack-crash-course/](https://www.freecodecamp.org/news/mern-stack-crash-course/)

2. Ninja N. MERN Auth Tutorial - YouTube [Internet]. www.youtube.com. 2022. Available from: [https://www.youtube.com/playlist?list=PL4cUxeGkcC9g8OhpOZxNdhXggFz2lOuCT](https://www.youtube.com/playlist?list=PL4cUxeGkcC9g8OhpOZxNdhXggFz2lOuCT)

3. Navbars - Official Tailwind CSS UI Components [Internet]. www.tailwindui.com. [cited 2023 Dec 7]. Available from: [https://tailwindui.com/components/application-ui/navigation/navbars](https://tailwindui.com/components/application-ui/navigation/navbars)