let latestDustbinData = null; // Store latest data in memory

exports.handler = async (event, context) => {
  if (event.httpMethod === "POST") {
    // Receive data from ESP32
    try {
      const data = JSON.parse(event.body);
      latestDustbinData = data; // Update latest data
      return {
        statusCode: 200,
        body: JSON.stringify({ message: "Data received", data })
      };
    } catch (error) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Invalid data" })
      };
    }
  } else if (event.httpMethod === "GET") {
    // Serve latest data to frontend
    return {
      statusCode: 200,
      body: JSON.stringify(latestDustbinData || {
        id: "dustbin1",
        name: "Dustbin 1",
        location: "Main Street",
        fillPercent: 0,
        rawFillLevel: 0
      })
    };
  } else {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" })
    };
  }
};
