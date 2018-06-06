class Fetch {
  static async request(url, method = 'GET', data) {

    try {

      const options = {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        // TODO ::: Add check for removing this field in production
        credentials: 'include',
      };

      if (method === 'POST') {
        options.body = JSON.stringify(data);
      }

      const response = await fetch(url, options);

      if (response.status >= 200 && response.status < 300) {
        const result = await response.json();
        // TODO ::: Use response.ok
        return (result.success = true, result);
      } else {
        return {
          status: response.status,
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
    return await Fetch.request(
      url,
      'GET',
    );
  }

  static async post(url, data) {
    return await Fetch.request(
      url,
      'POST',
      data,
    );
  }
}

export default Fetch;