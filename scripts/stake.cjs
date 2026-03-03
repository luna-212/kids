const { ethers } = require("hardhat");

async function main() {

  const [signer] = await ethers.getSigners();
    console.log("Using account:", signer.address);

      // 🔥 GANTI SESUAI PUNYA KAMU
        const STAKING_DATA = [
            {
                  token: "0x6Ee017E584Ce6ed0F94188134293FD097Eee1FAc",
                        staking: "0xe35DC8f82676D8Cf911Ea5c1962B990fA671E732",
                              amount: "25000"
                                  },
                                      {
                                            token: "0x19aDf1d00027F97BC9AAdA0D659986ad29761e8d",
                                                  staking: "0xbA3Df320996eed030a418413e239be44f28C0e3F",
                                                        amount: "25000"
                                                            }
                                                              ];

                                                                for (let i = 0; i < STAKING_DATA.length; i++) {

                                                                    const { token, staking, amount } = STAKING_DATA[i];

                                                                        console.log(`\nProcessing Token ${i + 1}`);
                                                                            console.log("Token:", token);
                                                                                console.log("Staking:", staking);
                                                                                    console.log("Amount:", amount);

                                                                                        const tokenContract = await ethers.getContractAt(
  "@openzeppelin/contracts/token/ERC20/IERC20.sol:IERC20",
  token
);

                                                                                                            const stakingContract = await ethers.getContractAt(
                                                                                                                  "DevStake",
                                                                                                                        staking
                                                                                                                            );

                                                                                                                                const parsedAmount = ethers.utils.parseEther(amount);

                                                                                                                                    // Cek allowance dulu (biar gas hemat)
                                                                                                                                        const allowance = await tokenContract.allowance(
                                                                                                                                              signer.address,
                                                                                                                                                    staking
                                                                                                                                                        );

                                                                                                                                                            if (allowance.lt(parsedAmount)) {
                                                                                                                                                                  console.log("Approving token...");
                                                                                                                                                                        const approveTx = await tokenContract.approve(staking, parsedAmount);
                                                                                                                                                                              await approveTx.wait();
                                                                                                                                                                                    console.log("✅ Approved");
                                                                                                                                                                                        } else {
                                                                                                                                                                                              console.log("Allowance cukup, skip approve");
                                                                                                                                                                                                  }

                                                                                                                                                                                                      console.log("Staking...");
                                                                                                                                                                                                          const stakeTx = await stakingContract.stake(parsedAmount);
                                                                                                                                                                                                              await stakeTx.wait();

                                                                                                                                                                                                                  console.log("✅ Stake successful");
                                                                                                                                                                                                                    }

                                                                                                                                                                                                                      console.log("\n🚀 All staking done!");
                                                                                                                                                                                                                      }

                                                                                                                                                                                                                      main().catch((error) => {
                                                                                                                                                                                                                        console.error(error);
                                                                                                                                                                                                                          process.exitCode = 1;
                                                                                                                                                                                                                          });