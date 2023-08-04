export const PostsAPI = async () => {

    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts"); 
      const dataFetched = await response.json();
      return dataFetched;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  };
  