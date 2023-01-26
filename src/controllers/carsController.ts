import httpStatus from "http-status";
import { Request, Response } from "express";
import carService from "../services/carService.js";
import { bool } from "joi";

async function getAllCars(req: Request, res: Response) {
  try {
    const cars = await carService.getCars();
    res.send(cars);
  } catch (e) {
    console.log(e);
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

async function getSpecificCar(req: Request, res: Response) {
  const carId = parseInt(req.params.carId);
  try {
    const car = await carService.getCar(carId);
    res.send(car);
  } catch (e) {
    if (e.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
  }
}

async function createCar(req: Request, res: Response) {
  type bodyType ={
      model: string,
      licensePlate: string,
      year: number,
      color: string
  }

  const { model, licensePlate, year, color } = req.body as bodyType;

  try {
    await carService.createCar(model, licensePlate, year, color)
    res.sendStatus(httpStatus.CREATED);
  } catch (e) {
    console.log(e);
    if (e.name === "ConflictError") {
      return res.sendStatus(httpStatus.CONFLICT);
    }

    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

async function deleteCar(req: Request, res: Response) {
  const carId = parseInt(req.params.carId);

  try {
    await carService.deleteCar(carId);
    res.sendStatus(httpStatus.OK);
  } catch (e) {
    console.log(e);
    if (e.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }

    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

async function updateCar(req: Request, res: Response) {
  type bodyType ={
      model: string,
      licensePlate: string,
      year: number,
      color: string
  }

  const { model, licensePlate, year, color } = req.body as bodyType;
  const {carId} = req.params;

  if(!model || !licensePlate || !year || !color || !carId){
    console.log(model, licensePlate, year, color);
    console.log(carId);
    
    
    res.sendStatus(httpStatus.BAD_REQUEST)
    return
  }

  try {
    await carService.updateCar(model, licensePlate, year, color, carId)
    res.sendStatus(httpStatus.CREATED);
  } catch (e) {
    console.log(e);
    if (e.name === "ConflictError") {
      return res.sendStatus(httpStatus.CONFLICT);
    }

    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

const carController = {
  getAllCars,
  getSpecificCar,
  createCar,
  deleteCar,
  updateCar
}

export default carController;