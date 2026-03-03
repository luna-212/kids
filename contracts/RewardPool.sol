// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

contract RewardPool is Ownable {

        address public stakingContract;

            constructor() Ownable(msg.sender) {}

                modifier onlyStaking() {
                            require(msg.sender == stakingContract, "Not staking");
                                    _;
                }

                    function setStakingContract(address _staking) external onlyOwner {
                                stakingContract = _staking;
                    }

                        function payReward(address _to, uint256 _amount) external onlyStaking {
                                    require(address(this).balance >= _amount, "Pool empty");
                                            payable(_to).transfer(_amount);
                        }

                            receive() external payable {}
}
