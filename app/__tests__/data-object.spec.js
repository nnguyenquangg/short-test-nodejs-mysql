const request = require("supertest");
const app = require("../../server");

describe("data objects", () => {
  jest.setTimeout(10000);

  let DataObject;

  it("should return all data objects", async () => {
    const res = await request(app).get("/api/data-objects");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
          levels: expect.any(Array),
        }),
      ])
    );
  });

  it("should return data object when create successfully", async () => {
    const res = await request(app)
      .post("/api/data-objects")
      .send({
        name: "DataObject",
        levels: [
          {
            levelID: 1,
            levelName: "L1",
            elements: [
              {
                name: "ele1",
              },
              {
                name: "ele2",
              },
            ],
          },
          {
            levelID: 2,
            levelName: "L2",
            elements: [
              {
                name: "ele3",
              },
              {
                name: "ele4",
              },
            ],
          },
        ],
      });

    expect(res.statusCode).toEqual(200);
    DataObject = res.body;
  });

  it("should return data object  when get by id successfully", async () => {
    const { body, statusCode } = await request(app).get(
      `/api/data-objects/${DataObject.id}`
    );

    expect(statusCode).toEqual(200);

    expect(body.id).toEqual(DataObject.id);
    expect(body.name).toEqual(DataObject.name);
    expect(body.levels.length).toEqual(2);
    expect(body.levels[0].elements.length).toEqual(2);
    expect(body.levels[1].elements.length).toEqual(2);
  });

  it("should return 200 when delete successfully", async () => {
    const { statusCode } = await request(app).delete(
      `/api/data-objects/${DataObject.id}`
    );

    expect(statusCode).toEqual(200);
    const { statusCode: statusCodeNotFound } = await request(app).get(
      `/api/data-objects/${DataObject.id}`
    );

    expect(statusCodeNotFound).toEqual(404);
  });
});
