const hre = require("hardhat");

async function main() {

  const [deployer] = await hre.ethers.getSigners();

    console.log("Deploying with:", deployer.address);

      // ganti dengan address token kamu
        const tokenA = "0xc98FEa08624C89222B8bABda1a2CaAb635b05537";
          const tokenB = "0x61eCbe9c607C9AA33aa4037BfFfb689789E5f669";

            const TheoProtocol = await hre.ethers.getContractFactory("TheoProtocol");

              const pool = await TheoProtocol.deploy(tokenA, tokenB);

                await pool.deployed();

                  console.log("TheoProtocol deployed to:", pool.address);

                  }

                  main().catch((error) => {
                    console.error(error);
                      process.exitCode = 1;
                      });