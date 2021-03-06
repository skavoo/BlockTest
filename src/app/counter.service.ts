import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import web3 from 'web3';

@Injectable()
export class CounterService {
  web3: any;
  CounterContract: any;
  contractInstance: any;
  count: number;
  lastTransactionID: any;

  constructor(private http: Http) {
    this.lastTransactionID = '';
    this.http.get('assets/abiDefinition.json').subscribe((abi) => {
      this.web3 = new web3(
        new web3.providers.HttpProvider('http://localhost:8545')
      );
      // this.CounterContract = this.web3.eth.contract(abi);
      this.CounterContract = this.web3.eth.contract(abi.json());
      this.contractInstance = this.CounterContract.at(
        '0xf950c6b7bed82cf74d184f99d31de54710bb5367'
      );
      this.count = this.contractInstance.getCounts.call().toString();
    });
  }

  increment() {
    this.contractInstance.increment(
      { from: this.web3.eth.accounts[0] },
      this.handler.bind(this)
    );
    this.count = this.contractInstance.getCounts.call().toString();
  }

  decrement() {
    this.contractInstance.decrement(
      { from: this.web3.eth.accounts[0] },
      this.handler.bind(this)
    );
    this.count = this.contractInstance.getCounts.call().toString();
  }

  handler(error, result) {
    console.info(error);
    console.info(result);
    this.lastTransactionID = result;
  }
}
