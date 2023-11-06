public class OpenWeatherApi {
    @AuraEnabled
    public static String getWeatherData(String city, String CountryCode){
        Http http = new Http();
        HttpRequest req = new HttpRequest();
        WeatherData data = new WeatherData();
        List<WeatherCondition.Weather> con = new List<WeatherCondition.Weather>();
        req.setEndpoint('callout:Openweather/weather?appId='+Label.OpenWeatherKey+'&q='+ city +','+ CountryCode +'&units=metric');
        req.setMethod('GET');
        HttpResponse res = http.send(req);
        Map<String, Object> weatherMap = new Map<String, Object>();
        if(res.getStatusCode()==200){
            weatherMap = (Map<String, Object>)JSON.deserializeUntyped(res.getBody());
            System.debug(weatherMap.get('weather'));
            data= (WeatherData)JSON.deserialize(JSON.serialize(weatherMap.get('main')), WeatherData.class);
            con = (List<WeatherCondition.Weather>)JSON.deserialize(JSON.serialize(weatherMap.get('weather')),List<WeatherCondition.Weather>.class);
            String strJSON = JSON.serialize(con[0])+'/'+JSON.serialize(data);
            System.debug(con);
            return strJSON;
        }else {
            System.debug(res.getStatusCode());
            System.debug(res);
            return null;
        }
    }
    
    public class WeatherData{
        public Double feels_like;
        public Double humidity;
        public Double pressure;
        public Double temp;
        public Double temp_max;
        public Double temp_min;
    }
    
}