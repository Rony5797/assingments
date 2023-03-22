
function multiplicationTable(num) {
   
    for(let i = 1; i <= 10; i++) {
     
      const product = num * i;
  
      console.log(`${num} x ${i} = ${product}`);
    }
  }
  

  multiplicationTable(5);
  multiplicationTable(8);
  multiplicationTable(12);