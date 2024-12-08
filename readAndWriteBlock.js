const fs = require("fs");

/**
 * Takes the blocknumber and append into file.
 * If already exists then it skips.
 * @param {number} blockNumber - Takes the blocknumber from the ping events
 *
 */
async function writeBlock(blockNumber) {
  let fileContent = "";
  if (fs.existsSync("blockFile.txt")) {
    fileContent = fs.readFileSync("blockFile.txt", "utf8");
  }
  if (!fileContent.includes(blockNumber)) {
    fs.appendFileSync("blockFile.txt", `${blockNumber}\n`, "utf8");
  } else {
    return;
  }
}

/**
 * Read from the txt file and checks whether the file have blocknumber or not.
 * When main function resume its start from last blocknumber in file.
 *
 */
async function readBlock() {
  return new Promise((resolve) => {
    fs.readFile("blockFile.txt", "utf8", (err, data) => {
      if (err) {
        console.error("Error reading file:", err);
        return;
      }
      const lines = data.trim().split("\n");
      const lastBlock = lines[lines.length - 1];
      resolve(parseInt(lastBlock, 10));
    });
  });
}

module.exports = {
  readBlock,
  writeBlock,
};
