class Fetch {
  static async request({ url, method = 'GET', data }) {    
    try {

      const options = {
        method,
        headers: {
         'Content-Type': 'application/json',
        },
      };

      if (method === 'POST') {
        options.body = JSON.stringify(data);
      }
      
      const requestPromise = await fetch(url, options);
      return await requestPromise.json();
    } catch (error) {
      console.error(error); // TODO ::: Implement ErrorHandler
    }
  }

  static async get(url) {
    return await Fetch.request({
      url,
      method: 'GET',
    });
  }

  static async post(url, data) {
    return await Fetch.request({
      url,
      method: 'POST',
      data,
    });
  }
}

export default Fetch;