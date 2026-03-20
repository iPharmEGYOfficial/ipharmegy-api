export default {
  async fetch(request) {

    // ✅ CORS HEADERS
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    };

    // ✅ Handle preflight
    if (request.method === "OPTIONS") {
      return new Response(null, { headers });
    }

    const url = new URL(request.url);

    if (url.pathname === "/api") {
      return new Response(JSON.stringify({
        status: "OK",
        system: "iPharmEGY API",
        time: new Date().toISOString()
      }), { headers });
    }

    if (url.pathname === "/api/smart-summary") {
      return new Response(JSON.stringify({
        totalSales: 125000,
        totalProfit: 25000,
        topSelling: 15,
        deadStock: 3,
        lowStock: 8
      }), { headers });
    }

    return new Response("Not Found", { status: 404, headers });
  }
};