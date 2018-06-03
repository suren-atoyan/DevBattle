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

      if (requestPromise.status > 200 && requestPromise.status < 300) {
        return await requestPromise.json();        
      } else {
        return {
          status: requestPromise.status,
          success: false,
        }
      }

    } catch (error) {
      console.error(error); // TODO ::: Implement ErrorHandler
      return {
        error,
        success: false,
      }
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