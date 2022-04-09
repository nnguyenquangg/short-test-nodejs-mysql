const { keyBy } = require("lodash");
const request = require("supertest");
const app = require("../../server");

describe("data objects", () => {
  jest.setTimeout(10000);

  let dataObject;

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
        name: "dataObject",
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
    dataObject = res.body;
  });

  it("should return data object  when get by id successfully", async () => {
    const { body, statusCode } = await request(app).get(
      `/api/data-objects/${dataObject.id}`
    );

    expect(statusCode).toEqual(200);

    expect(body.id).toEqual(dataObject.id);
    expect(body.name).toEqual(dataObject.name);
    expect(body.levels.length).toEqual(2);
    expect(body.levels[0].elements.length).toEqual(2);
    expect(body.levels[1].elements.length).toEqual(2);
    dataObject = body;
  });

  it("Should return level parent is correct when set parent - children", async () => {
    const { body } = await request(app)
      .put(`/api/data-objects/set-parent/${dataObject.id}`)
      .send({
        parentId: dataObject.levels[0].id,
        childrenId: dataObject.levels[1].id,
      });

    const { levels } = body;

    const levelMapped = keyBy(levels, "id");

    expect(levelMapped[dataObject.levels[1].id].parentId).toEqual(
      dataObject.levels[0].id
    );
  });

  it("should return 200 when delete successfully", async () => {
    const { statusCode } = await request(app).delete(
      `/api/data-objects/${dataObject.id}`
    );

    expect(statusCode).toEqual(200);
    const { statusCode: statusCodeNotFound } = await request(app).get(
      `/api/data-objects/${dataObject.id}`
    );

    expect(statusCodeNotFound).toEqual(404);
  });
});
