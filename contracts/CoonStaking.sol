// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

interface IRewardPool {
        function payReward(address _to, uint256 _amount) external;
}

contract CoonStaking is ReentrancyGuard {

        struct UserInfo {
                    uint256 amount;
                            uint256 lastUpdate;
                                    uint256 pendingReward;
        }

            mapping(address => UserInfo) public users;

                // 10 Coon → 0.000005 per second
                    // 1 Coon → 0.0000005 per second
                        uint256 public constant rewardRatePerToken = 5e11;

                            IRewardPool public rewardPool;

                                event Staked(address indexed user, uint256 amount);
                                    event Claimed(address indexed user, uint256 reward);
                                        event Unstaked(address indexed user, uint256 amount, uint256 reward);

                                            constructor(address _rewardPool) {
                                                        rewardPool = IRewardPool(_rewardPool);
                                            }

                                                function stake() external payable nonReentrant {
                                                            require(msg.value > 0, "Zero amount");

                                                                    UserInfo storage user = users[msg.sender];

                                                                            if (user.amount > 0) {
                                                                                            user.pendingReward += _calculate(msg.sender);
                                                                            }

                                                                                    user.amount += msg.value;
                                                                                            user.lastUpdate = block.timestamp;

                                                                                                    emit Staked(msg.sender, msg.value);
                                                }

                                                    function claimReward() external nonReentrant {
                                                                UserInfo storage user = users[msg.sender];
                                                                        require(user.amount > 0, "No stake");

                                                                                uint256 reward = _calculate(msg.sender) + user.pendingReward;
                                                                                        require(reward > 0, "No reward");

                                                                                                user.pendingReward = 0;
                                                                                                        user.lastUpdate = block.timestamp;

                                                                                                                rewardPool.payReward(msg.sender, reward);

                                                                                                                        emit Claimed(msg.sender, reward);
                                                    }

                                                        function unstake() external nonReentrant {
                                                                    UserInfo storage user = users[msg.sender];
                                                                            require(user.amount > 0, "Nothing staked");

                                                                                    uint256 reward = _calculate(msg.sender) + user.pendingReward;
                                                                                            uint256 amount = user.amount;

                                                                                                    user.amount = 0;
                                                                                                            user.pendingReward = 0;
                                                                                                                    user.lastUpdate = 0;

                                                                                                                            payable(msg.sender).transfer(amount);
                                                                                                                                    rewardPool.payReward(msg.sender, reward);

                                                                                                                                            emit Unstaked(msg.sender, amount, reward);
                                                        }

                                                            function _calculate(address _user) internal view returns (uint256) {
                                                                        UserInfo storage user = users[_user];
                                                                                uint256 duration = block.timestamp - user.lastUpdate;

                                                                                        return (user.amount * rewardRatePerToken * duration) / 1e18;
                                                            }

                                                                receive() external payable {}
}
