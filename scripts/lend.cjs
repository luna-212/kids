const hre = require("hardhat");

async function main() {

  const [user] = await hre.ethers.getSigners();

    console.log("Testing with:", user.address);

      const poolAddress = "0x1eAD6388b852351d0f99fc725E37093E61705284";
        const tokenBAddress = "0x61eCbe9c607C9AA33aa4037BfFfb689789E5f669";

          const pool = await hre.ethers.getContractAt("TheoProtocol", poolAddress);
            const tokenB = await hre.ethers.getContractAt(
                      "@openzeppelin/contracts/token/ERC20/IERC20.sol:IERC20",
                        tokenBAddress
                        );

              const collateralAmount = hre.ethers.utils.parseUnits("2500", 18);
                const borrowAmount = hre.ethers.utils.parseUnits("1000", 18);

                  // approve collateral
                    console.log("Approve TokenB...");
                      await (await tokenB.approve(poolAddress, collateralAmount)).wait();

                        // deposit collateral
                          console.log("Deposit collateral...");
                            await (await pool.depositCollateral(collateralAmount)).wait();

                              // borrow TokenA
                                console.log("Borrow TokenA...");
                                  await (await pool.borrow(borrowAmount)).wait();

                                    console.log("Borrow success ✅");

                                    }

                                    main().catch((error) => {
                                      console.error(error);
                                        process.exitCode = 1;
                                        });