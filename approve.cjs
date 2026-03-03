const hre = require("hardhat");

async function main() {
  const [user] = await hre.ethers.getSigners();
    console.log("Approving from account:", user.address);

      // ====== GANTI INI ======
        const TOKEN_ADDRESS = "0x42662b9848E1F72f33d9d7EE4C93dE95ef9eE2F0";
          const STAKING_ADDRESS = "0x22a621F698A591b242a7d26D1254d0f870d8904b";
            const AMOUNT = "1000000"; // jumlah token tanpa desimal
              // ========================

                const token = await hre.ethers.getContractAt("IERC20", TOKEN_ADDRESS);

                  const amountInWei = hre.ethers.utils.parseUnits(AMOUNT, 18);

                    const tx = await token.approve(STAKING_ADDRESS, amountInWei);

                      console.log("Approve tx hash:", tx.hash);

                        await tx.wait();

                          console.log("Approve ke staking berhasil ✅");
                          }

                          main().catch((error) => {
                            console.error(error);
                              process.exitCode = 1;
                              });