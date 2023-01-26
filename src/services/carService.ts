import notFoundError from "../errors/notFoundError.js";
import conflictError from "../errors/conflictError.js";
import carRepository from "../repository/carRepository.js";

async function getCars() {
  const cars = await carRepository.getCars();
  return cars;
}

async function getCar(id: number) {
  const car = await carRepository.getCar(id);
  if (!car) {
    throw notFoundError();
  }

  return car;
}

async function createCar(model: string, licensePlate: string, year: number, color: string) {
  const car = await carRepository.getCarWithLicensePlate(licensePlate);
  if (car) {
    throw conflictError(`Car with license plate ${licensePlate} already registered.`)
  }

  await carRepository.createCar(model, licensePlate, year.toString(), color);
}

async function updateCar(model: string, licensePlate: string, year: number, color: string, id: string) {
  const car = await carRepository.getCarWithLicensePlateAndId(licensePlate, Number(id));
  if (car) {
    throw conflictError(`Car with license plate ${licensePlate} already registered.`)
  }

  await carRepository.updateCar(model, licensePlate, year.toString(), color, Number(id));
}

async function deleteCar(id: number) {
  await getCar(id);
  await carRepository.deleteCar(id);
}

const carService = {
  getCars,
  getCar,
  createCar,
  deleteCar,
  updateCar
}

export default carService;