library(quantmod)
library(tseries)
library(timeSeries)
library(forecast)
library(xts)
library(dplyr)


## https://www.r-bloggers.com/forecasting-stock-returns-using-arima-model/


### Load data

getSymbols('SPY', from='2015-01-01', to='2019-12-04')
str(SPY)

### dont delete! yahoo finance api locked out!!
#spy_2015
#spy_2015_copy <- spy_2015
str(spy_2015)
tail(spy_2015$SPY.Close)

#stock_prices <- SPY$SPY.Close
stock_prices <- spy_2015$SPY.Close



### Clean and prepare data for analysis

# Check for stationarity with ACF and PACF plots
acf(train, main='ACF')
pacf(train, main='PACF')

# Since our data is not stationary, it will be difficult to forecast with it. 
# Lets take the log returns of the stock closing price instead.
stock <- diff(log(stock_prices),lag=1)
stock <- stock[!is.na(stock)]
stock <- stock[!is.infinite(rowSums(stock)), ]
head(stock)

print(adf.test(stock))




### Prediction function. 
#   ARIMA forecasting on daily log returns timeseries data.
predict_direction <- function(stock) {

  # Initialize return df.
  output <- data.frame(matrix(ncol=2, nrow=0))
  colnames(output) <- c("actual", "predicted")
  training_split <- floor(nrow(stock) * 0.9)
  
  ## Compute the forecast for all history in our dataset from the start up to the test/train split index, incrementing by 1 each loop.
  for (i in training_split:(nrow(stock)-1)) {
  #for (i in (nrow(stock)-1)) {
    print(i)
    # Get first i rows for each training set, up to the training_split index row.
    train <- stock[1:i,]
    test <- stock[(i+1):nrow(stock),]
    
    # Prior runs of auto.arima suggested parameters of 2,0,2 are best suited for this dataset, also backed up by the ACF and PACF plots above.
    #fit <- arima(train, order = c(2,0,2), include.mean = F)
    fit <- auto.arima(train)
    
    # Forecasting the log returns for 1 day ahead on each each training set to backtest the model.
    # Confidence Interval set to 99%.
    arima_fct <- forecast(fit, h = 1,level=99)
    prediction <- arima_fct$mean[1]
    #print(prediction)
    #print(stock[i])
    
    print(data.frame(stock[i], prediction))
    out <- data.frame(stock[i], prediction)
    # Assign a direction value for the output indicator.
    out$direction <- sum(sign(out$SPY.Close) == sign(out$prediction))*sign(out$prediction)
    
    output <- rbind(output, out)
    #print(output)
    
    print(out)
    print("---")
  }
  return(output)
}

### Run forecasting algorithm
spy_output <- predict_direction(stock)
str(spy_output)
spy_output
nrow(spy_output)
# Set direction to NA when 0 so we don't plot those.
spy_output[spy_output$direction == 0, ]$direction <- NA

### Plot Results
plot(spy_output$SPY.Close, main='Model Backtesting - Buy & Sell Indicators', type='l', lwd=1.5)
lines(spy_output$prediction, col='blue', lwd=2)
par(new = T)
#plot(spy_output$direction, pch=16, cex=1, col='red', xaxt="n", yaxt="n", ylab="", xlab="")
plot(spy_output[spy_output$direction > 0, ]$direction, pch=16, cex=1, col='green', ylim=c(-1,1), xaxt="n", yaxt="n", ylab="", xlab="")
par(new = T)
plot(spy_output[spy_output$direction < 0, ]$direction, pch=16, cex=1, col='red', ylim=c(-1,1), xaxt="n", yaxt="n", ylab="", xlab="")
#plot(stock_prices$SPY.Close, col='red', lwd=2)


### Forecast Tomorrow's Price

tomorrow_direction <- sign(forecast(auto.arima(stock), h=1, level=99)$mean[1])
print(tomorrow_direction)



sign(forecast(auto.arima(spy_output$SPY.Close), h=1, level=99)$mean[1])

