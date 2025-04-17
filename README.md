# **EECS486 Final Project: Social Media and Mental Health**

This project predicts productivity loss based on user data, using machine learning models and retrieval to provide recommendations.

## File Structure

- api : contains backend scripts
- model: contains jupyter notebook with model exploration, data, and saved final compiled model
- client: contains react code for frontend

## Contributing

Oliver Pourmussa
oliverpo@umich.edu

Elle Farros
efarros@umich.edu

Ethan Duke
ethanduk@umich.edu

Adarsh P
padarsh@umich.edu

Delaney Scofield
delsco@umich.edu

## Backend Setup

```bash
cd api
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python backend.py

## Frontend Setup
```bash
cd client
npm install
npm start


## Usage

- The React frontend runs on port 3000.
- The Flask backend runs on port 5000.
- Have both servers running simulataneously
- Open `http://localhost:3000` in your browser to access the application.
