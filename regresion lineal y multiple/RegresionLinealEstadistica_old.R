
set.seed(14)

car1 = read.csv("Car details v3.csv")
car <- na.omit(car1)

car <- subset (car, select = -torque)
car <- subset (car, select = -seller_type)
car <- subset (car, select = -max_power)
car <- subset (car, select = -mileage)
car <- subset (car, select = -seats)
car <- subset (car, select = -owner)

car$name <- word(car$name,1)
car$name <- str_replace(car$name, 'Maruti', '0')
car$name <- str_replace(car$name, 'Skoda', '1')
car$name <- str_replace(car$name, 'Honda', '2')
car$name <- str_replace(car$name, 'Hyundai', '3')
car$name <- str_replace(car$name, 'Toyota', '4')
car$name <- str_replace(car$name, 'Ford', '5')
car$name <- str_replace(car$name, 'Renault', '6')
car$name <- str_replace(car$name, 'Mahindra', '7')
car$name <- str_replace(car$name, 'Tata', '8')
car$name <- str_replace(car$name, 'Chevrolet', '9')
car$name <- str_replace(car$name, 'Fiat', '10')
car$name <- str_replace(car$name, 'Datsun', '11')
car$name <- str_replace(car$name, 'Jeep', '12')
car$name <- str_replace(car$name, 'Mercedes-Benz', '13')
car$name <- str_replace(car$name, 'Mitsubishi', '14')
car$name <- str_replace(car$name, 'Audi', '15')
car$name <- str_replace(car$name, 'Volkswagen', '16')
car$name <- str_replace(car$name, 'BMW', '17')
car$name <- str_replace(car$name, 'Nissan', '18')
car$name <- str_replace(car$name, 'Lexus', '19')
car$name <- str_replace(car$name, 'Jaguar', '20')
car$name <- str_replace(car$name, 'Land', '21')
car$name <- str_replace(car$name, 'MG', '22')
car$name <- str_replace(car$name, 'Volvo', '23')
car$name <- str_replace(car$name, 'Daewoo', '24')
car$name <- str_replace(car$name, 'Kia', '25')
car$name <- str_replace(car$name, 'Force', '26')
car$name <- str_replace(car$name, 'Ambassador', '27')
car$name <- str_replace(car$name, 'Ashok', '28')
car$name <- str_replace(car$name, 'Isuzu', '29')
car$name <- str_replace(car$name, 'Opel', '30')
car$name <- str_replace(car$name, 'Peugeot', '31')
car$name <- as.numeric(car$name)

car$engine <- str_replace(car$engine, 'CC', '')
car$engine <- as.numeric(car$engine)
car$engine[is.na(car$engine)]<-mean(car$engine,na.rm=TRUE)
car$engine[car$engine == ""] <- NA

car$transmission <- factor(car$transmission,
                           levels = c('Manual', 'Automatic'),
                           labels = c(1,2))

car$fuel <- factor(car$fuel,
                   levels = c('Diesel', 'Petrol', 'CNG','LPG','Electric'),
                   labels = c(1,2,3,4,5))


split = sample.split(car$selling_price, SplitRatio = 0.8)
training_set = subset(car, split == TRUE)
test_set = subset(car, split == FALSE)


regressor <- lm(log(selling_price) ~ ., data = training_set)
y_pred = predict(regressor, newdata = test_set)

#construir un modelo optimo con la eliminacion hacia atras
SL = 0.05
regressor <- lm(log(selling_price) ~ name + year + km_driven + fuel + transmission + engine,
                data = car)
summary(regressor)

regressor <- lm(log(selling_price) ~  year + km_driven + fuel + transmission + engine,
                data = car)
summary(regressor)
#Adjusted R-squared:  0.7999 

regressor <- lm(log(selling_price) ~  year + km_driven  + transmission + engine,
                data = car)
summary(regressor)
#Adjusted R-squared:  0.7901 
