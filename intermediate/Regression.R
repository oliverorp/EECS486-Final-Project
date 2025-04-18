library(glmnet)
library(fastDummies)

# Read in data, drop BinnedProdLoss
data = read.csv("classifierInput.csv")
data <- subset(data, select = -BinnedProdLoss)

# One-Hot Encode all categorical variables
cat_cols <- names(Filter(function(x) is.factor(x) || is.character(x), data))
cat_cols
data_encoded <- dummy_cols(data, remove_first_dummy = FALSE, remove_selected_columns = TRUE)
data_encoded

# Split data into training and test sets
set.seed(123)
train.obs <- sample(seq_len(nrow(data_encoded)), 0.7*nrow(data_encoded))
train <- data_encoded[train.obs,]
test <- data_encoded[-train.obs,]

x.train <- model.matrix(ProductivityLoss ~ . - 1, data = train)
y.train <- train$ProductivityLoss
x.test <- model.matrix(ProductivityLoss ~ . - 1, data = test)
y.test <- test$ProductivityLoss

# Ridge Regression
ridge = cv.glmnet(x.train, y.train, alpha = 0)
ridge
best_lambda <- ridge$lambda.min
best_lambda

# Performance Metrics
pred.train <- predict(ridge, x.train, s = best_lambda)
pred.test <- predict(ridge, x.test, s = best_lambda)
pred.train
pred.test

rmse.train <- sqrt(mean((pred.train - y.train)^2))
rmse.test <- sqrt(mean((pred.test - y.test)^2))
rmse.train
rmse.test

r2.train <- 1 - sum((pred.train - y.train)^2) / sum((y.train - mean(y.train))^2)
r2.train
r2.test <- 1 - sum((pred.test - y.test)^2) / sum((y.test - mean(y.test))^2)
r2.test

# Form a prediction for user's input
user_input <- data.frame(
  Age = "23",
  Income = "15000",
  MinutesSpent = "720",
  NumSessions = "50",
  VideoLength = "24",
  VideoTime = "26",
  NumVideos = "300",
  HasDebt_False = "0",
  HasDebt_True = "1",
  OwnsProperty_False = "1",
  OwnsProperty_True = "0",
  Profession_Artist = "0",
  Profession_Cashier = "0",
  Profession_Driver = "0",
  Profession_Engineer = "0",
  Profession_Labor = "0",
  Profession_Manager = "0",
  Profession_Students = "1",
  Profession_Teacher = "0",
  Profession_WaitStaff = "0",
  Demographics_Rural = "0",
  Demographics_Urban = "1",
  Platform_Facebook = "0",
  Platform_Instagram = "0",
  Platform_TikTok = "1",
  Platform_YouTube = "0",
  Genre_ASMR = "1",
  Genre_Comedy = "0",
  Genre_Entertainment = "0",
  Genre_Gaming = "0",
  Genre_LifeHacks = "0",
  Genre_Memes = "0",
  Genre_Pranks = "0",
  Genre_Trends = "0",
  Genre_Vlogs = "0",
  TimeOfDay_Afternoon = "0",
  TimeOfDay_Evening = "0",
  TimeOfDay_Morning = "0",
  TimeOfDay_Night = "1",
  WatchReason_Boredom = "0",
  WatchReason_Entertainment = "0",
  WatchReason_Habit = "0",
  WatchReason_Procrastination = "1",
  Device_Computer = "0",
  Device_Smartphone = "1",
  Device_Tablet = "0",
  OS_Android = "0",
  OS_iOS = "1",
  OS_MacOS = "0",
  OS_Windows = "0",
  CurrentActivity_Commuting = "0",
  CurrentActivity_Home = "1",
  CurrentActivity_School = "0",
  CurrentActivity_Work = "0",
  Connection_MobileData = "0",
  Connection_WiFi = "1"
)

prediction <- predict(ridge, newx = user_input, s = best_lambda)
prediction
