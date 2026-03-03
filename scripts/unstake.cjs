const hre = require("hardhat");

async function main() {
  const [user] = await hre.ethers.getSigners();
    console.log("Unstaking from:", user.address);

      // ====== GANTI INI ======
        const STAKING_ADDRESS = "0xe35DC8f82676D8Cf911Ea5c1962B990fA671E732";
          const AMOUNT = "850000"; // jumlah Token A yang mau di-unstake (tanpa desimal)
            // ========================

              const staking = await hre.ethers.getContractAt(
                  "StakingERC20",
                      STAKING_ADDRESS
                        );

                          // ethers v5 pakai utils
                            const amountInWei = hre.ethers.utils.parseUnits(AMOUNT, 18);

                              const tx = await staking.unstake(amountInWei);

                                console.log("Unstake tx hash:", tx.hash);

                                  await tx.wait();

                                    console.log("Unstake berhasil ✅");
                                    }

                                    main().catch((error) => {
                                      console.error(error);
                                        process.exitCode = 1;
                                        });