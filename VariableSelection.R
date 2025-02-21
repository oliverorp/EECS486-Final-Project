# Open data file and read in column names, ignoring index column
time_wasters = read.csv("rStudioInput.csv")
time_wasters <- subset(time_wasters, select = -UserID )
attach(time_wasters)
cols = colnames(time_wasters)

# Check for multicollinearity

# Run Partial F test to determine extraneous predictors
lm.full = lm(ProductivityLoss~., data = time_wasters)
for (col in colnames(time_wasters)){
  subcols <- time_wasters[,!names(time_wasters) %in% c(col)]
  lm.red = lm(ProductivityLoss~., data = subcols)
  test = anova(lm.red, lm.full)
  pval = test[,6][2]
  if (!is.na(pval)){
    if (pval > 0.05) {
      print(col)
    }
  }
}
