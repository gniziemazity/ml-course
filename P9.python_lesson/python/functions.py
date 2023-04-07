classes={
   "car":0,
   "fish":1,
   "house":2,
   "tree":3,
   "bicycle":4,
   "guitar":5,
   "pencil":6,
   "clock":7
}

def readFeatureFile(filePath):
   f=open(filePath,'r')
   lines=f.readlines()

   X=[]
   y=[]
   for i in range(1,len(lines)):
      row=lines[i].split(",")
      X.append(
         [float(row[j]) for j in range(len(row)-1)]
      )
      y.append(classes[row[-1].strip()])

   return (X,y)

def readJsonFile(filePath):
   import json
   f=open(filePath,encoding='utf-8')
   data=json.load(f)
   f.close()
   return data

def drawPathToCanvas(canvas,path):
   list=[]
   for p in path:
      list+=p
   canvas.create_line(list,width=3)

def drawPathsToCanvas(canvas,paths):
   for path in paths:
      if(len(path)>=4):
         drawPathToCanvas(canvas,path)

def drawPathToImage(draw,path):
   list=[]
   for p in path:
      list+=p
   draw.line(list,(0,0,0),width=3)

def drawPathsToImage(draw,paths):
   for path in paths:
      if(len(path)>=4):
         drawPathToImage(draw,path)