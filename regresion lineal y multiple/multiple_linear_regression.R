# Multiple Linear Regression
# install.packages('caTools')
library(tidyverse)
# Importing the dataset
dataset = read.csv('car.csv')
#dataset = select(dataset,year,selling_price,km_driven,fuel,seller_type,transmission,owner)
# Encoding categorical data
dataset$fuel = factor(dataset$fuel,
                       levels = c('Diesel', 'Petrol', 'LPG','CNG'),
                       labels = c(1, 2, 3, 4))
dataset$fuel = factor(dataset$year,
                       levels = c('2001', '2002', '2003','2004','2005','2006','2007','2008','2009','2010',
                                  '2011','2011','2012','2013','2014','2015','2016','2017','2018','2019','2020'),
                       labels = c(1, 2, 3, 4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21))
dataset$fuel = factor(dataset$seller_type,
                      levels = c('Individual', 'Dealer', 'Trustmark Dealer'),
                      labels = c(1, 2, 3))
dataset$fuel = factor(dataset$owner,
                      levels = c('First Owner', 'Second Owner', 'Third Owner','Fourth & Above Owner'),
                      labels = c(1, 2, 3, 4))

# Splitting the dataset into the Training set and Test set
# install.packages('caTools')
library(caTools)
set.seed(123)
split = sample.split(dataset$selling_price, SplitRatio = 0.8)
training_set = subset(dataset, split == TRUE)
test_set = subset(dataset, split == FALSE)

# Feature Scaling
# training_set = scale(training_set)
# test_set = scale(test_set)

# Fitting Multiple Linear Regression to the Training set
regressor = lm(formula = selling_price ~ .,
               data = training_set)

# Predicting the Test set results
y_pred = predict(regressor, newdata = test_set)