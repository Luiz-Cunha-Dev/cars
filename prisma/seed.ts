import prisma from "../src/config/database.js";

async function main(){
    await prisma.cars.createMany({
        data: [
            {
              "model": "HB20",
              "licensePlate": "ABC9045",
              "year": "2001",
              "color": "AZUL"
            },
            {
              "model": "SONATA",
              "licensePlate": "EZD3232",
              "year": "2010",
              "color": "PRETO"
            },
            {
              "model": "X1",
              "licensePlate": "FBI2274",
              "year": "2018",
              "color": "BRANCO"
            },
            {
              "model": "CIVIC",
              "licensePlate": "LPA1014",
              "year": "2021",
              "color": "CINZA"
            },
            {
              "model": "ONIX",
              "licensePlate": "HFA2765",
              "year": "2023",
              "color": "AMARELO"
            },
            {
              "model": "EVOLUTION",
              "licensePlate": "EPR6675",
              "year": "2005",
              "color": "CINZA"
            },
            {
              "model": "UNO",
              "licensePlate": "DMP7962",
              "year": "2000",
              "color": "PRETO"
            },
            {
              "model": "320i",
              "licensePlate": "LAS5542",
              "year": "2017",
              "color": "BRANCO"
            },
            {
              "model": "SAVEIRO",
              "licensePlate": "AKI8472",
              "year": "2023",
              "color": "CINZA"
            }
          ]
    })
}

main()
.then(() => {
    console.log("Registro feito com sucesso!");
    
})
.catch(e => {
    console.error(e);
    process.exit(1)
})
.finally(async () => await prisma.$disconnect())