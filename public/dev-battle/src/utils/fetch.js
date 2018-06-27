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

      if (method === 'POST' || method === 'PUT') {
        options.body = JSON.stringify(data);
      }

      const response = await fetch(url, options);

      const status = response.status;

      let result;

      try {
        result = await response.json();
      } catch(err) {
        return {
          success: false,
          errorMessage: 'Something went wrong',
        }
      }

      if (status >= 200 && status < 300) {
        // TODO ::: Use response.ok
        return (result && (result.success = true), result);
      } else {
        return {
          status: status,
          success: false,
          errorMessage: result.errorMessage,
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