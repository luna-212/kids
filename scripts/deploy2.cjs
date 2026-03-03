const { ethers } = require("hardhat");

async function main() {

  const [deployer] = await ethers.getSigners();
    console.log("Deploying with:", deployer.address);

      // Deploy RewardPool
        const Pool = await ethers.getContractFactory("RewardPool");
          const pool = await Pool.deploy();
            await pool.deployed();

              console.log("RewardPool deployed at:", pool.address);

                // Deploy Staking
                  const Staking = await ethers.getContractFactory("CoonStaking");
                    const staking = await Staking.deploy(pool.address);
                      await staking.deployed();

                        console.log("Staking deployed at:", staking.address);

                          // Set staking di pool
                            const tx = await pool.setStakingContract(staking.address);
                              await tx.wait();

                                console.log("Staking contract set in RewardPool ✅");
                                }

                                main().catch((error) => {
                                  console.error(error);
                                    process.exitCode = 1;
                                    });