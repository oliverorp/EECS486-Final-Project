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

Adarsh Pettappa
padarsh@umich.edu

Delaney Scofield
delsco@umich.edu


## Model Instructions
- See Jupyter Notebook for data, models
- Go to Select Kernel, and select venv for this project
- All files, besides ModelFinal.ipynb represent intermediate steps and exploratory data analysis
- ModelFinal.ipynb should be looked at for grading

## Virtual Environment
- In your project directory:

```bash
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```


## Backend Setup (same packages for Model)
```bash
cd api
python backend.py
```


## Frontend Setup
```bash
// on mac
brew install node

// on linux systems
sudo apt update
sudo apt install nodejs npm


node -v
npm -v
cd client
npm install
npm start
```


## Usage
- The React frontend runs on port 3000.
- The Flask backend runs on port 5000.
- You must have port 3000 and port 5000 available in order for the servers to run.
- If you are running the servers on a mac and are having issues with port 5000, try System Settings > General > AirDrop & Handoff > Turn off AirPlay Receiver.
- Have both servers running simulataneously
- Open `http://localhost:3000` in your browser to access the application.
