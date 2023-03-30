const math={};

math.equals=(p1,p2)=>{
   return p1[0]==p2[0]&&p1[1]==p2[1];
}

math.lerp=(a,b,t)=>{
   return a+(b-a)*t;
}

math.invLerp=(a,b,v)=>{
   return (v-a)/(b-a);
}

math.remap=(oldA,oldB,newA,newB,v)=>{
   return math.lerp(newA,newB,math.invLerp(oldA,oldB,v));
}

math.remapPoint=(oldBounds,newBounds,point)=>{
   return [
      math.remap(oldBounds.left,oldBounds.right,
         newBounds.left,newBounds.right,point[0]),
      math.remap(oldBounds.top,oldBounds.bottom,
         newBounds.top,newBounds.bottom,point[1])
   ];
}

math.add=(p1,p2)=>{
   return[
      p1[0]+p2[0],
      p1[1]+p2[1]
   ];
}

math.subtract=(p1,p2)=>{
   return[
      p1[0]-p2[0],
      p1[1]-p2[1]
   ];
}

math.scale=(p,scaler)=>{
   return[
      p[0]*scaler,
      p[1]*scaler
   ];
}

math.distance=(p1,p2)=>{
   return Math.sqrt(
      (p1[0]-p2[0])**2+
      (p1[1]-p2[1])**2
   );
}

math.formatNumber=(n,dec=0)=>{
   return n.toFixed(dec);
}

math.getNearest=(loc,points)=>{
   let minDist=Number.MAX_SAFE_INTEGER;
   let nearestIndex=0;

   for(let i=0;i<points.length;i++){
      const point=points[i];
      const d=math.distance(loc,point);

      if(d<minDist){
         minDist=d;
         nearestIndex=i;
      }
   }
   return nearestIndex;
}