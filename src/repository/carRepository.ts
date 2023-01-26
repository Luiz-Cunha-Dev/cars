import { cars } from "@prisma/client";
import prisma from "../config/database.js";

async function getCars() {
  // const data = await db.query(`SELECT * FROM cars`);
  // return data.rows;
  const data = prisma.cars.findMany()
  return data;
}

async function getCar(id: number) {
  // const data = await db.query(`SELECT * FROM cars WHERE id = $1`, [id]);
  // return data.rows[0];
  const data = prisma.cars.findUnique({where: {id}})
  return data;
}

async function getCarWithLicensePlate(licensePlate: string) {
  // const data = await db.query(`SELECT * FROM cars WHERE "licensePlate" = $1`, [licensePlate]);
  // return data.rows[0];
  const data = prisma.cars.findUnique({where: {licensePlate}})
  return data;
}
async function getCarWithLicensePlateAndId(licensePlate: string, id: number) {
  // const data = await db.query(`SELECT * FROM cars WHERE "licensePlate" = $1`, [licensePlate]);
  // return data.rows[0];
  let data = await prisma.cars.findUnique({where: {licensePlate}})

  if(data !== null && data.id === id){
    data = null;
  }
  return data;
}

async function createCar(model: string, licensePlate: string, year: string, color: string) {
  // await db.query(
  //   `INSERT INTO cars (model, "licensePlate", year, color)
  //    VALUES ($1, $2, $3, $4)`,
  //   [model, licensePlate, year, color]
  // );
  await prisma.cars.create({
    data:{
      model,
      licensePlate,
      year,
      color
    }
  })
}

async function deleteCar(id: number) {
  // await db.query(`DELETE FROM cars WHERE id = $1`, [id]);
  await prisma.cars.delete({where: {id}})
}

async function updateCar(model: string, licensePlate: string, year: string, color: string, id: number) {
  // await db.query(
  //   `INSERT INTO cars (model, "licensePlate", year, color)
  //    VALUES ($1, $2, $3, $4)`,
  //   [model, licensePlate, year, color]
  // );
  await prisma.cars.update({
    data:{
      model,
      licensePlate,
      year,
      color
    },
    where:{id}
  })
}

const carRepository = {
  getCar,
  getCarWithLicensePlate,
  getCarWithLicensePlateAndId,
  getCars,
  createCar,
  deleteCar,
  updateCar
}

export default carRepository;