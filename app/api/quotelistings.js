import client from "./client";
const endpoint = "/api/quotes";
export const getQuoteListings = () => client.get(endpoint);
export const addQuote = (quote) => {
  const data = new FormData();
  data.append("text", quote.text);
  data.append("author", quote.author);
  return client.post(endpoint, data);
};
