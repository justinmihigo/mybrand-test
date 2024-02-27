import { beforeAll, afterAll, it, describe, expect, test } from "@jest/globals";
import supertest, { Request, Response } from 'supertest';
import jwt from 'jsonwebtoken';
import app from "../src/index"
import mongoose from "mongoose";
import dotenv from "dotenv";
import http from "http";
import { ObjectId } from "mongodb";
dotenv.config();
const DB_URI = process.env.MONGODB_URI || "";
const password = process.env.MONGODB_PASSWORD || "";
const realURI = DB_URI.replace("<password>", password);
let server: http.Server;
beforeAll(async () => {
  try{
    server=app.listen(5000, () => {
   console.log("Server has started!");
    });
 }
catch(error){
 console.error("Error Starting the server:", error);
}
  (await mongoose.connect(realURI)).Connection;
});
afterAll(async () => {
  if(server){
    server.close();
  }
  await mongoose.connection.close();
  console.log('Database is disconnected');
});
 describe("Creating account", () => {
    it("should create a new account", async() => {
        const response = await supertest(app).post("/api/signup")
            .send({username:"justin",email:"mihigo@gmail.com", password:'444'});
        expect(response.status).toBe(400);
    }) 
})
const id = '65dd76ed7f28f142e34dbe03';
describe("Logging in", () => {
  const token: { token: string } = { token: '' };
  it("should login in", async () => {
    const response = await supertest(app).post("/api/login")
      .send({ email: "mihigo@gmail.com", password: '444' });
    token.token = response.body.token;
    expect(response.status).toBe(201);
  })

  describe("Testing secure routes", () => {
    it("should return 401 for a person with no token", async () => {
      const response = await supertest(app).get('/api/secureRoute');
      expect(response.status).toBe(401);
    })
    it("should return 200 for a person with no token", async () => {
      const response = await supertest(app).get('/api/secureRoute').set('Authorization', 'Bearer ' + token.token);
      expect(response.status).toBe(200);
    })
  })

  describe("After login Blogs operations", () => {

    it('if title is not specified', async () => {
      const res = await supertest(app)
        .post('/api/blogs')
        .send({
          content: 'Testing',
          image: ""
        }).set('Authorization', 'Bearer ' + token.token)
      expect(res.status).toBe(400);

    });

    it('Creating blog image being optional', async () => {
      const res = await supertest(app)
        .post('/api/blogs')
        .send({
          title: 'intergation',
          content: 'Testing',
          image: ""
        }).set('Authorization', 'Bearer ' + token.token)
      expect(res.status).toBe(200);

    });

    it('if content is not specified', async () => {
      const res = await supertest(app)
        .post('/api/blogs')
        .send({
          title: 'intergation',
          image: ""
        }).set('Authorization', 'Bearer ' + token.token)
      expect(res.status).toBe(400);

    });

    it('if content is not specified', async () => {
      const res = await supertest(app)
        .post('/api/blogs')
        .send({
          title: 'intergation',
          image: ""
        }).set('Authorization', 'Bearer ' + token.token)
      expect(res.status).toBe(400);
    });

    it('Finding a blog byId', async () => {
      const res = await supertest(app)
        .get('/api/blogs/65dd76ed7f28f142e34dbe03');
      expect(res.status).toBe(200);
    });

    it('Deleting a blog without permission', async () => {
      const res = await supertest(app)
        .delete('/api/blogs/' + id)
      expect(res.status).toBe(401);
    })
    it('Deleting a blog', async () => {
      const res = await supertest(app)
     .delete('/api/blogs/65da37140209385c345cecd0')
     .set('Authorization', 'Bearer '+ token.token)
      expect(res.status).toBe(404);
    })
    it('Updating a blog without permission ', async () => {
      const res = await supertest(app)
        .patch('/api/blogs/65dd76ed7f28f142e34dbe03').send({ title: "Mihigo" })
      expect(res.status).toBe(401);
    })
    it('Updating a blog when', async () => {
      const res = await supertest(app)
        .patch(`/api/blogs/${id}`).send({ title: "Mihigo" }).set('Authorization', 'Bearer '+ token.token);
      expect(res.status).toBe(201);
    })
  });
});

describe('Testing API', () => {
  it('getting all blogs should return 200 on /', async () => {
    const response = await supertest(app).get('/api/blogs');
    expect(response.status).toBe(200);
  })
  it('checking the blogs before should return 404', async () => {
    const response = await supertest(app).get('/api/');
    expect(response.status).toBe(404);
  })
})

