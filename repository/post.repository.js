import axios from "axios"

class PostRepository {
  constructor() {
    this.instance = axios.create({
      baseURL: 'http://localhost:3000',
    });
  }

  async fetchPosts() {
    const { data } = await this.instance.get('/posts');

    return data;
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new PostRepository();