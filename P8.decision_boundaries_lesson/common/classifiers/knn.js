if(typeof utils==='undefined'){
   utils=require('../utils.js');
}

class KNN{
   constructor(samples,k){
      this.samples=samples;
      this.k=k;
   }
   predict(point){
      const samplePoints=this.samples.map(s=>s.point);
      const indices=utils.getNearest(point,samplePoints,this.k);
      const nearestSamples=indices.map(i=>this.samples[i]);
      const labels=nearestSamples.map(s=>s.label);
      const counts={};
      for(const label of labels) {
         counts[label]=counts[label]?counts[label]+1:1;
      }
      const max=Math.max(...Object.values(counts));
      const label=labels.find(l=>counts[l]==max);
      return {label,nearestSamples};
   }
}

if(typeof module!=='undefined'){
   module.exports=KNN;
}