describe("logging in failing", () => {
  it('should return 400 on /login', async () => {
    const response = await supertest(app).post('/api/login').send("").
      set('email', 'mihigojustin28@gmail.com').set('password', 'test123');
    expect(response.status).toBe(400);
  })
  it('should return 400 on invalid credentials', async () => {
    const response = await supertest(app).post('/api/login').send({ email: "mihigojustin", password: "" });
    expect(response.status).toBe(400);
  })

})



describe("Comments", () => {
  const blogId='65dd76ed7f28f142e34dbe03';
  it('should return 200 on get all comments', async () => {
    const response = await supertest(app).get(`/api/blogs/${id}/comments`);
    expect(response.status).toBe(200);
  })
  it('should return 200 on creating a comment', async () => {
    const response = await supertest(app).post(`/api/blogs/65dd76ed7f28f142e34dbe03/comments`)
      .send({ name: "mihigo", email: "mihigojustin@gmail.com", comment: "comment created" });
    expect(response.status).toBe(200);
  })
  it('should return 400 on creating a comment for invalid inputs', async () => {
    const response = await supertest(app).post(`/api/blogs/65dd76ed7f28f142e34dbe03/comments`)
      .send({ email: "mihigojustin@gmail.com", comment: "comment created" });
    expect(response.status).toBe(400);
  })
  it('should return 404 on getting one comment', async () => {
    const response = await supertest(app).get(`/api/blogs/${blogId}/comments/${id}`);
    expect(response.status).toBe(404);
  });

  it('should return 200 on getting one comment', async () => {
    const response = await supertest(app).get(`/api/blogs/65dd76ed7f28f142e34dbe03/comments/65dd7d96cc6a7ee75ee5a369`);
    expect(response.status).toBe(200);
  });

  it('should return 404 when deleting a comment', async () => {
    const response = await supertest(app).delete(`/api/blogs/${blogId}/comments`);
    expect(response.status).toBe(404);
  })
  it('should not  update a comment', async () => {
    const response = await supertest(app).patch(`/api/blogs/${blogId}/comments/65dd7d96cc6a7ee75ee5a369`)
      .send({ comment: "comment changed" });
    expect(response.status).toBe(201);
  })
  it('should  update a comment', async () => {
    const response = await supertest(app).patch('/api/blogs/65da1b2e2414b007368b44fb/comments/65dd7d96cc6a7ee75ee5a369')
      .send({ comment: "comment changed" });
    expect(response.status).toBe(201);
  })



})

describe("Likes", () => {
  const blogId='65dd76ed7f28f142e34dbe03';
  it('should return 200 on get all likes', async () => {
    const response = await supertest(app).get(`/api/blogs/${blogId}/likes`);
    expect(response.status).toBe(200);
  })

  it('should return 200 for creating a like', async () => {
    const response = await supertest(app).post(`/api/blogs/${blogId}/likes`);
    expect(response.status).toBe(200);
  })
  it('should return 200 for deleting a like', async () => {
    const response = await supertest(app).delete(`/api/blogs/${blogId}/likes`);
    expect(response.status).toBe(200);
  })
})

describe("Queries", () => {
  const queryId = '';
  it('should return 200 on get all queries', async () => {
    const response = await supertest(app).get('/api/queries');
    expect(response.status).toBe(200);
  })
  it('should return one query', async () => {
    const response = await supertest(app).get('/api/queries/65dd76f97f28f142e34dbe20');
    expect(response.status).toBe(200);
  })
  it('Should return 404 for the query that is not found', async () => {
    const response = await supertest(app).get('/api/queries/' + id);
    expect(response.status).toBe(404);
  })
  it('should return 404 delete a query', async () => {
    const response = await supertest(app).delete('/api/queries/' + id);
    expect(response.status).toBe(404);
  })
  it('should return 200 create a query', async () => {
    const response = await supertest(app).post('/api/queries')
      .send({ email: "mihigojustin@gmail.com", query: "test", name: "justin" });
    expect(response.status).toBe(200);
  })
  it('should return 400 because email is missing when create a query', async () => {
    const response = await supertest(app).post('/api/queries')
      .send({ query: "test", name: "justin" });
    expect(response.status).toBe(400);
  })
})



