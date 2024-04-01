const {GetData,PostData} = require('./Services')

 const GetFutureWeather = async (target) =>{
    let url = `api/weather/future/${target}`;
    let result = await Promise.all([GetData(url,"")]);
    //console.log("result123",result[0])
    return result[0];
  }

   const GetCurrentWeather = async (target) =>{
    let url = `api/weather/current/${target}`;
    let result = await Promise.all([GetData(url,"")]);
    //console.log("result123",result[0])
    return result[0];
  }
  const GetCurrentLocation = async () =>{
    let url = `api/weather/getLocation`;
    let result = await Promise.all([PostData(url,"")]);
    //console.log("result123",result[0])
    return result[0];
  }



  module.exports = {GetFutureWeather,GetCurrentWeather,GetCurrentLocation}
