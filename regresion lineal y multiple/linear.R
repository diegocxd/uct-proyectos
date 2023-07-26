# Multiple Linear Regression
# install.packages('caTools')
library(tidyverse)
# Importing the dataset
dataset = read.csv('salary_data.csv')
#dataset = select(dataset,income,age,gender,education_level)
# Encoding categorical data
dataset$gender = factor(dataset$gender,levels = c('F', 'M'),labels = c(0, 1))
# Splitting the dataset into the Training set and Test set
# install.packages('caTools')
library(caTools)
set.seed(123)
split = sample.split(dataset$income, SplitRatio = 0.8)
training_set = subset(dataset, split == TRUE)
test_set = subset(dataset, split == FALSE)

# Feature Scaling
# training_set = scale(training_set)
# test_set = scale(test_set)

# Fitting Multiple Linear Regression to the Training set
regressor = lm(formula = income ~ age,
               data = training_set)


# Predicting the Test set results
y_pred = predict(regressor, newdata = test_set)