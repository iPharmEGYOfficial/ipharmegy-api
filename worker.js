export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname === "/") {
      return Response.json({
        system: "iPharmEGY API",
        status: "RUNNING"
      });
    }

    if (url.pathname === "/api/health") {
      return Response.json({
        status: "OK",
        system: "iPharmEGY API",
        time: new Date().toISOString()
      });
    }

    if (url.pathname === "/api/smart-summary") {
      return Response.json({
        totalSales: 125000,
        totalOrders: 320,
        topItem: "Panadol",
        estimatedProfit: 25000,
        message: "Smart summary mock data"
      });
    }

    return new Response("Not Found", { status: 404 });
  }
};
