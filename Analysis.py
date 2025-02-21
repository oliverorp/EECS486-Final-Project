import pandas as pd

def main():
    data = pd.read_csv("Time_Wasters_on_Social_Media.csv")
    df = pd.DataFrame(data)
        
    columns = [
        "UserID",
        "Age",
        "Gender",
        "Location",
        "Income",
        "Debt",
        "Owns Property",
        "Profession",
        "Demographics",
        "Platform",
        "Total Time Spent",
        "Number of Sessions",
        "Number of Videos Watched",
        "Scroll Rate",
        "Frequency",
        "ProductivityLoss",
        "Satisfaction",
        "Watch Reason",
        "DeviceType",
        "Watch Time",
        "Self Control",
        "Addiction Level",
        "CurrentActivity",
        "ConnectionType"
    ]
    
    colsInterest = df[columns]
    print(colsInterest.head())


if __name__ == "__main__":
    main()