class SketchPad{
   constructor(container,onUpdate=null,size=400){
      this.canvas=document.createElement("canvas");
      this.canvas.width=size;
      this.canvas.height=size;
      this.canvas.style=`
         background-color:white;
         box-shadow: 0px 0px 10px 2px black;
      `;
      container.appendChild(this.canvas);

      const lineBreak=document.createElement("br");
      container.appendChild(lineBreak);

      this.undoBtn=document.createElement("button");
      this.undoBtn.innerHTML="UNDO";
      container.appendChild(this.undoBtn);
      this.saveBtn=document.createElement("button");
      this.saveBtn.innerHTML="SAVE";
      container.appendChild(this.saveBtn);
      this.loadBtn=document.createElement("button");
      this.loadBtn.innerHTML="LOAD";
      container.appendChild(this.loadBtn);

      this.ctx=this.canvas.getContext("2d");

      this.onUpdate=onUpdate;
      this.reset();

      this.#addEventListeners();
   }

   reset(){
      this.paths=[];
      this.isDrawing=false;
      this.#redraw();
   }

   #addEventListeners(){
      this.canvas.onmousedown=(evt)=>{
         const mouse=this.#getMouse(evt);
         this.paths.push([mouse]);
         this.isDrawing=true;
      }
      this.canvas.onmousemove=(evt)=>{
         if(this.isDrawing){
            const mouse=this.#getMouse(evt);
            const lastPath=this.paths[this.paths.length-1];
            lastPath.push(mouse);
            this.#redraw();
         }
      }
      document.onmouseup=()=>{
         this.isDrawing=false;
      }
      this.canvas.ontouchstart=(evt)=>{
         const loc=evt.touches[0];
         this.canvas.onmousedown(loc);
      }
      this.canvas.ontouchmove=(evt)=>{
         const loc=evt.touches[0];
         this.canvas.onmousemove(loc);
      }
      document.ontouchend=()=>{
         document.onmouseup();
      }
      this.undoBtn.onclick=()=>{
         this.paths.pop();
         this.#redraw();
      }
      this.saveBtn.onclick=()=>{
         var filename = "sketch.txt";
         var text = JSON.stringify(this.paths);
         var element = document.createElement('a');
         element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
         element.setAttribute('download', filename);
         element.click();
      }
      this.loadBtn.onclick=()=>{
         // creating input on-the-fly
         var sketch = this;
         var input = document.createElement("input");
         input.setAttribute('type', 'file');
         // add onchange handler if you wish to get the file :)
         input.onchange=()=>{
            if (input.files[0]) {
               input.files[0].text()
               .then(data => {
                  sketch.paths = JSON.parse(data);
                  sketch.#redraw();
               })
               .catch((error) => {
                  alert("Unable to load from file: " + input.files[0].name)
               })
            }
         }
         input.click(); // opening the dialog
      }
   }

   #redraw(){
      this.ctx.clearRect(0,0,
         this.canvas.width,this.canvas.height);
      draw.paths(this.ctx,this.paths);
      if(this.paths.length>0){
         this.undoBtn.disabled=false;
         this.saveBtn.disabled=false;
      }else{
         this.undoBtn.disabled=true;
         this.saveBtn.disabled=true;
      }
      this.triggerUpdate();
   }

   triggerUpdate(){
      if(this.onUpdate){
         this.onUpdate(this.paths);
      }
   }

   #getMouse=(evt)=>{
      const rect=this.canvas.getBoundingClientRect();
      return [
         Math.round(evt.clientX-rect.left),
         Math.round(evt.clientY-rect.top)
      ];
   }
}