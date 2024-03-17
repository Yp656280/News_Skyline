const {GetData,PostData} = require('./Services')

 const GetNews = async (target) =>{
    let url = `api/news/${target}`;
    let result = await Promise.all([GetData(url,"")]);
    //console.log("result123",result[0])
    return result[0];
  }

  module.exports = {GetNews}
