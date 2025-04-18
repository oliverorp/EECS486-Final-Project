# Open data file and read in column names, ignoring index column
time_wasters = read.csv("rStudioInput.csv")
ncol(time_wasters)

# Make categorical variables factors
cat_vars = names(time_wasters)[sapply(time_wasters, is.character)]
time_wasters[cat_vars] = lapply(time_wasters[cat_vars], as.factor)

# Multicollinearity checks
lm.full = lm(ProductivityLoss~., data = time_wasters)
print(alias(lm.full))
time_wasters <- subset(time_wasters, select = -Watch.Time)
time_wasters <- subset(time_wasters, select = -Addiction.Level)

lm.full2 = lm(ProductivityLoss~., data = time_wasters)
print(alias(lm.full2))
library(car)
vif(lm.full2)
time_wasters <- subset(time_wasters, select = -Satisfaction)
time_wasters <- subset(time_wasters, select = -Self.Control)

# Run Partial F test to determine extraneous predictors
lm.full3 = lm(ProductivityLoss~., data = time_wasters)
for (col in colnames(time_wasters)){
  if (col != "ProductivityLoss"){
    subcols = time_wasters[,!names(time_wasters) %in% c(col)]
    lm.red = lm(ProductivityLoss~., data = subcols)
    test = anova(lm.red, lm.full)
    pval = test[,6][2]
    if (!is.na(pval) && pval < 0.05){
      print(col)
      print(pval)
    }
  }
}