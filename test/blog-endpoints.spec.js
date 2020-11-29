const knex = require('knex')
const app = require('../src/app');
const { makeBlogsArray } = require('./blog.fixtures')

describe(`Blogs API Endpoints`, function() {
    let db;

    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DATABASE_URL,
        })
        app.set('db', db)
    });
    before('cleanup', () => db.raw('TRUNCATE TABLE blog RESTART IDENTITY;'));

    afterEach('cleanup', () => db.raw('TRUNCATE TABLE blog RESTART IDENTITY;'));

    after('disconnect from the database', () => db.destroy());

    describe('GET /api/blog', () => {

        context(`Given there are blogs in the db`, () => {
        
            const testBlogs = makeBlogsArray();
            
            beforeEach('insert blogs into db', () => {
                return db
                .into('blog')
                .insert(testBlogs)
            })
            
            it('responds with 200 and all of the blogs', function () {
                return supertest(app)
                .get('/api/blog')
                .set('Authorization', `Bearer ${process.env.API_TOKEN}`) 
                .expect(200)
                .expect(res => {
                    expect(res.body.id).to.eql(testBlogs.id)
                    expect(res.body.title).to.eql(testBlogs.title)
                    expect(res.body.content).to.eql(testBlogs.content)
                    expect(res.body.username).to.eql(testBlogs.username)
                })
            });
            
        });
   
    });

    describe(`POST /api/blog`, () => {

        it(`creates a blog, responding with 201 and the new blog`, function() {
            const newBlog = {
              title: 'Test new blog',
              content: 'this is a test for the content',
              username: 'testuser1',
            }
            return supertest(app)
              .post('/api/blog')
              .send(newBlog)
              .expect(201)
              .expect(res => {
                expect(res.body).to.have.property('id')
                expect(res.body.title).to.eql(newBlog.title)
                expect(res.body.content).to.eql(newBlog.content)
                expect(res.body.username).to.eql(newBlog.username)
                expect(res.headers.location).to.eql(`/api/blog/${res.body.id}`)
              })
              .expect(res =>
                db
                  .from('blog')
                  .select('*')
                  .where({ id: res.body.id })
                  .first()
                  .then(row => {
                    expect(row.title).to.eql(newBlog.title)
                    expect(row.content).to.eql(newBlog.content)
                    expect(row.username).to.eql(newBlog.username)
                  })
              )
          })

    })
})