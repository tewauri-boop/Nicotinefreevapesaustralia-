(function () {
  if (typeof navigator === 'undefined' || !navigator.modelContext) return;
  navigator.modelContext.provideContext({
    tools: [
      {
        name: "search_products",
        description: "Search Nicotine Free Vapes Australia products by keyword, category, or price",
        inputSchema: {
          type: "object",
          properties: {
            query: { type: "string" },
            category: { type: "string" },
            max_price: { type: "number" }
          }
        },
        execute: async ({ query, category, max_price }) => {
          const params = new URLSearchParams();
          if (query) params.set('q', query);
          if (category) params.set('category', category);
          if (max_price) params.set('max_price', max_price);
          const res = await fetch(`https://DOMAIN.com/api/search?${params}`);
          return res.json();
        }
      },
      {
        name: "browse_products",
        description: "Browse 0mg products by category",
        inputSchema: {
          type: "object",
          properties: {
            category: { type: "string" }
          }
        },
        execute: async ({ category }) => {
          const url = category ? `https://DOMAIN.com/shop/${category}/` : `https://DOMAIN.com/shop/`;
          window.location.href = url;
          return { url };
        }
      },
      {
        name: "order_via_whatsapp",
        description: "Initiate a WhatsApp order. Minimum order $200 AUD. Human completes.",
        inputSchema: {
          type: "object",
          properties: {
            message: { type: "string" }
          }
        },
        execute: async ({ message }) => {
          const rawNum = "61400000000";
          const url = message ? `https://wa.me/${rawNum}?text=${encodeURIComponent(message)}` : `https://wa.me/${rawNum}`;
          window.open(url, '_blank');
          return { url };
        }
      },
      {
        name: "get_wholesale_info",
        description: "Get wholesale pricing tiers and requirements",
        inputSchema: { type: "object", properties: {} },
        execute: async () => {
          window.location.href = `https://DOMAIN.com/wholesale/`;
          return { url: `https://DOMAIN.com/wholesale/` };
        }
      },
      {
        name: "contact",
        description: "Contact Nicotine Free Vapes Australia for questions or support",
        inputSchema: { type: "object", properties: {} },
        execute: async () => {
          window.location.href = `https://DOMAIN.com/contact/`;
          return { url: `https://DOMAIN.com/contact/` };
        }
      }
    ]
  });
})();
