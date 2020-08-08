import React from "react";

// CLASSES

class Block {
  previousHash: number;
  transactions: string[];

  blockHash: number;

  constructor(previousHash: number, transactions: string[]) {
    this.previousHash = previousHash;
    this.transactions = transactions;

    const contents = [hashCode(transactions.join("")), previousHash];
    this.blockHash = hashCode(contents.join(""));
  }

  getPreviousHash() {
    return this.previousHash;
  }
  getTransactions() {
    return this.transactions;
  }
  getBlockHash() {
    return this.blockHash;
  }
}

const MONEY = 120; // change this to see all hashes change, meaning no one can spoof one transaction without having to spoof every subsequent transaction.

const blockchain: Block[] = [];

const genesisTransactions = [
  `Jordan Winslow sent Jordan Winslow ${MONEY} coins`
];
const genesisBlock = new Block(0, genesisTransactions);

blockchain.push(genesisBlock);

const block2 = new Block(genesisBlock.getBlockHash(), [
  "Jordan Winslow sent Jordan Winslow 200 coins"
]);

blockchain.push(block2);

// RENDER

const App = () => (
  <div>
    <p>Genesis Block Hash: {genesisBlock.getBlockHash()}</p>
    <p>Block 2 Hash: {block2.getBlockHash()}</p>
    <p>
      Blockchain: [
      {blockchain.map((block, idx) => {
        return (
          block.getBlockHash() + (blockchain.length - 1 === idx ? "" : ", ")
        );
      })}
      ]
    </p>
  </div>
);

export default App;

// UTILITY

function hashCode(transaction: string) {
  let hash = 0;
  for (let i = 0; i < transaction.length; i++) {
    let character = transaction.charCodeAt(i);
    hash = (hash << 5) - hash + character;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
}
