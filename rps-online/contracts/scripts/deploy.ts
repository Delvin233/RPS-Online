import { ethers } from "hardhat";
import fs from "fs";
import path from "path";

async function main() {
  const RPSOnline = await ethers.getContractFactory("RPSOnline");
  const rpsOnline = await RPSOnline.deploy();
  
  await rpsOnline.waitForDeployment();
  
  const address = await rpsOnline.getAddress();
  console.log("RPSOnline deployed to:", address);
  
  // Save deployment info
  const deploymentInfo = {
    address: address,
    network: "baseSepolia",
    deployedAt: new Date().toISOString()
  };
  
  const deploymentsDir = path.join(__dirname, "../deployments");
  if (!fs.existsSync(deploymentsDir)) {
    fs.mkdirSync(deploymentsDir, { recursive: true });
  }
  
  fs.writeFileSync(
    path.join(deploymentsDir, "RPSOnline.json"),
    JSON.stringify(deploymentInfo, null, 2)
  );
  
  console.log("Deployment info saved to deployments/RPSOnline.json");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});