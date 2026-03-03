const hre = require("hardhat");

async function main() {

  const [deployer] = await hre.ethers.getSigners();
    console.log("Deploying with:", deployer.address);

      const initialSupply = hre.ethers.utils.parseUnits("10000000", 18); // 1 juta token

        const Token = await hre.ethers.getContractFactory("MyToken");
          const token = await Token.deploy(initialSupply);

            await token.deployed();

              console.log("Token deployed at:", token.address);
              }

              main().catch((error) => {
                console.error(error);
                  process.exitCode = 1;
                  });