import "./style.css";

import React, { useState } from "react";
import Results from "./Results";

function App() {
  const [age, setAge] = useState(0);
  const [income, setIncome] = useState(0);
  const [debt, setDebt] = useState(false);
  const [property, setProperty] = useState(false);
  const [demographic, setDemographic] = useState("");
  const [platform, setPlatform] = useState("");
  const [screentime, setScreentime] = useState(0);
  const [sessions, setSessions] = useState(0);
  const [videoCount, setVideoCount] = useState(0);
  const [timeOfDay, setTimeOfDay] = useState("");
  // const [satisfaction, setSatisfaction] = useState(0);
  const [watchReason, setWatchReason] = useState("");
  // const [selfControl, setSelfControl] = useState(0);
  // const [addictionLevel, setAddictionLevel] = useState(0);
  const [currentActivity, setCurrentActivity] = useState("");

  const [results, setResults] = useState({}); // Low medium high productivity loss for now

  const [submitted, setSubmitted] = useState(false);

  const goBack = () => {
    setSubmitted(false);
    setResults({});
    setDemographic("");
    setPlatform("");
    setTimeOfDay("");
    setWatchReason("");
    setCurrentActivity("");
  };

  function handleSubmit(event) {
    event.preventDefault();

    fetch(`http://localhost:5000/api/v1/predict`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Age: age,
        Income: income,
        OwnsProperty: property,
        HasDebt: debt,
        Demographics: demographic,
        Platform: platform,
        MinutesSpent: screentime,
        NumSessions: sessions,
        NumVideos: videoCount,
        TimeOfDay: timeOfDay,
        // Satisfaction: satisfaction,
        WatchReason: watchReason,
        // SelfControl: selfControl,
        // AddictionLevel: addictionLevel,
        CurrentActivity: currentActivity,
      }),
    })
      .then((response) => {
        console.log("RESPONSE");
        console.log(response);
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((data) => {
        setSubmitted(true);
        setResults(data);
        console.log("Results Generated");
        console.log(data);
      })
      .catch((error) => console.log(error));
  }

  return (
    <div className="container">
      {!submitted ? (
        <div className="survey">
          <h1 className="text-center mb-4">Social Media and Mental Health</h1>

          <form id="myForm" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label" htmlFor="age">
                Please enter your age:
              </label>
              <input
                className="form-control"
                type="number"
                id="age"
                name="age"
                min="0"
                max="200"
                onChange={(e) => setAge(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="income">
                Please enter your income, rounded to the nearest dollar:
              </label>
              <input
                className="form-control"
                type="number"
                id="income"
                name="income"
                min="0"
                max="9999999999999999999999"
                onChange={(e) => setIncome(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="debt">
                Do you have any debt?
              </label>
              <select
                className="form-select"
                name="debt"
                id="debt"
                onChange={(e) => setDebt(e.target.value)}
                required
              >
                <option value="" selected disabled hidden>
                  Select yes or no
                </option>
                <option value="True">Yes</option>
                <option value="False">No</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="property">
                Do you own any properties?
              </label>
              <select
                className="form-select"
                name="property"
                id="property"
                onChange={(e) => setProperty(e.target.value)}
                required
              >
                <option value="" selected disabled hidden>
                  Select yes or no
                </option>
                <option value="True">Yes</option>
                <option value="False">No</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="demographic">
                Do you live in more of a rural or an urban area?
              </label>
              <select
                className="form-select"
                name="demographic"
                id="demographic"
                value={demographic}
                onChange={(e) => setDemographic(e.target.value)}
                required
              >
                <option value="" disabled hidden>
                  Select demographic
                </option>
                <option value="Rural">Rural</option>
                <option value="Urban">Urban</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="platform">
                Which social media platform do you use the most?
              </label>
              <select
                className="form-select"
                name="platform"
                id="platform"
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                required
              >
                <option value="" disabled hidden>
                  Select platform
                </option>
                <option value="Instagram">Instagram</option>
                <option value="Facebook">Facebook</option>
                <option value="YouTube">YouTube</option>
                <option value="TikTok">TikTok</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="screentime">
                How many minutes do you spend on social media per day?
              </label>
              <input
                className="form-control"
                type="number"
                id="screentime"
                name="screentime"
                min="0"
                max="1440"
                onChange={(e) => setScreentime(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="session">
                How many times do you check social media per day?
              </label>
              <input
                className="form-control"
                type="number"
                id="session"
                name="session"
                min="0"
                max="1500"
                onChange={(e) => setSessions(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="video-count">
                How many posts do you see on social media per day?
              </label>
              <input
                className="form-control"
                type="number"
                id="video-count"
                name="video-count"
                min="0"
                max="9999999999999999999999"
                onChange={(e) => setVideoCount(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="time-of-day">
                What time of day do you spend the most time on social media?
              </label>
              <select
                className="form-select"
                name="time-of-day"
                id="time-of-day"
                value={timeOfDay}
                onChange={(e) => setTimeOfDay(e.target.value)}
                required
              >
                <option value="" disabled hidden>
                  Select time of day
                </option>
                <option value="Morning">Morning</option>
                <option value="Afternoon">Afternoon</option>
                <option value="Evening">Evening</option>
                <option value="Night">Night</option>
              </select>
            </div>

            {/* <div className="mb-3">
              <label className="form-label" htmlFor="satisfaction">
                How would you rate your satisfaction with overall social media
                platforms and content (0-10)?
              </label>
              <input
                className="form-control"
                type="number"
                id="satisfaction"
                name="satisfaction"
                min="0"
                max="10"
                onChange={(e) => setSatisfaction(e.target.value)}
                required
              />
            </div> */}

            <div className="mb-3">
              <label className="form-label" htmlFor="watch-reason">
                What is the most common reason you use social media?
              </label>
              <select
                className="form-select"
                name="watch-reason"
                id="watch-reason"
                value={watchReason}
                onChange={(e) => setWatchReason(e.target.value)}
                required
              >
                <option value="" disabled hidden>
                  Select reason
                </option>
                <option value="Boredom">Boredom</option>
                <option value="Habit">Habit</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Procrastination">Procrastination</option>
              </select>
            </div>

            {/* <div className="mb-3">
              <label className="form-label" htmlFor="self-control">
                What would you rate your ability to control your social media
                usage (0-10)?
              </label>
              <input
                className="form-control"
                type="number"
                id="self-control"
                name="self-control"
                min="0"
                max="10"
                onChange={(e) => setSelfControl(e.target.value)}
                required
              />
            </div> */}

            {/* <div className="mb-3">
              <label className="form-label" htmlFor="addiction-level">
                What would you rate your dependency on social media in general
                (0-10)?
              </label>
              <input
                className="form-control"
                type="number"
                id="addiction-level"
                name="addiction-level"
                min="0"
                max="10"
                onChange={(e) => setAddictionLevel(e.target.value)}
                required
              />
            </div> */}

            <div className="mb-3">
              <label className="form-label" htmlFor="current-activity">
                Where do you spend the most time using social media?
              </label>
              <select
                className="form-select"
                name="current-activity"
                id="current-activity"
                value={currentActivity}
                onChange={(e) => setCurrentActivity(e.target.value)}
                required
              >
                <option value="" disabled hidden>
                  Select activity
                </option>
                <option value="At home">Home</option>
                <option value="Commuting">Commuting</option>
                <option value="At school">School</option>
                <option value="At work">Work</option>
              </select>
            </div>

            <div
              id="submit-button"
              className="mb-3 d-flex justify-content-center"
            >
              <button type="submit" className="btn btn-custom w-100">
                Submit
              </button>
            </div>
          </form>
        </div>
      ) : (
        <Results
          results={results.prediction}
          recommendation={results.recommendation}
          goBack={goBack}
        />
      )}
    </div>
  );
}

export default App;
